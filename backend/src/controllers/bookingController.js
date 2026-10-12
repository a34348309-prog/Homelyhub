
import {Property} from "../Models/propertyModel.js";
import {Booking} from "../Models/bookingModel.js";
 
//Create Order
const createOrder =  async(req,res)=>{
    const {price,propertyId,startDate,endDate,guests} =req.body;

    const orderId = "order_" + Date.now();
    res.json({
        success:true,
        message: "Order created successfully",
        orderId,
        price,
        propertyId,
        startDate,
        endDate,
        guests
    })
}


//Verify Payment

const verifyPayment = async(req,res) =>{
    const {orderID, bookingDetails, forceStatus} = req.body;

    if(forceStatus === "success"){
        const paymentId = "pay_" + Date.now();

        const newBooking = await Booking.create({
            user: req.user.id,
            property: bookingDetails.propertyId,
            price: bookingDetails.price,
            startDate: bookingDetails.startDate,
            endDate: bookingDetails.endDate,
            guests: bookingDetails.guests,
            paymentId: paymentId,
            numberOfNights: bookingDetails.Nights,
            paid:true
        })
        const updatedProperty = await Property.findByIdAndUpdate(
            bookingDetails.propertyId,{
                $push:{
                    currentBookings:{
                        bookingId:newBooking._id,
                        startDate:newBooking.startDate,
                        endDate:newBooking.endDate,
                        userId:newBooking.user._id
                    }
                }
            },
            {new:true}
        );
        res.json({
            success:true,
            message:"Payment successful, booking confirmed",
            paymentId,
            orderID,
            booking:newBooking
        });
    }else{
        res.status(400).json({
            success:false,
            message:"Payment failed",
            orderID
        });
    }
        
 }

 //Get my bookings(Booking history)
 const getUserBookings = async(req,res)=>{
    try{

        const bookings = await Booking.find({
            user:req.user._id
        }).populate("property");
        res.status(200).json({
            status:"Success",
            data:{
                bookings
            }
        })

    }catch(error){
        res.status(401).json({
            status:"Failed",
            message:error.message
        })

    }
 }
    
//Get one booking details
const getBookingDetails = async(req,res)=>{

    try{

        const bookings = await Booking.findById(req.params.bookingId).populate("user property");
        res.status(200).json({
            status:"Success",
            data:{
                bookings
            }
        })

    }catch(error){
        res.status(401).json({
            status:"Failed",
            message:error.message
        })
    }
}

export {getBookingDetails, getUserBookings, createOrder, verifyPayment}