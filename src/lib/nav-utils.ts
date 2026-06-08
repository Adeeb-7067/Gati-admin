/** Precise nav active check — avoids prefix false positives between sibling routes */
export function isNavItemActive(pathname: string, to: string): boolean {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}
