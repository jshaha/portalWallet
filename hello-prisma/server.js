import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";


const app = express();
const prisma = new PrismaClient();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("🚀 API is running!");
  });
  
  app.post("/users", async (req, res) => {
    const { email, name } = req.body;
    try {
      const user = await prisma.user.create({
        data: { email, name },
      });
      res.json(user);
    } catch (error) {
      console.error("❌ Error creating user:", error); // Log the actual error
      res.status(500).json({ error: "User creation failed", details: error.message });
    }
  });
  

  app.post("/wallets", async (req, res) => {
    const { userId, balance } = req.body;
    try {
      const wallet = await prisma.wallet.create({
        data: { userId, balance}, // Default balance: 100 USDC
      });
      res.json(wallet);
    } catch (error) {
      console.error("❌ Error creating user:", error); // Log the actual error
      res.status(500).json({ error: "Wallet creation failed", details: error.message });
    }
  });

  app.get("/wallets/:walletId", async (req, res) => {
    const { walletId } = req.params;
    try {
      const wallet = await prisma.wallet.findUnique({
        where: { id: walletId },
        include: { transactions: true },
      });
      res.json(wallet);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch wallet" });
    }
  });
  

  app.post("/transactions", async (req, res) => {
    const { walletId, amount, type } = req.body;

    try {
        // 🔹 Check if the wallet exists before creating a transaction
        const walletExists = await prisma.wallet.findUnique({
            where: { id: walletId },
        });

        if (!walletExists) {
            return res.status(400).json({ error: "Wallet ID does not exist. Please create a wallet first." });
        }

        // 🔹 Create the transaction
        const transaction = await prisma.transaction.create({
            data: { walletId, amount, type },
        });

        // 🔹 Update the wallet balance
        const wallet = await prisma.wallet.update({
            where: { id: walletId },
            data: {
                balance: { increment: type === "deposit" ? amount : -amount },
            },
        });

        res.json({ transaction, wallet });
    } catch (error) {
        console.error("❌ Error creating transaction:", error);
        res.status(500).json({ error: "Transaction failed", details: error.message });
    }
})

  
  const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
