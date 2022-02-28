const fs = require("fs");
const path = require("path");

const pkgFile = path.resolve(__dirname, "../package.json");
const pkg = JSON.parse(fs.readFileSync(pkgFile, "utf-8"));

pkg.main = "node_modules/expo/AppEntry.js";

fs.writeFileSync(pkgFile, JSON.stringify(pkg, null, 2), "utf-8");
