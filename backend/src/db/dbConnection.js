import mongoose from "mongoose";
// import env from "dotenv";

export const dbConnection = async (req,res) => {
        try {
          mongoose.connect(process.env.MONGODB_URL)
          console.log("MongoDB connected");

        } catch (error) {
            console.log("Db error occurred:", error);
            return res.status(500).json({ message: "Server error" });
        }
}