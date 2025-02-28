import { PrismaClient } from "@prisma/client"; 
const prisma = new PrismaClient()


async function main()  {
    console.log("Seeding test data... ");

      // Create a test user
      const user = await prisma.user.create({
        data: {
            email: "testuser@example.com",
            name: "Test User",
        },
  });

  console.log("✅ Created user:", user);

  // Create a wallet for the user
  const wallet = await prisma.wallet.create({
    data: {
      userId: user.id, // Links wallet to the user
      balance: 100.0,  // Sets an initial balance
    },
  });

  console.log("✅ Created wallet:", wallet);

  const transaction = await prisma.transaction.create({
    data: {
        walletId: wallet.id,
        amount: 50.0,
        type: "deposit",
    }
  })

  console.log("✅ Created transaction:", transaction);
}

main()
.catch((e) => console.error("❌ Error seeding data:", e))
.finally(() => prisma.$disconnect());