module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'drivers',
        {
            driverId: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            cabId: {
                field: 'cab_id',
                type: DataTypes.INTEGER(11),
                allowNull: false
            },
            driverId: {
                field: 'driver_id',
                type: DataTypes.INTEGER(11),
                allowNull: false
            },
            cabId: {
                field: 'cab_id',
                type: DataTypes.INTEGER(11),
                allowNull: false
            },
            firstName: {
                field: 'first_name',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            lastName: {
                field: 'last_name',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            createOn: {
                field: 'created_on',
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
            },
            currentLocation: {
                field: 'current_location',
                type: DataTypes.STRING(32),
                allowNull: false
            }
        },
        {
            tableName: 'drivers',
            timestamps: false
        }
    );
};
