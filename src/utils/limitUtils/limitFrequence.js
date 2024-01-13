export const limitFrequence = (fn, num = 1) => {
    let result;
    let time = 0;
    return function() {
      if (time < num) {
        time++;
        result = fn.apply(this, arguments);
      } else {
        console.log("超出次数");
      }
      return result;
    };
  };
  