export const buildUTCDate = utcDate => {
  const utcDay = new Date(utcDate).getUTCDate();
  const utcMonth = new Date(utcDate).getUTCMonth() + 1;
  const utcYear = new Date(utcDate).getUTCFullYear();
  const utcMinutes = new Date(utcDate).getUTCMinutes();
  const utcHour = new Date(utcDate).getUTCHours();

  return `${utcDay}/${utcMonth}/${utcYear} ${utcHour}:${utcMinutes}`;
};
