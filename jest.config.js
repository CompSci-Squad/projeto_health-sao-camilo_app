module.exports = {
    preset: "jest-expo",
    testEnvironment: "node",
    transform: {
        "^.+\\.(js|ts|tsx)$": "babel-jest",
    },
    transformIgnorePatterns: [
        "node_modules/(?!(?:.pnpm/)?((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@gluestack-ui|@gluestack-style|react-native-svg))",
    ],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testPathIgnorePatterns: ["/node_modules/", "/android/", "/ios/"],
};
