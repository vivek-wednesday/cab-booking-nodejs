module.exports = {
    up: queryInterface => {
        const arr = [
            {
                cab_id: 1,
                driver_id: 1,
                cab_model: 'Wagon-R',
                cab_license: 'DL-XXXX',
                cab_type: 'Commercial'
            },
            {
                cab_id: 2,
                driver_id: 2,
                cab_model: 'Swift Dzire',
                cab_license: 'MH-XXXX',
                cab_type: 'Private'
            }
        ];
        return queryInterface.bulkInsert('cabs', arr, {});
    },
    down: queryInterface => queryInterface.bulkDelete('cabs', null, {})
};
