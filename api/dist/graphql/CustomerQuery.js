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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerQuery = void 0;
const nexus_1 = require("nexus");
const utils_1 = require("../utils");
const CustomerType_1 = require("./CustomerType");
exports.CustomerQuery = (0, nexus_1.extendType)({
    type: 'Query',
    definition(t) {
        t.list.field('customers', {
            type: CustomerType_1.CustomertType,
            args: {
                name: (0, nexus_1.stringArg)(),
            },
            resolve: (_, args, { prisma, session }) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!(0, utils_1.isAuthenticated)(session)) {
                        return null;
                    }
                    const keyword = args.name ? `%${args.name}%` : `%${''}%`;
                    const customers = yield prisma.$queryRaw `SELECT "name", "contactInfo" from "public"."Customer"
                WHERE "public"."Customer"."name"  ILIKE  ${keyword}
                `;
                    return customers;
                }
                catch (err) {
                    console.error(err);
                }
            })
        });
        t.field('customerSearch', {
            type: CustomerType_1.CustomertType,
            args: {
                customerName: (0, nexus_1.stringArg)(),
            },
            resolve: (_, args, { prisma, session }) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!(0, utils_1.isAuthenticated)(session)) {
                        return null;
                    }
                    const keyword = args.customerName;
                    const customer = yield prisma.$queryRaw `SELECT "name", "contactInfo" from "public"."Customer"
                  WHERE "public"."Customer"."name"  =  ${keyword}                  `;
                    console.log(customer);
                    return customer[0];
                }
                catch (err) {
                    console.error(err);
                }
            })
        });
    }
});
//# sourceMappingURL=CustomerQuery.js.map