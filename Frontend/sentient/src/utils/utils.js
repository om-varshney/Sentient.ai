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
  arr = arr.filter(Boolean);
  let max = 0;
  let maxIndex = 0;
  for (let i = 0; i < arr.length; i++) {
    max += arr[i][0];
  }
  max /= arr.length;
  for (let i = 1; i < arr[0].length; i++) {
    let avg = 0;
    for (let j = 0; j < arr.length; j++) {
      avg += arr[j][i];
    }
    avg /= arr.length;
    if (avg > max) {
      maxIndex = i;
      max = avg;
    }
  }
  return maxIndex;
}
