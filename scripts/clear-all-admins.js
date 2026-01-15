const { User } = require("../models");
const { db } = require("../models");

const clearAllAdmins = async () => {
    try {
        await db.authenticate();
        console.log("Database connected successfully");

        // Remove admin privileges from all users
        const result = await User.update(
            { 
                isStaff: false,
                roleId: null 
            },
            { 
                where: {} // Update all users
            }
        );

        console.log(`Admin privileges removed from ${result[0]} user(s)`);

    } catch (error) {
        console.error("Error clearing admins:", error);
    } finally {
        await db.close();
        console.log("Database connection closed");
    }
}

clearAllAdmins();
