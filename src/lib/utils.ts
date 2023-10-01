"use client";

export function calculateTotalComment(arr: any[]) {
  let totalLength = arr.length;

  arr.forEach((item) => {
    for (const key in item) {
      if (Array.isArray(item[key])) {
        totalLength += calculateTotalComment(item[key]);
      }
    }
  });
  return totalLength;
}

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);

  return formattedDate;
}
