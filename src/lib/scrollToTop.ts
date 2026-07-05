/** Reset window scroll — used on route changes so each page opens at the top. */
export function scrollToTop(): void {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}
