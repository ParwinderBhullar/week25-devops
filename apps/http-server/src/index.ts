import "dotenv/config";
import express from "express";
import { prisma } from "@repo/db";


const app = express();

app.use(express.json());

app.post("/user", async (req, res) => {
    const { username, password } = req.body;

    const user = await prisma.user.create({
        data: {
            username,
            password
        }
    });

    res.json(user);
});

app.listen(3002, () => {
    console.log("Listening on port 3002");
});