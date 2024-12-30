import * as packageMetadata from '../../package.json';

const parsedPackageName = parsePackageName(packageMetadata.name);

export const SCRIPT_ID = packageMetadata.name;
export const SCRIPT_VERSION = packageMetadata.version;
export const SCRIPT_DESCRIPTION = packageMetadata.description;

function parsePackageName(scriptId: string) {
  // check whether we have a namespace, if not, return the scriptId
  if (scriptId[0] !== '@' || !scriptId.includes('/')) {
    return {
      namespace: null,
      name: scriptId,
    };
  }

  const namespaceEndIndex = scriptId.indexOf('/');
  return {
    namespace: scriptId.substring(1, namespaceEndIndex),
    name: scriptId.substring(namespaceEndIndex + 1),
  };
}
