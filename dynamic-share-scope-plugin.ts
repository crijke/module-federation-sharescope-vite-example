type SnapshotSharedConfiguration = { sharedName?: string; version?: string };

type RemoteSnapshot = {
  shared?: SnapshotSharedConfiguration[];
};

type AfterResolveArgs = {
  remoteSnapshot?: RemoteSnapshot;
  remote: { shareScope?: string | null };
  remoteInfo: { shareScope?: string | null };
  pkgNameOrAlias: string;
};

function dynamicShareScopePlugin() {
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
      debugger;
      if (shareScope) {
        args.remote.shareScope = shareScope;
        args.remoteInfo.shareScope = shareScope;
      }
      return args;
    },
  };
}

export default dynamicShareScopePlugin;
