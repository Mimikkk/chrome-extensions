import { find } from "@shared/dom/selectors.js";

(async () => {
  const rows = await find("[role='rowgroup']", 1);

  const update = () => {
    rows.childNodes.forEach((node) => {
      const isDaily = node.firstChild.firstChild instanceof HTMLAnchorElement;
      const isPremium = node.firstChild.firstChild instanceof SVGElement;

      if (isDaily || isPremium) {
        (node as HTMLDivElement).style.height = "0";
        (node as HTMLDivElement).style.overflow = "hidden";
      }
    });
  };

  update();
  new MutationObserver(update).observe(rows, { subtree: true, childList: true });
})();
