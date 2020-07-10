import React, { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';
import { format, parseISO } from 'date-fns';
import { Container } from './styles';

import api from '../../services/api';
import {
  ActualMonthsValues,
  LastMonthsValues,
} from '../../utils/countAppointmentsInMonth';

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
    async function yearEdit(): Promise<any> {
      const { data } = await api.get<MonthDTO[]>('appointments/info');

      const formatted = data.map((edit) => {
        return {
          ...edit,
          yearFormatted: format(parseISO(edit.date), 'yyyy'),
          monthFormatted: format(parseISO(edit.date), 'MMMM'),
        };
      });

      const actualCountMonths = ActualMonthsValues(formatted);
      const lastCountMonths = LastMonthsValues(formatted);

      setActualValueMonths({
        actualJanuary: actualCountMonths?.January,
        actualFebruary: actualCountMonths?.February,
        actualMarch: actualCountMonths?.March,
        actualApril: actualCountMonths?.April,
        actualMay: actualCountMonths?.May,
        actualJune: actualCountMonths?.June,
        actualJuly: actualCountMonths?.July,
        actualAugust: actualCountMonths?.August,
        actualSeptember: actualCountMonths?.September,
        actualOctober: actualCountMonths?.October,
        actualNovember: actualCountMonths?.November,
        actualDecember: actualCountMonths?.December,
      });

      setLastValueMonths({
        lastJanuary: lastCountMonths?.January,
        lastFebruary: lastCountMonths?.February,
        lastMarch: lastCountMonths?.March,
        lastApril: lastCountMonths?.April,
        lastMay: lastCountMonths?.May,
        lastJune: lastCountMonths?.June,
        lastJuly: lastCountMonths?.July,
        lastAugust: lastCountMonths?.August,
        lastSeptember: lastCountMonths?.September,
        lastOctober: lastCountMonths?.October,
        lastNovember: lastCountMonths?.November,
        lastDecember: lastCountMonths?.December,
      });
    }

    yearEdit();
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
          title: {
            display: true,
            text: 'Clientes atendidos',
            fontFamily: 'sans-serif',
            fontSize: 20,
            fontColor: '#999591',
          },
          legend: {
            display: true,
            labels: {
              fontFamily: 'sans-serif',
              fontSize: 18,
              fontColor: '#999591',
            },
          },
          tooltips: {
            titleFontFamily: 'sans-serif',
            titleFontSize: 18,
            titleFontColor: '#999591',
            bodyFontFamily: 'sans-serif',
            bodyFontSize: 16,
            bodyFontColor: '#999591',
            footerFontFamily: 'sans-serif',
            footerFontSize: 16,
            footerFontColor: '#999591',
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
              label: 'Ano atual',
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
              label: 'Ano anterior',
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
