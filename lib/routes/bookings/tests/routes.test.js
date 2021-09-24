import { resetAndMockDB } from 'utils/testUtils';
import { mockData } from 'utils/mockData';

const { MOCK_BOOKING: bookings } = mockData;

describe('/bookings route tests ', () => {
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
            url: '/bookings/1'
        });
        expect(res.statusCode).toEqual(200);
    });

    it('should return 404', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/bookings/2'
        });
        expect(res.statusCode).toEqual(404);
        expect(res.result.message).toEqual('No booking was found for id 2');
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
            url: '/bookings'
        });

        expect(res.statusCode).toEqual(200);
        const firstBooking = res.result.results[0];
        expect(firstBooking.id).toEqual(bookings.bookingId);
        expect(firstBooking.driver_id).toEqual(bookings.driverId);
        expect(firstBooking.booking_status).toEqual(bookings.bookingStatus);
        expect(firstBooking.pickup_location).toEqual(bookings.pickupLocation);
        expect(firstBooking.drop_location).toEqual(bookings.dropLocation);
        expect(firstBooking.user_id).toEqual(bookings.userId);
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
            url: '/bookings'
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
            url: '/bookings'
        });
        expect(res.statusCode).toEqual(500);
    });
});
