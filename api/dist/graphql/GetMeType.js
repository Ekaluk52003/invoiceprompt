"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMeType = void 0;
const nexus_1 = require("nexus");
exports.GetMeType = (0, nexus_1.objectType)({
    name: 'GetMeType',
    definition(t) {
        t.int('id');
        t.string('name');
        t.string('username');
        t.string('email');
    },
});
//# sourceMappingURL=GetMeType.js.map