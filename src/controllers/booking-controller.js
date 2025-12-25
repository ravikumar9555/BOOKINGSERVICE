const {BookingService} = require('../services/index')
const bookingService = new BookingService();
const {StatusCodes} = require('http-status-codes');
const create = async (req , res)=>{
        try {
            const response = await bookingService.createBooking(req.body);
            //console.log('Booking controller', response);
            return res.status(StatusCodes.OK).json({
                message:"Successfully Completed Booking",
                success: true,
                err :{},
                data: response
            })
        } catch (error) {
               // console.log('Booking controller', error);
            return res.status(error.StatusCodes).json({
                message:error.message,
                success: false,
                err:error.explanation,
                data: {}

            })
        }
}
module.exports={
        create
}