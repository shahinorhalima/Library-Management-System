import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { Client } from 'pg';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('DATABASE_URL:', process.env.DATABASE_URL);

const connectionString = process.env.DATABASE_URL;
const client = new Client({ connectionString });
const adapter = new PrismaPg(client);

const prisma = new PrismaClient({ adapter });

async function main() {
  // ── Categories ─────────────────────────────────────
  const programming = await prisma.category.upsert({
    where: { name: 'Programming' },
    update: {},
    create: { name: 'Programming' },
  });

  const science = await prisma.category.upsert({
    where: { name: 'Science' },
    update: {},
    create: { name: 'Science' },
  });

  const fiction = await prisma.category.upsert({
    where: { name: 'Fiction' },
    update: {},
    create: { name: 'Fiction' },
  });

  console.log('✅ Categories seeded');

  // ── Authors ────────────────────────────────────────
  const robert = await prisma.author.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Robert C. Martin',
      bio: 'Software craftsman and author of Clean Code',
      image: 'https://i.pravatar.cc/150?img=1',
    },
  });

  const andy = await prisma.author.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Andy Hunt',
      bio: 'Co-author of The Pragmatic Programmer',
      image: 'https://i.pravatar.cc/150?img=2',
    },
  });

  const martin = await prisma.author.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Martin Fowler',
      bio: 'Chief Scientist at ThoughtWorks',
      image: 'https://i.pravatar.cc/150?img=3',
    },
  });

  console.log('✅ Authors seeded');

  // ── Books ──────────────────────────────────────────
  await prisma.book.upsert({
    where: { name: 'Clean Code' },
    update: {},
    create: {
      name: 'Clean Code',
      stock: 5,
      summary: 'A handbook of agile software craftsmanship.',
      authorId: robert.id,
      categoryId: programming.id,
    },
  });

  await prisma.book.upsert({
    where: { name: 'The Pragmatic Programmer' },
    update: {},
    create: {
      name: 'The Pragmatic Programmer',
      stock: 3,
      summary: 'From journeyman to master.',
      authorId: andy.id,
      categoryId: programming.id,
    },
  });

  await prisma.book.upsert({
    where: { name: 'Refactoring' },
    update: {},
    create: {
      name: 'Refactoring',
      stock: 4,
      summary: 'Improving the design of existing code.',
      authorId: martin.id,
      categoryId: programming.id,
    },
  });

  console.log('✅ Books seeded');

  // ── Students ───────────────────────────────────────
  await prisma.student.createMany({
    skipDuplicates: true,
    data: [
      { name: 'Rahim Uddin' },
      { name: 'Fatema Khanam' },
      { name: 'Arif Hossain' },
      { name: 'Nasrin Akter' },
    ],
  });

  console.log('✅ Students seeded');

  // ── Borrows ────────────────────────────────────────
  const student1 = await prisma.student.findFirst({
    where: { name: 'Rahim Uddin' },
  });
  const book1 = await prisma.book.findFirst({ where: { name: 'Clean Code' } });

  if (student1 && book1) {
    await prisma.borrow.create({
      data: {
        studentId: student1.id,
        bookId: book1.id,
        dueDate: new Date('2026-06-30'),
        status: 'BORROWED',
      },
    });
  }

  console.log('✅ Borrows seeded');
  console.log('\n🎉 Seed complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
