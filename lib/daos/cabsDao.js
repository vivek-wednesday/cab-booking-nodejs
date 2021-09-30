import { cabs } from 'models';
import { convertDbResponseToRawResponse } from 'utils/transformerUtils';

const attributes = ['id', 'driver_id', 'cab_type', 'cab_model', 'cab_license'];

export const findOneCab = async cabId =>
    cabs.findOne({
        attributes,
        where: {
            cabId
        },
        underscoredAll: false
    });

export const findAllCabs = async limit => {
    const where = {};
    const totalCount = await cabs.count({ where });
    const allCabs = await cabs.findAll({
        attributes,
        where,
        limit
    });
    return { allCabs, totalCount };
};

export const addCab = async (driverId, cabModel, cabType, cabLicense) =>
    await cabs
        .create({
            driverId,
            cabModel,
            cabType,
            cabLicense
        })
        .then(cabDetails => convertDbResponseToRawResponse(cabDetails));
