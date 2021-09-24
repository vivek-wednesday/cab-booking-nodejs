/* global server */
import { init } from './lib/testServer';
import { mockDB } from 'utils/testUtils';
import {
    ONE_BOOKING_DATA,
    ONE_CAB_DATA,
    ONE_DRIVER_DATA,
    ONE_USER_DATA
} from 'utils/constants';

require('jest-extended');

mockDB();

beforeEach(async () => {
    global.server = await init();
    jest.resetModules();
});

beforeAll(() => {
    jest.doMock('root/server', () => ({
        server: {
            ...server,
            methods: {
                findOneUser: id => {
                    if (id === '1') {
                        return new Promise(resolve => resolve(ONE_USER_DATA));
                    } else {
                        return new Promise(resolve => resolve(null));
                    }
                },
                findOneBooking: id => {
                    if (id === '1') {
                        return new Promise(resolve =>
                            resolve(ONE_BOOKING_DATA)
                        );
                    } else {
                        return new Promise(resolve => resolve(null));
                    }
                },
                findOneDriver: id => {
                    if (id === '1') {
                        return new Promise(resolve => resolve(ONE_DRIVER_DATA));
                    } else {
                        return new Promise(resolve => resolve(null));
                    }
                },
                findOneCab: id => {
                    if (id === '1') {
                        return new Promise(resolve => resolve(ONE_CAB_DATA));
                    } else {
                        return new Promise(resolve => resolve(null));
                    }
                }
            }
        }
    }));
});

afterAll(async () => {
    await server.stop();
});
