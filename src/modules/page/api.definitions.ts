export default {
    server: {
      tags: [
        {
          name: "Pages",
          description: "API for managing pages"
        }
      ],
      paths: {
        "/page/create": {
          post: {
            security: [
              {
                bearerAuth: []
              }
            ],
            tags: ["Pages"],
            summary: "Create Page API",
            description: "API for creating a page",
            operationId: "pageCreate",
            requestBody: {
              description: "Payload for creating a page",
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/CreatePageRequest"
                  }
                }
              }
            },
            responses: {
              201: {
                description: "Page created successfully",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/CreatePageResponse"
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
                          example: "Unable to create page"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/pages": {
          get: {
            security: [
              {
                bearerAuth: []
              }
            ],
            tags: ["Pages"],
            summary: "Get all pages",
            description: "API to fetch all pages",
            operationId: "getAllPages",
            responses: {
              200: {
                description: "Successful operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/GetPage"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/page/{id}": {
          get: {
            security: [
              {
                bearerAuth: []
              }
            ],
            tags: ["Pages"],
            summary: "Get page by ID",
            description: "API to fetch a page by its ID",
            operationId: "getPageById",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string"
                },
                description: "ID of the page to fetch"
              }
            ],
            responses: {
              200: {
                description: "Successful operation",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/GetPage"
                    }
                  }
                }
              },
              404: {
                description: "Page not found",
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
                          example: "Page not found"
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
            tags: ["Pages"],
            summary: "Update page by ID",
            description: "API to update a page by its ID",
            operationId: "updatePageById",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string"
                },
                description: "ID of the page to update"
              }
            ],
            requestBody: {
              description: "Payload for updating a page",
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/UpdatePageRequest"
                  }
                }
              }
            },
            responses: {
              200: {
                description: "Page updated successfully",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/UpdatePageResponse"
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
                          example: "Unable to update page"
                        }
                      }
                    }
                  }
                }
              },
              404: {
                description: "Page not found",
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
                          example: "Page not found"
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
            tags: ["Pages"],
            summary: "Delete page by ID",
            description: "API to delete a page by its ID",
            operationId: "deletePageById",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string"
                },
                description: "ID of the page to delete"
              }
            ],
            responses: {
              200: {
                description: "Page deleted successfully",
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
                          example: "Page deleted successfully"
                        }
                      }
                    }
                  }
                }
              },
              404: {
                description: "Page not found",
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
                          example: "Page not found"
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
          CreatePageRequest: {
            type: "object",
            properties: {
              name: {
                type: "string",
                required: true,
                example: "HomePage"
              },
              systemName: {
                type: "string",
                required: true,
                example: "home_page"
              },
              description: {
                type: "string",
                required: false,
                example: "This is the homepage of the website."
              },
              title: {
                type: "string",
                required: true,
                example: "Welcome to Our Website"
              },
              subTitle: {
                type: "string",
                required: false,
                example: "Explore our features"
              },
              sections: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/PageSection"
                }
              }
            }
          },
          CreatePageResponse: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true
              },
              message: {
                type: "string",
                example: "Page created successfully"
              },
              data: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example: "HomePage"
                  },
                  systemName: {
                    type: "string",
                    example: "home_page"
                  },
                  description: {
                    type: "string",
                    example: "This is the homepage of the website."
                  },
                  title: {
                    type: "string",
                    example: "Welcome to Our Website"
                  },
                  subTitle: {
                    type: "string",
                    example: "Explore our features"
                  },
                  sections: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/PageSection"
                    }
                  }
                }
              }
            }
          },
          GetPage: {
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "1"
              },
              name: {
                type: "string",
                example: "HomePage"
              },
              systemName: {
                type: "string",
                example: "home_page"
              },
              description: {
                type: "string",
                example: "This is the homepage of the website."
              },
              title: {
                type: "string",
                example: "Welcome to Our Website"
              },
              subTitle: {
                type: "string",
                example: "Explore our features"
              },
              sections: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/PageSection"
                }
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
          UpdatePageRequest: {
            type: "object",
            properties: {
              name: {
                type: "string",
                required: true,
                example: "HomePage"
              },
              systemName: {
                type: "string",
                required: true,
                example: "home_page"
              },
              description: {
                type: "string",
                required: false,
                example: "This is the homepage of the website."
              },
              title: {
                type: "string",
                required: true,
                example: "Welcome to Our Website"
              },
              subTitle: {
                type: "string",
                required: false,
                example: "Explore our features"
              },
              sections: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/PageSection"
                }
              }
            }
          },
          UpdatePageResponse: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true
              },
              message: {
                type: "string",
                example: "Page updated successfully"
              },
              data: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example: "HomePage"
                  },
                  systemName: {
                    type: "string",
                    example: "home_page"
                  },
                  description: {
                    type: "string",
                    example: "This is the homepage of the website."
                  },
                  title: {
                    type: "string",
                    example: "Welcome to Our Website"
                  },
                  subTitle: {
                    type: "string",
                    example: "Explore our features"
                  },
                  sections: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/PageSection"
                    }
                  }
                }
              }
            }
          },
          PageSection: {
            type: "object",
            properties: {
              name: {
                type: "string",
                example: "Header Section"
              },
              content: {
                type: "string",
                example: "This is the header section content."
              },
              order: {
                type: "integer",
                example: 1
              }
            }
          }
        }
      }
    }
  }
  