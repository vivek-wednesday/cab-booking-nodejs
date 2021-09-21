import { users } from 'models';
import { init } from '../lib/testServer';
import { mockData } from './mockData';
import { DEFAULT_METADATA_OPTIONS } from './constants';

export function configDB(metadataOptions = DEFAULT_METADATA_OPTIONS) {
    const SequelizeMock = require('sequelize-mock');
    const DBConnectionMock = new SequelizeMock();

    const userMock = DBConnectionMock.define('users', mockData.MOCK_USER);
    userMock.findByPk = query => userMock.findById(query);
    userMock.count = () => 1;

    const oauthClientsMock = DBConnectionMock.define(
        'oauth_clients',
        mockData.MOCK_OAUTH_CLIENTS(metadataOptions)
    );
    oauthClientsMock.findOne = query => oauthClientsMock.findById(query);

    const oauthAccessTokensMock = DBConnectionMock.define(
        'oauth_access_tokens',
        mockData.MOCK_OAUTH_ACCESS_TOKENS
    );
    oauthAccessTokensMock.create = mutation =>
        new Promise(resolve => resolve({ ...mutation }));

    const oauthClientResourcesMock = DBConnectionMock.define(
        'oauth_client_resources',
        mockData.MOCK_OAUTH_CLIENT_RESOURCES[0]
    );
    oauthClientResourcesMock.findOne = query =>
        oauthClientResourcesMock.findById(query);

    oauthClientResourcesMock.findAll = query =>
        oauthClientResourcesMock.findById(query);

    const oauthClientScopesMock = DBConnectionMock.define(
        'oauth_client_scopes',
        mockData.MOCK_OAUTH_CLIENT_SCOPES
    );

    oauthClientScopesMock.findOne = query =>
        oauthClientScopesMock.findById(query);

    oauthClientScopesMock.findAll = query =>
        oauthClientScopesMock.findById(query);

    const bookingMock = DBConnectionMock.define(
        'bookings',
        mockData.MOCK_BOOKING
    );
    bookingMock.findByPk = query => bookingMock.findById(query);
    bookingMock.count = () => 1;

    const driversMock = DBConnectionMock.define(
        'drivers',
        mockData.MOCK_DRIVERS
    );
    driversMock.findByPk = query => driversMock.findById(query);
    driversMock.count = () => 1;

    const cabsMock = DBConnectionMock.define('cabs', mockData.MOCK_CABS);
    cabsMock.findByPk = query => cabsMock.findById(query);
    cabsMock.count = () => 1;

    return {
        users: userMock,
        oauth_clients: oauthClientsMock,
        oauth_access_tokens: oauthAccessTokensMock,
        oauth_client_resources: oauthClientResourcesMock,
        oauth_client_scopes: oauthClientScopesMock,
        bookings: bookingMock,
        drivers: driversMock,
        cabs: cabsMock
    };
}

export function bustDB() {
    users.sync({ force: true }); // this will clear all the entries in your table.
}

export async function mockDB(
    mockCallback = () => {},
    metadataOptions = DEFAULT_METADATA_OPTIONS
) {
    jest.doMock('models', () => {
        const sequelizeData = configDB(metadataOptions);
        if (mockCallback) {
            mockCallback(sequelizeData);
        }
        return sequelizeData;
    });
}

export const resetAndMockDB = async (
    mockDBCallback = () => {},
    metadataOptions = DEFAULT_METADATA_OPTIONS
) => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.resetModules();
    mockDB(mockDBCallback, metadataOptions);
    const server = await init();
    return server;
};
