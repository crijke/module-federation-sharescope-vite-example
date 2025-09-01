import type { ModuleFederationRuntimePlugin } from "@module-federation/enhanced/runtime";

type AfterResolveArgs = Parameters<
  NonNullable<ModuleFederationRuntimePlugin["afterResolve"]>
>[0];

type RemoteSnapshot = NonNullable<AfterResolveArgs["remoteSnapshot"]>;

function dynamicShareScopePlugin(): ModuleFederationRuntimePlugin {
  function deriveShareScopeFromSnapshot(
    snapshot?: RemoteSnapshot
  ): string | null {
    const snapshotVersion = snapshot?.shared?.find(
      (s: any) => s.sharedName === "react"
    )?.version;
    return snapshotVersion ? `react@${snapshotVersion}` : null;
  }

  return {
    name: "DynamicShareScopePlugin",
    afterResolve(args: AfterResolveArgs) {
      const shareScope = deriveShareScopeFromSnapshot(args.remoteSnapshot);
      if (shareScope) {
        args.remote.shareScope = shareScope;
        args.remoteInfo.shareScope = shareScope;
      }
      return args;
    },
  };
}

export default dynamicShareScopePlugin;
