const { findOneRole, findRoleByIdAndDelete } = require("../services/role.service");
const { findUserById } = require("../services/user.service");
const { db } = require("../models");

const deleteAdmin = async () => {
    try {
        await db.authenticate();
        console.log("Database connected successfully");

        // Find and remove admin role from user
        const user = await findUserById("");
        user.isStaff = false;
        user.roleId = null;
        await user.save();
        console.log(`User ${user.username} (${user.email}) - admin privileges removed`);

    } catch (error) {
        console.error("Error removing admin:", error);
    } finally {
        await db.close();
        console.log("Database connection closed");
    }
}

deleteAdmin();
