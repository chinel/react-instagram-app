import { format, formatDistance, isThisYear } from "date-fns";

export function formatePostDate(date) {
  // If the post was created this Year format example - March 23
  const formatShort = format(new Date(date), "MMMM d").toUpperCase();
  //If the post was made last year format example February 2, 2019
  const formatLong = format(new Date(date), "MMMM d, yyy").toUpperCase();

  return isThisYear(new Date(date)) ? formatShort : formatLong;
}

export function formatDateToNowShort(date) {
  // 5 days ago -> 5d
  // 7 Weeks ago -> 7w
  console.log(date);
  return formatDistance(new Date(date), new Date(Date.now()))
    .split(" ")
    .map((s, i) => (i === 1 ? s[0] : s))
    .join("");
}
