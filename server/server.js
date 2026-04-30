// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import http from "http";
// import helmet from "helmet";
// import rateLimit from "express-rate-limit";
// import { Server } from "socket.io";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import boardRoutes from "./routes/boardRoutes.js";
// import listRoutes from "./routes/listRoutes.js";
// import cardRoutes from "./routes/cardRoutes.js";
// import { protect } from "./middleware/authMiddleware.js";

// dotenv.config();

// const app = express();

// //    SECURITY & MIDDLEWARE

// app.set("trust proxy", 1);

// app.use(helmet());

// app.use(
//     rateLimit({
//         windowMs: 15 * 60 * 1000,
//         max: 100,
//         standardHeaders: true,
//         legacyHeaders: false,
//     })
// );

// app.use(express.json());

// // app.use(
// //     cors({
// //         origin: process.env.CLIENT_URL || "http://localhost:3000",
// //         credentials: true,
// //     })
// // );

// app.use(
//     cors({
//         origin: "*",
//         credentials: true,
//     })
// );

// //    ROUTES

// app.get("/", (req, res) => {
//     res.send("API is running...");
// });

// app.get("/api/test", protect, (req, res) => {
//     res.json({
//         message: "Protected route working",
//         user: req.user,
//     });
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/boards", boardRoutes);
// app.use("/api/lists", listRoutes);
// app.use("/api/cards", cardRoutes);

// //    ERROR HANDLER

// app.use((err, req, res, next) => {
//     console.error("ERROR:", err.stack);

//     res.status(err.status || 500).json({
//         success: false,
//         message: err.message || "Something went wrong",
//     });
// });

// //    SOCKET.IO SETUP

// const server = http.createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin: process.env.CLIENT_URL || "http://localhost:3000",
//         credentials: true,
//     },
// });

// //    SOCKET EVENTS

// io.on("connection", (socket) => {
//     console.log("🔌 User connected:", socket.id);

//     // join board
//     socket.on("joinBoard", (boardId) => {
//         if (!boardId) return;
//         socket.join(boardId);
//     });

//     // leaveBoard
//     socket.on("leaveBoard", (boardId) => {
//         if (!boardId) return;
//         socket.leave(boardId);
//     });

//     // Card Move
//     socket.on("cardMove", (data) => {
//         if (!data?.boardId) return;
//         socket.to(data.boardId).emit("cardMoved", data);
//     });

//     // List Reorder
//     socket.on("listReorder", (data) => {
//         if (!data?.boardId) return;
//         socket.to(data.boardId).emit("listsReordered", data);
//     });

//     socket.on("disconnect", () => {
//         console.log("User disconnected:", socket.id);
//     });
// });

// // Global Socket IO
// app.set("io", io);

// // Start server

// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//     try {
//         await connectDB();

//         server.listen(PORT, "0.0.0.0", () => {
//             console.log(`Server running on port ${PORT}`);
//         });

//     } catch (error) {
//         console.error("DB ERROR:", error.message);
//         process.exit(1);
//     }
// };

// startServer();



import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";
import listRoutes from "./routes/listRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import { protect } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

// ================= SECURITY =================
app.set("trust proxy", 1);
app.use(helmet());

app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
    })
);

app.use(express.json());

// ================= CORS FIX =================

// fallback if env not set
const allowedOrigin =
    process.env.CLIENT_URL ||
    "https://trello-lite-mern-webdevmiteshs-projects.vercel.app";

app.use(
    cors({
        origin: allowedOrigin,
        credentials: true,
    })
);

// handle preflight requests (VERY IMPORTANT)
app.options("*", cors());

// ================= ROUTES =================

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.get("/api/test", protect, (req, res) => {
    res.json({
        message: "Protected route working",
        user: req.user,
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/cards", cardRoutes);

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Server Error",
    });
});

// ================= SOCKET.IO =================

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: allowedOrigin,
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("🔌 Connected:", socket.id);

    socket.on("joinBoard", (boardId) => {
        if (boardId) socket.join(boardId);
    });

    socket.on("leaveBoard", (boardId) => {
        if (boardId) socket.leave(boardId);
    });

    socket.on("cardMove", (data) => {
        if (data?.boardId) {
            socket.to(data.boardId).emit("cardMoved", data);
        }
    });

    socket.on("listReorder", (data) => {
        if (data?.boardId) {
            socket.to(data.boardId).emit("listsReordered", data);
        }
    });

    socket.on("disconnect", () => {
        console.log("Disconnected:", socket.id);
    });
});

app.set("io", io);

// ================= START SERVER =================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        server.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Startup Error:", error.message);
    }
};

startServer();