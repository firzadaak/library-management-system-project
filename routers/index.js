const { Router } = require('express');
const { bookRouter } = require('./book.router');
const { userRouter } = require('./user.router');
const { roleRouter } = require('./role.router');
const { adminRouter } = require('./admin.router');
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('../config/swagger.config');

const router = Router();

// Mount book routes at /api/books
router.use("/books", bookRouter);

// Mount user routes at /api/users
router.use("/users", userRouter);

// Mount role routes at /api/roles
router.use("/roles", roleRouter);

// Mount admin routes at /api/admin
router.use("/admin", adminRouter);

// Mount Swagger documentation at /api/docs
router.use("/docs", swaggerUi.serve);
router.use("/docs", swaggerUi.setup(swaggerSpec));

module.exports = { router };