import { useState } from "react";
import { AxiosHelper } from "../helpers/axiosHelper";
import { defaultWeekBooking } from "../../server/definitions";

const useBookings = () => {
    const [defaultWeekBookings, setDefaultWeekBookings] = useState<{items: defaultWeekBooking[]}>({items: []});
    const [storedDefaultWeekBookings, setStoredDefaultWeekBookings] = useState<{items: defaultWeekBooking[]}>({items: []});
    const getDefaultWeekBookings = async () => {
        const res = await AxiosHelper.getWithAxios('/default-week-bookings');
        setDefaultWeekBookings(res.data);
        setStoredDefaultWeekBookings(res.data);
    };

    return { storedDefaultWeekBookings,getDefaultWeekBookings, defaultWeekBookings, setDefaultWeekBookings }
};

export default useBookings;