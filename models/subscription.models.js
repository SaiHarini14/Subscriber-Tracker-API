import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'Name is required'],
        trim:true,
        minLength:2,
        maxLength:50
    },
    price:{
        type:Number,
        required:[true, 'Price is required'],
        min : [0,'Price can be greater than zero']
    },
    currency:{
        type:String,
        enum:['RUPEES','USD','EUR'],
        default:'RUPEES'
    },
    paymentMethod:{
        type:String,
        required:true,
        trim:true
    },
    frequency:{
        type:String,
        required:true,
        enum:['daily','weekly','monthly','yearly']
    },
    category:{
        type:String,
        required:true,
        enum:['sports','news','arts','entertainment','technology','research','finance','politics','others']
    },
    status:{
        type:String,
        enum:['active','cancelled','expired'],
        default:'active'
    },
    startDate:{
        type:Date,
        required:true,
        validate:{
            validator : (value) => value <= new Date(),
            message: 'Start date must be in the past',
            }
        },
    renewalDate:{
        type:Date,
        required:true,
        validate:{
            validator: function(value) {
                return value > this.startDate;
            },
            message: 'Renewal date must be after start date',
        }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true
    }

}, {timestamps:true});

//auto-calculate if renewal date is missing
subcriptiomSchema.pre('save',function (next) {
    if(!this.renewalDate){
        const renewalPeriod={
            daily:1,
            weekly:7,
            monthly:30,
            yearly:365
        }

        //startdate- 1st jan
        //monthly
        //30 days
        //jan 31st- renewal date

        this.renewalDate=new Date(this.startDate)
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]);
    }

        //auto expire

    if(this.renewalDate < new Date()){
        this.status='expired';
    }

    next();
    
})

const Subscription = mongoose.model('Subscription',subscriptionSchema);

export default Subscription;