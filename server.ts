import express, {Request, Response} from 'express';
import cors from 'cors';
import path from 'path';
import {fileURLToPath} from 'url';
import {authenticate, login} from "./server/login-helper.js";
import {
    DBHelper,
    getDefaultWeekBookings,
    getRecPassword, getRecEmail,
    setDefaultWeekBookings,
    setRecPassword, setRecEmail
} from "./db/db_helper.js";
import {validateDefaultBookings} from "./server/param_validator.js";
import {Weekday} from "./server/definitions.js";

const app = express();
const port = 5000;
await DBHelper.initializeDBConnection();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.redirect('/login');
});

const authenticateRequest = async (req: Request, res: Response): Promise<boolean> => {
    const authValid = await authenticate(req.header('email') || 'N/A', req.header('token') || 'N/A');
    if (!authValid) {
        res.sendStatus(401);
        return false;
    }

    return true;
}

app.post('/login', async (req, res) => {
    try {
        if (req.query?.authcode) {
            const loginResponse = await login(req, req.query.authcode as string);
            res.json(loginResponse);
        } else {
            throw new Error();
        }
    } catch (e) {
        console.log('Failed to authenticate');
        console.error(e);
        res.sendStatus(400);
    }
});

app.post('/default-week-bookings', async (req, res) => {
    if (!(await authenticateRequest(req, res))) {
        return;
    }

    if (!validateDefaultBookings(req, res)) {
        return;
    }

    const defaultWeekBookings = req.body as { items: {day: Weekday, time: string, court: string}[] };
    await setDefaultWeekBookings(req.header('email') as string, defaultWeekBookings.items);
    res.sendStatus(200);
});

app.get('/default-week-bookings', async (req, res) => {
    if (!(await authenticateRequest(req, res))) {
        return;
    }

    const defaultWeekBookings = await getDefaultWeekBookings(req.header('email') as string);
    res.status(200);
    res.json({items: defaultWeekBookings});
});

app.get('/account-settings', async (req, res) => {
    if (!(await authenticateRequest(req, res))) {
        return;
    }

    const password = await getRecPassword(req.header('email') as string);
    const recEmail = await getRecEmail(req.header('email') as string);

    res.status(200);
    res.json({ password, recEmail });
});

app.post('/account-settings', async (req, res) => {
    if (!(await authenticateRequest(req, res))) {
        return;
    }

    const body = req.body as { password: string, recEmail: string };

    if (!body.password || !body.recEmail) {
        res.sendStatus(400);
    }
    await setRecPassword(req.header('email') as string, body.password);
    await setRecEmail(req.header('email') as string, body.recEmail);
    res.sendStatus(200);
});

const root = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(root));

app.get('*', (req, res) => {
    res.sendFile('index.html', { root });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

