import {Pool}from 'pg'

const pool = new Pool({

    connectionString:process.env.DATABASE_URL,
});
const connectDB = async() =>{
    try {
        const client = await pool.connect();
        console.log("PostgreSQL connected")
        client.release();
    } catch (error) {
        console.error("PostgreSQL connection error:",error.message);
        process.exit(1);
        
    }
}
export{pool,connectDB}