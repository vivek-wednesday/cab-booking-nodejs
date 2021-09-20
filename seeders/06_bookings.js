module.exports = {
    up: queryInterface => {
        const arr = [
            {
                booking_id: 1,
                user_id: 1,
                driver_id: 1,
                cab_id: 1,
                pickup_location: 'Delhi',
                drop_location: 'Ghaziabad',
                cost: 100,
                booking_status: 'not confirmed'
            },
            {
                booking_id: 2,
                user_id: 2,
                driver_id: 2,
                cab_id: 2,
                pickup_location: 'Pune',
                drop_location: 'Mumbai',
                cost: 500,
                booking_status: 'not confirmed'
            }
        ];
        return queryInterface.bulkInsert('bookings', arr, {});
    },
    down: queryInterface => queryInterface.bulkDelete('bookings', null, {})
};
