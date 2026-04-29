// import mongoose from "mongoose";

// const connectDB = async () => {
//     try {
//         if (!process.env.MONGO_URI) {
//             throw new Error("❌ MONGO_URI is missing in .env file");
//         }

//         const conn = await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });

//         console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.error("❌ DB ERROR:", error.message);
//         process.exit(1);
//     }
// };

// export default connectDB;



import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error("❌ MONGO_URI is missing");
            return; // ❗ don't crash server
        }

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);

        // ❌ NEVER kill app in production (Render issue)
        // process.exit(1);

        // Optional: retry connection (better UX)
        setTimeout(connectDB, 5000); // retry after 5 sec
    }
};

export default connectDB;