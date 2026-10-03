
import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
 name:String,
 companies:[String],
 allowedEmails:[String]
});

export default mongoose.model("Client", clientSchema);
