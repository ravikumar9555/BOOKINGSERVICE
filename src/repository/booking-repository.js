const {Booking} = require('../models/index');
const { ValidationError, AppError } = require('../utils/errors/index');
const{StatusCodes}= require('http-status-codes')

class BookingRepository{
        async create(data){
            try {
                const booking = await Booking.create(data);
                console.log(booking);
                return booking;
            } catch (error) {
                if(error.name='SequelizeValidationError'){
                    throw new ValidationError(error);
                }
                throw new AppError('RepositoryError', 
                    'cannot Create Booking', 
                    'There Was Some Issue creating The booking , Please Try Later',
                StatusCodes.INTERNAL_SERVER_ERROR)
            }
        }

        async update(bookingId, data){
            try {
                const booking = await Booking.findByPk(bookingId);
                if(data.status){
                    booking.status = data.status;
                }
                await booking.save();
                return booking;
            } catch (error) {
                  throw new AppError('RepositoryError', 
                    'cannot update Booking', 
                    'There Was Some Issue updating The booking , Please Try Later',
                StatusCodes.INTERNAL_SERVER_ERROR)
            }
        }
}

module.exports= BookingRepository;