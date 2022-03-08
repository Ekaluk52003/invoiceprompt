"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceHistoryType = exports.InvoiceNumber = exports.InvoiceAmountType = exports.InvoiceType = exports.JSONScalar = exports.status = void 0;
const nexus_1 = require("nexus");
const UserType_1 = require("./UserType");
const CustomerType_1 = require("./CustomerType");
const graphql_type_json_1 = require("graphql-type-json");
exports.status = (0, nexus_1.enumType)({
    name: 'status',
    members: ['PAID', 'OVERDUE', 'CANCEL', 'DRAFT', 'BILLED'],
});
exports.JSONScalar = (0, nexus_1.scalarType)({
    name: 'JSON',
    serialize: graphql_type_json_1.GraphQLJSONObject.serialize,
    parseValue: graphql_type_json_1.GraphQLJSONObject.parseValue,
    parseLiteral: graphql_type_json_1.GraphQLJSONObject.parseLiteral,
});
exports.InvoiceType = (0, nexus_1.objectType)({
    name: 'InvoiceType',
    definition(t) {
        t.int('id');
        t.int('number');
        t.int('TotalAmount');
        t.int('term');
        t.int('userId');
        t.string('title');
        t.string('description');
        t.string('date');
        t.string('username');
        t.string('name');
        t.string('dueDate');
        t.string('createdAt');
        t.list.field('items', {
            type: exports.JSONScalar,
        });
        t.field('customer', {
            type: CustomerType_1.CustomertType,
        });
        t.field('user', {
            type: UserType_1.UserType,
        });
        t.field('status', {
            type: exports.status
        });
    },
});
exports.InvoiceAmountType = (0, nexus_1.objectType)({
    name: 'InvoiceAmountType',
    definition(t) {
        t.int('amount');
        t.string('date');
    },
});
exports.InvoiceNumber = (0, nexus_1.objectType)({
    name: 'InvoiceNumber',
    definition(t) {
        t.int('id');
        t.int('number');
    },
});
exports.InvoiceHistoryType = (0, nexus_1.objectType)({
    name: 'InvoiceHistoryType',
    definition(t) {
        t.string('description');
        t.string('createdAt');
        t.string('user');
        t.int('invoiceId');
    },
});
//# sourceMappingURL=InvoiceType.js.map