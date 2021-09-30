import { SCOPE_TYPE } from 'utils/constants';
import { hasScopeOverUser } from 'utils/index';

export const paths = [
    {
        path: '/me',
        scopes: [SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.ADMIN, SCOPE_TYPE.USER],
        method: 'GET'
    },
    {
        path: '/oauth2/resources',
        scopes: [SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.ADMIN],
        method: 'POST'
    },
    {
        path: '/oauth2/resources/{resourceId}',
        scopes: [SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.ADMIN],
        method: 'PATCH'
    },
    {
        path: '/oauth2/resources/{resourceId}',
        scopes: [SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.ADMIN, SCOPE_TYPE.USER],
        method: 'GET'
    },
    {
        path: '/oauth2/resources',
        scopes: [SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.ADMIN, SCOPE_TYPE.USER],
        method: 'GET'
    },
    {
        path: '/oauth2/scopes',
        scopes: [SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.ADMIN],
        method: 'POST'
    },
    {
        path: '/oauth2/scopes/{scopeId}',
        scopes: [SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.ADMIN, SCOPE_TYPE.USER],
        method: 'GET'
    },
    {
        path: '/oauth2/scopes',
        scopes: [SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.ADMIN, SCOPE_TYPE.USER],
        method: 'GET'
    },
    {
        path: '/oauth2/clients',
        scopes: [SCOPE_TYPE.INTERNAL_SERVICE, SCOPE_TYPE.SUPER_ADMIN],
        method: 'POST'
    },
    {
        path: '/oauth2/clients',
        scopes: [
            SCOPE_TYPE.INTERNAL_SERVICE,
            SCOPE_TYPE.SUPER_ADMIN,
            SCOPE_TYPE.ADMIN,
            SCOPE_TYPE.USER
        ],
        method: 'GET'
    },
    {
        path: '/users',
        scopes: [
            SCOPE_TYPE.INTERNAL_SERVICE,
            SCOPE_TYPE.SUPER_ADMIN,
            SCOPE_TYPE.ADMIN
        ],
        method: 'GET'
    },
    {
        path: '/users/{userId}',
        scopes: [
            SCOPE_TYPE.INTERNAL_SERVICE,
            SCOPE_TYPE.SUPER_ADMIN,
            SCOPE_TYPE.ADMIN,
            SCOPE_TYPE.USER
        ],
        method: 'GET',
        customValidator: async payload => await hasScopeOverUser(payload)
    },
    {
        path: '/bookings',
        scopes: [
            SCOPE_TYPE.INTERNAL_SERVICE,
            SCOPE_TYPE.SUPER_ADMIN,
            SCOPE_TYPE.ADMIN
        ],
        method: 'GET'
    },
    {
        path: '/bookings/{bookingId}',
        scopes: [
            SCOPE_TYPE.INTERNAL_SERVICE,
            SCOPE_TYPE.SUPER_ADMIN,
            SCOPE_TYPE.ADMIN,
            SCOPE_TYPE.USER
        ],
        method: 'GET'
    },
    {
        path: '/bookings/user/{userId}',
        scopes: [
            SCOPE_TYPE.INTERNAL_SERVICE,
            SCOPE_TYPE.SUPER_ADMIN,
            SCOPE_TYPE.ADMIN,
            SCOPE_TYPE.USER
        ],
        method: 'GET',
        customValidator: async payload => await hasScopeOverUser(payload)
    },
    {
        path: '/bookings/user/{userId}',
        scopes: [
            SCOPE_TYPE.INTERNAL_SERVICE,
            SCOPE_TYPE.SUPER_ADMIN,
            SCOPE_TYPE.ADMIN,
            SCOPE_TYPE.USER
        ],
        method: 'POST',
        customValidator: async payload => await hasScopeOverUser(payload)
    },
    {
        path: '/bookings/driver/{driverId}',
        scopes: [
            SCOPE_TYPE.INTERNAL_SERVICE,
            SCOPE_TYPE.SUPER_ADMIN,
            SCOPE_TYPE.ADMIN
        ],
        method: 'GET'
    },
    {
        path: '/drivers',
        scopes: [
            SCOPE_TYPE.INTERNAL_SERVICE,
            SCOPE_TYPE.SUPER_ADMIN,
            SCOPE_TYPE.ADMIN
        ],
        method: 'GET'
    },
    {
        path: '/drivers',
        scopes: [
            SCOPE_TYPE.INTERNAL_SERVICE,
            SCOPE_TYPE.SUPER_ADMIN,
            SCOPE_TYPE.ADMIN
        ],
        method: 'POST'
    },
    {
        path: '/drivers/{driverId}',
        scopes: [
            SCOPE_TYPE.INTERNAL_SERVICE,
            SCOPE_TYPE.SUPER_ADMIN,
            SCOPE_TYPE.ADMIN
        ],
        method: 'GET'
    },
    {
        path: '/cabs',
        scopes: [
            SCOPE_TYPE.INTERNAL_SERVICE,
            SCOPE_TYPE.SUPER_ADMIN,
            SCOPE_TYPE.ADMIN
        ],
        method: 'GET'
    },
    {
        path: '/cabs',
        scopes: [
            SCOPE_TYPE.INTERNAL_SERVICE,
            SCOPE_TYPE.SUPER_ADMIN,
            SCOPE_TYPE.ADMIN
        ],
        method: 'POST'
    },
    {
        path: '/cabs/{cabId}',
        scopes: [
            SCOPE_TYPE.INTERNAL_SERVICE,
            SCOPE_TYPE.SUPER_ADMIN,
            SCOPE_TYPE.ADMIN
        ],
        method: 'GET'
    }
];
