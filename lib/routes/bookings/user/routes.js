import get from 'lodash/get';
import { notFound, badImplementation } from 'utils/responseInterceptors';
import { findAllBookingsForUserID, createBooking } from 'daos/bookingsDao';
import { transformDbArrayResponseToRawResponse } from 'utils/transformerUtils';

module.exports = [
    {
        method: 'POST',
        path: '/{userId}',
        handler: async request => {
            const id = request.params.userId;
            const {
                driverId,
                cabId,
                pickupLocation,
                dropLocation,
                bookingStatus,
                cost
            } = request.payload;

            return createBooking(
                driverId,
                cabId,
                pickupLocation,
                dropLocation,
                bookingStatus,
                cost,
                id
            ).catch(error => {
                request.log('error', error);
                throw badImplementation(
                    'Error while creating a booking',
                    error.message
                );
            });
        },
        options: {
            description: 'create a new booking',
            notes: 'API to create a new booking',
            tags: ['api', 'bookings'],
            auth: false
        }
    },
    {
        method: 'GET',
        path: '/{userId}',
        handler: async (request, h) => {
            const userId = request.params.userId;
            const { limit } = request.query;
            return findAllBookingsForUserID(limit, userId)
                .then(bookings => {
                    if (get(bookings.allBookings, 'length')) {
                        const totalCount = bookings.totalCount;
                        const allBookings =
                            transformDbArrayResponseToRawResponse(
                                bookings.allBookings
                            ).map(user => user);

                        return h.response({
                            results: allBookings,
                            totalCount
                        });
                    }
                    return notFound(`No bookings found for userId ${userId}`);
                })
                .catch(error => badImplementation(error.message));
        },
        options: {
            description: 'get bookings by userID',
            notes: 'GET bookings API',
            tags: ['api', 'bookings'],
            plugins: {
                pagination: {
                    enabled: true
                },
                query: {
                    pagination: true
                }
            }
        }
    }
];
