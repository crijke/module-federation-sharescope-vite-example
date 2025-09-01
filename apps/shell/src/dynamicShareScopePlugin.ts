import type { ModuleFederationRuntimePlugin } from "@module-federation/enhanced/runtime";

type AfterResolveArgs = Parameters<
  NonNullable<ModuleFederationRuntimePlugin["afterResolve"]>
>[0];

type RemoteSnapshot = NonNullable<AfterResolveArgs["remoteSnapshot"]>;

type SnapshotSharedConfiguration = { sharedName?: string; version?: string };

function dynamicShareScopePlugin(): ModuleFederationRuntimePlugin {
  function deriveShareScopeFromSnapshot(
    snapshot?: RemoteSnapshot
  ): string | null {
    const shared = snapshot?.shared as
      | SnapshotSharedConfiguration[]
      | undefined;
    const version = shared?.find((s) => s.sharedName === "react")?.version;
    return version ? `react@${version}` : null;
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
