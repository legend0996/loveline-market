import prisma from "./src/utils/prisma.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const createAdmin = async () => {
  const email = "legenddigitalinnovation@gmail.com";
  const username = "codingmaster";
  const password = "Strongpassword@9999";

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.admins.create({
    data: {
      id: crypto.randomUUID(),
      email,
      username,
      password: hashedPassword,
    },
  });

  console.log("✅ Admin created successfully");
  process.exit();
};

createAdmin();