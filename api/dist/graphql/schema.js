"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = void 0;
const nexus_1 = require("nexus");
const Query_1 = require("./Query");
const path_1 = __importDefault(require("path"));
const Mutation_1 = require("./Mutation");
const UserType_1 = require("./UserType");
const GetMeType_1 = require("./GetMeType");
const CustomerQuery_1 = require("./CustomerQuery");
const getSchema = () => {
    const schema = (0, nexus_1.makeSchema)({
        types: [Query_1.Query, Mutation_1.Mutation, UserType_1.UserType, GetMeType_1.GetMeType, CustomerQuery_1.CustomerQuery],
        outputs: {
            schema: path_1.default.join(process.cwd(), 'nexus', 'schema.graphql'),
            typegen: path_1.default.join(process.cwd(), 'nexus', 'nexus.ts'),
        },
        plugins: [(0, nexus_1.fieldAuthorizePlugin)()],
    });
    return schema;
};
exports.getSchema = getSchema;
//# sourceMappingURL=schema.js.map