import "dotenv/config";
import { WebSocketServer } from "ws";
import { prisma } from "@repo/db";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", async (ws) => {
    console.log("Client connected");

    try {
        const user = await prisma.user.create({
            data: {
                username: "user_" + Math.floor(Math.random() * 100000),
                password: "pass_" + Math.floor(Math.random() * 100000)
            }
        });

        console.log("User created:", user);

        ws.send(JSON.stringify({
            message: "User created",
            user
        }));
    } catch (error: any) {
        console.error(error);

        ws.send(JSON.stringify({
            error: error.code,
            message: error.message
        }));
    }
});

console.log("WebSocket server running on port 8080");