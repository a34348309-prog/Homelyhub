import slugify from "slugify";
import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({

    propertyName:{
        type:String,
        required:[true,"Please enter property name!"],
    },
    description:{
        type:String,
        required:[true,"Please enter property description!"]
    },
    extraInfo:{
        type:String,
        default:"xyz"
    },
    propertType:{
        type:String,
        enum:["House","Flat","Guest House","Hotel"],
        default:"House"
    },

    roomtType:{
        type:String,
        enum:["Anytype","Room","Entire House"],
        default:"Anytype"
    },
    maximumGuest:{
        type:Number,
        requires:[true,"Please guve me the guest number"]
    },
    amenties:{
        type:String,
        required:true,
        enum:[
         "Wifi",
         "Kitchen",
         "AC",
         "Washing Machine",
         "TV",
         "Pool",
         "Free parking"
        ]
        
    },
    image:{
        type:[
            {
                public_id:{
                    type:String,
                
                },
                url:{
                    type:String,
                    required:true
                }
            }
        ],
        validate:{
            validator:function(arr){
                return arr.length >=6;

            
            },
            message: "The image should contain atleast 6 images"
            
        }
    },

    price:{
        type:Number,
        requires:[true,"please enter the price per night"],
        default:500,
    },
    address:{
        area:String,
        city:String,
        state:String,
        pincode:Number   
    },
    currentBooking:[
        {
            bookingId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Booking",
                 startDate:{
                         type:Date,
                     },
                    endDate:{
                            type:Date,
        
                    }
            }
        }
    ],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    slug:String,
    checkInTime:{type:String,default:"11:00"},
    checkOutTime:{type:String,default:"12:00"},
    

})


propertySchema.pre("save",function(){
    this.slug=slugify(this.propertyName,{lower:true});
   
})

propertySchema.pre("save",function(){
    this.address.city = this.address.city.toLowerCase().replaceAll(" ","")
    
})
const Property=mongoose.models.Property || mongoose.model("Property",propertySchema);
export { Property};