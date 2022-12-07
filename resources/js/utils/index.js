import axios from 'axios';
import {Message} from './message';

export const SERVER_ENDPOINT =  process.env.MIX_APP_URL;
export const OPEN_WEATHER_API =  process.env.MIX_OPEN_WEATHER_API;
export const OPEN_WEATHER_APP_ID =  process.env.MIX_OPEN_WEATHER_APP_ID;

export const REQUEST_HANDLER = async (endpoint, method, body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const CONFIG = {
                method: method,
                url: endpoint,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            if (body) {
                CONFIG.data = body;
            }

            CONFIG.headers = {
                'Content-Type': 'application/json'
            };

            return axios(CONFIG)
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    if (err.response && err.response.data) {
                        reject(err.response.data);
                        if (err.response.data.message) {
                            Message('danger', err.response.data.message);
                        }
                    } else {
                        Message('danger', 'Something went wrong!');
                    }
                });
        } catch (err) {
            let error = '';
            reject();
            if (err.response && err.response.data) {
                error = err.response.data.message;
            } else {
                error = 'Something went wrong!';
            }
            Message('danger', error);
        }
    });
};
