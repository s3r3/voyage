import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const offersData = [
  {
    title: 'Bali Beachfront Resort',
    type: 'hotel',
    imageUrl:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4972?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    title: 'Tokyo Flight Deal',
    type: 'flight',
    imageUrl:
      'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    title: 'European Multi-City Tour',
    type: 'multi',
    imageUrl:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
];

async function seed() {
  try {
    // Kosongkan dulu tabel Offer
    await prisma.offer.deleteMany();

    // Tambahkan data baru
    await prisma.offer.createMany({
      data: offersData,
    });

    console.log('✅ Offers seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding offers:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
