export const select = <E extends Element>(selector: string, nth?: number): E | null =>
  nth === undefined ? document.querySelector<E>(selector) : document.querySelectorAll<E>(selector)[nth] ?? null;

export const find = <E extends Element>(selector: string, nth?: number): Promise<E | undefined> =>
  new Promise((resolve) => {
    const element = select<E>(selector, nth);
    if (element) return resolve(element);

    new MutationObserver((_, observer) => {
      const element = select<E>(selector, nth);

      if (element) {
        observer.disconnect();

        resolve(element);
      }
    }).observe(document.body, { childList: true, subtree: true });
  });
