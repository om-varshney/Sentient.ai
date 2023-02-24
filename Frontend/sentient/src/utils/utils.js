export const isEmpty = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export function indexOfMax(arr) {
  if (arr.length === 0) {
    return -1;
  }
  let max = [arr[0][0], arr[1][0], arr[2][0]].reduce((a, b) => a + b, 0) / 3;
  let maxIndex = 0;
  for (let i = 1; i < arr[0].length; i++) {
    let avg = [arr[0][i], arr[1][i], arr[2][i]].reduce((a, b) => a + b, 0) / 3;
    if (avg > max) {
      maxIndex = i;
      max = avg;
    }
  }
  return maxIndex;
}
