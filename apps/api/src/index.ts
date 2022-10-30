import { app } from "./app";
import { graphQlServer } from "./graphqlServer";
import { CONFIG } from "./config";
import { expressMiddleware } from "@apollo/server/express4";
import { sequelize } from "@romalms/database";
import { validateToken } from "./utils/validation";
import jwt from "jsonwebtoken";

const main = async () => {
  try {
    // Connect to the database
    await sequelize.authenticate();
    console.log("Connection to database has been established successfully.");

    // Start graphQL server
    await graphQlServer.start();
    app.use(
      "/graphql",
      expressMiddleware(graphQlServer, {
        context: async ({ req, res }) => {
          const token = req.headers.authorization;
          // Ignore checks on dev environment ( for graphql playground )
          if (CONFIG.ENVIRONMENT !== "development" || token) {
            validateToken(req, res, () => {});
            const user = jwt.decode(token ?? "");
            return { user };
          }
          // default user context for playground
          return { user: { id: 1, privileges: ["ALL_PRIVILEGES"] } };
        },
      })
    );

    // Start the server
    app.listen(CONFIG.PORT, () => {
      console.log(`Server running on port ${CONFIG.PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

main();
