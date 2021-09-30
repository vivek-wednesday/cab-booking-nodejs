import { resetAndMockDB } from 'utils/testUtils';
import { mockData, createMockTokenWithScope } from 'utils/mockData';
import { SCOPE_TYPE, OAUTH_CLIENT_ID } from 'utils/constants';

const { MOCK_BOOKING: bookings } = mockData;

describe('/user route tests', () => {
    let server;
    const superAdminToken = createMockTokenWithScope(
        SCOPE_TYPE.SUPER_ADMIN,
        OAUTH_CLIENT_ID
    );

    const superAdminAuth = {
        credentials: { ...superAdminToken },
        strategy: 'bearer'
    };
    beforeEach(async () => {
        server = await resetAndMockDB(async allDbs => {
            allDbs.bookings.$queryInterface.$useHandler(function (query) {
                if (query === 'findById') {
                    return bookings;
                }
            });
        });
    });
    it('should return 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/bookings/user/1'
        });
        expect(res.statusCode).toEqual(200);
    });

    it('should return 404', async () => {
        server = await resetAndMockDB(async allDbs => {
            allDbs.bookings.$queryInterface.$useHandler(function (query) {
                if (query === 'findAll') {
                    return bookings;
                }
            });
        });
        const res = await server.inject({
            method: 'GET',
            url: '/bookings/user/3'
        });

        expect(res.statusCode).toEqual(404);
        expect(res.result.message).toEqual('No bookings found for userId 3');
    });

    it('should return all the bookings ', async () => {
        server = await resetAndMockDB(async allDbs => {
            allDbs.bookings.$queryInterface.$useHandler(function (query) {
                if (query === 'findById') {
                    return bookings;
                }
            });
        });
        const res = await server.inject({
            method: 'GET',
            url: '/bookings/user/10'
        });

        expect(res.statusCode).toEqual(200);
        const firstBooking = res.result.results[0];
        expect(firstBooking.id).toEqual(bookings.userId);
        expect(firstBooking.booking_id).toEqual(bookings.bookingId);
        expect(firstBooking.booking_status).toEqual(bookings.bookingStatus);
        expect(firstBooking.pickup_location).toEqual(bookings.pickupLocation);
        expect(firstBooking.drop_location).toEqual(bookings.dropLocation);
        expect(firstBooking.cost).toEqual(bookings.cost);
        expect(res.result.total_count).toEqual(1);
    });

    it('should return notFound if no bookings are found', async () => {
        server = await resetAndMockDB(async allDbs => {
            allDbs.bookings.$queryInterface.$useHandler(function (query) {
                if (query === 'findById') {
                    return null;
                }
            });
            allDbs.bookings.findAll = () => null;
        });
        const res = await server.inject({
            method: 'GET',
            url: '/bookings/user/122'
        });
        expect(res.statusCode).toEqual(404);
    });

    it('should return badImplementation if findAllbookings fails', async () => {
        server = await resetAndMockDB(async allDbs => {
            allDbs.bookings.$queryInterface.$useHandler(function (query) {
                if (query === 'findById') {
                    return null;
                }
            });
            allDbs.bookings.findAll = () =>
                new Promise((resolve, reject) => {
                    reject(new Error());
                });
        });
        const res = await server.inject({
            method: 'GET',
            url: '/bookings/user/2'
        });
        expect(res.statusCode).toEqual(500);
    });

    it('should return notFound if no id entered', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/bookings/user/'
        });
        expect(res.statusCode).toEqual(404);
    });

    describe('/bookings/user/{userId} POST method', () => {
        const payload = {
            booking_id: 1,
            user_id: 1,
            driver_id: 1,
            cab_id: 1,
            pickup_location: 'Delhi',
            drop_location: 'Ghaziabad',
            cost: 100,
            booking_status: 'not confirmed'
        };

        it('should create new booking', async () => {
            server = await resetAndMockDB(async allDbs => {
                allDbs.bookings.create = () =>
                    new Promise((resolve, reject) =>
                        resolve({
                            get: () => ({
                                ...payload
                            })
                        })
                    );
            });

            const res = await server.inject({
                method: 'POST',
                url: '/bookings/user/1',
                auth: superAdminAuth,
                payload
            });
            expect(res.statusCode).toEqual(200);
            expect(res.result).toEqual({ ...payload });
        });

        it('should return badImplementation if fails', async () => {
            server = await resetAndMockDB(async allDbs => {
                allDbs.bookings.create = () => reject(new Error(errorMessage));
            });

            const res = await server.inject({
                method: 'POST',
                url: '/bookings/user/1',
                auth: superAdminAuth,
                payload
            });
            expect(res.statusCode).toEqual(500);
        });
    });
});
