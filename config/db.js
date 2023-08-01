import mongoose from "mongoose";

const Connect_DB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connected mongo' + connect.connection.host);
    } catch (error) {
        console.log("Error", error);
        process.exit()
    }
}
export default Connect_DB