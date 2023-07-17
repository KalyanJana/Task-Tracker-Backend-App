import mongoose from 'mongoose'

const connectToMongoDB = async()=>{
    try{
        //Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser : true,
            useUnifiedTopology : true,
            dbName : "task-tracker"
        })
        //Connecton established
        console.log("connected to MongoDB")

        //Event handlers for the database connection
        mongoose.connection.on('error',(error)=>{
            console.log("MongoDB connection error :", error)
        })

        mongoose.connection.on('disconnected',()=>{
            console.log("MongoDB disconnected")
        })


        //Gracefully handle process termination
        process.on('SIGINT', async()=>{
            try{
                await mongoose.connection.close()
                console.log("MongoDB connection closed")
                process.exit(0)
            }catch(error){
                console.log("Error closing MongoDB connection :" , error)
                process.exit(1)
            }
        })
    }catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
      }
}

export default connectToMongoDB