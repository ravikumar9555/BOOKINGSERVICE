const{BookingRepository} = require('../repository/index')
const{FLIGHT_SERVICE_PATH} = require('../config/serverConfig')
const axios= require('axios');
const { ServiceError } = require('../utils/errors');
class BookingService{
        constructor(){
            this.bookingRepository = new BookingRepository();
        }

        async createBooking(data){
        try {
             const flightId = data.flightId;
             //console.log(FLIGHT_SERVICE_PATH)
             const getFlightURL= `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
             const response = await axios.get(getFlightURL);
             const flightData = response.data.data;
             console.log(flightData, data);
                let priceOfTheFlight =flightData.price;
                if(data.noOfSeats> flightData.totalSeats){
                  throw new ServiceError('Something went wrong in the booking service ',
                    'Insufficient seats in flight'
                  )
                }
                const totalCost = priceOfTheFlight*data.noOfSeats;
                const bookingPayload = {... data, totalCost};
                //console.log(bookingPayload)
                const booking = await this.bookingRepository.create(bookingPayload);
                //console("booking, ", booking);
                const updateFlightRequestURL =  `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
                await axios.patch(updateFlightRequestURL, {totalSeats: flightData.totalSeats-booking.noOfSeats});
               const finalBooking= await this.bookingRepository.update(booking.id, {status: 'Booked'});
                return finalBooking;

           } catch (error) {
            //console.log('Booking service', error);
            if(error.name=='RepositoryError' || error.name=='ValidationError'){
              throw error;
            }
            throw new ServiceError();
           }
        }
}

module.exports=BookingService;