const { Router } = require("express");
const { isAuthenticated, isStaff, hasPermission } = require("../middleware/access-control.middleware");
const { getAllStaffsHandler, createStaffUserHandler, updateStaffUserHandler, deleteStaffUserHandler, getAllUsersHandler, removeUserHandler } = require("../controllers/admin.controller");

const adminRouter = Router();

/**
 * @openapi
 * /api/admin/staffs:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get all staff members
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Success, returns all staff members
 *       '403':
 *         description: Forbidden - requires staff with canManageStaffs permission
 *       '500':
 *         description: Internal server error
 *
 *   post:
 *     tags:
 *       - Admin
 *     summary: Create a new staff member
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleId
 *               - username
 *               - email
 *               - password
 *             properties:
 *               roleId:
 *                 type: string
 *                 format: uuid
 *                 description: Role ID for the staff member
 *               username:
 *                 type: string
 *                 description: Username for the staff member
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email for the staff member
 *               password:
 *                 type: string
 *                 description: Password for the staff member
 *     responses:
 *       '201':
 *         description: Staff member created successfully
 *       '403':
 *         description: Forbidden - requires staff with canManageStaffs permission
 *       '500':
 *         description: Internal server error
 *
 * /api/admin/staffs/{id}:
 *   patch:
 *     tags:
 *       - Admin
 *     summary: Update a staff member
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Staff member ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleId:
 *                 type: string
 *                 format: uuid
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       '202':
 *         description: Staff member updated successfully
 *       '403':
 *         description: Forbidden - requires staff with canManageStaffs permission
 *       '404':
 *         description: Staff member not found
 *       '500':
 *         description: Internal server error
 *
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Delete a staff member (demote to regular user)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Staff member ID
 *     responses:
 *       '200':
 *         description: Staff member demoted successfully
 *       '403':
 *         description: Forbidden - requires staff with canManageStaffs permission
 *       '404':
 *         description: Staff member not found
 *       '500':
 *         description: Internal server error
 *
 * /api/admin/users:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get all users
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Success, returns all users
 *       '403':
 *         description: Forbidden - requires staff with canManageUsers permission
 *       '500':
 *         description: Internal server error
 *
 * /api/admin/users/{id}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Delete a user
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '403':
 *         description: Forbidden - requires staff with canManageUsers permission
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */

adminRouter.use(isAuthenticated);
adminRouter.use(isStaff);
adminRouter.use(hasPermission("canManageStaffs"));

// GET /api/admin/staffs - Get all staff members
adminRouter
    .route("/staffs")
    .get(hasPermission("canManageStaffs"), getAllStaffsHandler)
    .post(hasPermission("canManageStaffs"), createStaffUserHandler);
adminRouter
    .route("/staffs/:id")
    .patch(hasPermission("canManageStaffs"), updateStaffUserHandler)
    .delete(hasPermission("canManageStaffs"), deleteStaffUserHandler);
adminRouter
    .route("/users")
    .get(hasPermission("canManageUsers"), getAllUsersHandler)
adminRouter
    .route("/users/:id")
    .delete(hasPermission("canManageUsers"), removeUserHandler);

module.exports = { adminRouter };