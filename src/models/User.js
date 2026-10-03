
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
 name:String,
 email:{ type:String, unique:true },
 password:String,
 role:{ type:String, enum:["admin","client"], default:"client" },
 clientId:{ type: mongoose.Schema.Types.ObjectId, ref:"Client" }
});

export default mongoose.model("User", userSchema);
