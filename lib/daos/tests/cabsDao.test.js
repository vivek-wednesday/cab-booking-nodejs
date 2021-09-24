import { resetAndMockDB } from 'utils/testUtils';
import { mockData } from 'utils/mockData';

describe('Drivers daos', () => {
    const { MOCK_CABS: mockCabs } = mockData;
    const attributes = [
        'id',
        'driver_id',
        'cab_type',
        'cab_model',
        'cab_license'
    ];

    describe('findOneCab', () => {
        it('should find a driver by ID', async () => {
            const { findOneCab } = require('daos/cabsDao');
            const testCabs = await findOneCab(1);
            expect(testCabs.id).toEqual(1);
            expect(testCabs.cabModel).toEqual(mockCabs.cabModel);
            expect(testCabs.cabType).toEqual(mockCabs.cabType);
            expect(testCabs.cabLicense).toEqual(mockCabs.cabLicense);
        });
        it('should call findOne with the correct parameters', async () => {
            let spy;
            await resetAndMockDB(db => {
                spy = jest.spyOn(db.cabs, 'findOne');
            });
            const { findOneCab } = require('daos/cabsDao');

            let cabId = 1;
            await findOneCab(cabId);
            expect(spy).toBeCalledWith({
                attributes,
                underscoredAll: false,
                where: {
                    cabId
                }
            });

            jest.clearAllMocks();
            cabId = 2;
            await findOneCab(cabId);
            expect(spy).toBeCalledWith({
                attributes,
                underscoredAll: false,
                where: {
                    cabId
                }
            });
        });
    });

    describe('findAllDriver', () => {
        let spy;
        const where = {};
        let limit = 10;

        it('should find all the Drivers', async () => {
            const { findAllCabs } = require('daos/cabsDao');
            const { allCabs } = await findAllCabs(10);
            const firstCab = allCabs[0];
            expect(firstCab.id).toEqual(1);
            expect(firstCab.cabModel).toEqual(mockCabs.cabModel);
            expect(firstCab.cabType).toEqual(mockCabs.cabType);
            expect(firstCab.cabLicense).toEqual(mockCabs.cabLicense);
        });

        it('should call findAll with the correct parameters', async () => {
            await resetAndMockDB(db => {
                spy = jest.spyOn(db.cabs, 'findAll');
            });
            const { findAllCabs } = require('daos/cabsDao');
            await findAllCabs(limit);
            expect(spy).toBeCalledWith({
                attributes,
                where,
                limit
            });
            jest.clearAllMocks();
            limit = 10;
            await findAllCabs(limit);
            expect(spy).toBeCalledWith({
                attributes,
                where,
                limit
            });
        });
        it('should call count with an empty object', async () => {
            await resetAndMockDB(db => {
                spy = jest.spyOn(db.cabs, 'count');
            });
            const { findAllCabs } = require('daos/cabsDao');
            await findAllCabs(limit);
            expect(spy).toBeCalledWith({ where });
        });
    });
});
