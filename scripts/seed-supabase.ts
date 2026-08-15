import { config } from "dotenv";
config({ path: ".env.local" });

import {
  INITIAL_UPDATES,
  INITIAL_STATES,
  INITIAL_DATES,
  INITIAL_DOCUMENTS,
  INITIAL_COLLEGES,
  INITIAL_CUTOFFS,
  INITIAL_SEAT_MATRIX,
} from "../src/lib/mockData";

// Dynamically require PrismaClient to prevent build-time typecheck errors on Vercel
// when prisma generate has not been run prior to next build.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  console.log("🌱 Seeding initial mock data into live Supabase PostgreSQL database...");

  // 1. Seed States
  for (const st of INITIAL_STATES) {
    await prisma.state.upsert({
      where: { slug: st.slug },
      update: st,
      create: st,
    });
  }
  console.log(`✅ Seeded ${INITIAL_STATES.length} States`);

  // 2. Seed Colleges
  for (const col of INITIAL_COLLEGES) {
    await prisma.college.upsert({
      where: { slug: col.slug },
      update: col,
      create: col,
    });
  }
  console.log(`✅ Seeded ${INITIAL_COLLEGES.length} Colleges`);

  // 3. Seed Updates
  for (const upd of INITIAL_UPDATES) {
    await prisma.update.upsert({
      where: { slug: upd.slug },
      update: {
        ...upd,
        published_at: new Date(upd.published_at),
        created_at: new Date(upd.created_at),
      },
      create: {
        ...upd,
        published_at: new Date(upd.published_at),
        created_at: new Date(upd.created_at),
      },
    });
  }
  console.log(`✅ Seeded ${INITIAL_UPDATES.length} Updates`);

  // 4. Seed Important Dates
  for (const dt of INITIAL_DATES) {
    await prisma.importantDate.upsert({
      where: { id: dt.id },
      update: dt,
      create: dt,
    });
  }
  console.log(`✅ Seeded ${INITIAL_DATES.length} Important Dates`);

  // 5. Seed Documents
  for (const doc of INITIAL_DOCUMENTS) {
    await prisma.document.upsert({
      where: { id: doc.id },
      update: { ...doc, uploaded_at: new Date(doc.uploaded_at) },
      create: { ...doc, uploaded_at: new Date(doc.uploaded_at) },
    });
  }
  console.log(`✅ Seeded ${INITIAL_DOCUMENTS.length} Documents`);

  // 6. Seed Cutoffs
  for (const cut of INITIAL_CUTOFFS) {
    await prisma.cutoff.upsert({
      where: { id: cut.id },
      update: cut,
      create: cut,
    });
  }
  console.log(`✅ Seeded ${INITIAL_CUTOFFS.length} Cutoffs`);

  // 7. Seed Seat Matrix
  for (const sm of INITIAL_SEAT_MATRIX) {
    await prisma.seatMatrix.upsert({
      where: { id: sm.id },
      update: sm,
      create: sm,
    });
  }
  console.log(`✅ Seeded ${INITIAL_SEAT_MATRIX.length} Seat Matrix items`);

  console.log("🎉 Database Seeding Complete!");
}

seed()
  .catch((e) => {
    console.error("❌ Seeding Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
