"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomertType = void 0;
const nexus_1 = require("nexus");
exports.CustomertType = (0, nexus_1.objectType)({
    name: 'CustomerType',
    definition(t) {
        t.string('name');
        t.string('contactInfo');
    },
});
//# sourceMappingURL=CustomerType.js.map