import { connect,disconnect } from 'mongoose';
async function connectToDB() {
    try{
        await connect(process.env.MONGOOSE_URL);
    } catch (error) {
        console.log(error);
        throw new Error("Can't connect to MongoDB");
    }
}

async function disconnectFromDB() {
    try{
        await disconnect();
    } catch (error) {
        console.log(error);
        throw new Error("Can't disconnect from MongoDB");
    }
}

export { connectToDB, disconnectFromDB };