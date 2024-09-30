import { buildSchema } from "type-graphql";
import  Container  from "../../inversify.config";
import { TodoResolver } from "./resolvers/TodoResolver";
import { UserResolver } from "./resolvers/UserResolver";

export const createSchema = () =>
  buildSchema({
    resolvers: [TodoResolver, UserResolver],
    container: ({ context }) => Container,
  });
