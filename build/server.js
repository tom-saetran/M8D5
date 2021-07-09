"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var accommodation_1 = __importDefault(require("./endpoints/accommodation"));
var destinations_1 = __importDefault(require("./endpoints/destinations"));
process.env.TS_NODE_DEV && require("dotenv").config();
var server = express_1.default();
server.use(cors_1.default());
server.use(express_1.default.json());
server.use("/accommodation", accommodation_1.default);
server.use("/destinations", destinations_1.default);
exports.default = server;
