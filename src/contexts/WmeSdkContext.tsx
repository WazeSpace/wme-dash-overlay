import { createContext, ReactNode, useContext, useMemo } from 'react';
import { WmeSDK } from 'wme-sdk-typings';
import { getWmeSdk } from '../utils/sdk-utils';
import { getWindow } from '../utils/window-utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExtractFunctionType<T> = T extends (...args: any[]) => any ? T : never;
type WmeSdkResolverFunction = ExtractFunctionType<typeof window.getWmeSdk>;

declare const __SCRIPT_ID__: string;
declare const __SCRIPT_NAME__: string;
const defaultWmeSdk = (() => {
  try {
    return getWmeSdk?.({
      scriptId: __SCRIPT_ID__,
      scriptName: __SCRIPT_NAME__,
    });
  } catch {
    return undefined;
  }
})();
const WmeSdkContext = createContext<WmeSDK>(defaultWmeSdk);

interface StaticSdkProps {
  wmeSdk: WmeSDK;
}
type ResolvableSdkOptions = Parameters<WmeSdkResolverFunction>[0];

type WmeSdkProps = (StaticSdkProps | ResolvableSdkOptions) & {
  children: ReactNode;
};
export function WmeSdkProvider({ children, ...props }: WmeSdkProps) {
  const wmeSdk = useMemo(() => {
    if ('wmeSdk' in props) return props.wmeSdk;

    const window = getWindow();
    if (!window.getWmeSdk) return null;
    return window.getWmeSdk(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- options is an object
  }, [...Object.values(props)]);

  return (
    <WmeSdkContext.Provider value={wmeSdk}>{children}</WmeSdkContext.Provider>
  );
}

export function useWmeSdk() {
  const wmeSdk = useContext(WmeSdkContext);
  if (wmeSdk === undefined)
    throw new Error('useWmeSdk must be used within a WmeSdkProvider');

  return wmeSdk;
}
