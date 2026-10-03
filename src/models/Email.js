
import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
 clientId:{ 
    type: mongoose.Schema.Types.ObjectId, ref:"Client" 
},
 recipient:String,
 sender:String,
 senderCompany:String,
 sentAt:Date,
 smtpId:String,
 content:String
});

export default mongoose.model("Email", emailSchema);
