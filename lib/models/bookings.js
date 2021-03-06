module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'bookings',
        {
            id: {
                field: 'booking_id',
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                field: 'user_id',
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
            pickupLocation: {
                field: 'pickup_location',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            startTime: {
                field: 'start_time',
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
            },
            dropLocation: {
                field: 'drop_location',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            endTime: {
                field: 'end_time',
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
            },
            cost: {
                field: 'cost',
                type: DataTypes.INTEGER(11),
                allowNull: true
            },
            bookingStatus: {
                field: 'booking_status',
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
            tableName: 'bookings',
            timestamps: false
        }
    );
};
