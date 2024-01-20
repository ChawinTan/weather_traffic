import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function Date() {
    return (
        <div className="date-picker">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Basic date picker" />
            </LocalizationProvider>
        </div>
    );
}

export default Date;