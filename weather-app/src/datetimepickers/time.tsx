import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function Time() {
    return (
        <div className="time-picker">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker label="Basic time picker" />
            </LocalizationProvider>
        </div>
    );
}

export default Time;