const { findUserById } = require("../services/user.service");
const { db } = require("../models");

const resetPassword = async () => {
    try {
        await db.authenticate();
        console.log("Database connected successfully");

        // Change this to your user ID and desired password
        const userId = "35581d42-ac67-4cd4-96e4-33fc46b1d7d9";
        const newPassword = "password123";

        const user = await findUserById(userId);
        user.password = newPassword;
        await user.save();

        console.log(`Password reset for user: ${user.username} (${user.email})`);
        console.log(`New password: ${newPassword}`);

    } catch (error) {
        console.error("Error resetting password:", error);
    } finally {
        await db.close();
        console.log("Database connection closed");
    }
}

resetPassword();
