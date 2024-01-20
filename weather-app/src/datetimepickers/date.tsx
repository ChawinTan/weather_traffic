import React, { Dispatch, SetStateAction } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimeProps } from './service';
import dayjs from 'dayjs';

interface DateProps extends DateTimeProps {
    setDate: Dispatch<SetStateAction<string | null>>;
}

function Date(props: DateProps) {
    const {value, setDate} = props
    return (
        <div className="date-picker">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Basic date picker" value={value} onChange={(val) => setDate(dayjs(val).format('YYYY-MM-DD'))} />
            </LocalizationProvider>
        </div>
    );
}

export default Date;