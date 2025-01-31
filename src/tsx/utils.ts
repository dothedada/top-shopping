export const debounce = <T>(callback: (params: T) => void, time: number) => {
  let timer: number;

  return function () {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(callback, time);
  };
};
