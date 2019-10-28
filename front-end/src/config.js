export function convertDate(value) {
  const date = new Date(value);
  var month = [];
  month[0] = 'January';
  month[1] = 'February';
  month[2] = 'March';
  month[3] = 'April';
  month[4] = 'May';
  month[5] = 'June';
  month[6] = 'July';
  month[7] = 'August';
  month[8] = 'September';
  month[9] = 'October';
  month[10] = 'November';
  month[11] = 'December';
  var mount = month[date.getMonth()];
  var day = date.getDate();
  var year = date.getFullYear();
  var second = date.getSeconds();
  var minutes = date.getMinutes();
  var hours = date.getHours();
  return `${day} ${mount} ${year}, ${hours}:${minutes}:${second}`;
}
