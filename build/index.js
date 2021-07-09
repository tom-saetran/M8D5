"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
var mongoose_1 = __importDefault(require("mongoose"));
var server_1 = __importDefault(require("./server"));
process.env.TS_NODE_DEV && require("dotenv").config();
var port = process.env.PORT || 3030;
var ATLAS_URL = process.env.ATLAS_URL;
if (!ATLAS_URL)
    throw new Error("No Atlas URL specified");
mongoose_1.default
    .connect(ATLAS_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
    server_1.default.listen(port, function () {
        console.table(express_list_endpoints_1.default(server_1.default));
        console.log("Server listening on port", port);
    });
})
    .catch(function (e) { return console.log(e); });
