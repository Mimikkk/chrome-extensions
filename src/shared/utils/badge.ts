export namespace Badge {
  import A = chrome.browserAction;

  export interface SetOptions {
    text?: string;
    color?: string;
    tabId?: number;
  }
  export const set = async (options: SetOptions) => {
    if (options.text !== undefined) await A.setBadgeText(options as A.BadgeTextDetails);
    if (options.color !== undefined) await A.setBadgeBackgroundColor(options as A.BadgeBackgroundColorDetails);
  };

  export const clear = (tabId?: number) => set({ text: "", tabId });

  export interface TimedOptions extends SetOptions {
    timeMs: number;
  }
  export const timed = async (options: TimedOptions) => {
    await set(options);
    return setTimeout(() => clear(options.tabId), options.timeMs);
  };
}
