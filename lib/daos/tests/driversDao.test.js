import { resetAndMockDB } from 'utils/testUtils';
import { mockData } from 'utils/mockData';

describe('Drivers daos', () => {
    const { MOCK_DRIVERS: mockDrivers } = mockData;
    const attributes = [
        'driver_id',
        'cab_id',
        'first_name',
        'last_name',
        'current_location'
    ];

    describe('findOneDriver', () => {
        it('should find a driver by ID', async () => {
            const { findOneDriver } = require('daos/driversDao');
            const testDrivers = await findOneDriver(1);
            expect(testDrivers.driverId).toEqual(1);
            expect(testDrivers.cabId).toEqual(mockDrivers.cabId);
            expect(testDrivers.firstName).toEqual(mockDrivers.firstName);
            expect(testDrivers.lastName).toEqual(mockDrivers.lastName);
            expect(testDrivers.currentLocation).toEqual(
                mockDrivers.currentLocation
            );
        });
        it('should call findOne with the correct parameters', async () => {
            let spy;
            await resetAndMockDB(db => {
                spy = jest.spyOn(db.drivers, 'findOne');
            });
            const { findOneDriver } = require('daos/driversDao');

            let driverId = 1;
            await findOneDriver(driverId);
            expect(spy).toBeCalledWith({
                attributes,
                underscoredAll: false,
                where: {
                    driverId
                }
            });

            jest.clearAllMocks();
            driverId = 2;
            await findOneDriver(driverId);
            expect(spy).toBeCalledWith({
                attributes,
                underscoredAll: false,
                where: {
                    driverId
                }
            });
        });
    });

    describe('findAllDriver', () => {
        let spy;
        const where = {};
        let limit = 10;

        it('should find all the Drivers', async () => {
            const { findAllDrivers } = require('daos/driversDao');
            const { allDrivers } = await findAllDrivers(10);
            const firstBooking = allDrivers[0];
            expect(firstBooking.driverId).toEqual(1);
            expect(firstBooking.cabId).toEqual(mockDrivers.cabId);
            expect(firstBooking.firstName).toEqual(mockDrivers.firstName);
            expect(firstBooking.lastName).toEqual(mockDrivers.lastName);
            expect(firstBooking.currentLocation).toEqual(
                mockDrivers.currentLocation
            );
        });

        it('should call findAll with the correct parameters', async () => {
            await resetAndMockDB(db => {
                spy = jest.spyOn(db.drivers, 'findAll');
            });
            const { findAllDrivers } = require('daos/driversDao');
            await findAllDrivers(limit);
            expect(spy).toBeCalledWith({
                attributes,
                where,
                limit
            });
            jest.clearAllMocks();
            limit = 10;
            await findAllDrivers(limit);
            expect(spy).toBeCalledWith({
                attributes,
                where,
                limit
            });
        });
        it('should call count with an empty object', async () => {
            await resetAndMockDB(db => {
                spy = jest.spyOn(db.drivers, 'count');
            });
            const { findAllDrivers } = require('daos/driversDao');
            await findAllDrivers(limit);
            expect(spy).toBeCalledWith({ where });
        });
    });
});
