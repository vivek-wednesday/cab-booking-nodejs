module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'cabs',
        {
            id: {
                field: 'cab_id',
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
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
            },
            createdAt: {
                field: 'created_at',
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                field: 'updated_at',
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
            },
            deletedAt: {
                field: 'deleted_at',
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
            }
        },
        {
            tableName: 'cabs',
            timestamps: false
        }
    );
};
