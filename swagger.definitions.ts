import { env } from "src/configs";
import authApi from "src/modules/auth/api.definitions";
import menuApi from "src/modules/menu/api.definitions";
import roleApi from "src/modules/role/api.definitions";
import userApi from "src/modules/user/api.definitions";

export default {
  server: {
    openapi: "3.0.1",
    info: {
      title: env.appConfig.APP_NAME,
      description: `Api documentation of <b>${env.appConfig.APP_NAME}</b>.`,
      version: "1.0.0"
    },
    servers: [
      {
        url: `${process.env.APP_URL}/api/v1`,
        description: "Main Server"
      }
    ],
    tags: [
      ...authApi.server.tags,
      ...menuApi.server.tags,
      ...roleApi.server.tags,
      ...userApi.server.tags,
    ],
    paths: {
      ...authApi.server.paths,
      ...menuApi.server.paths,
      ...roleApi.server.paths,
      ...userApi.server.paths,
    },
    components: {
      schemas: {
        CommonResponse: {
          type: "object",
          properties: {
            message: { type: "string" },
            status: { type: "number" }
          }
        },
        ...authApi.server.components.schemas,
        ...menuApi.server.components.schemas,
        ...roleApi.server.components.schemas,
        ...userApi.server.components.schemas,
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  }
};
