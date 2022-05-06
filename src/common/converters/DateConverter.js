const convertStringDateHourToDate = (stringDateHour) => {
    const dateHour = stringDateHour.split("-")

    const arrDate = dateHour[0].split("/")
    const arrHour = dateHour[1].split(":")

    return new Date(arrDate[2], arrDate[1] - 1, arrDate[0], arrHour[0], arrHour[1])

}

const convertStringDateToDate = date => {
    let parts = date.split('/');

    return new Date(parts[2], parts[1] - 1, parts[0]);

};

const convertDateToUTCDate = date => {
    const utcDay = new Date(date).getUTCDate();
    const utcMonth = new Date(date).getUTCMonth() + 1;
    const utcYear = new Date(date).getUTCFullYear();
    const utcMinutes = new Date(date).getUTCMinutes();
    const utcHour = new Date(date).getUTCHours();

    return `${utcDay}/${utcMonth}/${utcYear} ${utcHour}:${utcMinutes}`;
};

const buildDateTime = (date, time) => {
    const newDate = moment(date).format('yyyy-MM-DD');
    const newTime = moment(time).format('HH:mm:s');
  
    const newDateTime = `${newDate}T${newTime}-03:00`;
  
    return new Date(newDateTime);
  };


export { convertStringDateHourToDate, convertStringDateToDate, convertDateToUTCDate, buildDateTime }
