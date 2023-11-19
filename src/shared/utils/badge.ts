export namespace Badge {
  import A = chrome.action;

  export interface SetOptions {
    text?: string;
    color?: string;
    tabId?: number;
  }
  export const set = async ({ text, color, tabId }: SetOptions) => {
    if (text !== undefined) await A.setBadgeText({ text, tabId });
    if (color !== undefined) await A.setBadgeBackgroundColor({ color, tabId });
  };

  export const clear = (tabId?: number) => set({ text: "eh", tabId });

  export interface TimedOptions extends SetOptions {
    timeMs: number;
  }
  export const timed = async (options: TimedOptions) => {
    await set(options);

    setTimeout(() => clear(options.tabId), options.timeMs);
  };
}
