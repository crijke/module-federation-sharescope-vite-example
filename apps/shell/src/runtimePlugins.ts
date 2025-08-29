import { ModuleFederationRuntimePlugin } from "@module-federation/enhanced/runtime";

// function runtimePlugin() {
//   return {
//     name: "module-federation-use-hosts-shared",
//     init() {
//       debugger;
//       console.log("init");
//     },
//     beforeLoadShare() {
//       debugger;
//       console.log("beforeLoadShare");
//     },
//     resolveShare(args) {
//       debugger;

//       console.log(args);
//       const host = getInstance();
//       const { shareScopeMap, scope, pkgName, version } = args;
//       const [hostCopy] = host?.options?.shared?.[pkgName] ?? [];

//       if (hostCopy) {
//         args.resolver = function () {
//           shareScopeMap[scope][pkgName][version] = hostCopy;
//           return shareScopeMap[scope][pkgName][version];
//         };
//       }

//       return args;
//     },
//   };
// }
// export default runtimePlugin;

/**
 * DynamicShareScopePlugin
 *
 * Goal: Let remotes declare their own scope (via an exposed './mf-meta' module)
 * and have the shell initialize each container into that scope automatically.
 *
 * How it works:
 * - initContainer hook runs right before container.init is called by the runtime
 * - We attempt to read the remote's './mf-meta' expose without requiring shares
 * - Derive a scope name from meta.reactVersion (e.g. `react@18.3.0`)
 * - Ensure the host has a bucket for that scope and set args.shareScope accordingly
 * - If anything fails, we fall back to the default scope
 */
function dynamicShareScopePlugin(): ModuleFederationRuntimePlugin {
  // const META_EXPOSE = "./mf-meta";

  // function ensureScope(origin: any, scopeName: string) {
  //   origin.shareScopeMap = origin.shareScopeMap || {};
  //   origin.shareScopeMap.default = origin.shareScopeMap.default || {};
  //   if (!origin.shareScopeMap[scopeName]) {
  //     origin.shareScopeMap[scopeName] = {};
  //   }
  //   return origin.shareScopeMap[scopeName];
  // }

  // function deriveScopeFromMeta(meta: any): string | null {
  //   const version = meta?.reactVersion || meta?.react?.version || null;
  //   if (!version || typeof version !== "string") return null;
  //   // Use the full version as scope key to allow parallel versions
  //   return `react@${version}`;
  // }

  // // Try to pull react version from an mf-manifest.json next to the remote entry
  // async function deriveScopeFromManifest(
  //   entryUrl: string
  // ): Promise<string | null> {
  //   try {
  //     let manifestUrl: string | null = null;
  //     // common pattern: .../remoteEntry.js -> .../mf-manifest.json
  //     if (entryUrl.endsWith("remoteEntry.js")) {
  //       manifestUrl = entryUrl.replace(/remoteEntry\.js$/, "mf-manifest.json");
  //     } else if (entryUrl.endsWith("remoteEntry")) {
  //       manifestUrl = `${entryUrl}.json`;
  //     } else {
  //       // try appending
  //       const base = entryUrl.replace(/\/remoteEntry(?:\.js)?$/, "/");
  //       manifestUrl = `${base}mf-manifest.json`;
  //     }

  //     const res = await fetch(manifestUrl!, { credentials: "omit" });
  //     if (!res.ok) return null;
  //     const json: any = await res.json();

  //     // Preferred: explicit metadata.reactVersion
  //     const explicit = json?.metadata?.reactVersion || json?.reactVersion;
  //     if (typeof explicit === "string" && explicit) return `react@${explicit}`;

  //     // Heuristic: from shared.react.version or requiredVersion
  //     const sharedReact = json?.shared?.react || json?.shared?.["react"];
  //     const candidate: string | undefined =
  //       sharedReact?.version || sharedReact?.requiredVersion;
  //     if (typeof candidate === "string" && candidate) {
  //       const exact = candidate.trim().replace(/^[^\d]*/, ""); // strip ^ ~ >= etc.
  //       if (/^\d+\.\d+\.\d+/.test(exact)) return `react@${exact}`;
  //     }
  //   } catch {
  //     // ignore
  //   }
  //   return null;
  // }

  return {
    name: "DynamicShareScopePlugin",

    // // Make sure a default scope map exists in the host instance
    // beforeInit(args) {
    //   const { origin } = args;
    //   origin.shareScopeMap = origin.shareScopeMap || {};
    //   origin.shareScopeMap.default = origin.shareScopeMap.default || {};
    //   return args;
    // },

    // // Choose scope per-remote just-in-time before calling container.init
    // async initContainer(args) {
    //   const { origin, remoteInfo, remoteEntryExports } = args;

    //   // 1) Try manifest (if present)
    //   let scopeName: string | null = await deriveScopeFromManifest(
    //     remoteInfo.entry
    //   );

    //   // 2) Fallback: Try remote metadata module without shares
    //   try {
    //     if (!scopeName) {
    //       const metaFactory = await (remoteEntryExports as any)
    //         .get?.(META_EXPOSE)
    //         .catch(() => null);
    //       if (metaFactory) {
    //         const metaModule = metaFactory();
    //         const meta = metaModule?.meta || metaModule?.default || metaModule;
    //         scopeName = deriveScopeFromMeta(meta);
    //       }
    //     }
    //   } catch {
    //     // ignore and fall back to default
    //   }

    //   if (scopeName) {
    //     // Ensure a bucket exists for this scope and select it
    //     const scopeBucket = ensureScope(origin, scopeName);
    //     args.shareScope = scopeBucket;
    //     // reflect for debugging/inspection
    //     try {
    //       (window as any).__MF_DYNAMIC_SCOPES__ =
    //         (window as any).__MF_DYNAMIC_SCOPES__ || {};
    //       (window as any).__MF_DYNAMIC_SCOPES__[remoteInfo.name] = scopeName;
    //     } catch {}
    //   } else {
    //     // fallback to default scope
    //     args.shareScope = origin.shareScopeMap.default;
    //   }

    //   return args;
    // },
  };
}

export default dynamicShareScopePlugin;
