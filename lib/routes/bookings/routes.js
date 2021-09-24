import get from 'lodash/get';
import { notFound, badImplementation } from 'utils/responseInterceptors';
import { server } from 'root/server.js';
import { findAllBookings } from 'daos/bookingsDao';
import { transformDbArrayResponseToRawResponse } from 'utils/transformerUtils';

module.exports = [
    {
        method: 'GET',
        path: '/{bookingId}',
        options: {
            description: 'get booking by booking ID',
            notes: 'GET booking by booking id API',
            tags: ['api', 'bookings'],
            cors: true
        },
        handler: async request => {
            const bookingId = request.params.bookingId;
            return server.methods.findOneBooking(bookingId).then(booking => {
                if (!booking) {
                    return notFound(`No booking was found for id ${bookingId}`);
                }
                return booking;
            });
        }
    },
    {
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            const { limit } = request.query;
            return findAllBookings(limit)
                .then(bookings => {
                    if (get(bookings.allBookings, 'length')) {
                        const totalCount = bookings.totalCount;
                        const allBookings =
                            transformDbArrayResponseToRawResponse(
                                bookings.allBookings
                            ).map(bookings => bookings);

                        return h.response({
                            results: allBookings,
                            totalCount
                        });
                    }
                    return notFound('No bookings found');
                })
                .catch(error => badImplementation(error.message));
        },
        options: {
            description: 'get all bookings',
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
