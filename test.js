function DateToUTCDate(date) {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  );
}

console.log(DateToUTCDate(new Date("2024-05-25T04:15:00.000+00:00")));
