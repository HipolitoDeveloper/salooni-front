import moment from 'moment';

export const buildDateTime = (date, time) => {
  const newDate = moment(date).format('yyyy-MM-DD');
  const newTime = moment(time).format('HH:mm:s');

  const newDateTime = `${newDate}T${newTime}-03:00`;

  return new Date(newDateTime);
};
