"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const express_1 = __importDefault(require("express"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const app = (0, express_1.default)();
exports.app = app;
mongoose_1.default
  .connect(config_1.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));
app.listen(config_1.PORT, () =>
  console.log(`Server running on port ${config_1.PORT}`)
);
app.use("/api", postRoutes_1.default);
