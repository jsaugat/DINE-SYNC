export const ISOToReadableDate = (ISODate, type) => {
  const date = new Date(ISODate);

  // Options for formatting the date and time
  const optionsDate = { year: "numeric", month: "long", day: "numeric" };
  const optionsTime = { hour: "numeric", minute: "numeric", hour12: true };

  // Extract readable date and time
  if (type === "date") {
    return date.toLocaleDateString("en-US", optionsDate);
  } else if (type === "time") {
    // Convert "10:00 AM" to "10 AM"
    const timeString = date.toLocaleTimeString("en-US", optionsTime);
    return timeString.replace(/:\d+\s/, " "); // Replace minutes and AM/PM with space
  }
};
