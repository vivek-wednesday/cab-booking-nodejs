module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'cabs',
        {
            cabId: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true
            },
            driverId: {
                field: 'driver_id',
                type: DataTypes.INTEGER(11),
                allowNull: false
            },
            cabModel: {
                field: 'cab_model',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            cabLicense: {
                field: 'cab_license',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            cabType: {
                field: 'cab_type',
                type: DataTypes.DATE,
                type: DataTypes.STRING(32),
                allowNull: false
            }
        },
        {
            tableName: 'cabs',
            timestamps: false
        }
    );
};
