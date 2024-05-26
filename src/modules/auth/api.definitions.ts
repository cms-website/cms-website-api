

import { AUTH_MESSAGE_CONSTANT } from "src/common/constants";

export default {
  server: {
    tags: [
      {
        name: "Auth",
        description: "API for authentication"
      }
    ],

    paths: {
      "/auth/signup": {
        post: {
          tags: ["Auth"],
          summary: "User signup API",
          description: "API for user signup",
          operationId: "signup",
          requestBody: {
            description: "Payload for signup",
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/SignupRequest"
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
                    $ref: "#/components/schemas/SignupResponse"
                  }
                }
              }
            },
            409: {
              description: "Email already taken",
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
                        example: AUTH_MESSAGE_CONSTANT.EMAIL_ALREADY_TAKEN
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: "Unable to create user",
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
                        example: AUTH_MESSAGE_CONSTANT.UNABLE_TO_CREATE_USER
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/auth/getToken": {
        post: {
          tags: ["Auth"],
          summary: "User login API",
          description: "API for user login",
          operationId: "login",
          requestBody: {
            description: "Payload for login",
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginRequest"
                }
              }
            }
          },
          responses: {
            200: {
              description: "User logged in successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/LoginResponse"
                  }
                }
              }
            },
            401: {
              description: "Invalid credentials",
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
                        example: AUTH_MESSAGE_CONSTANT.INVALID_CREDENTIALS
                      }
                    }
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
                        example: AUTH_MESSAGE_CONSTANT.UNABLE_TO_LOGIN
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/auth/forgetPassword": {
        post: {
          tags: ["Auth"],
          summary: "User forget password API",
          description: "API for user to reset the password",
          operationId: "forgetPassword",
          requestBody: {
            description: "Payload for forget password",
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ForgetPasswordRequest"
                }
              }
            }
          },
          responses: {
            200: {
              description: "OTP sent successfully",
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
                        example: "OTP sent to email"
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
      },
      "/auth/resetPassword": {
        post: {
          tags: ["Auth"],
          summary: "User reset password API",
          description: "API for user to set a new password using OTP",
          operationId: "resetPassword",
          requestBody: {
            description: "Payload for reset password",
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ResetPasswordRequest"
                }
              }
            }
          },
          responses: {
            200: {
              description: "Password reset successfully",
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
                        example: "Password has been reset"
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: "Invalid or expired OTP",
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
                        example: "Invalid or expired OTP"
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
        SignupRequest: {
          type: "object",
          properties: {
            firstName: {
              type: "string",
              required: true,
              example: "Krishana"
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
            password: {
              type: "string",
              required: true,
              example: "krimson@123456"
            },
            confirmPassword: {
              type: "string",
              required: true,
              example: "krimson@123456"
            },
            email: {
              type: "string",
              required: true,
              example: "krimson@gmail.com"
            },
            phone: {
              type: "string",
              required: true,
              example: "9847053191"
            }
          }
        },
        SignupResponse: { 
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true
            },
            message: {
              type: "string",
              example: AUTH_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY
            },
            data: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  example: "84012b1e-900b-4ff7-bcff-d1dad341abdf"
                },
                firstName: {
                  type: "string",
                  example: "krishna"
                },
                lastName: {
                  type: "string",
                  example: "chaudhary"
                },
                email: {
                  type: "string",
                  example: "krimson@gmail.com"
                },
                username: {
                  type: "string",
                  example: "krimson"
                },
                phone: {
                  type: "string",
                  example: "9847053191"
                },
                avatar: {
                  type: "string",
                  example: null
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
        LoginRequest: {
          type: "object",
          properties: {
            email: {
              type: "string",
              required: true,
              example: "krimson@gmail.com"
            },
            password: {
              type: "string",
              required: true,
              example: "krimson@123456"
            }
          }
        },
        LoginResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true
            },
            message: {
              type: "string",
              example: AUTH_MESSAGE_CONSTANT.LOGIN_SUCCESS
            },
            data: {
              type: "object",
              properties: {
                token: {
                  type: "string",
                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                },
                user: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: "84012b1e-900b-4ff7-bcff-d1dad341abdf"
                    },
                    firstName: {
                      type: "string",
                      example: "krishna"
                    },
                    lastName: {
                      type: "string",
                      example: "chaudhary"
                    },
                    email: {
                      type: "string",
                      example: "devlop143@gmail.com"
                    },
                    username: {
                      type: "string",
                      example: "krimson"
                    },
                    phone: {
                      type: "string",
                      example: "9847053191"
                    },
                    avatar: {
                      type: "string",
                      example: null
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
        },
        ForgetPasswordRequest: {
          type: "object",
          properties: {
            email: {
              type: "string",
              required: true,
              example: "krimson@gmail.com"
            }
          }
        },
        ResetPasswordRequest: {
          type: "object",
          properties: {
            email: {
              type:"string",
              required: true,
              example:"krimson@gmail.com"
            },
            token: {
              type: "string",
              required: true,
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            },
            otp: {
              type: "number",
              required: true,
              example: 123456
            },
            newPassword: {
              type: "string",
              required: true,
              example: "newpassword@123"
            }
          }
        }
      }
    }
  }
}

