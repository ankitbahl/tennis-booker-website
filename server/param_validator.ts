import {Request, Response} from 'express';
import {courts, timeRegex, Weekday, weekdays} from "./definitions.js";

/**
 *
 * @param req
 * {
 *     body: {
 *         items: [
 *             {
 *                 day: weekday,
 *                 time: string,
 *                 court: string
 *             }
 *         ]
 *     }
 * }
 * @param res
 */
export const validateDefaultBookings =  (req: Request, res: Response): boolean => {
    const body = req.body as { items: {day: Weekday, time: string, court: string}[] };
    if (!Array.isArray(body.items)) {
        return false;
    }

    const items = body.items;

    if (items.length > 3) {
        res.status(400);
        return false;
    }
    for(const item of items) {
        if (!weekdays.includes(item.day)) {
            res.status(400);
            return false;
        }

        if (!timeRegex.test(item.time)) {
            res.status(400);
            return false;
        }

        if (courts.includes(item.court)) {
            res.status(400);
            return false;
        }
    }

    return true;
}