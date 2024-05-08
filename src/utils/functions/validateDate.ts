export const validateDate = (value: string) => {
  const parts = value.split("/");
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[0], 10);
  const year = parseInt(parts[2], 10);

  // Create a new Date object and check if it's a valid date
  const date = new Date(year, month - 1, day);
  return !isNaN(date.getTime());
};
