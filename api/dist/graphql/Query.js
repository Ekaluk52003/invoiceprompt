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
exports.Query = void 0;
const nexus_1 = require("nexus");
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const GetMeType_1 = require("./GetMeType");
const InvoiceType_1 = require("./InvoiceType");
exports.Query = (0, nexus_1.queryType)({
    definition(t) {
        t.field('getMe', {
            type: GetMeType_1.GetMeType,
            resolve: (_, __, { prisma, session }) => __awaiter(this, void 0, void 0, function* () {
                if (!session.userId) {
                    return null;
                }
                const me = yield prisma.user.findUnique({
                    where: {
                        id: session.userId,
                    }
                });
                return me;
            }),
        });
        t.list.field('invoices', {
            type: InvoiceType_1.InvoiceType,
            resolve: (_, __, { prisma, session }) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!(0, utils_1.isAuthenticated)(session)) {
                        return null;
                    }
                    const invoices = yield prisma.invoice.findMany({
                        include: {
                            user: true
                        },
                    });
                    return invoices;
                }
                catch (err) {
                    console.error(err);
                    return new Error(constants_1.INTERNAL_SERVER_ERROR);
                }
            })
        });
        t.list.field('suminvoices', {
            type: InvoiceType_1.InvoiceAmountType,
            args: {
                Limit: (0, nexus_1.intArg)()
            },
            resolve: (_, args, { prisma, session }) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!(0, utils_1.isAuthenticated)(session)) {
                        return null;
                    }
                    const Limit = args.Limit || 7;
                    const sumInv = yield prisma.$queryRaw `SELECT to_char("createdAt":: DATE, 'dd-Mon-yy') as date, sum("TotalAmount") as amount from "public"."Invoice" GROUP BY "createdAt":: DATE  ORDER BY "createdAt"::date DESC LIMIT ${Limit}`;
                    return sumInv;
                }
                catch (err) {
                    console.error(err);
                    return new Error(constants_1.INTERNAL_SERVER_ERROR);
                }
            })
        });
        t.field('findInvoiceById', {
            type: InvoiceType_1.InvoiceType,
            args: {
                id: (0, nexus_1.intArg)()
            },
            resolve: (_, args, { prisma, session }) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!(0, utils_1.isAuthenticated)(session)) {
                        return new Error(constants_1.NOT_AUTHENTICATED);
                    }
                    const invoice = yield prisma.invoice.findUnique({
                        where: {
                            id: args.id
                        },
                        include: {
                            user: true,
                            customer: true
                        },
                    });
                    return invoice;
                }
                catch (err) {
                    console.error(err);
                    return new Error(constants_1.INTERNAL_SERVER_ERROR);
                }
            })
        });
        t.list.field('findinvoice', {
            type: InvoiceType_1.InvoiceType,
            args: {
                where: (0, nexus_1.stringArg)(),
                fromDate: (0, nexus_1.stringArg)(),
                toDate: (0, nexus_1.stringArg)(),
                overdue: (0, nexus_1.booleanArg)(),
                status: InvoiceType_1.status
            },
            resolve: (_, args, { prisma, session }) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!(0, utils_1.isAuthenticated)(session)) {
                        return null;
                    }
                    const keyword = args.where ? `%${args.where}%` : `%${''}%`;
                    const fromDate = new Date(args.fromDate);
                    const toDate = new Date(args.toDate);
                    const status = args.status;
                    if (args.overdue) {
                        const invoices = yield prisma.$queryRaw `SELECT "public"."Invoice"."id", "public"."Invoice"."createdAt", "Invoice"."dueDate", "number", "TotalAmount" , "public"."Invoice"."status", "public"."Customer"."name", "title", "username" from "public"."Invoice"  INNER JOIN "public"."User" ON "public"."Invoice"."userId" = "public"."User"."id"
            INNER JOIN "public"."Customer" ON "public"."Invoice"."customerId" = "public"."Customer"."id"
            WHERE  "public"."Invoice"."dueDate"::date <= now()::date AND "title" ILIKE  ${keyword} AND "Invoice"."status" = ${status} ORDER BY "createdAt" DESC`;
                        console.log('no date ARG');
                        return invoices;
                    }
                    else {
                        const invoices = yield prisma.$queryRaw `SELECT "public"."Invoice"."id", "public"."Invoice"."createdAt", "Invoice"."dueDate", "number", "TotalAmount" , "public"."Invoice"."status", "public"."Customer"."name", "title", "username" from "public"."Invoice"  INNER JOIN "public"."User" ON "public"."Invoice"."userId" = "public"."User"."id"
            INNER JOIN "public"."Customer" ON "public"."Invoice"."customerId" = "public"."Customer"."id"
            WHERE  "public"."Invoice"."createdAt" >= ${fromDate} AND "public"."Invoice"."createdAt" <=  ${toDate} AND "title" ILIKE  ${keyword} AND "Invoice"."status" = ${status} ORDER BY "createdAt" DESC`;
                        console.log('date ARG');
                        return invoices;
                    }
                }
                catch (err) {
                    console.error(err);
                    return new Error(constants_1.INTERNAL_SERVER_ERROR);
                }
            })
        });
        t.list.field('findinvoiceHistory', {
            type: InvoiceType_1.InvoiceHistoryType,
            args: {
                invoiceId: (0, nexus_1.intArg)()
            },
            resolve: (_, args, { prisma, session }) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!(0, utils_1.isAuthenticated)(session)) {
                        return null;
                    }
                    const invoiceHistory = yield prisma.invoiceHistory.findMany({
                        where: {
                            invoiceId: args.invoiceId
                        },
                        orderBy: {
                            createdAt: "desc"
                        }
                    });
                    return invoiceHistory;
                }
                catch (err) {
                    console.error(err);
                    return new Error(constants_1.INTERNAL_SERVER_ERROR);
                }
            })
        });
        t.field('SumRange', {
            type: InvoiceType_1.InvoiceAmountType,
            args: {
                fromDate: (0, nexus_1.stringArg)(),
                toDate: (0, nexus_1.stringArg)()
            },
            resolve: (_, args, { prisma, session }) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!(0, utils_1.isAuthenticated)(session)) {
                        return null;
                    }
                    const fromDate = new Date(args.fromDate);
                    const toDate = new Date(args.toDate);
                    const Sum = yield prisma.$queryRaw `SELECT sum("public"."Invoice"."TotalAmount") AS amount FROM "public"."Invoice"  WHERE  "public"."Invoice"."createdAt" BETWEEN ${fromDate} AND ${toDate}`;
                    return Sum[0];
                }
                catch (err) {
                    console.error(err);
                    return new Error(constants_1.INTERNAL_SERVER_ERROR);
                }
            })
        });
        t.list.field('invoices', {
            type: InvoiceType_1.InvoiceType,
            resolve: (_, __, { prisma, session }) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!(0, utils_1.isAuthenticated)(session)) {
                        return new Error(constants_1.NOT_AUTHENTICATED);
                    }
                    const invoices = yield prisma.invoice.findMany({
                        include: {
                            user: true,
                            customer: true
                        },
                    });
                    return invoices;
                }
                catch (err) {
                    console.error(err);
                    return new Error(constants_1.INTERNAL_SERVER_ERROR);
                }
            }),
        });
    },
});
//# sourceMappingURL=Query.js.map