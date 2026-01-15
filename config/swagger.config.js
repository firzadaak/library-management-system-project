const { name, version } = require("../package.json");
const swaggerJSDoc = require("swagger-jsdoc");

const swaggerConfig = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: name,
            version,
            description: 'Library Management System API - Manage books, users, roles, and borrowing sessions',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ],
        tags: [
            {
                name: 'Books',
                description: 'Book management and borrowing endpoints'
            },
            {
                name: 'Users',
                description: 'User authentication and management endpoints'
            },
            {
                name: 'Admin',
                description: 'Administrative endpoints for staff and user management'
            },
            {
                name: 'Roles',
                description: 'Role and permission management endpoints'
            }
        ],
        components: {
            schemas: {
                BookDto: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Book ID'
                        },
                        title: {
                            type: 'string',
                            description: 'Book title'
                        },
                        author: {
                            type: 'string',
                            description: 'Book author'
                        },
                        isAvailable: {
                            type: 'boolean',
                            description: 'Whether the book is available for borrowing',
                            default: true
                        },
                        borrower: {
                            type: 'string',
                            format: 'uuid',
                            nullable: true,
                            description: 'User ID of current borrower (null if available)'
                        },
                        User: {
                            nullable: true,
                            description: 'Populated borrower user information',
                            allOf: [
                                {
                                    $ref: '#/components/schemas/UserDto'
                                }
                            ]
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation timestamp'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update timestamp'
                        }
                    }
                },
                CreateBookDto: {
                    type: 'object',
                    required: ['title', 'author'],
                    properties: {
                        title: {
                            type: 'string',
                            description: 'Book title',
                            minLength: 1,
                            maxLength: 255,
                            example: 'The Great Gatsby'
                        },
                        author: {
                            type: 'string',
                            description: 'Book author',
                            minLength: 1,
                            maxLength: 255,
                            example: 'F. Scott Fitzgerald'
                        }
                    }
                },
                UpdateBookDto: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                            description: 'Book title'
                        },
                        author: {
                            type: 'string',
                            description: 'Book author'
                        }
                    }
                },
                UserDto: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'User ID'
                        },
                        username: {
                            type: 'string',
                            description: 'Username'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email'
                        },
                        isStaff: {
                            type: 'boolean',
                            description: 'Whether user is staff member'
                        },
                        roleId: {
                            type: 'string',
                            format: 'uuid',
                            nullable: true,
                            description: 'Role ID if user is staff'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation timestamp'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update timestamp'
                        }
                    }
                },
                RoleDto: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Role ID'
                        },
                        name: {
                            type: 'string',
                            description: 'Role name'
                        },
                        canLendBooks: {
                            type: 'boolean',
                            description: 'Permission to lend/borrow books'
                        },
                        canManageBooks: {
                            type: 'boolean',
                            description: 'Permission to manage books'
                        },
                        canManageStaffs: {
                            type: 'boolean',
                            description: 'Permission to manage staff members'
                        },
                        canManageUsers: {
                            type: 'boolean',
                            description: 'Permission to manage users'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation timestamp'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update timestamp'
                        }
                    }
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'object',
                            properties: {
                                code: {
                                    type: 'integer',
                                    description: 'HTTP status code',
                                    example: 500
                                },
                                message: {
                                    type: 'string',
                                    description: 'Error message',
                                    example: 'Internal server error'
                                }
                            }
                        }
                    }
                },
                LoginRequest: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address',
                            example: 'user@example.com'
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            description: 'User password',
                            minLength: 6,
                            example: 'password123'
                        }
                    }
                },
                SignUpRequest: {
                    type: 'object',
                    required: ['username', 'email', 'password'],
                    properties: {
                        username: {
                            type: 'string',
                            description: 'Unique username',
                            minLength: 3,
                            maxLength: 255,
                            example: 'johndoe'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address',
                            example: 'john@example.com'
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            description: 'User password',
                            minLength: 6,
                            example: 'securepassword123'
                        }
                    }
                }
            }
        }
    },
    apis: ["./routers/*.js", "./models/*.js"],
}

const swaggerSpec = swaggerJSDoc(swaggerConfig);

module.exports = { swaggerSpec };