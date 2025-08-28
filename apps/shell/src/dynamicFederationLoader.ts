/* Dynamic Module Federation loader
 * 1. Inject remoteEntry script if not present
 * 2. Read remote's mf-meta expose to discover React version
 * 3. Derive share scope name (react@<major>)
 * 4. (Optional) log and sanity check existing registrations
 * 5. Return factory import
 */

export type RemoteConfig = {
  name: string; // global container name
  url: string; // full remoteEntry.js URL
  expose: string; // module to import after init, e.g. './export-app'
  metaExpose?: string; // metadata expose path (default './mf-meta')
};

// Cache to avoid double-injecting
const injected: Record<string, Promise<void>> = {};

function injectRemoteEntry(url: string, globalName: string): Promise<void> {
  if (Object.prototype.hasOwnProperty.call(injected, globalName)) {
    return injected[globalName];
  }
  injected[globalName] = new Promise((resolve, reject) => {
    if (typeof (window as any)[globalName] !== "undefined") {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = url;
    script.type = "module";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error(`Failed loading remoteEntry ${url}`));
    document.head.appendChild(script);
  });
  return injected[globalName];
}

function deriveReactScope(reactVersion: string | undefined): string {
  if (!reactVersion) return "react@unknown";
  const major = reactVersion.split(".")[0];
  return `react@${major}`;
}

export async function loadRemoteWithDynamicScope<T = any>(
  cfg: RemoteConfig
): Promise<T> {
  const { name, url, expose, metaExpose = "./mf-meta" } = cfg;
  await injectRemoteEntry(url, name);
  const container = (window as any)[name];
  if (!container)
    throw new Error(`Remote container ${name} not found after loading ${url}`);

  // Attempt metadata load PRIOR to init for version insight
  let reactVersion: string | undefined;
  try {
    if (container.get) {
      const metaFactory = await container.get(metaExpose).catch(() => null);
      if (metaFactory) {
        const metaModule = metaFactory();
        const meta = metaModule?.meta || metaModule?.default || metaModule;
        reactVersion = meta?.reactVersion;
      }
    }
  } catch {
    /* optional */
  }

  const scope = deriveReactScope(reactVersion);
  // Optionally record scope association (purely informational) under shell
  (window as any).__DYNAMIC_SCOPES__ = (window as any).__DYNAMIC_SCOPES__ || {};
  (window as any).__DYNAMIC_SCOPES__[name] = scope;

  if (container.init) {
    try {
      // Provide empty object; real sharing handled by plugin runtime. Duplicate init safe.
      container.init({});
    } catch {
      /* ignore duplicate init */
    }
  }

  const factory = await container.get(expose);
  if (!factory) throw new Error(`Expose ${expose} missing in remote ${name}`);
  return factory();
}

export default loadRemoteWithDynamicScope;
