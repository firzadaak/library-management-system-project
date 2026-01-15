const { createNewRole, findOneRole } = require("../services/role.service");
const { findUserById } = require("../services/user.service");
const { db } = require("../models");

const setAdmin = async () => {
    try {
        await db.authenticate();
        console.log("Database connected successfully");

        // Check if admin role exists, if not create it
        let admin = await findOneRole({ name: "admin" });
        if (!admin) {
            admin = await createNewRole({
                name: "admin",
                canLendBooks: true,
                canManageBooks: true,
                canManageStaffs: true,
                canManageUsers: true
            });
            console.log("Admin role created");
        } else {
            console.log("Admin role already exists");
        }

        const user = await findUserById("97c8bc0b-3136-4a20-955b-8f8958bc8882");
        user.isStaff = true;
        user.roleId = admin.id;
        await user.save();

        console.log(user);
        console.log("Admin user set successfully");
    } catch (error) {
        console.error("Error setting admin:", error);
    } finally {
        await db.close();
        console.log("Database connection closed");
    }
}

setAdmin();