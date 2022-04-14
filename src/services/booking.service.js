import { Booking } from '../database/models';

class BookingService {
  static createBooking = async (data) => {
    const booking = await Booking.create(data);
    return booking;
  };

  static findBooking = async (searchParams) => {
    const booking = await Booking.findOne({ where: searchParams });

    if (!booking) {
      throw new Error('booking not found');
    }

    if (booking.id) {
      return booking;
    }

    throw new Error();
  };

  static checkBooking = async (params) => {
    const booking = await Booking.findOne({ where: params });

    if (!booking) {
      throw new Error('Found');
    }
    return booking;
  };

  static async findBookings() {
    const bookings = await Booking.findAll();
    if (!bookings) {
      throw new Error('There no bookings yet');
    }
    return bookings;
  }

  static async updateBooking(user, param) {
    const updatedbooking = await Booking.update(user, {
      where: [param],
    });
    return updatedbooking;
  }

  static async deleteBooking(param) {
    const booking = await Booking.destroy({
      where: param,
    });
    return booking;
  }
}

export default BookingService;
