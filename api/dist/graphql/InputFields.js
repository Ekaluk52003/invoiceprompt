"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserInput = exports.ItemInput = void 0;
const nexus_1 = require("nexus");
const UserType_1 = require("./UserType");
exports.ItemInput = (0, nexus_1.inputObjectType)({
    name: 'ItemInput',
    definition(t) {
        t.string('name');
        t.int('qty');
        t.int('price');
        t.int('amount');
    },
});
exports.registerUserInput = (0, nexus_1.inputObjectType)({
    name: 'registerUserInput',
    definition(t) {
        t.nonNull.string('name');
        t.nonNull.string('email');
        t.nonNull.string('username');
        t.nonNull.string('password');
        t.list.field('role', {
            type: UserType_1.Roles,
            default: "USER"
        });
    },
});
//# sourceMappingURL=InputFields.js.map