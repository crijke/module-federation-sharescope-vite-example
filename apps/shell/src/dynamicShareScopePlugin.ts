import { ModuleFederationRuntimePlugin } from "@module-federation/enhanced/runtime";

function dynamicShareScopePlugin(): ModuleFederationRuntimePlugin {
  async function deriveShareScopeFromManifest(
    entryUrl: string
  ): Promise<string | null> {
    try {
      const manifestUrl = entryUrl.replace(
        /remoteEntry\.js$/,
        "mf-manifest.json"
      );

      const res = await fetch(manifestUrl!, { credentials: "omit" });
      if (!res.ok) return null;
      const json = await res.json();
      const reactVersion = json.shared?.find(
        (s: any) => s.name === "react"
      )?.version;
      if (!reactVersion) {
        return null;
      }
      return `react@${reactVersion}`;
    } catch {
      // ignore
    }
    return null;
  }

  return {
    name: "DynamicShareScopePlugin",
    async afterResolve(args) {
      const shareScope = await deriveShareScopeFromManifest(
        args.remoteInfo.entry
      );
      if (shareScope) {
        args.remote.shareScope = shareScope;
        args.remoteInfo.shareScope = shareScope;
      }
      return args;
    },
  };
}

export default dynamicShareScopePlugin;
