import get from 'lodash/get';
import { notFound, badImplementation } from 'utils/responseInterceptors';
import { server } from 'root/server.js';
import { findAllDrivers } from 'daos/driversDao';
import { transformDbArrayResponseToRawResponse } from 'utils/transformerUtils';

module.exports = [
    {
        method: 'GET',
        path: '/{driverId}',
        options: {
            description: 'get booking by booking ID',
            notes: 'GET booking by booking id API',
            tags: ['api', 'drivers'],
            cors: true
        },
        handler: async request => {
            const driverId = request.params.driverId;
            return server.methods.findOneDriver(driverId).then(booking => {
                if (!booking) {
                    return notFound(`No driver was found for id ${driverId}`);
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
            return findAllDrivers(limit)
                .then(drivers => {
                    if (get(drivers.allDrivers, 'length')) {
                        const totalCount = drivers.totalCount;
                        const allDrivers =
                            transformDbArrayResponseToRawResponse(
                                drivers.allDrivers
                            ).map(drivers => drivers);

                        return h.response({
                            results: allDrivers,
                            totalCount
                        });
                    }
                    return notFound('No drivers found');
                })
                .catch(error => badImplementation(error.message));
        },
        options: {
            description: 'get all drivers',
            notes: 'GET drivers API',
            tags: ['api', 'drivers'],
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
