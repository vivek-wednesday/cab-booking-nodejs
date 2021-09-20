import { drivers } from 'models';

const attributes = [
    'driver_id',
    'cab_id',
    'first_name',
    'last_name',
    'current_location'
];

export const findOneDriver = async driverId =>
    drivers.findOne({
        attributes,
        where: {
            driverId
        },
        underscoredAll: false
    });

export const findAllDrivers = async limit => {
    const where = {};
    const totalCount = await drivers.count({ where });
    const allDrivers = await drivers.findAll({
        attributes,
        where,
        limit
    });
    return { allDrivers, totalCount };
};
