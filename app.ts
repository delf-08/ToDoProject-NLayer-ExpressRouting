import "reflect-metadata";
import { useContainer, useExpressServer } from "routing-controllers";
import { sequelize } from "./sequelize";
import { TodoController } from "./src/Controller/TodoController";
import { UserController } from "./src/Controller/UserController";
import container from "./inversify.config";
import express from 'express';
import { AuthenticationController } from "./src/Controller/AuthenticationController";
import { AuthMiddleware } from "./src/MiddleWares/AuthMiddleware";
import { ApiAccessCheckMiddleware } from "./src/MiddleWares/ApiAccesCheckMiddleware";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { graphqlHTTP } from "express-graphql";
import { createSchema } from "./src/GraphQL/schema";

export function createApp() {
  const app = express();

  useExpressServer(app, {
    controllers: [
      TodoController,
      UserController,
      AuthenticationController
    ],
    middlewares: [
      AuthMiddleware,
      ApiAccessCheckMiddleware
    ]
  });

  useContainer(container);

  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Todo API',
        version: '1.0.0',
        description: 'API documentation for the Todo project',
      },
    },
    apis: ['./src/Controller/*.ts', './src/utils/interfaces/*.ts']
  };
  
  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use(
    "/graphql",
    graphqlHTTP(async () => ({
      schema: await createSchema(),
      graphiql: true,
      context: { container: container },
    }))
  );

  return app;
}

if (require.main === module) {
  sequelize.authenticate().then(() => {
    console.log("Database connected!");
  }).catch(err => console.log("Error connecting to the database:", err));

  const app = createApp();
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
    console.log("Swagger UI available at http://localhost:3000/docs");
  });
}
