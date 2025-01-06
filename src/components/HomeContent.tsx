import React from 'react';
import {defaultWeekBooking} from "../../server/definitions";
import DefaultWeekBooking from "./DefaultWeekBooking";
type props = {
    defaultWeekBookings: defaultWeekBooking[];
    updateDefaultWeekBookings: (courts: {day: string, time: string, court: string}[]) => void;
    saveChanges: () => Promise<boolean>;
    saveDisabled: boolean;
}
const HomeContent = (
    {defaultWeekBookings, updateDefaultWeekBookings, saveChanges, saveDisabled}: props
) => {

    const updateDefaultWeekBooking = (day: string, time: string, court: string, index: number) => {
        if (defaultWeekBookings.find((booking, i) => booking.day === day && index !== i)) {
            alert('Cannot set to existing day');
            return;
        }
        updateDefaultWeekBookings(Object.assign([...defaultWeekBookings], {[index]: {day, time, court}}));
    }
    return <div>
        <h2>Default Week Bookings</h2>
        <div className="flex">
            {defaultWeekBookings.map((booking, i) =>
                <DefaultWeekBooking booking={booking} key={`${booking.day};${booking.court}`} updateDefaultWeekBooking={(day, time, court) => updateDefaultWeekBooking(day, time, court, i)}/>)
            }
        </div>
        <button
            disabled={saveDisabled}
            onClick={saveChanges}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${saveDisabled ? 'opacity-50' : ''}`}
        >
            Save
        </button>
    </div>
}

export default HomeContent;