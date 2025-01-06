import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {getUser} from "../helpers/storageHelper";
import useBookings from "../hooks/useBookings";
import {AxiosHelper} from "../helpers/axiosHelper";
import Banner from "../components/Banner";
import HomeContent from "../components/HomeContent";
import _ from 'lodash';

const Home = () => {
  const [user, setUser] = useState({ token: '', email: '' });
  const { storedDefaultWeekBookings, getDefaultWeekBookings, defaultWeekBookings, setDefaultWeekBookings } = useBookings();
  const navigate = useNavigate();
  useEffect(() => {
    getAndSetUserFromStorage();
  }, []);

  useEffect(() => {
    if (user.token.length > 0 && user.email.length > 0) {
      getDefaultWeekBookings();
    }
  }, [user]);

  const getAndSetUserFromStorage = () => {
    const storageUser = getUser();
    if (!storageUser) {
      navigate('/login');
    } else {
      setUser(storageUser);
    }
  }

  const saveDefaultWeekBookings = async (): Promise<boolean> => {
     await AxiosHelper.postWithAxios('/default-week-bookings', defaultWeekBookings);
     return true;
  }

  return <div>
    <Banner email={user.email}/>

    {defaultWeekBookings.items.length > 0 ?
        <HomeContent defaultWeekBookings={defaultWeekBookings.items}
                     updateDefaultWeekBookings={(courts) => {
                       setDefaultWeekBookings({items: courts})
                     }}
                     saveDisabled={_.isEqual(defaultWeekBookings, storedDefaultWeekBookings)}
                     saveChanges={saveDefaultWeekBookings}
        />
        : null}
  </div>
}

export default Home;