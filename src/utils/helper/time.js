import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(tz);

const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const checkTimeIsExpired = (timeArg) => {
  const currentTime = Date.now();
  const time = new Date(timeArg).getTime() - +import.meta.env.VITE_TIME_BUFFER;
  return time < currentTime;
};

export const calculateRemainingTime = (timeArg) => {
  const currentTime = Date.now();
  const time = new Date(timeArg).getTime() - +import.meta.env.VITE_TIME_BUFFER;
  const remainingTime = time - currentTime;
  return remainingTime;
};

export const formatLocalTime = (time) => {
  return dayjs(time).tz(localTimeZone).format("DD/MM/YYYY, h:mm A");
};

export const formatLocalDate = (time) => {
  return dayjs(time).tz(localTimeZone).format("MM/DD/YYYY");
};

export const formatDateTimeInput = (time) => {
  const date = new Date(time);
  return (
    date.getFullYear().toString() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2) +
    "T" +
    date.toTimeString().slice(0, 5)
  );
};

export const getEighteenYearsAgo = () => {
  const year = new Date();
  year.setFullYear(year.getFullYear() - 18);
  return year;
};

export const formatCardValidity = (time) => {
  const date = new Date(time);

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${month}/${day}`;
  return formattedDate;
};