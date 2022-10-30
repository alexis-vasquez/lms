import { app } from "./app";
import { graphQlServer } from "./graphqlServer";
import { CONFIG } from "./config";
import { expressMiddleware } from "@apollo/server/express4";
import { sequelize } from "@romalms/database";

const main = async () => {
  try {
    // Connect to the database
    await sequelize.authenticate();
    console.log("Connection to database has been established successfully.");

    // Start graphQL server
    await graphQlServer.start();
    app.use("/graphql", expressMiddleware(graphQlServer));

    // Start the server
    app.listen(CONFIG.PORT, () => {
      console.log(`Server running on port ${CONFIG.PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

main();
