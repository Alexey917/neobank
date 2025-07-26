export const checkDate = (str: string) => {
  const myDate = new Date(str);
  const date = Date.now();

  return date > myDate.getTime();
};
