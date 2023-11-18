import { find } from "@shared/dom/selectors.js";

(async () => {
  const rows = await find("[role='rowgroup']", 1);

  const update = () => {
    rows.childNodes.forEach((node) => {
      const isDaily = node.firstChild.firstChild instanceof HTMLAnchorElement;
      const isPremium = node.firstChild.firstChild instanceof SVGElement;

      try {
        if (rows.contains(node) && (isDaily || isPremium)) rows.removeChild(node);
      } catch {}
    });
  };

  update();
  new MutationObserver(update).observe(rows, { subtree: true, childList: true });
})();
