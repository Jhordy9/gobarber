import { format, parseISO } from 'date-fns';
import api from '../services/api';

interface MonthDTO {
  id: string;
  provider_id: string;
  date: string;
  monthFormatted: string;
}

interface Months {
  value: number;
}

export default async function countAppointmentsInMounth(
  month: string,
): Promise<Months> {
  const { data } = await api.get<MonthDTO[]>('appointments/info');

  const formatted = data.map((edit) => {
    return {
      ...edit,
      monthFormatted: format(parseISO(edit.date), 'MMMM'),
    };
  });

  const valueMonths = {
    value: formatted.filter((item) => item.monthFormatted === month).length,
  };

  return valueMonths;
}
