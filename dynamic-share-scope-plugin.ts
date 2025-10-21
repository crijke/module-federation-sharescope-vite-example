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

type BeforeInitContainerArgs = {
  shareScope: any;
  initScope: any;
  remoteEntryInitOptions: any;
  remoteInfo: { shareScope?: string | null };
  origin: any;
};

declare global {
  interface Window {
    __MF_SHARE_SCOPE_REGISTRY__?: Map<string, any>;
    __MF_SHARE_SCOPE_REF_COUNT__?: Map<string, number>;
  }
}

function getGlobalRegistry(): Map<string, any> {
  if (!window.__MF_SHARE_SCOPE_REGISTRY__) {
    window.__MF_SHARE_SCOPE_REGISTRY__ = new Map();
  }
  return window.__MF_SHARE_SCOPE_REGISTRY__;
}

function getRefCountMap(): Map<string, number> {
  if (!window.__MF_SHARE_SCOPE_REF_COUNT__) {
    window.__MF_SHARE_SCOPE_REF_COUNT__ = new Map();
  }
  return window.__MF_SHARE_SCOPE_REF_COUNT__;
}

function incrementRefCount(scopeName: string): void {
  const refCounts = getRefCountMap();
  const current = refCounts.get(scopeName) || 0;
  refCounts.set(scopeName, current + 1);
}

function decrementRefCount(scopeName: string): void {
  const refCounts = getRefCountMap();
  const current = refCounts.get(scopeName) || 0;
  const newCount = Math.max(0, current - 1);
  refCounts.set(scopeName, newCount);

  if (newCount === 0) {
    const registry = getGlobalRegistry();
    registry.delete(scopeName);
    refCounts.delete(scopeName);
  }
}

(window as any).__MF_RELEASE_SHARE_SCOPE__ = (scopeName: string) => {
  decrementRefCount(scopeName);
};

function deriveShareScopeFromSnapshot(
  snapshot?: RemoteSnapshot
): string | null {
  const shared = snapshot?.shared as SnapshotSharedConfiguration[] | undefined;
  const version = shared?.find((s) => s.sharedName === "react")?.version;
  return version ? `react@${version}` : null;
}

function dynamicShareScopePlugin() {
  return {
    name: "DynamicShareScopePlugin",
    async afterResolve(args: AfterResolveArgs) {
      const shareScope = deriveShareScopeFromSnapshot(args.remoteSnapshot);
      if (shareScope) {
        args.remote.shareScope = shareScope;
        args.remoteInfo.shareScope = shareScope;
      }
      return args;
    },
    async beforeInitContainer(args: BeforeInitContainerArgs) {
      const shareScopeName = args.remoteInfo.shareScope;

      if (shareScopeName) {
        const globalRegistry = getGlobalRegistry();

        const existingGlobalScope = globalRegistry.get(shareScopeName);

        if (existingGlobalScope) {
          // use existing global share scope
          args.shareScope = existingGlobalScope;
          incrementRefCount(shareScopeName);
        } else {
          globalRegistry.set(shareScopeName, args.shareScope);
          incrementRefCount(shareScopeName);
        }
        if (args.origin.shareScopeMap) {
          args.origin.shareScopeMap[shareScopeName] = existingGlobalScope;
        }
      }
      return args;
    },
  };
}

export default dynamicShareScopePlugin;
