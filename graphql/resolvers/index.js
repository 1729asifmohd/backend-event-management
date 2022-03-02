const authResolver=require('./auth.js');
const bookingResolver=require('./bookings');
const eventsResolver=require('./events')


const rootResolver={
    ...authResolver,
    ...bookingResolver,
    ...eventsResolver
}
module.exports = rootResolver;