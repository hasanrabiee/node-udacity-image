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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const imageProcessor_1 = require("../utils/imageProcessor");
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
router.get('/resize', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename, width, height } = req.query;
    if (isNaN(parseInt(width)) || isNaN(parseInt(height))) {
        return res.status(400).send('Error: width or height is not valid !');
    }
    const imageDir = path_1.default.join(__dirname, '../../images');
    const processedDir = path_1.default.join(__dirname, '../../images/processed');
    const widthNum = parseInt(width, 10);
    const heightNum = parseInt(height, 10);
    const isNumeric = (value) => /^\d+$/.test(value);
    if (!filename || !width || !height) {
        return res
            .status(400)
            .send('Error: Missing required parameters (filename, width, height)');
    }
    if (!isNumeric(width) ||
        !isNumeric(height) ||
        widthNum <= 0 ||
        heightNum <= 0) {
        return res
            .status(400)
            .send('Error: Invalid width or height. Width and height must be positive integers.');
    }
    const inputFile = path_1.default.join(imageDir, `${filename}.jpg`);
    const outputFile = path_1.default.join(processedDir, `${filename}-${width}x${height}.jpg`);
    if (!fs_1.default.existsSync(inputFile)) {
        return res.status(400).send('Error: Image not found');
    }
    try {
        const resizedImage = yield (0, imageProcessor_1.resizeImage)(inputFile, outputFile, widthNum, heightNum);
        return res.sendFile(resizedImage);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send('Error: Failed to process the image');
    }
}));
exports.default = router;
