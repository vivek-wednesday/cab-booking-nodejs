import get from 'lodash/get';
import { notFound, badImplementation } from 'utils/responseInterceptors';
import { server } from 'root/server.js';
import { findAllDrivers, addDriver } from 'daos/driversDao';
import { transformDbArrayResponseToRawResponse } from 'utils/transformerUtils';

module.exports = [
    {
        method: 'POST',
        path: '/',
        handler: async request => {
            const { cabId, firstName, lastName, currentLocation } =
                request.payload;
            return addDriver(cabId, firstName, lastName, currentLocation).catch(
                error => {
                    request.log('error', error);
                    throw badImplementation(
                        'Error while adding a driver',
                        error.message
                    );
                }
            );
        },
        options: {
            description: 'add a new driver',
            notes: 'API to add a new driver',
            tags: ['api', 'drivers'],
            auth: false
        }
    },
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
