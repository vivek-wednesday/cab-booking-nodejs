import { resetAndMockDB } from 'utils/testUtils';
import { mockData } from 'utils/mockData';

const { MOCK_DRIVERS: drivers } = mockData;

describe('/drivers route tests ', () => {
    let server;
    beforeEach(async () => {
        server = await resetAndMockDB(async allDbs => {
            allDbs.drivers.$queryInterface.$useHandler(function (query) {
                if (query === 'findById') {
                    return drivers;
                }
            });
        });
    });
    it('should return 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/drivers/1'
        });
        expect(res.statusCode).toEqual(200);
    });

    it('should return 404', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/drivers/2'
        });
        expect(res.statusCode).toEqual(404);
        expect(res.result.message).toEqual('No driver was found for id 2');
    });

    it('should return all the drivers ', async () => {
        server = await resetAndMockDB(async allDbs => {
            allDbs.drivers.$queryInterface.$useHandler(function (query) {
                if (query === 'findById') {
                    return drivers;
                }
            });
        });
        const res = await server.inject({
            method: 'GET',
            url: '/drivers'
        });

        expect(res.statusCode).toEqual(200);
        const driverOne = res.result.results[0];
        expect(driverOne.id).toEqual(drivers.driverId);
        expect(driverOne.first_name).toEqual(drivers.firstName);
        expect(driverOne.last_name).toEqual(drivers.lastName);
        expect(driverOne.current_location).toEqual(drivers.currentLocation);
        expect(res.result.total_count).toEqual(1);
    });

    it('should return notFound if no drivers are found', async () => {
        server = await resetAndMockDB(async allDbs => {
            allDbs.drivers.$queryInterface.$useHandler(function (query) {
                if (query === 'findById') {
                    return null;
                }
            });
            allDbs.drivers.findAll = () => null;
        });
        const res = await server.inject({
            method: 'GET',
            url: '/drivers'
        });
        expect(res.statusCode).toEqual(404);
    });

    it('should return badImplementation if findAlldrivers fails', async () => {
        server = await resetAndMockDB(async allDbs => {
            allDbs.drivers.$queryInterface.$useHandler(function (query) {
                if (query === 'findById') {
                    return null;
                }
            });
            allDbs.drivers.findAll = () =>
                new Promise((resolve, reject) => {
                    reject(new Error());
                });
        });
        const res = await server.inject({
            method: 'GET',
            url: '/drivers'
        });
        expect(res.statusCode).toEqual(500);
    });
});
