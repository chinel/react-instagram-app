import { format, isThisYear } from "date-fns";

export function formatePostDate(date) {
  // If the post was created this Year format example - March 23
  const formatShort = format(new Date(date), "MMMM d");
  //If the post was made last year format example February 2, 2019
  const formatLong = format(new Date(date), "MMMM d, yyy");

  return isThisYear(new Date(date)) ? formatShort : formatLong;
}
