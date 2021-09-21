import { resetAndMockDB } from 'utils/testUtils';
import { mockData } from 'utils/mockData';

const { MOCK_CABS: cabs } = mockData;

describe('/cabs route tests ', () => {
    let server;
    beforeEach(async () => {
        server = await resetAndMockDB(async allDbs => {
            allDbs.cabs.$queryInterface.$useHandler(function (query) {
                if (query === 'findById') {
                    return cabs;
                }
            });
        });
    });
    it('should return 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/cabs/1'
        });
        expect(res.statusCode).toEqual(200);
    });

    it('should return 404', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/cabs/2'
        });
        expect(res.statusCode).toEqual(404);
        expect(res.result.message).toEqual('No cab was found for id 2');
    });

    it('should return all the cabs ', async () => {
        server = await resetAndMockDB(async allDbs => {
            allDbs.cabs.$queryInterface.$useHandler(function (query) {
                if (query === 'findById') {
                    return cabs;
                }
            });
        });
        const res = await server.inject({
            method: 'GET',
            url: '/cabs'
        });

        expect(res.statusCode).toEqual(200);
        const cabOne = res.result.results[0];
        expect(cabOne.driver_id).toEqual(cabs.driverId);
        expect(cabOne.cab_id).toEqual(cabs.cabId);
        expect(cabOne.cab_model).toEqual(cabs.cabModel);
        expect(cabOne.cab_type).toEqual(cabs.cabType);
        expect(cabOne.cab_license).toEqual(cabs.cabLicense);
    });

    it('should return notFound if no cabs are found', async () => {
        server = await resetAndMockDB(async allDbs => {
            allDbs.cabs.$queryInterface.$useHandler(function (query) {
                if (query === 'findById') {
                    return null;
                }
            });
            allDbs.cabs.findAll = () => null;
        });
        const res = await server.inject({
            method: 'GET',
            url: '/cabs'
        });
        expect(res.statusCode).toEqual(404);
    });

    it('should return badImplementation if findAllcabs fails', async () => {
        server = await resetAndMockDB(async allDbs => {
            allDbs.cabs.$queryInterface.$useHandler(function (query) {
                if (query === 'findById') {
                    return null;
                }
            });
            allDbs.cabs.findAll = () =>
                new Promise((resolve, reject) => {
                    reject(new Error());
                });
        });
        const res = await server.inject({
            method: 'GET',
            url: '/cabs'
        });
        expect(res.statusCode).toEqual(500);
    });
});
