import { format, sub } from 'date-fns';

type Params = Array<{
  monthFormatted: string;
  yearFormatted: string;
}>;

interface Months {
  January?: number;
  February?: number;
  March?: number;
  April?: number;
  May?: number;
  June?: number;
  July?: number;
  August?: number;
  September?: number;
  October?: number;
  November?: number;
  December?: number;
}
interface LastMonths {
  lastJanuary?: number;
  lastFebruary?: number;
  lastMarch?: number;
  lastApril?: number;
  lastMay?: number;
  lastJune?: number;
  lastJuly?: number;
  lastAugust?: number;
  lastSeptember?: number;
  lastOctober?: number;
  lastNovember?: number;
  lastDecember?: number;
}

const ActualMonthsValues = (data: Params): Months | undefined => {
  const dateNow = format(new Date(Date.now()), 'yyyy');

  const actualMonths = {
    January: data.filter(
      (item) =>
        item.monthFormatted === 'January' && item.yearFormatted === dateNow,
    ).length,
    February: data.filter(
      (item) =>
        item.monthFormatted === 'February' && item.yearFormatted === dateNow,
    ).length,
    March: data.filter(
      (item) =>
        item.monthFormatted === 'March' && item.yearFormatted === dateNow,
    ).length,
    April: data.filter(
      (item) =>
        item.monthFormatted === 'April' && item.yearFormatted === dateNow,
    ).length,
    May: data.filter(
      (item) => item.monthFormatted === 'May' && item.yearFormatted === dateNow,
    ).length,
    June: data.filter(
      (item) =>
        item.monthFormatted === 'June' && item.yearFormatted === dateNow,
    ).length,
    July: data.filter(
      (item) =>
        item.monthFormatted === 'July' && item.yearFormatted === dateNow,
    ).length,
    August: data.filter(
      (item) =>
        item.monthFormatted === 'August' && item.yearFormatted === dateNow,
    ).length,
    September: data.filter(
      (item) =>
        item.monthFormatted === 'September' && item.yearFormatted === dateNow,
    ).length,
    October: data.filter(
      (item) =>
        item.monthFormatted === 'October' && item.yearFormatted === dateNow,
    ).length,
    November: data.filter(
      (item) =>
        item.monthFormatted === 'November' && item.yearFormatted === dateNow,
    ).length,
    December: data.filter(
      (item) =>
        item.monthFormatted === 'December' && item.yearFormatted === dateNow,
    ).length,
  };
  return actualMonths;
};

const LastMonthsValues = (data: Params): Months | undefined => {
  const dateNow = format(
    sub(new Date(Date.now()), {
      years: 1,
    }),
    'yyyy',
  );

  const lastMonths = {
    January: data.filter(
      (item) =>
        item.monthFormatted === 'January' && item.yearFormatted === dateNow,
    ).length,
    February: data.filter(
      (item) =>
        item.monthFormatted === 'February' && item.yearFormatted === dateNow,
    ).length,
    March: data.filter(
      (item) =>
        item.monthFormatted === 'March' && item.yearFormatted === dateNow,
    ).length,
    April: data.filter(
      (item) =>
        item.monthFormatted === 'April' && item.yearFormatted === dateNow,
    ).length,
    May: data.filter(
      (item) => item.monthFormatted === 'May' && item.yearFormatted === dateNow,
    ).length,
    June: data.filter(
      (item) =>
        item.monthFormatted === 'June' && item.yearFormatted === dateNow,
    ).length,
    July: data.filter(
      (item) =>
        item.monthFormatted === 'July' && item.yearFormatted === dateNow,
    ).length,
    August: data.filter(
      (item) =>
        item.monthFormatted === 'August' && item.yearFormatted === dateNow,
    ).length,
    September: data.filter(
      (item) =>
        item.monthFormatted === 'September' && item.yearFormatted === dateNow,
    ).length,
    October: data.filter(
      (item) =>
        item.monthFormatted === 'October' && item.yearFormatted === dateNow,
    ).length,
    November: data.filter(
      (item) =>
        item.monthFormatted === 'November' && item.yearFormatted === dateNow,
    ).length,
    December: data.filter(
      (item) =>
        item.monthFormatted === 'December' && item.yearFormatted === dateNow,
    ).length,
  };

  return lastMonths;
};

export { ActualMonthsValues, LastMonthsValues };
