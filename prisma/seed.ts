import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.offer.deleteMany(); // Hapus semua data offers dulu biar clean

  await prisma.offer.createMany({
    data: [
      {
        title: "Luxury Beach Hotel",
        type: "hotel",
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      },
      {
        title: "Discounted Flight to Rome",
        type: "flight",
        imageUrl: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92",
      },
      {
        title: "Holiday Package Paris",
        type: "multi",
        imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      },
      {
        title: "Romantic City Hotel",
        type: "hotel",
        imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      },
      {
        title: "Flight to the Desert",
        type: "flight",
        imageUrl: "https://images.unsplash.com/photo-1516442719524-a603408c90cb",
      },
      {
        title: "Multi Destination Adventure",
        type: "multi",
        imageUrl: "https://images.unsplash.com/photo-1500048993952-dae08fb0a365",
      },
    ],
  });

  console.log("✅ Dummy offers inserted!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
