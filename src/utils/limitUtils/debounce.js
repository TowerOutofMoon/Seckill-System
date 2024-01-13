//限流
export const debounce = (fn, delay) => {
    var timer = null;
    return function () {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(fn, delay);
    }
}