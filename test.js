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

// console.log(DateToUTCDate(new Date("2024-05-25T04:15:00.000+00:00")));

const ISOToReadableDate = (ISODate, type) => {
  const date = new Date(ISODate);

  // Adjust the date by subtracting 5 hours and 45 minutes
  date.setHours(date.getHours() - 5);
  date.setMinutes(date.getMinutes() - 45);

  // Options for formatting the time
  const optionsTime = { hour: "numeric", minute: "numeric", hour12: true };

  // Extract and format time
  if (type === "time") {
    // Convert "10:00 AM" to "10 AM"
    const timeString = date.toLocaleTimeString("en-US", optionsTime);
    return timeString;
  }

  // Default behavior for date
  const optionsDate = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", optionsDate);
};

console.log(
  ISOToReadableDate(new Date("2024-05-18T10:00:00.000+00:00"), "time")
);
