import authResolver from './auth'
import bookingResolver from './bookings';
import eventsResolver from './events';

const rootResolver={
    ...authResolver,
    ...bookingResolver,
    ...eventsResolver
}

module.exports = rootResolver;