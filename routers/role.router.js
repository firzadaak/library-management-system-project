const { Router } = require("express");
const { isAuthenticated, isStaff, hasPermission } = require("../middleware/access-control.middleware");
const { findAllRolesHandler, newRoleHandler, updateRoleHandler, deleteRoleHandler } = require("../controllers/role.controller");

const roleRouter = Router();

/**
 * @openapi
 * /api/roles:
 *   get:
 *     tags:
 *       - Roles
 *     summary: Get all roles
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Success, returns all roles
 *       '403':
 *         description: Forbidden - requires staff with canManageStaffs permission
 *       '500':
 *         description: Internal server error
 *
 *   post:
 *     tags:
 *       - Roles
 *     summary: Create a new role
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the role
 *               canLendBooks:
 *                 type: boolean
 *                 default: false
 *                 description: Permission to lend books
 *               canManageBooks:
 *                 type: boolean
 *                 default: false
 *                 description: Permission to manage books
 *               canManageStaffs:
 *                 type: boolean
 *                 default: false
 *                 description: Permission to manage staff members
 *               canManageUsers:
 *                 type: boolean
 *                 default: false
 *                 description: Permission to manage users
 *     responses:
 *       '201':
 *         description: Role created successfully
 *       '403':
 *         description: Forbidden - requires staff with canManageStaffs permission
 *       '500':
 *         description: Internal server error
 *
 * /api/roles/{id}:
 *   patch:
 *     tags:
 *       - Roles
 *     summary: Update a role
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               canLendBooks:
 *                 type: boolean
 *               canManageBooks:
 *                 type: boolean
 *               canManageStaffs:
 *                 type: boolean
 *               canManageUsers:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Role updated successfully
 *       '403':
 *         description: Forbidden - requires staff with canManageStaffs permission
 *       '404':
 *         description: Role not found
 *       '500':
 *         description: Internal server error
 *
 *   delete:
 *     tags:
 *       - Roles
 *     summary: Delete a role
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Role ID
 *     responses:
 *       '200':
 *         description: Role deleted successfully
 *       '403':
 *         description: Forbidden - requires staff with canManageStaffs permission
 *       '404':
 *         description: Role not found
 *       '500':
 *         description: Internal server error
 */

roleRouter.use(isAuthenticated);
roleRouter.use(isStaff);
roleRouter.use(hasPermission("canManageStaffs"));

roleRouter
    .route("/")
    .get(findAllRolesHandler)
    .post(newRoleHandler)

roleRouter
    .route("/:id")
    .patch(updateRoleHandler)
    .delete(deleteRoleHandler)

module.exports = { roleRouter };