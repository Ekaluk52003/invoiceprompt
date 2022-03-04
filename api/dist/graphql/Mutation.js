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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const nexus_1 = require("nexus");
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const UserType_1 = require("./UserType");
const InputFields_1 = require("./InputFields");
const InvoiceType_1 = require("./InvoiceType");
exports.Mutation = (0, nexus_1.mutationType)({
    definition(t) {
        t.boolean('logoutUser', {
            resolve: (_, __, { session, res }) => {
                session.destroy((err) => {
                    if (err) {
                        console.log(`Error destroying session => `);
                        console.error(err);
                    }
                });
                res.clearCookie("gql-api");
                return true;
            },
        });
        t.boolean('loginUser', {
            args: {
                username: (0, nexus_1.stringArg)(),
                password: (0, nexus_1.stringArg)(),
            },
            resolve: (_, _a, { prisma, session }) => __awaiter(this, void 0, void 0, function* () {
                var userDetails = __rest(_a, []);
                try {
                    const user = yield prisma.user.findUnique({
                        where: {
                            username: userDetails.username,
                        },
                    });
                    if (!user) {
                        return new Error(constants_1.INVALID_CREDENTIALS);
                    }
                    const isCorrect = yield (0, utils_1.verifyPassword)(userDetails.password, user.password);
                    if (!isCorrect) {
                        return new Error(constants_1.INVALID_CREDENTIALS);
                    }
                    session['userId'] = user.id;
                    return true;
                }
                catch (err) {
                    const errorCaught = err;
                    return new Error(errorCaught.message);
                }
            }),
        });
        t.nonNull.field('createInvoice', {
            type: InvoiceType_1.InvoiceType,
            args: {
                title: (0, nexus_1.stringArg)(),
                description: (0, nexus_1.stringArg)(),
                term: (0, nexus_1.intArg)(),
                dueDate: (0, nexus_1.stringArg)(),
                TotalAmount: (0, nexus_1.intArg)(),
                customer: (0, nexus_1.stringArg)(),
                status: InvoiceType_1.status,
                contactInfo: (0, nexus_1.stringArg)(),
                items: (0, nexus_1.list)(InputFields_1.ItemInput)
            },
            resolve: (_, args, { prisma, session }) => __awaiter(this, void 0, void 0, function* () {
                console.log('ARG', args);
                try {
                    if (!(0, utils_1.isAuthenticated)(session)) {
                        return new Error(constants_1.NOT_AUTHENTICATED);
                    }
                    const invoiceNumber = yield prisma.invoiceNumber.update({
                        where: {
                            id: 1
                        },
                        data: {
                            number: {
                                increment: 1,
                            }
                        },
                    });
                    const invoice = yield prisma.invoice.create({
                        data: {
                            TotalAmount: args.TotalAmount,
                            title: args.title,
                            customer: {
                                connectOrCreate: {
                                    where: {
                                        name: args.customer
                                    },
                                    create: {
                                        name: args.customer,
                                        contactInfo: args.contactInfo
                                    },
                                }
                            },
                            term: args.term,
                            status: args.status || 'DRAFT',
                            description: args.description,
                            dueDate: new Date(args.dueDate),
                            user: {
                                connect: {
                                    id: session.userId
                                }
                            },
                            items: args.items,
                            number: invoiceNumber.number
                        }
                    });
                    return invoice;
                }
                catch (err) {
                    console.log(err);
                    const errorCaught = err;
                    if (errorCaught.code === 'P2002') {
                        const errorMessage = `${errorCaught.meta.target.toString()} ${constants_1.ALREADY_TAKEN}`;
                        return new Error(errorMessage);
                    }
                    else {
                        return new Error(errorCaught.message);
                    }
                }
            }),
        }),
            t.nonNull.field('updateInvoice', {
                type: InvoiceType_1.InvoiceType,
                args: {
                    title: (0, nexus_1.stringArg)(),
                    TotalAmount: (0, nexus_1.intArg)(),
                    items: (0, nexus_1.list)(InputFields_1.ItemInput),
                    id: (0, nexus_1.intArg)(),
                    description: (0, nexus_1.stringArg)(),
                    term: (0, nexus_1.intArg)(),
                    dueDate: (0, nexus_1.stringArg)(),
                    status: InvoiceType_1.status,
                    customer: (0, nexus_1.stringArg)(),
                    contactInfo: (0, nexus_1.stringArg)(),
                },
                resolve: (_, args, { prisma, session }) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        if (!(0, utils_1.isAuthenticated)(session)) {
                            return new Error(constants_1.NOT_AUTHENTICATED);
                        }
                        const me = yield prisma.user.findUnique({
                            where: {
                                id: session.userId,
                            }
                        });
                        console.log(args.status);
                        if (args.status) {
                            yield prisma.invoice.update({
                                where: {
                                    id: args.id
                                },
                                data: {
                                    title: args.title,
                                    TotalAmount: args.TotalAmount,
                                    items: args.items,
                                    term: args.term,
                                    dueDate: new Date(args.dueDate),
                                    status: args.status,
                                    description: args.description,
                                    InvoiceHistory: {
                                        create: {
                                            user: me === null || me === void 0 ? void 0 : me.name,
                                            description: `you udate status of invice to ${args.status}`
                                        }
                                    },
                                    customer: {
                                        connectOrCreate: {
                                            where: {
                                                name: args.customer
                                            },
                                            create: {
                                                name: args.customer,
                                                contactInfo: args.contactInfo
                                            }
                                        }
                                    }
                                },
                                include: {
                                    customer: true,
                                    user: true
                                }
                            });
                        }
                        const invoice = yield prisma.invoice.update({
                            where: {
                                id: args.id
                            },
                            data: {
                                title: args.title,
                                TotalAmount: args.TotalAmount,
                                items: args.items,
                                term: args.term,
                                dueDate: new Date(args.dueDate),
                                status: args.status,
                                description: args.description,
                                customer: {
                                    connectOrCreate: {
                                        where: {
                                            name: args.customer
                                        },
                                        create: {
                                            name: args.customer,
                                            contactInfo: args.contactInfo
                                        }
                                    }
                                }
                            },
                            include: {
                                customer: true,
                                user: true
                            }
                        });
                        return invoice;
                    }
                    catch (err) {
                        console.log(err);
                        const errorCaught = err;
                        if (errorCaught.code === 'P2002') {
                            const errorMessage = `${errorCaught.meta.target.toString()} ${constants_1.ALREADY_TAKEN}`;
                            return new Error(errorMessage);
                        }
                        else {
                            return new Error(errorCaught.message);
                        }
                    }
                }),
            }),
            t.nonNull.field('registerUser', {
                type: UserType_1.UserType,
                args: {
                    input: (0, nexus_1.arg)({ type: InputFields_1.registerUserInput }),
                },
                resolve: (_, args, { prisma }) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const hashedPassword = yield (0, utils_1.hashPassword)(args.input.password);
                        console.log();
                        const user = yield prisma.user.create({
                            data: Object.assign(Object.assign({}, args.input), { password: hashedPassword })
                        });
                        return user;
                    }
                    catch (err) {
                        const errorCaught = err;
                        console.log('errorCaught:', errorCaught);
                        if (errorCaught.code === 'P2002') {
                            const errorMessage = `${errorCaught.meta.target.toString()} ${constants_1.ALREADY_TAKEN}`;
                            return new Error(errorMessage);
                        }
                        else {
                            return new Error(errorCaught);
                        }
                    }
                }),
            });
    },
});
//# sourceMappingURL=Mutation.js.map