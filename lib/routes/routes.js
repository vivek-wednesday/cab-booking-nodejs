// Note: Unfortunately, wurst does not work well with the ES6 default export syntax.
module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: request => 'Cab booking system at your service!',
        options: {
            auth: false,
            tags: ['api', 'health-check']
        }
    }
];
