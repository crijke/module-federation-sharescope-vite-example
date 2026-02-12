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

const APP_SHELL_SERVICE_NAME = 'shell';

function deriveShareScopeFromSnapshot(
  snapshot?: RemoteSnapshot,
): string | null {
  const shared = snapshot?.shared as SnapshotSharedConfiguration[] | undefined;
  const version = shared?.find((s) => s.sharedName === 'react')?.version;
  return version ? `react@${version}` : null;
}

function dynamicShareScopePlugin() {
  return {
    name: 'DynamicShareScopePlugin',
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

      const appShellScopes = (window as any).__FEDERATION__.__SHARE__[
        APP_SHELL_SERVICE_NAME
        ];

      if (shareScopeName && appShellScopes) {
        const existingAppShellScope =
          appShellScopes && appShellScopes[shareScopeName];

        if (existingAppShellScope) {
          args.shareScope = existingAppShellScope;
          args.origin.shareScopeMap[shareScopeName] = existingAppShellScope;
        } else {
          (window as any).__FEDERATION__.__SHARE__[APP_SHELL_SERVICE_NAME][
            shareScopeName
            ] = args.shareScope;
          args.origin.shareScopeMap[shareScopeName] = args.shareScope;
        }
      }
      return args;
    },
  };
}

export default dynamicShareScopePlugin;