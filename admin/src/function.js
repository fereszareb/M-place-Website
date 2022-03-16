// function that convert isoDate to normal date
export default function convertDate(isoDate) {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var secandes = date.getSeconds();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  if (hour < 10) hour = "0" + hour;
  if (minute < 10) minute = "0" + minute;
  if (secandes < 10) secandes = "0" + secandes;
  return (
    day + "-" + month + "-" + year + " " + hour + ":" + minute + ":" + secandes
  );
}
