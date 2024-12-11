import { PrismaClient } from "@prisma/client";
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt'


dotenv.config(); //load env variables

const prisma = new PrismaClient();

async function main() {
  const superAdminEmail = process.env.SUPERADMIN_EMAIL!;
  const superAdminPassword = process.env.SUPERADMIN_PASSWORD!;
  const superAdminUsername = process.env.SUPERADMIN_USERNAME!;
  const superAdminFirstName = process.env.SUPERADMIN_FIRSTNAME!;
  const superAdminLastName = process.env.SUPERADMIN_LASTNAME!;
  const superAdminPhone = process.env.SUPERADMIN_PHONE!;

  // Step 1: Check if the Admin role exists

  const existingRole = await prisma.role.findUnique({
    where: {
      name: "Admin"
    }
  });
  let adminRoleId: string;

  if (!existingRole) {
    // Step 2: Seed the Admin role if not present

    console.log("Seeding Admin Role...");

    const newRole = await prisma.role.create({
      data: {
        name: "Admin",
        type: "ADMIN",
        permissions: ["CREATE_USER", "DELETE_USER", "MANAGE_ROLES"]
      }
    });
    adminRoleId = newRole.id;
    console.log("Admin Role Seeded Successfully");
  } else {
    // If the Admin role exists, use its ID

    adminRoleId = existingRole.id;
    console.log("Admin Role already exists");
  }

  // Step 3: Check if the super admin already exists

  const existingAdmin = await prisma.users.findUnique({
    where: {
      email: superAdminEmail
    }
  });

  if (existingAdmin) {
    console.log("Super Admin already exists");
    return;
  }

  // Step 4: Hash the password

  const hashedPassword = await bcrypt.hash(superAdminPassword, 10);

  // Step 5: Create the super admin user with the dynamically retrieved admin role ID
  await prisma.users.create({
    data: {
      firstName: superAdminFirstName,
      lastName: superAdminLastName,
      email: superAdminEmail,
      password: hashedPassword,
      username: superAdminUsername,
      role : {
        connect: {id: adminRoleId}
      },
      status: "ACTIVE",
      phone: superAdminPhone // Add phone number
    }
  });

}


main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });