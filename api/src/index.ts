import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import session from 'express-session';
import dotenv from 'dotenv';
import Redis from 'ioredis';
import cors from "cors";
import RedisSession from 'connect-redis';
import {
	ApolloServerPluginLandingPageGraphQLPlayground
  } from "apollo-server-core";

import { getSchema } from './graphql/schema';
import { getMyPrismaClient } from './db';
import { IMyContext } from './interface';
import { isProd } from './utils';

const main = async () => {
  dotenv.config();

  const RedisClient = new Redis(process.env.REDIS_URL);
//   const RedisClient = new Redis({
//     host: 'srv-captain--redis',
//     port: 6379,
//     password: 'test123',
//     connectTimeout: 10000
// });

  console.log('w')

   // For checking Redis connection
   // CMD for redis docker:  docker exec -it 78effbdf18db(CONTAINER ID) sh
  // RedisClient.set("foo", "bar");
  // RedisClient.get("foo", function (err, result) {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     console.log(result); // Promise resolves to "bar"
  //   }
  // });

  const RedisStore = RedisSession(session);
  const prisma = await getMyPrismaClient();

  const app = express();

  app.use(
    cors({
      origin:  process.env.ORIGIN,
      credentials: true,
    })
  );


  app.use(
    session({
      store: new RedisStore({ client: RedisClient}),
      secret: process.env.SESSION_SECRET!,
      name: 'gql-api',
      resave: false,
      saveUninitialized: false,
      proxy: isProd(),
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        secure: isProd(),
        //Uncommment below when in PRoduction, this is to allow to use Graphql tool Altair
        // sameSite: 'lax',
      },
    }),
  );

  const schema = getSchema();

  const apolloSever = new ApolloServer({
    schema,
    plugins: [
			ApolloServerPluginLandingPageGraphQLPlayground()
		],
    context: ({ req, res }): IMyContext => ({
      req,
      res,
      prisma,
      session: req.session,
      redis: RedisClient,
    }),
  });

  await apolloSever.start();

  apolloSever.applyMiddleware({
    app,
    path: '/',
    cors: false, // disables the apollo-server-express cors to allow the cors middleware use
  })

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
