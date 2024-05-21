import mongoose from 'mongoose'

const connectDb = async (url: string): Promise<void> => {
    try {
        await mongoose.connect(url)
        console.log("Database Connection is Successful");
    } catch (error) {
        console.log("Database Connection Error", error)
        process.exit(1)
    }
}

export default connectDb