import React, { Dispatch, SetStateAction }  from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimeProps } from './service';
import dayjs from 'dayjs';

interface TimeProps extends DateTimeProps {
    setTime: Dispatch<SetStateAction<string | null>>;
}

function Time(props: TimeProps) {
    const {value, setTime} = props

    return (
        <div className="time-picker">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker label="Basic time picker" value={value} onChange={(val) => setTime(dayjs(val).format('HH:mm:ss'))} />
            </LocalizationProvider>
        </div>
    );
}

export default Time;