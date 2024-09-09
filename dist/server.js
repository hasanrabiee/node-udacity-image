'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const images_1 = __importDefault(require('./routes/images'));
const app = (0, express_1.default)();
const port = 3000;
// Middleware to serve static files (original images)
app.use('/images', express_1.default.static('images'));
// Use the image resizing route
app.use('/api', images_1.default);
app.get('/', (req, res) => {
  res.send('hello world');
});
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
