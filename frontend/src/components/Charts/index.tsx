import React, { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';
import { format, parseISO, sub } from 'date-fns';
import { Container } from './styles';

import api from '../../services/api';

interface MonthDTO {
  id: string;
  provider_id: string;
  date: string;
  monthFormatted: string;
  yearFormatted: string;
}

interface ActualYear {
  actualJanuary?: number;
  actualFebruary?: number;
  actualMarch?: number;
  actualApril?: number;
  actualMay?: number;
  actualJune?: number;
  actualJuly?: number;
  actualAugust?: number;
  actualSeptember?: number;
  actualOctober?: number;
  actualNovember?: number;
  actualDecember?: number;
}

interface LastYear {
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

const Charts: React.FC = () => {
  const [actualValueMonths, setActualValueMonths] = useState<ActualYear>({
    actualJanuary: 0,
    actualFebruary: 0,
    actualMarch: 0,
    actualApril: 0,
    actualMay: 0,
    actualJune: 0,
    actualJuly: 0,
    actualAugust: 0,
    actualSeptember: 0,
    actualOctober: 0,
    actualNovember: 0,
    actualDecember: 0,
  });

  const [lastValueMonths, setLastValueMonths] = useState<LastYear>({
    lastJanuary: 0,
    lastFebruary: 0,
    lastMarch: 0,
    lastApril: 0,
    lastMay: 0,
    lastJune: 0,
    lastJuly: 0,
    lastAugust: 0,
    lastSeptember: 0,
    lastOctober: 0,
    lastNovember: 0,
    lastDecember: 0,
  });

  useEffect(() => {
    async function actualYearEdit(): Promise<any> {
      const { data } = await api.get<MonthDTO[]>('appointments/info');

      const formatted = data.map((edit) => {
        return {
          ...edit,
          yearFormatted: format(parseISO(edit.date), 'yyyy'),
          monthFormatted: format(parseISO(edit.date), 'MMMM'),
        };
      });

      const dateNow = format(new Date(Date.now()), 'yyyy');

      const dataMonths = {
        monthJanuary: formatted.filter(
          (item) =>
            item.monthFormatted === 'January' && item.yearFormatted === dateNow,
        ).length,

        monthFebruary: formatted.filter(
          (item) =>
            item.monthFormatted === 'February' &&
            item.yearFormatted === dateNow,
        ).length,

        monthMarch: formatted.filter(
          (item) =>
            item.monthFormatted === 'March' && item.yearFormatted === dateNow,
        ).length,

        monthApril: formatted.filter(
          (item) =>
            item.monthFormatted === 'April' && item.yearFormatted === dateNow,
        ).length,

        monthMay: formatted.filter(
          (item) =>
            item.monthFormatted === 'May' && item.yearFormatted === dateNow,
        ).length,

        monthJune: formatted.filter(
          (item) =>
            item.monthFormatted === 'June' && item.yearFormatted === dateNow,
        ).length,

        monthJuly: formatted.filter(
          (item) =>
            item.monthFormatted === 'July' && item.yearFormatted === dateNow,
        ).length,

        monthAugust: formatted.filter(
          (item) =>
            item.monthFormatted === 'August' && item.yearFormatted === dateNow,
        ).length,

        monthSeptember: formatted.filter(
          (item) =>
            item.monthFormatted === 'September' &&
            item.yearFormatted === dateNow,
        ).length,

        monthOctober: formatted.filter(
          (item) =>
            item.monthFormatted === 'October' && item.yearFormatted === dateNow,
        ).length,

        monthNovember: formatted.filter(
          (item) =>
            item.monthFormatted === 'November' &&
            item.yearFormatted === dateNow,
        ).length,

        monthDecember: formatted.filter(
          (item) =>
            item.monthFormatted === 'December' &&
            item.yearFormatted === dateNow,
        ).length,
      };

      setActualValueMonths({
        actualJanuary: dataMonths.monthJanuary,
        actualFebruary: dataMonths.monthFebruary,
        actualMarch: dataMonths.monthMarch,
        actualApril: dataMonths.monthApril,
        actualMay: dataMonths.monthMay,
        actualJune: dataMonths.monthJune,
        actualJuly: dataMonths.monthJuly,
        actualAugust: dataMonths.monthAugust,
        actualSeptember: dataMonths.monthSeptember,
        actualOctober: dataMonths.monthOctober,
        actualNovember: dataMonths.monthNovember,
        actualDecember: dataMonths.monthDecember,
      });
    }

    actualYearEdit();
  }, []);

  useEffect(() => {
    async function lastYearEdit(): Promise<any> {
      const { data } = await api.get<MonthDTO[]>('appointments/info');

      const formatted = data.map((edit) => {
        return {
          ...edit,
          yearFormatted: format(parseISO(edit.date), 'yyyy'),
          monthFormatted: format(parseISO(edit.date), 'MMMM'),
        };
      });

      const dateNow = format(
        sub(new Date(Date.now()), {
          years: 1,
        }),
        'yyyy',
      );

      const dataMonths = {
        monthJanuary: formatted.filter(
          (item) =>
            item.monthFormatted === 'January' && item.yearFormatted === dateNow,
        ).length,

        monthFebruary: formatted.filter(
          (item) =>
            item.monthFormatted === 'February' &&
            item.yearFormatted === dateNow,
        ).length,

        monthMarch: formatted.filter(
          (item) =>
            item.monthFormatted === 'March' && item.yearFormatted === dateNow,
        ).length,

        monthApril: formatted.filter(
          (item) =>
            item.monthFormatted === 'April' && item.yearFormatted === dateNow,
        ).length,

        monthMay: formatted.filter(
          (item) =>
            item.monthFormatted === 'May' && item.yearFormatted === dateNow,
        ).length,

        monthJune: formatted.filter(
          (item) =>
            item.monthFormatted === 'June' && item.yearFormatted === dateNow,
        ).length,

        monthJuly: formatted.filter(
          (item) =>
            item.monthFormatted === 'July' && item.yearFormatted === dateNow,
        ).length,

        monthAugust: formatted.filter(
          (item) =>
            item.monthFormatted === 'August' && item.yearFormatted === dateNow,
        ).length,

        monthSeptember: formatted.filter(
          (item) =>
            item.monthFormatted === 'September' &&
            item.yearFormatted === dateNow,
        ).length,

        monthOctober: formatted.filter(
          (item) =>
            item.monthFormatted === 'October' && item.yearFormatted === dateNow,
        ).length,

        monthNovember: formatted.filter(
          (item) =>
            item.monthFormatted === 'November' &&
            item.yearFormatted === dateNow,
        ).length,

        monthDecember: formatted.filter(
          (item) =>
            item.monthFormatted === 'December' &&
            item.yearFormatted === dateNow,
        ).length,
      };

      setLastValueMonths({
        lastJanuary: dataMonths.monthJanuary,
        lastFebruary: dataMonths.monthFebruary,
        lastMarch: dataMonths.monthMarch,
        lastApril: dataMonths.monthApril,
        lastMay: dataMonths.monthMay,
        lastJune: dataMonths.monthJune,
        lastJuly: dataMonths.monthJuly,
        lastAugust: dataMonths.monthAugust,
        lastSeptember: dataMonths.monthSeptember,
        lastOctober: dataMonths.monthOctober,
        lastNovember: dataMonths.monthNovember,
        lastDecember: dataMonths.monthDecember,
      });
    }

    lastYearEdit();
  }, []);

  const {
    actualJanuary,
    actualJuly,
    actualApril,
    actualAugust,
    actualDecember,
    actualFebruary,
    actualJune,
    actualMarch,
    actualMay,
    actualNovember,
    actualOctober,
    actualSeptember,
  } = actualValueMonths;

  const {
    lastJanuary,
    lastJuly,
    lastApril,
    lastAugust,
    lastDecember,
    lastFebruary,
    lastJune,
    lastMarch,
    lastMay,
    lastNovember,
    lastOctober,
    lastSeptember,
  } = lastValueMonths;

  return (
    <Container>
      <Line
        width={980}
        height={540}
        options={{
          legend: {
            display: true,
            labels: {
              fontFamily: 'Roboto-Slab',
              fontSize: 20,
              fontColor: '#999591',
            },
          },
        }}
        data={{
          labels: [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
          ],
          datasets: [
            {
              label: 'Clientes atentidos - Ano atual',
              fill: false,
              type: 'line',
              lineTension: 0.1,
              backgroundColor: '#ff9000',
              borderColor: '#ff9000',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: '#999591',
              pointBackgroundColor: '#999591',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: '#ff9000',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [
                actualJanuary,
                actualFebruary,
                actualMarch,
                actualApril,
                actualMay,
                actualJune,
                actualJuly,
                actualAugust,
                actualSeptember,
                actualOctober,
                actualNovember,
                actualDecember,
              ],
            },
            {
              label: 'Clientes atentidos - Ano anterior',
              fill: false,
              type: 'bar',
              lineTension: 0.1,
              backgroundColor: '#663399',
              borderColor: '#663399',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: '#8B0000',
              pointBackgroundColor: '#8B0000',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: '#663399',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [
                lastJanuary,
                lastFebruary,
                lastMarch,
                lastApril,
                lastMay,
                lastJune,
                lastJuly,
                lastAugust,
                lastSeptember,
                lastOctober,
                lastNovember,
                lastDecember,
              ],
            },
          ],
        }}
      />
    </Container>
  );
};

export default Charts;
