
import jwt from "jsonwebtoken";

export const auth = (req,res,next)=>{
 const token = req.headers.authorization?.split(" ")[1];
 if(!token) return res.status(401).json({msg:"Token missing"});
 try{
   req.user = jwt.verify(token, process.env.JWT_SECRET);
   next();
 }catch(e){
   res.status(401).json({msg:"Invalid token"});
 }
}

export const isAdmin = (req,res,next)=>{
 if(req.user.role !== "admin") return res.status(403).json({msg:"Admins only"});
 next();
}
