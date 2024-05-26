export default {
  server: {
    tags: [
      {
        name: "Menu",
        description: "API for managing menus"
      }
    ],
    paths: {
      "/menu/create": {
        post: {
          security : [
            {
              bearerAuth: []
            }
          ],
          tags: ["Menu"],
          summary: "Menu create API",
          description: "API for creating menu",
          operationId: "menucreate",
          requestBody: {
            description: "Payload for signup",
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CreatemenuRequest"
                }
              }
            }
          },
          responses: {
            201: {
              description: "Menu created successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/CreatemenuResponse"
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
                        example: "Unable to create menu"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/menu": {
        get: {
          security : [
            {
              bearerAuth: []
            }
          ],
          tags: ["Menu"],
          summary: "Get all menus",
          description: "API to fetch all menus",
          operationId: "getAllMenus",
          responses: {
            200: {
              description: "Successful operation",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    properties: {
                      success:{
                        type:"boolean",
                        example:false
                      },
                      message:{
                        type:"string",
                        example: "Menu Created Successfully"
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
        CreatemenuRequest: {
          type: "object",
          properties: {
            systemName: {
              type: "string",
              required: true,
              example: "main_menu"
            },
            displayName: {
              type: "string",
              required: true,
              example: "Main Menu"
            },
            order: {
              type: "integer",
              required: true,
              example: 1
            },
            link: {
              type: "string",
              required: false,
              example: "/link"
            },
            parentId: {
              type: "string",
              required: false,
              example: null
            },
            type: {
              type: "string",
              required: true,
              enum: ["TOPMENU", "SIDEMENU", "FOOTERMENU"],
              example: "TOPMENU"
            }
          }
        },
        CreatemenuResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true
            },
            message: {
              type: "string",
              example: "Menu created successfully"
            },
            data: {
              type: "string",
              properties: {
                systemName: {
                  type: "string",
                  required: true,
                  example: "main_menu"
                },
                displayName: {
                  type: "string",
                  required: true,
                  example: "Main Menu"
                },
                order: {
                  type: "integer",
                  required: true,
                  example: 1
                },
                link: {
                  type: "string",
                  required: false,
                  example: "/link"
                },
                parentId: {
                  type: "string",
                  required: false,
                  example: null
                },
                description: {
                  type: "string",
                  required: false,
                  example: "This is the main menu of the application."
                },
                type: {
                  type: "string",
                  required: true,
                  enum: ["TOPMENU", "SIDEMENU", "FOOTERMENU"],
                  example: "TOPMENU"
                }
              }
            }
          }
        },
        GetMenu: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "1"
            },
            systemName: {
              type: "string",
              example: "main_menu"
            },
            displayName: {
              type: "string",
              example: "Main Menu"
            },
            order: {
              type: "integer",
              example: 1
            },
            link: {
              type: "string",
              example: "/link"
            },
            parentId: {
              type: "string",
              example: null
            },
            parent: {
              type: "object",
              nullable: true,
              $ref: "#/components/schemas/Menu"
            },
            children: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Menu"
              }
            },
            description: {
              type: "string",
              example: "This is the main menu of the application."
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
  