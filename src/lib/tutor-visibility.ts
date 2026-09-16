/**
 * Route-based AI Tutor visibility. The tutor is disabled for EGB339 only;
 * every other subject keeps the full tutor experience. Checked by both the
 * floating trigger and the panel so no tutor control can appear on /egb339.
 */
export function isTutorDisabledForPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return pathname === "/egb339" || pathname.startsWith("/egb339/");
}
