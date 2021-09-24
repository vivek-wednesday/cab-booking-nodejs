import get from 'lodash/get';
import { notFound, badImplementation } from 'utils/responseInterceptors';
import { server } from 'root/server.js';
import { findAllCabs, addCab } from 'daos/cabsDao';
import { transformDbArrayResponseToRawResponse } from 'utils/transformerUtils';

module.exports = [
    {
        method: 'POST',
        path: '/',
        handler: async request => {
            const { driverId, cabModel, cabType, cabLicense } = request.payload;
            return addCab(driverId, cabModel, cabType, cabLicense).catch(
                error => {
                    request.log('error', error);
                    throw badImplementation(
                        'Error while adding a cab',
                        error.message
                    );
                }
            );
        },
        options: {
            description: 'add a new cab',
            notes: 'API to add a new cab',
            tags: ['api', 'cabs']
        }
    },
    {
        method: 'GET',
        path: '/{cabId}',
        options: {
            description: 'get cab by cab ID',
            notes: 'GET cab by cab id API',
            tags: ['api', 'cabs'],
            cors: true
        },
        handler: async request => {
            const cabId = request.params.cabId;
            return server.methods
                .findOneCab(cabId)
                .then(cab => {
                    if (!cab) {
                        return notFound(`No cab was found for id ${cabId}`);
                    }
                    return cab;
                })
                .catch(error => badImplementation(error.message));
        }
    },
    {
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            const { limit } = request.query;
            return findAllCabs(limit)
                .then(cabs => {
                    if (get(cabs.allCabs, 'length')) {
                        const totalCount = cabs.totalCount;
                        const allcabs = transformDbArrayResponseToRawResponse(
                            cabs.allCabs
                        ).map(cabs => cabs);

                        return h.response({
                            results: allcabs,
                            totalCount
                        });
                    }
                    return notFound('No cabs found');
                })
                .catch(error => badImplementation(error.message));
        },
        options: {
            description: 'get all cabs',
            notes: 'GET cabs API',
            tags: ['api', 'cabs'],
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
