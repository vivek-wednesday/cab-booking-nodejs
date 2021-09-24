module.exports = {
    up: queryInterface => {
        const arr = [
            {
                driver_id: 1,
                cab_id: 1,
                first_name: 'John',
                last_name: 'Doe',
                current_location: 'Delhi'
            },
            {
                driver_id: 2,
                cab_id: 2,
                first_name: 'Brook',
                last_name: 'Simpson',
                current_location: 'Pune'
            }
        ];
        return queryInterface.bulkInsert('drivers', arr, {});
    },
    down: queryInterface => queryInterface.bulkDelete('drivers', null, {})
};
