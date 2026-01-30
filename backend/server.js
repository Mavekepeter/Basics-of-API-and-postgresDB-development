import cookieParser from "cookie-parser";
import expresss from "express";
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from "./configs/db.js";

const app = expresss();
const port = process.env.PORT || 1000;

//middleware configurations
app.use(expresss.json());
app.use(cookieParser());
app.use(cors())

await connectDB()

app.get('/',(req,res)=>res.send("API is working well"))
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);

})