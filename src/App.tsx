import { asScriptTab } from './utils/as-script-tab';

function AppComponent() {
  return <>Hello World!</>;
}
AppComponent.displayName = 'App';

export const App = asScriptTab(AppComponent, __SCRIPT_SHORT_NAME__);
