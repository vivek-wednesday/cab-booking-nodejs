import { cabs } from 'models';

const attributes = [
    'driver_id',
    'cab_id',
    'cab_type',
    'cab_model',
    'cab_license'
];

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
