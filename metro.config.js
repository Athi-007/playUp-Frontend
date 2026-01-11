const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Replace "./global.css" with the actual path to your CSS file
module.exports = withNativeWind(config, { input: "./global.css" });