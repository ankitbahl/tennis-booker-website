import { createClient, RedisClientType } from 'redis';
import { lookup } from 'dns';
import { Weekday } from "../server/definitions";

const isDocker = async () => {
  return new Promise(resolve =>
    lookup('host.docker.internal', (err, res) => {
      if (err) {
        resolve(false);
      } else if (res) {
        resolve(true);
      } else {
        resolve(false);
      }
    })
  )
}

export class DBHelper {
  static redisClient: RedisClientType;
  constructor(redisClient: RedisClientType) {
    DBHelper.redisClient = redisClient;
  }
  static async initializeDBConnection() {
    const options: {socket?: object} = {};
    if (await isDocker()) {
      options.socket = { host: 'host.docker.internal', port: 6378 };
    } else {
      options.socket = { port: 6378 };
    }

    const redisClient: RedisClientType = createClient(options);
    redisClient.on('error', (err) => console.log('Redis Client Error', err));
    await redisClient.connect();
    DBHelper.redisClient = redisClient;
  }
}

export const getDefaultWeekBookings = async (email: string): Promise<{day: string, time: string, court: string}[]> => {
  const defaultWeekBookingsString = await DBHelper.redisClient.get('default_week_bookings');
  if (!defaultWeekBookingsString || !JSON.parse(defaultWeekBookingsString)[email]) {
    const defaultWeekBookings = ['tuesday', 'thursday', 'sunday'].map(day => ({
      day: day as Weekday,
      time: '4:00 PM',
      court: 'Dolores'
    }));
    await setDefaultWeekBookings(email, defaultWeekBookings);
    return defaultWeekBookings;
  } else {
    return JSON.parse(defaultWeekBookingsString)[email];
  }
};

export const storeToken = async (email: string, token: string) => {
  await DBHelper.redisClient.set(email, JSON.stringify({refresh_token: token}));
  const existingUsers: string[] = JSON.parse(await DBHelper.redisClient.get('booking_users') || "[]");
  if (!existingUsers.includes(email)) {
    existingUsers.push(email);
    await DBHelper.redisClient.set('booking_users', JSON.stringify(existingUsers));
  }
}

export const validateToken = async (email: string, token: string): Promise<boolean> => {
  return JSON.parse(await DBHelper.redisClient.get(email) || "{}").refresh_token === token;
}

export const setDefaultWeekBookings = async (email: string, defaultWeekBookings: {day: Weekday, time: string, court: string}[]) => {
  const storedBookings = await DBHelper.redisClient.get('default_week_bookings');
  await DBHelper.redisClient.set('default_week_bookings', JSON.stringify({...JSON.parse(storedBookings || "{}"), [email]: defaultWeekBookings}));
};

export const getRecPassword = async (email: string): Promise<string | null> => {
  return DBHelper.redisClient.get(`${email}_rec_password`);
}

export const setRecPassword = async (email: string, password: string)=> {
  await DBHelper.redisClient.set(`${email}_rec_password`, password);
}
// const validateBookingArgs = (date: string, time: string, court: string): boolean => {
//   const parsedDate = new Date(date);
//   const courts: string[] = [];
//   return !isNaN(parsedDate.getTime()) && time.match(/^(1[0-2]|[1-9]):[03]0 [AP]M$/) !== null && courts.includes(court);
// };

export const setFutureBooking = async (date: string, time: string, court: string): Promise<boolean> => {
  return true;
};