import moment from 'moment';
import get from 'lodash/get';
import {
    TIMESTAMP,
    SCOPE_TYPE,
    USER_ID,
    OAUTH_CLIENT_ID
} from 'utils/constants';
import {
    createMockTokenWithScope,
    mockData,
    mockMetadata
} from 'utils/mockData';
import { resetAndMockDB } from 'utils/testUtils';

describe('util tests', () => {
    const adminToken = createMockTokenWithScope(SCOPE_TYPE.ADMIN);
    const userToken = createMockTokenWithScope(SCOPE_TYPE.USER);
    const superAdminToken = createMockTokenWithScope(SCOPE_TYPE.SUPER_ADMIN);
    const internalServiceToken = createMockTokenWithScope(
        SCOPE_TYPE.INTERNAL_SERVICE
    );
    const {
        MOCK_OAUTH_CLIENTS: adminClient,
        MOCK_OAUTH_CLIENT_SUPER_USER: superClient,
        MOCK_OAUTH_CLIENT_TWO: userClient
    } = mockData;

    describe('getEnv', () => {
        it('should return the environment that is passed as a string', () => {
            const environments = {
                production: 'production',
                qa: 'qa',
                staging: 'staging',
                development: 'development'
            };
            const { getEnv } = require('utils');
            process.env.NODE_ENV = environments.production;
            const productionEnv = getEnv();
            expect(productionEnv).toEqual(environments.production);
            process.env.NODE_ENV = environments.qa;
            const qaEnv = getEnv();
            expect(qaEnv).toEqual(environments.qa);
            process.env.NODE_ENV = environments.staging;
            const stagingEnv = getEnv();
            expect(stagingEnv).toEqual(environments.staging);
            process.env.NODE_ENV = 'TEST';
            const defaultEnv = getEnv();
            expect(defaultEnv).toEqual(environments.development);
        });
    });

    describe('formatWithTimestamp', () => {
        it('should format the provided moment', () => {
            const now = moment();
            const nowFormatted = moment().format(TIMESTAMP);
            const { formatWithTimestamp } = require('utils');
            const nowFormattedTest = formatWithTimestamp(now);
            expect(nowFormatted).toEqual(nowFormattedTest);
        });
    });

    describe('strippedUUID', () => {
        it('should return a uuid with no `-` ', () => {
            const { strippedUUID } = require('utils');
            const uuId = strippedUUID();
            expect(uuId).toEqual(expect.not.stringMatching(/-/g));
        });
    });

    describe('isAdmin', () => {
        it('should check if the provided token has a scope status of ADMINS ', async () => {
            const { isAdmin } = require('utils');
            let adminCheckResult = await isAdmin(adminToken);
            expect(adminCheckResult).toBeTruthy();
            adminCheckResult = await isAdmin(userToken);
            expect(adminCheckResult).toBeFalsy();
            adminCheckResult = await isAdmin(superAdminToken);
            expect(adminCheckResult).toBeTruthy();
            adminCheckResult = await isAdmin(internalServiceToken);
            expect(adminCheckResult).toBeTruthy();
        });
    });

    describe('isScopeHigher', () => {
        it('should check if the token has higher scope ', async () => {
            const { isScopeHigher } = require('utils');

            // user token
            let isScopeHigherCheck = await isScopeHigher(
                userToken,
                SCOPE_TYPE.USER
            );
            expect(isScopeHigherCheck).toBeFalsy();
            isScopeHigherCheck = await isScopeHigher(
                userToken,
                SCOPE_TYPE.ADMIN
            );
            expect(isScopeHigherCheck).toBeFalsy();
            isScopeHigherCheck = await isScopeHigher(
                userToken,
                SCOPE_TYPE.SUPER_ADMIN
            );
            expect(isScopeHigherCheck).toBeFalsy();

            // admin token
            isScopeHigherCheck = await isScopeHigher(
                adminToken,
                SCOPE_TYPE.USER
            );
            expect(isScopeHigherCheck).toBeTruthy();
            isScopeHigherCheck = await isScopeHigher(
                adminToken,
                SCOPE_TYPE.ADMIN
            );
            expect(isScopeHigherCheck).toBeFalsy();
            isScopeHigherCheck = await isScopeHigher(
                adminToken,
                SCOPE_TYPE.SUPER_ADMIN
            );
            expect(isScopeHigherCheck).toBeFalsy();

            // super admin token
            const allScopes = Object.keys(SCOPE_TYPE);

            await Promise.all(
                allScopes.map(async scope => {
                    isScopeHigherCheck = await isScopeHigher(
                        superAdminToken,
                        SCOPE_TYPE[scope]
                    );
                    if (scope !== SCOPE_TYPE.INTERNAL_SERVICE)
                        expect(isScopeHigherCheck).toBeTruthy();
                })
            );

            isScopeHigherCheck = await isScopeHigher(superAdminToken, null);
            expect(isScopeHigherCheck).toBeFalsy();
        });
    });
    describe('getScopeFromToken', () => {
        it('should extract the scope from the metadata of a token', async () => {
            const { getScopeFromToken } = require('utils');
            let extractedScope = await getScopeFromToken(userToken);
            expect(extractedScope).toEqual(SCOPE_TYPE.USER);
            extractedScope = await getScopeFromToken(adminToken);
            expect(extractedScope).toEqual(SCOPE_TYPE.ADMIN);
        });
    });
    describe('hasPowerOver', () => {
        it('should check if the token has power over a oauthClient', () => {
            const { hasPowerOver } = require('utils');
            // super admin token
            let hasPowerOverResult = hasPowerOver(
                superAdminToken,
                superClient.id,
                SCOPE_TYPE.SUPER_ADMIN
            );
            expect(hasPowerOverResult).toBeTruthy();
            hasPowerOverResult = hasPowerOver(
                superAdminToken,
                adminClient().id,
                SCOPE_TYPE.ADMIN
            );
            expect(hasPowerOverResult).toBeTruthy();
            hasPowerOverResult = hasPowerOver(
                superAdminToken,
                userClient.id,
                SCOPE_TYPE.USER
            );
            expect(hasPowerOverResult).toBeTruthy();

            // admin token
            hasPowerOverResult = hasPowerOver(
                adminToken,
                superClient.id,
                SCOPE_TYPE.SUPER_ADMIN
            );
            expect(hasPowerOverResult).toBeFalsy();
            hasPowerOverResult = hasPowerOver(
                adminToken,
                adminClient().id,
                SCOPE_TYPE.ADMIN
            );
            expect(hasPowerOverResult).toBeFalsy();
            hasPowerOverResult = hasPowerOver(
                adminToken,
                userClient.id,
                SCOPE_TYPE.USER
            );
            expect(hasPowerOverResult).toBeTruthy();

            // user token
            hasPowerOverResult = hasPowerOver(
                userToken,
                superClient.id,
                SCOPE_TYPE.SUPER_ADMIN
            );
            expect(hasPowerOverResult).toBeFalsy();
            hasPowerOverResult = hasPowerOver(
                userToken,
                adminClient().id,
                SCOPE_TYPE.ADMIN
            );
            expect(hasPowerOverResult).toBeFalsy();
            hasPowerOverResult = hasPowerOver(
                userToken,
                userClient.id,
                SCOPE_TYPE.USER
            );
            expect(hasPowerOverResult).toBeFalsy();
        });
    });
    describe('getScope', () => {
        it('should get the scope from oauthClientId for a User', async () => {
            const SequelizeMock = require('sequelize-mock');
            const DBConnectionMock = new SequelizeMock();
            const userClientMock = DBConnectionMock.define(
                'oauth_clients',
                userClient
            );
            await resetAndMockDB(db => (db.oauth_clients = userClientMock));
            const { getScope } = require('utils');
            const scope = await getScope(userClient.id);
            expect(scope).toEqual(SCOPE_TYPE.USER);
        });
        it('should get the scope from oauthClientId for an Admin', async () => {
            const SequelizeMock = require('sequelize-mock');
            const DBConnectionMock = new SequelizeMock();
            const adminClientMock = DBConnectionMock.define(
                'oauth_clients',
                adminClient()
            );
            await resetAndMockDB(db => (db.oauth_clients = adminClientMock));
            const { getScope } = require('utils');
            const scope = await getScope(adminClient().id);
            expect(scope).toEqual(SCOPE_TYPE.ADMIN);
        });
        it('should get the scope from oauthClientId for a Super Admin', async () => {
            const SequelizeMock = require('sequelize-mock');
            const DBConnectionMock = new SequelizeMock();
            const superadminClientMock = DBConnectionMock.define(
                'oauth_clients',
                superClient
            );
            await resetAndMockDB(
                db => (db.oauth_clients = superadminClientMock)
            );
            const { getScope } = require('utils');
            const scope = await getScope(superClient.id);
            expect(scope).toEqual(SCOPE_TYPE.SUPER_ADMIN);
        });
    });

    describe('hasScopeOverUser', () => {
        it('should check if the Admin has scope over a user', async () => {
            const SequelizeMock = require('sequelize-mock');
            const DBConnectionMock = new SequelizeMock();
            const adminWithUserIdResource = {
                ...adminClient(),
                ...mockMetadata(SCOPE_TYPE.ADMIN, USER_ID)
            };
            const adminClientMock = DBConnectionMock.define(
                'oauth_clients',
                adminWithUserIdResource
            );
            await resetAndMockDB(db => (db.oauth_clients = adminClientMock));
            let userId = 1;
            const { hasScopeOverUser } = require('utils');
            const oauthClientId = adminClient().id;
            let scopeCheck = await hasScopeOverUser({
                oauthClientId,
                userId
            });
            expect(scopeCheck).toBeTruthy();
            userId = 2;
            scopeCheck = await hasScopeOverUser({
                oauthClientId,
                userId
            });
            expect(scopeCheck).toBeFalsy();
        });
        it('should check if the User has scope only if the userId matches ', async () => {
            const SequelizeMock = require('sequelize-mock');
            const DBConnectionMock = new SequelizeMock();
            const userClientMock = DBConnectionMock.define(
                'oauth_clients',
                userClient
            );
            await resetAndMockDB(db => {
                db.oauth_clients = userClientMock;
            });
            const userId = 1;
            let oauthClientId = userClient.id;
            const { hasScopeOverUser } = require('utils');
            let scopeCheck = await hasScopeOverUser({ oauthClientId, userId });
            expect(scopeCheck).toBeTruthy();
            oauthClientId = 2;
            await resetAndMockDB(() => {}, {
                scope: SCOPE_TYPE.USER,
                resourceType: USER_ID
            });
            scopeCheck = await hasScopeOverUser({ oauthClientId, userId });
            expect(scopeCheck).toBeFalsy();
        });
    });

    describe('validateResources', () => {
        it('should check if the resource type and id matches for the metadata', () => {
            const { validateResources } = require('utils');
            let metadata = get(adminToken, 'metadata');
            let resourcesValidated = validateResources(
                metadata,
                OAUTH_CLIENT_ID,
                1
            );
            expect(resourcesValidated).toBeTruthy();
            const userToken = createMockTokenWithScope(
                SCOPE_TYPE.USER,
                USER_ID
            );
            metadata = get(userToken, 'metadata');
            resourcesValidated = validateResources(metadata, USER_ID, 1);
            expect(resourcesValidated).toBeTruthy();
            resourcesValidated = validateResources(
                metadata,
                OAUTH_CLIENT_ID,
                1
            );
            expect(resourcesValidated).toBeFalsy();
        });
    });
});
