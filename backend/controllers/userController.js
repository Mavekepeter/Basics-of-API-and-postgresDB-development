import { pool } from "../configs/db.js";
import bcryptjs from "bcryptjs"

// Register user
export const registerUser = async (req,res) =>{
    try {
        const {name,email,password} = req.body;

        const userExists = await pool.query(
            "SELECT id FROM users WHERE  email = $1",
            [email]
        );
        if(userExists.rows.length > 0 ) {
            return res.status(400).json({message: "User already exists"})
        }
        //Hash password
        const hashedPassword = await bcryptjs.hash(password,10);
        const result = await pool.query(
            `INSERT INTO users (name,email,password)
            VALUES ($1,$2,$3)
            RETURNING id, name, email, created_at`,
            [name, email, hashedPassword]
        );
        res.status(201).json({
            message:"user registered successfully",
            user:result.rows[0],
        });
    } catch (error) {
        res.status(500).json({
            error:error.message,
            message:"User not registerd"
        });
        
        
    }
}