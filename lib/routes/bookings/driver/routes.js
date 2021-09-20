import get from 'lodash/get';
import { notFound, badImplementation } from 'utils/responseInterceptors';
import { findAllBookingsForDriverId } from 'daos/bookingsDao';
import { transformDbArrayResponseToRawResponse } from 'utils/transformerUtils';

module.exports = [
    {
        method: 'GET',
        path: '/{driverId}',
        handler: async (request, h) => {
            const driverId = request.params.driverId;
            const { limit } = request.query;
            return findAllBookingsForDriverId(limit, driverId)
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
                    return notFound('No bookings found for driverId');
                })
                .catch(error => badImplementation(error.message));
        },
        options: {
            description: 'get bookings by driverId',
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
