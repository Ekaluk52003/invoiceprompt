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
exports.isAdmin = exports.isAuthenticated = exports.isProd = exports.verifyPassword = exports.hashPassword = void 0;
const client_1 = require("@prisma/client");
const argon2_1 = __importDefault(require("argon2"));
const prisma = new client_1.PrismaClient();
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield argon2_1.default.hash(password);
    return hashedPassword;
});
exports.hashPassword = hashPassword;
const verifyPassword = (inputPassword, passwordHash) => __awaiter(void 0, void 0, void 0, function* () {
    const isCorrect = yield argon2_1.default.verify(passwordHash, inputPassword);
    return isCorrect;
});
exports.verifyPassword = verifyPassword;
const isProd = () => process.env.NODE_ENV === 'production';
exports.isProd = isProd;
const isAuthenticated = (session) => {
    if (session.userId) {
        return true;
    }
    return false;
};
exports.isAuthenticated = isAuthenticated;
const isAdmin = (session) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield prisma.user.findUnique({
        where: {
            id: session.userId
        }
    });
    if (admin === null || admin === void 0 ? void 0 : admin.role.includes("ADMIN")) {
        return true;
    }
    return false;
});
exports.isAdmin = isAdmin;
//# sourceMappingURL=utils.js.map