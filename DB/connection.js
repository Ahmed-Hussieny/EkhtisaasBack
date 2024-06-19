import mongoose from "mongoose"


// ^ DataBase Connecton-----------------------------------
const db_Connection =async()=>{
    await mongoose.connect(process.env.LOCAL_HOST_URL)
    .then((res)=>console.log("DB connected Successfully"))
    .catch((err)=>console.log("DB fail to connect",err))
}

export default db_Connection;