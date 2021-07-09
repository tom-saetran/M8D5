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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var server_1 = __importDefault(require("../server"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var request = supertest_1.default(server_1.default);
var ATLAS_URL = process.env.ATLAS_URL;
describe("All Routes", function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var location, accommodation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mongoose_1.default.connect(ATLAS_URL + "/discard", { useNewUrlParser: true, useUnifiedTopology: true });
                    return [4 /*yield*/, request.post("/destinations").send(validDestinationEntry)];
                case 1:
                    location = _a.sent();
                    validDestinationEntry.city = location.body._id;
                    return [4 /*yield*/, request.post("/accommodation").send(validAccommodationEntry)];
                case 2:
                    accommodation = _a.sent();
                    global.validAccommodationID = accommodation.body._id;
                    console.log("GLOBAL ACC ID*************************", global.validAccommodationID); // :D
                    return [2 /*return*/];
            }
        });
    }); });
    var validAccommodationEntry = {
        name: "Test Entry",
        description: "Test Description",
        location: "60bc1808ae33b80015046cc5",
        maxGuests: 666
    };
    var invalidAccommodationEntry = {
        description: false,
        location: 51,
        maxGuests: "Nine"
    };
    var modifiedAccommodationEntry = { name: "Modified Name" };
    var validDestinationEntry = { city: "Test City" };
    var invalidDestinationEntry = { city: null };
    var modifiedDestinationEntry = { city: "Modifed City" };
    // ROUTE DESTINATIONS
    // GET ALL
    // Expect list of all accommodation
    // 200 OK
    it("should test that GET /destinations returns 200", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/destinations")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.length).toBe(1);
                    return [2 /*return*/];
            }
        });
    }); });
    // POST
    // expect post a new accommodation
    // 400 if invalid data
    // 201 Created
    it("should test that POST /destinations returns 201 on valid data", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post("/destinations").send(validDestinationEntry)
                    // console.log("MY CITY ID I AM TRYING TO SAVE", validDestinationEntry.city)
                ];
                case 1:
                    response = _a.sent();
                    // console.log("MY CITY ID I AM TRYING TO SAVE", validDestinationEntry.city)
                    expect(response.status).toBe(201);
                    expect(typeof response.body._id).toBe("string");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should test that POST /destinations returns 400 on invalid data", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post("/destinations").send(invalidDestinationEntry)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    // PUT:ID
    // expect edit of accommodation
    // 200 ok
    // 400 invalid format
    // 404 not found
    it("should test that PUT /destinations returns 200 on valid entry", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.put("/destinations/" + validDestinationEntry.city).send(modifiedDestinationEntry)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should test that PUT /destinations returns 400 on invalid id", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.put("/destinations/noID").send(modifiedDestinationEntry)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should test that PUT /destinations returns 404 on not found", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.put("/destinations/60bc1808ae33b80015046cc5").send(modifiedDestinationEntry)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    // GET:ID
    // 200 ok
    // 400 invalid format
    // 404 not found
    it("should test that GET /destinations returns 200 on valid entry", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/destinations/" + validDestinationEntry.city)];
                case 1:
                    response = _a.sent();
                    console.log("MY CITY ID I AM TRYING TO GET", validDestinationEntry.city);
                    expect(response.status).toBe(200);
                    expect(typeof response.body._id).toBe("string");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should test that GET /destinations returns 400 on invalid id", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/destinations/noID")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should test that GET /destinations returns 404 on id not found", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/destinations/60bc1808ae33b80015046cc5")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    // DEL:ID
    // 204 Gone
    // 400 invalid format
    // 404 not found
    it("should test that DELETE /destinations returns 204 on valid entry", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.delete("/destinations/" + validDestinationEntry.city)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(204);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should test that DELETE /destinations returns 400 on invalid id", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.delete("/destinations/noID")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should test that DELETE /destinations returns 404 on id not found", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.delete("/destinations/60bc1808ae33b80015046cc5")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    // ROUTE ACCOMMODATION
    // GET ALL
    // Expect list of all accommodation
    // 200 OK
    it("should test that GET /accommodation returns 200", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/accommodation")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    // POST
    // expect post a new accommodation
    // 400 if invalid data
    // 201 Created
    it("should test that POST /accommodation returns 201 on valid data", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post("/accommodation").send(validAccommodationEntry)];
                case 1:
                    response = _a.sent();
                    global.validAccommodationID = response.body._id; // <= doesnt work :(
                    expect(response.status).toBe(201);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should test that POST /accommodation returns 400 on invalid data", function () { return __awaiter(void 0, void 0, void 0, function () {
        var responseA, responseB;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post("/accommodation").send(invalidAccommodationEntry)];
                case 1:
                    responseA = _a.sent();
                    return [4 /*yield*/, request.post("/accommodation").send({})];
                case 2:
                    responseB = _a.sent();
                    expect(responseA.status).toBe(400);
                    expect(responseB.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    // PUT:ID
    // expect edit of accommodation
    // 200 ok
    // 400 invalid format
    // 404 not found
    it("should test that PUT /accommodation returns 200 on valid entry", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.put("/accommodation/" + global.validAccommodationID).send(modifiedAccommodationEntry)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should test that PUT /accommodation returns 400 on invalid id", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.put("/accommodation/noID").send(modifiedAccommodationEntry)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should test that PUT /accommodation returns 404 on not found", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.put("/accommodation/60bc1808ae33b80015046cc5").send(modifiedAccommodationEntry)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    // GET:ID
    // 200 ok
    // 400 invalid format
    // 404 not found
    it("should test that GET /accommodation returns 200 on valid entry", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("*****************************************", global.validAccommodationID);
                    return [4 /*yield*/, request.get("/accommodation/" + global.validAccommodationID)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(typeof response.body._id).toBe("string");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should test that GET /accommodation returns 400 on invalid id", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/accommodation/noID")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should test that GET /accommodation returns 404 on id not found", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/accommodation/60bc1808ae33b80015046cc5")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    // DEL:ID
    // 204 Gone
    // 400 invalid format
    // 404 not found
    it("should test that DELETE /accommodation returns 204 on valid entry", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.delete("/accommodation/" + global.validAccommodationID)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(204);
                    console.log(validAccommodationID);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should test that DELETE /accommodation returns 400 on invalid id", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.delete("/accommodation/noID")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should test that DELETE /accommodation returns 404 on id not found", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.delete("/accommodation/60bc1808ae33b80015046cc5")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function (done) {
        mongoose_1.default.connection.dropDatabase().then(function () {
            mongoose_1.default.connection.close().then(done);
        });
    });
});
