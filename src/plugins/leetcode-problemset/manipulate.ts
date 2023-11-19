import { find } from "@shared/dom/selectors.js";

(async () => {
  const rows = await find("[role='rowgroup']", 1);
  if (!rows) return;

  const update = () => {
    rows.childNodes.forEach((node) => {
      const firstCell = node.firstChild?.firstChild;
      const isDaily = firstCell instanceof HTMLAnchorElement;
      const isPremium = firstCell instanceof SVGElement;

      if (isDaily || isPremium) {
        (node as HTMLElement).style.height = "0";
        (node as HTMLElement).style.overflow = "hidden";
      } else {
        (node as HTMLElement).style.height = "unset";
        (node as HTMLElement).style.overflow = "unset";
      }
    });
  };

  update();
  new MutationObserver(update).observe(rows, { subtree: true, childList: true });
})();
