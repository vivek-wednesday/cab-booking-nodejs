import { bookings } from 'models';
import { convertDbResponseToRawResponse } from 'utils/transformerUtils';

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

export const findOneBooking = async bookingId =>
    bookings.findOne({
        attributes,
        where: {
            bookingId
        },
        underscoredAll: false
    });

export const findAllBookings = async limit => {
    const where = {};
    const totalCount = await bookings.count({ where });
    const allBookings = await bookings.findAll({
        attributes,
        where,
        limit
    });
    return { allBookings, totalCount };
};

export const findAllBookingsForUserID = async (limit, userId) => {
    const where = {
        userId
    };
    const totalCount = await bookings.count({ where });
    const allBookings = await bookings.findAll({
        attributes,
        where,
        limit
    });
    return { allBookings, totalCount };
};

export const findAllBookingsForDriverId = async (limit, driverId) => {
    const where = {
        driverId
    };
    const totalCount = await bookings.count({ where });
    const allBookings = await bookings.findAll({
        attributes,
        where,
        limit
    });
    return { allBookings, totalCount };
};

export const createBooking = async (
    driverId,
    cabId,
    pickupLocation,
    dropLocation,
    bookingStatus,
    cost,
    id
) =>
    await bookings
        .create({
            userId: id,
            driverId,
            cabId,
            pickupLocation,
            dropLocation,
            bookingStatus,
            cost
        })
        .then(bookingDetails => convertDbResponseToRawResponse(bookingDetails));
