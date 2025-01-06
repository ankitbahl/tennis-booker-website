import React from 'react';
import { defaultWeekBooking } from "../../server/definitions";
import { courts } from "../helpers/definitions";
import Select from "react-select";

const DefaultWeekBooking =
    ({booking, updateDefaultWeekBooking}:
         {
             booking: defaultWeekBooking,
             updateDefaultWeekBooking: (day: string, time: string, court: string) => void
         }) => {

    const dayOptions = [
        { value: 'monday', label: 'Monday' },
        { value: 'tuesday', label: 'Tuesday' },
        { value: 'wednesday', label: 'Wednesday' },
        { value: 'thursday', label: 'Thursday' },
        { value: 'friday', label: 'Friday' },
        { value: 'saturday', label: 'Saturday' },
        { value: 'sunday', label: 'Sunday' },
    ];

    const timeOptions = [
        { value: '7:00 AM', label: '7:00 AM'},
        { value: '7:30 AM', label: '7:30 AM'},
        { value: '8:00 AM', label: '8:00 AM'},
        { value: '8:30 AM', label: '8:30 AM'},
        { value: '9:00 AM', label: '9:00 AM'},
        { value: '9:30 AM', label: '9:30 AM'},
        { value: '10:00 AM', label: '10:00 AM'},
        { value: '10:30 AM', label: '10:30 AM'},
        { value: '11:00 AM', label: '11:00 AM'},
        { value: '11:30 AM', label: '11:30 AM'},
        { value: '12:00 PM', label: '12:00 PM'},
        { value: '12:30 PM', label: '12:30 PM'},
        { value: '1:00 PM', label: '1:00 PM'},
        { value: '1:30 PM', label: '1:30 PM'},
        { value: '2:00 PM', label: '2:00 PM'},
        { value: '2:30 PM', label: '2:30 PM'},
        { value: '3:00 PM', label: '3:00 PM'},
        { value: '3:30 PM', label: '3:30 PM'},
        { value: '4:00 PM', label: '4:00 PM'},
        { value: '4:30 PM', label: '4:30 PM'},
        { value: '5:00 PM', label: '5:00 PM'},
        { value: '5:30 PM', label: '5:30 PM'},
        { value: '6:00 PM', label: '6:00 PM'},
        { value: '6:30 PM', label: '6:30 PM'},
        { value: '7:00 PM', label: '7:00 PM'},
        { value: '7:30 PM', label: '7:30 PM'},
        { value: '8:00 PM', label: '8:00 PM'},
        { value: '8:30 PM', label: '8:30 PM'},
        { value: '9:00 PM', label: '9:00 PM'}
    ];

    const courtOptions = courts.map(court => ({value: court, label: court}));

    const updateDay = (day: string | undefined) => {
        if (day) {
            updateDefaultWeekBooking(day, booking.time, booking.court);
        }
    }

    const updateTime = (time: string | undefined) => {
        if (time) {
            updateDefaultWeekBooking(booking.day, time, booking.court);
        }
    }

    const updateCourt = (court: string | undefined) => {
        if (court) {
            updateDefaultWeekBooking(booking.day, booking.time, court);
        }
    }

    return <div className="flex-col">
        <Select
            value={dayOptions.find(option => option.value === booking.day)}
            onChange={(option) => updateDay(option?.value)}
            options={dayOptions}
        />
        <Select
            value={timeOptions.find(option => option.value === booking.time)}
            onChange={(option) => updateTime(option?.value)}
            options={timeOptions}
        />
        <Select
            value={courtOptions.find(option => option.value === booking.court)}
            onChange={(option) => updateCourt(option?.value)}
            options={courtOptions}
        />
    </div>

}

export default DefaultWeekBooking;