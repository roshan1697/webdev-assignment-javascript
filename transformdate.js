
function getDayOfWeek(date) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = new Date(date).getDay();
  return daysOfWeek[day];
}

function getMissingDayValue(previousValue, nextValue) {
  if (previousValue && nextValue) {
    return Math.round((previousValue + nextValue) / 2);
  }
  return previousValue || nextValue || 0;
}

function transformDictionary(D) {
  const output = {};
  for (const key in D) {
    const date = new Date(key);
    const dayOfWeek = getDayOfWeek(date);
    const value = D[key];
    output[dayOfWeek] = (output[dayOfWeek] || 0) + value;
    const previousDate = new Date(date.setDate(date.getDate() - 1)).toISOString().split('T')[0];
    const nextDate = new Date(date.setDate(date.getDate() + 2)).toISOString().split('T')[0];
    const previousValue = D[previousDate];
    const nextValue = D[nextDate];
    const missingDayOfWeek = getDayOfWeek(previousDate);
    const missingDayValue = getMissingDayValue(previousValue, nextValue);
    if (previousValue === undefined || nextValue === undefined) {
      output[missingDayOfWeek] = (output[missingDayOfWeek] || 0) + missingDayValue;
    }
  }
  return output;
}
const D = {
  '2020-01-01':4, '2020-01-02': 4, '2020-01-03': 6, '2020-01-04': 8, '2020-01-05':2,
'2020-01-06': -6, '2020-01-07': 2, '2020-01-08': -2
};

const output = transformDictionary(D);
console.log(output);


//output
//Wed : 2 Tue : 8 Thu : 4 Fri : 6 Sat : 8 Sun : 2 Mon : -6
