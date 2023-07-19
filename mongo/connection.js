import mongoose from 'mongoose'

const connectToMongoDB = async()=>{
    try{

        const mongoURL = process.env.NODE_ENV === "Development" ? process.env.MONGO_TEST_URL : process.env.MONGO_PROD_URL;
        const dbName = process.env.NODE_ENV === "Development" ? "task-tracker-test" : "task-tracker";
    
        //Connect to MongoDB
        await mongoose.connect(mongoURL,{
            useNewUrlParser : true,
            useUnifiedTopology : true,
            dbName : dbName
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