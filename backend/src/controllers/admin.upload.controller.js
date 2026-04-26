import fs from "fs";
import csv from "csv-parser";
import prisma from "../utils/prisma.js";

const normalizePhone = (phone) => {
  if (phone.startsWith("0")) return phone.replace(/^0/, "254");
  if (phone.startsWith("+")) return phone.replace("+", "");
  return phone;
};

export const uploadBuyers = async (req, res) => {
  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      for (const row of results) {
        const phone = normalizePhone(row.phone || row.Phone);

        if (!phone) continue;

        try {
          await prisma.buyer.upsert({
            where: { phone },
            update: {},
            create: {
              phone,
              source: "upload",
            },
          });
        } catch (err) {
          console.log("skip:", phone);
        }
      }

      fs.unlinkSync(req.file.path);

      res.json({ message: "Upload complete" });
    });
};