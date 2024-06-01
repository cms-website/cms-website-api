export default {
    server: {
      tags: [
        {
          name: "Role",
          description: "API for managing roles"
        }
      ],
      paths: {
        "/role": {
            get: {
              security: [
                {
                  bearerAuth: []
                }
              ],
              tags: ["Role"],
              summary: "Get all roles",
              description: "API to fetch all roles",
              operationId: "getAllRoles",
              responses: {
                200: {
                  description: "Successful operation",
                  content: {
                    "application/json": {
                      schema: {
                        type: "array",
                        items: {
                          $ref: "#/components/schemas/GetAllRolesResponse"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
        "/role/create": {
          post: {
            security: [
              {
                bearerAuth: []
              }
            ],
            tags: ["Role"],
            summary: "Role create API",
            description: "API for creating a role",
            operationId: "roleCreate",
            requestBody: {
              description: "Payload for creating a role",
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/CreateRoleRequest"
                  }
                }
              }
            },
            responses: {
              201: {
                description: "Role created successfully",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/CreateRoleResponse"
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
                          example: "Unable to create role"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/role/{id}": {
          get: {
            security: [
              {
                bearerAuth: []
              }
            ],
            tags: ["Role"],
            summary: "Get role by ID",
            description: "API to fetch a role by ID",
            operationId: "getRoleById",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                description: "ID of the role to fetch",
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
                      $ref: "#/components/schemas/GetRoleResponse"
                    }
                  }
                }
              },
              404: {
                description: "Role not found",
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
                          example: "Role not found"
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
            tags: ["Role"],
            summary: "Update role by ID",
            description: "API to update a role by ID",
            operationId: "updateRoleById",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                description: "ID of the role to update",
                schema: {
                  type: "string"
                }
              }
            ],
            requestBody: {
              description: "Payload for updating a role",
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/UpdateRoleRequest"
                  }
                }
              }
            },
            responses: {
              200: {
                description: "Role updated successfully",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/UpdateRoleResponse"
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
                          example: "Unable to update role"
                        }
                      }
                    }
                  }
                }
              },
              404: {
                description: "Role not found",
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
                          example: "Role not found"
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
            tags: ["Role"],
            summary: "Delete role by ID",
            description: "API to delete a role by ID",
            operationId: "deleteRoleById",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                description: "ID of the role to delete",
                schema: {
                  type: "string"
                }
              }
            ],
            responses: {
              200: {
                description: "Role deleted successfully",
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
                          example: "Role deleted successfully"
                        }
                      }
                    }
                  }
                }
              },
              404: {
                description: "Role not found",
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
                          example: "Role not found"
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
          CreateRoleRequest: {
            type: "object",
            properties: {
              name: {
                type: "string",
                required: true,
                example: "Admin"
              },
              description: {
                type: "string",
                required: false,
                example: "Administrator role with all permissions"
              },
              type: {
                type: "string",
                required: true,
                example: "admin"
              },
              permissions: {
                type: "array",
                items: {
                  type: "string"
                },
                example: ["read", "write", "delete"]
              }
            }
          },
          GetRoleResponse: {
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "123e4567-e89b-12d3-a456-426614174000"
              },
              name: {
                type: "string",
                example: "Admin"
              },
              description: {
                type: "string",
                example: "Administrator role with all permissions"
              },
              type: {
                type: "string",
                example: "admin"
              },
              permissions: {
                type: "array",
                items: {
                  type: "string"
                },
                example: ["read", "write", "delete"]
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
          CreateRoleResponse: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true
              },
              message: {
                type: "string",
                example: "Role created successfully"
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
                    example: "Admin"
                  },
                  description: {
                    type: "string",
                    example: "Administrator role with all permissions"
                  },
                  type: {
                    type: "string",
                    example: "admin"
                  },
                  permissions: {
                    type: "array",
                    items: {
                      type: "string"
                    },
                    example: ["read", "write", "delete"]
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
          UpdateRoleRequest: {
            type: "object",
            properties: {
              name: {
                type: "string",
                required: true,
                example: "Admin"
              },
              description: {
                type: "string",
                required: false,
                example: "Administrator role with all permissions"
              },
              type: {
                type: "string",
                required: true,
                example: "admin"
              },
              permissions: {
                type: "array",
                items: {
                  type: "string"
                },
                example: ["read", "write", "delete"]
              }
            }
          },
          UpdateRoleResponse: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true
              },
              message: {
                type: "string",
                example: "Role updated successfully"
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
                    example: "Admin"
                  },
                  description: {
                    type: "string",
                    example: "Administrator role with all permissions"
                  },
                  type: {
                    type: "string",
                    example: "admin"
                  },
                  permissions: {
                    type: "array",
                    items: {
                      type: "string"
                    },
                    example: ["read", "write", "delete"]
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
          GetAllRolesResponse: {
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "123e4567-e89b-12d3-a456-426614174000"
              },
              name: {
                type: "string",
                example: "Admin"
              },
              description: {
                type: "string",
                example: "Administrator role with all permissions"
              },
              type: {
                type: "string",
                example: "admin"
              },
              permissions: {
                type: "array",
                items: {
                  type: "string"
                },
                example: ["read", "write", "delete"]
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
  