export const isEmpty = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

function harmonicMean(arr, len) {
  let sum = 0;
  for (let i = 0; i < len; i++) sum = sum + 1 / arr[i];

  return len / sum;
}

export function indexOfMax(arr) {
  if (arr.length === 0) {
    return -1;
  }
  let max = harmonicMean([arr[0][0], arr[1][0], arr[2][0]]);
  let maxIndex = 0;
  for (let i = 1; i < arr.length; i++) {
    let hm = harmonicMean([arr[0][i], arr[1][i], arr[2][i]]);
    if (hm > max) {
      maxIndex = i;
      max = hm;
    }
  }
  return maxIndex;
}
