import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { books } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const schemaPath = join(__dirname, "schema.gql");
const typeDefs = readFileSync(schemaPath, "utf-8");

export const start = async () => {
  const booksData = books;

  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query: {
        books: () => booksData,
      },
      Mutation: {
        addBook: (_, { input }) => {
          booksData.push(input);
          return booksData;
        },
      },
    },
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server is running on ${url}`);
};
