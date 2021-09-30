import { resetAndMockDB } from 'utils/testUtils';
import { mockData } from 'utils/mockData';

describe('Booking daos', () => {
    const { MOCK_BOOKING: mockBooking } = mockData;
    const attributes = [
        'id',
        'cab_id',
        'user_id',
        'driver_id',
        'pickup_location',
        'drop_location',
        'cost',
        'booking_status'
    ];

    describe('findOneBooking', () => {
        it('should find a booking by ID', async () => {
            const { findOneBooking } = require('daos/bookingsDao');
            const testBooking = await findOneBooking(1);
            expect(testBooking.id).toEqual(1);
            expect(testBooking.cabId).toEqual(mockBooking.cabId);
            expect(testBooking.userId).toEqual(mockBooking.userId);
            expect(testBooking.driverId).toEqual(mockBooking.driverId);
        });
        it('should call findOne with the correct parameters', async () => {
            let spy;
            await resetAndMockDB(db => {
                spy = jest.spyOn(db.bookings, 'findOne');
            });
            const { findOneBooking } = require('daos/bookingsDao');

            let bookingId = 1;
            await findOneBooking(bookingId);
            expect(spy).toBeCalledWith({
                attributes,
                underscoredAll: false,
                where: {
                    bookingId
                }
            });

            jest.clearAllMocks();
            bookingId = 2;
            await findOneBooking(bookingId);
            expect(spy).toBeCalledWith({
                attributes,
                underscoredAll: false,
                where: {
                    bookingId
                }
            });
        });
    });

    describe('findAllBooking', () => {
        let spy;
        const where = {};
        let limit = 10;

        it('should find all the bookings', async () => {
            const { findAllBookings } = require('daos/bookingsDao');
            const { allBookings } = await findAllBookings(10);
            const firstBooking = allBookings[0];
            expect(firstBooking.id).toEqual(1);
            expect(firstBooking.cabId).toEqual(mockBooking.cabId);
            expect(firstBooking.driverId).toEqual(mockBooking.driverId);
            expect(firstBooking.userId).toEqual(mockBooking.userId);
        });

        it('should call findAll with the correct parameters', async () => {
            await resetAndMockDB(db => {
                spy = jest.spyOn(db.bookings, 'findAll');
            });
            const { findAllBookings } = require('daos/bookingsDao');
            await findAllBookings(limit);
            expect(spy).toBeCalledWith({
                attributes,
                where,
                limit
            });
            jest.clearAllMocks();
            limit = 10;
            await findAllBookings(limit);
            expect(spy).toBeCalledWith({
                attributes,
                where,
                limit
            });
        });
        it('should call count with an empty object', async () => {
            await resetAndMockDB(db => {
                spy = jest.spyOn(db.bookings, 'count');
            });
            const { findAllBookings } = require('daos/bookingsDao');
            await findAllBookings(limit);
            expect(spy).toBeCalledWith({ where });
        });
    });

    describe('findAllByBookingForUserId', () => {
        let spy;
        const where = {
            userId: 1
        };
        let limit = 10;

        it('should find a booking by user ID', async () => {
            const { findAllBookingsForUserID } = require('daos/bookingsDao');
            const { allBookings } = await findAllBookingsForUserID(10, 1);
            const firstBooking = allBookings[0];
            expect(firstBooking.id).toEqual(1);
            expect(firstBooking.cabId).toEqual(mockBooking.cabId);
            expect(firstBooking.userId).toEqual(mockBooking.userId);
            expect(firstBooking.driverId).toEqual(mockBooking.driverId);
        });

        it('should call findAllBookingsForUserID with the correct parameters', async () => {
            await resetAndMockDB(db => {
                spy = jest.spyOn(db.bookings, 'findAll');
            });
            const { findAllBookingsForUserID } = require('daos/bookingsDao');
            let userId = 1;
            await findAllBookingsForUserID(limit, userId);
            expect(spy).toBeCalledWith({
                attributes,
                where,
                limit
            });
            jest.clearAllMocks();
            limit = 10;
            await findAllBookingsForUserID(limit, userId);
            expect(spy).toBeCalledWith({
                attributes,
                where,
                limit
            });
        });
        it('should call count with an empty object', async () => {
            let userId = 1;
            await resetAndMockDB(db => {
                spy = jest.spyOn(db.bookings, 'count');
            });
            const { findAllBookingsForUserID } = require('daos/bookingsDao');
            await findAllBookingsForUserID(limit, userId);
            expect(spy).toBeCalledWith({ where });
        });
    });

    describe('findAllBookingsForDriverId', () => {
        let spy;
        const where = {
            driverId: 1
        };
        let limit = 10;

        it('should find a booking by user ID', async () => {
            const { findAllBookingsForDriverId } = require('daos/bookingsDao');
            const { allBookings } = await findAllBookingsForDriverId(10, 1);
            const firstBooking = allBookings[0];
            expect(firstBooking.id).toEqual(1);
            expect(firstBooking.cabId).toEqual(mockBooking.cabId);
            expect(firstBooking.userId).toEqual(mockBooking.userId);
            expect(firstBooking.driverId).toEqual(mockBooking.driverId);
        });

        it('should call findAllBookingsForUserID with the correct parameters', async () => {
            await resetAndMockDB(db => {
                spy = jest.spyOn(db.bookings, 'findAll');
            });
            const { findAllBookingsForDriverId } = require('daos/bookingsDao');
            let driverId = 1;
            await findAllBookingsForDriverId(limit, driverId);
            expect(spy).toBeCalledWith({
                attributes,
                where,
                limit
            });
            jest.clearAllMocks();
            limit = 10;
            await findAllBookingsForDriverId(limit, driverId);
            expect(spy).toBeCalledWith({
                attributes,
                where,
                limit
            });
        });
        it('should call count with an empty object', async () => {
            let driverId = 1;
            await resetAndMockDB(db => {
                spy = jest.spyOn(db.bookings, 'count');
            });
            const { findAllBookingsForDriverId } = require('daos/bookingsDao');
            await findAllBookingsForDriverId(limit, driverId);
            expect(spy).toBeCalledWith({ where });
        });
    });

    describe('createBooking', () => {
        let spy;
        it('should create booking on request', async () => {
            await resetAndMockDB(db => {
                db.bookings.create = async value => ({
                    get: () => value
                });
                spy = jest.spyOn(db.bookings, 'create');
            });
            const { createBooking } = require('daos/bookingsDao');
            const {
                driverId,
                cabId,
                pickupLocation,
                dropLocation,
                bookingStatus,
                cost,
                userId
            } = mockBooking;

            await createBooking(
                driverId,
                cabId,
                pickupLocation,
                dropLocation,
                bookingStatus,
                cost,
                userId
            );

            expect(spy).toHaveBeenCalledWith(
                expect.objectContaining({
                    driverId,
                    cabId,
                    pickupLocation,
                    dropLocation,
                    bookingStatus,
                    cost,
                    userId
                })
            );
        });
    });
});
