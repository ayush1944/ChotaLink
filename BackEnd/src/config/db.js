import mongoose from "mongoose";

function connect ()  {
    mongoose.connect(process.env.Mongo_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));
    }


export default connect;