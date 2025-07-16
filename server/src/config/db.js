import mongoose from "mongoose"

export const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('====================================');
        console.log("MongoDB Connected successfully!!! ");
        console.log('====================================');
    } catch (error) {
        console.error("Eror connection to MongoDB",error);
        process.exit(1);
    }
}