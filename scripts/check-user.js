const { User, Role } = require("../models");
const { db } = require("../models");

const checkUser = async () => {
    try {
        await db.authenticate();
        console.log("Database connected");

        const user = await User.findOne({ 
            where: { email: "tris@gmail.com" },
            include: Role
        });

        if (!user) {
            console.log("User tris@gmail.com not found");
            return;
        }

        console.log("\n=== User Info ===");
        console.log("ID:", user.id);
        console.log("Email:", user.email);
        console.log("Name:", user.name);
        console.log("isStaff:", user.isStaff);
        console.log("roleId:", user.roleId);
        
        if (user.Role) {
            console.log("\n=== Role Info ===");
            console.log("Role Name:", user.Role.name);
            console.log("canLendBooks:", user.Role.canLendBooks);
            console.log("canManageBooks:", user.Role.canManageBooks);
            console.log("canManageStaffs:", user.Role.canManageStaffs);
            console.log("canManageUsers:", user.Role.canManageUsers);
        } else {
            console.log("\n=== No Role Assigned ===");
        }

    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        await db.close();
    }
}

checkUser();
