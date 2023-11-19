import { Badge } from "@shared/utils/badge.js";

const BadgeOk = { text: "OK", color: "#62c05f", timeMs: 1000 };
const reloadExtensions = async () => {
  chrome.management.getAll(async (extensions) => {
    for (const { enabled, id, installType, name, type } of extensions) {
      if (installType !== "development" || !enabled || name === "Extension Reloader") continue;

      await chrome.management.setEnabled(id, false);
      await chrome.management.setEnabled(id, true);
      if (type === "packaged_app") chrome.management.launchApp(id);

      console.info(`${name} reloaded.`);
    }
  });

  await Badge.timed(BadgeOk);
};

chrome.browserAction.onClicked.addListener(reloadExtensions);
