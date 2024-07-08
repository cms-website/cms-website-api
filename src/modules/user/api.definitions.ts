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
            responses: {
              200: {
                description: "Successful operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/GetAllUsersResponse"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/user/create": {
          post: {
            security: [
              {
                bearerAuth: []
              }
            ],
            tags: ["User"],
            summary: "User create API",
            description: "API for creating a user",
            operationId: "userCreate",
            requestBody: {
              description: "Payload for creating a user",
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/CreateUserRequest"
                  }
                }
              }
            },
            responses: {
              201: {
                description: "User created successfully",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/CreateUserResponse"
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
                          example: "Unable to create user"
                        }
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
          CreateUserRequest: {
            type: "object",
            properties: {
              name: {
                type: "string",
                required: true,
                example: "John Doe"
              },
              email: {
                type: "string",
                required: true,
                example: "john.doe@example.com"
              },
              password: {
                type: "string",
                required: true,
                example: "password123"
              },
              roles: {
                type: "array",
                items: {
                  type: "string"
                },
                example: ["admin", "user"]
              }
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
          CreateUserResponse: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true
              },
              message: {
                type: "string",
                example: "User created successfully"
              },
              data: {
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
          },
          UpdateUserRequest: {
            type: "object",
            properties: {
              name: {
                type: "string",
                required: true,
                example: "John Doe"
              },
              email: {
                type: "string",
                required: true,
                example: "john.doe@example.com"
              },
              roles: {
                type: "array",
                items: {
                  type: "string"
                },
                example: ["admin", "user"]
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
  