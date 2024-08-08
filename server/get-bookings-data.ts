import { bookingsData } from './bookings-data';
import { travelsData } from './travels-data';

export function getBookingsData() {
  const travels = travelsData;
  const bookings = bookingsData.map((booking) => {
    const travel = travels.find((travel) => travel.id === booking.travelId);
    return {
      ...booking,
      travel,
    };
  });
  return bookings;
}
