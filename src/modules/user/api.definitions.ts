export default {
    server: {
      tags: [
        {
          name: "User",
          description: "API for managing users"
        }
      ],
      paths: {
        "/user": {
          get: {
            security: [
              {
                bearerAuth: []
              }
            ],
            tags: ["User"],
            summary: "Get all users",
            description: "API to fetch all users",
            operationId: "getAllUsers",
            parameters: [
              {
                name: "page",
                in: "query",
                required: false,
                schema: {
                  type: "integer",
                  example: 1
                },
                description: "The page number to fetch"
              },
              {
                name: "pageSize",
                in: "query",
                required: false,
                schema: {
                  type: "integer",
                  example: 10
                },
                description: "The number of users per page"
              },
              {
                name: "role",
                in: "query",
                required: false,
                schema: {
                  type: "string",
                  example: "ADMIN"
                },
                description: "Filter users by role"
              },
              {
                name: "search",
                in: "query",
                required: false,
                schema: {
                  type: "string",
                  example: "John"
                },
                description: "Search users by name or email"
              }
            ],
            responses: {
              200: {
                description: "Successful operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/GetAllUsersRequest"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/user/{id}": {
          get: {
            security: [
              {
                bearerAuth: []
              }
            ],
            tags: ["User"],
            summary: "Get user by ID",
            description: "API to fetch a user by ID",
            operationId: "getUserById",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                description: "ID of the user to fetch",
                schema: {
                  type: "string"
                }
              }
            ],
            responses: {
              200: {
                description: "Successful operation",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/GetUserResponse"
                    }
                  }
                }
              },
              404: {
                description: "User not found",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        success: {
                          type: "boolean",
                          example: false
                        },
                        message: {
                          type: "string",
                          example: "User not found"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          put: {
            security: [
              {
                bearerAuth: []
              }
            ],
            tags: ["User"],
            summary: "Update user by ID",
            description: "API to update a user by ID",
            operationId: "updateUserById",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                description: "ID of the user to update",
                schema: {
                  type: "string"
                }
              }
            ],
            requestBody: {
              description: "Payload for updating a user",
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/UpdateUserRequest"
                  }
                }
              }
            },
            responses: {
              200: {
                description: "User updated successfully",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/UpdateUserResponse"
                    }
                  }
                }
              },
              400: {
                description: "Bad request",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        success: {
                          type: "boolean",
                          example: false
                        },
                        message: {
                          type: "string",
                          example: "Unable to update user"
                        }
                      }
                    }
                  }
                }
              },
              404: {
                description: "User not found",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        success: {
                          type: "boolean",
                          example: false
                        },
                        message: {
                          type: "string",
                          example: "User not found"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          delete: {
            security: [
              {
                bearerAuth: []
              }
            ],
            tags: ["User"],
            summary: "Delete user by ID",
            description: "API to delete a user by ID",
            operationId: "deleteUserById",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                description: "ID of the user to delete",
                schema: {
                  type: "string"
                }
              }
            ],
            responses: {
              200: {
                description: "User deleted successfully",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        success: {
                          type: "boolean",
                          example: true
                        },
                        message: {
                          type: "string",
                          example: "User deleted successfully"
                        }
                      }
                    }
                  }
                }
              },
              404: {
                description: "User not found",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        success: {
                          type: "boolean",
                          example: false
                        },
                        message: {
                          type: "string",
                          example: "User not found"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      components: {
        schemas: {
          GetAllUsersRequest: {
            type: "object",
            properties: {
              page: {
                type: "string",
                example: "1"
              },
              pageSize: {
                type: "string",
                example: "5"
              },
              roleId: {
                type: "string",
                example: "123e4567-e89b-12d3-a456-426614174000"
              },
              search:{
                type: "string",
                example: "john"
              },
            }
          },
          GetUserResponse: {
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "123e4567-e89b-12d3-a456-426614174000"
              },
              name: {
                type: "string",
                example: "John Doe"
              },
              email: {
                type: "string",
                example: "john.doe@example.com"
              },
              roles: {
                type: "array",
                items: {
                  type: "string"
                },
                example: ["admin", "user"]
              },
              createdAt: {
                type: "string",
                example: "2023-06-18T17:35:47.699Z"
              },
              updatedAt: {
                type: "string",
                example: "2023-06-18T17:35:47.699Z"
              }
            }
          },
          UpdateUserRequest: {
            type: "object",
            properties: {
              firstName: {
                type: "string",
                required: true,
                example: "Krishna"
              },
              lastName: {
                type: "string",
                required: true,
                example: "Chaudhary"
              },
              username: {
                type: "string",
                required: true,
                example: "krimson"
              },
              email: {
                type: "string",
                required: true,
                example: "uniqkrimson100@gmail.com"
              },
              phone: {
                type: "string",
                required: true,
                example: "9800768098"
              },
              roleId: {
                type: "string",
                required: true,
                example: "47e96982-b900-4db3-a956-210580358576"
              }
            }
          },
          UpdateUserResponse: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true
              },
              message: {
                type: "string",
                example: "User updated successfully"
              },
              data: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    example: "123e4567-e89b-12d3-a456-426614174000"
                  }
                }
              }
            }
          },
          GetAllUsersResponse: {
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "123e4567-e89b-12d3-a456-426614174000"
              },
              name: {
                type: "string",
                example: "John Doe"
              },
              email: {
                type: "string",
                example: "john.doe@example.com"
              },
              roles: {
                type: "array",
                items: {
                  type: "string"
                },
                example: ["admin", "user"]
              },
              createdAt: {
                type: "string",
                example: "2023-06-18T17:35:47.699Z"
              },
              updatedAt: {
                type: "string",
                example: "2023-06-18T17:35:47.699Z"
              }
            }
          }
        }
      }
    }
  }
  