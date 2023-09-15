// export function isBase64Image(imageData: string) {
//   const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
//   return base64Regex.test(imageData);
// }

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
