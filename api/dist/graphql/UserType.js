"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = exports.Roles = void 0;
const nexus_1 = require("nexus");
exports.Roles = (0, nexus_1.enumType)({
    name: 'Roles',
    members: ['USER', 'ADMIN'],
});
exports.UserType = (0, nexus_1.objectType)({
    name: 'UserType',
    definition(t) {
        t.int('id');
        t.string('name');
        t.string('username');
        t.string('email');
        t.float('createdAt');
        t.list.field('role', {
            type: exports.Roles
        });
    },
});
//# sourceMappingURL=UserType.js.map