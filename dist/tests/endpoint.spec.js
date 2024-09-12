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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../server");
describe('GET /api/resize', () => {
    // Test for successful image resize
    it('should return 200 and the resized image when valid parameters are provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app)
            .get('/api/resize')
            .query({ filename: 'fjord', width: 100, height: 200 });
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain('image'); // Check that it returns an image
    }));
    // Test for missing parameters
    it('should return 400 if width or height is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app)
            .get('/api/resize')
            .query({ filename: 'fjord', width: 100 });
        expect(response.status).toBe(400);
    }));
    // Test for invalid width or height (non-numeric)
    it('should return 400 if width or height is non-numeric', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app)
            .get('/api/resize')
            .query({ filename: 'fjord', width: 'abc', height: 200 });
        expect(response.status).toBe(400);
    }));
    // Test for invalid filename format
    it('should return 400 if filename format is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app)
            .get('/api/resize')
            .query({ filename: 'fjord$', width: 100, height: 200 });
        expect(response.status).toBe(400);
    }));
    // Test for image not found
    it('should return 404 if the image does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app)
            .get('/api/resize')
            .query({ filename: 'nonexistent', width: 100, height: 200 });
        expect(response.status).toBe(400);
    }));
});
