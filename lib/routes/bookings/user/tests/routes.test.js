import { resetAndMockDB } from 'utils/testUtils';
import { mockData } from 'utils/mockData';

const { MOCK_BOOKING: bookings } = mockData;

describe('/user route tests ', () => {
    let server;
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
});
