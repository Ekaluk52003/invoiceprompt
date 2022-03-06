"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
const ioredis_1 = __importDefault(require("ioredis"));
const cors_1 = __importDefault(require("cors"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const apollo_server_core_1 = require("apollo-server-core");
const schema_1 = require("./graphql/schema");
const db_1 = require("./db");
const utils_1 = require("./utils");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    dotenv_1.default.config();
    const RedisClient = new ioredis_1.default({
        host: 'srv-captain--redis',
        port: 6379,
        password: 'test123',
        connectTimeout: 10000
    });
    console.log('w');
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const prisma = yield (0, db_1.getMyPrismaClient)();
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: process.env.ORIGIN,
        credentials: true,
    }));
    app.use((0, express_session_1.default)({
        store: new RedisStore({ client: RedisClient }),
        secret: process.env.SESSION_SECRET,
        name: 'gql-api',
        resave: false,
        saveUninitialized: false,
        proxy: (0, utils_1.isProd)(),
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            secure: (0, utils_1.isProd)(),
        },
    }));
    const schema = (0, schema_1.getSchema)();
    const apolloSever = new apollo_server_express_1.ApolloServer({
        schema,
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()
        ],
        context: ({ req, res }) => ({
            req,
            res,
            prisma,
            session: req.session,
            redis: RedisClient,
        }),
    });
    yield apolloSever.start();
    apolloSever.applyMiddleware({
        app,
        path: '/',
        cors: false,
    });
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
});
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map