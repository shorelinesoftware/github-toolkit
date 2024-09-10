export function buildJiraUrl(orgUrl: URL, path: string) {
  return `${orgUrl.origin}/rest/api/2${path}`;
}
