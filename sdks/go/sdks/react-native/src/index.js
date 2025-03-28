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
exports.UdeneMetrics = exports.UdeneInteraction = exports.UdeneClient = exports.useFraud = exports.FraudProvider = void 0;
const react_1 = require("react");
const FraudClient_1 = require("./services/FraudClient");
Object.defineProperty(exports, "UdeneClient", { enumerable: true, get: function () { return FraudClient_1.UdeneClient; } });
Object.defineProperty(exports, "UdeneInteraction", { enumerable: true, get: function () { return FraudClient_1.UdeneInteraction; } });
Object.defineProperty(exports, "UdeneMetrics", { enumerable: true, get: function () { return FraudClient_1.UdeneMetrics; } });
const FraudContext = (0, react_1.createContext)({
    client: null,
    trackInteraction: () => __awaiter(void 0, void 0, void 0, function* () { }),
    getMetrics: () => __awaiter(void 0, void 0, void 0, function* () { return ({ totalInteractions: 0, riskScore: 0, lastUpdated: '' }); })
});
const FraudProvider = ({ apiKey, baseUrl, children }) => {
    const client = new FraudClient_1.UdeneClient(apiKey, baseUrl);
    const trackInteraction = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        return client.trackInteraction(interaction);
    });
    const getMetrics = () => __awaiter(void 0, void 0, void 0, function* () {
        return client.getMetrics();
    });
    return value = {};
    {
        client, trackInteraction, getMetrics;
    }
};
exports.FraudProvider = FraudProvider;
 >
    { children }
    < /FraudContext.Provider>;
;
;
// Hook to use the fraud context
const useFraud = () => (0, react_1.useContext)(FraudContext);
exports.useFraud = useFraud;
// Default export
exports.default = FraudClient_1.UdeneClient;
const react_native_1 = require("react-native");
const axios_1 = __importDefault(require("axios"));
/**
 * UdeneClient for React Native
 * A client for interacting with the Udene Fraud Detection API
 */
class UdeneClient {
    /**
     * Create a new UdeneClient instance
     * @param config - Configuration options for the client
     */
    constructor({ apiKey, baseURL = 'https://udene.net/v1', platform }) {
        this.client = axios_1.default.create({
            baseURL,
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'X-Platform': platform || react_native_1.Platform.OS,
                'X-SDK-Version': '1.0.0',
                'X-SDK-Type': 'react-native'
            }
        });
        this.platform = platform || react_native_1.Platform.OS;
    }
    /**
     * Get fraud metrics for the current user/device
     * @returns Fraud metrics data
     */
    getMetrics() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.get('/metrics');
            return response.data;
        });
    }
    /**
     * Get activity data for analysis
     * @returns Activity data
     */
    getActivity() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.get('/activity');
            return response.data;
        });
    }
    /**
     * Track a user interaction for fraud analysis
     * @param data - Interaction data to track
     * @returns Tracking confirmation
     */
    trackInteraction(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.post('/track', data);
            return response.data;
        });
    }
    /**
     * Analyze an email for Business Email Compromise (BEC) threats
     * @param emailData - Email data to analyze
     * @returns BEC analysis results
     */
    analyzeBEC(emailData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.post('/analyze-bec', emailData);
            return response.data;
        });
    }
}
exports.UdeneClient = UdeneClient;
const FraudContext = (0, react_1.createContext)({
    client: null,
    trackInteraction: () => __awaiter(void 0, void 0, void 0, function* () { return ({}); }),
    getMetrics: () => __awaiter(void 0, void 0, void 0, function* () { return ({}); }),
});
/**
 * Provider component for Fraud detection features
 */
const FraudProvider = ({ apiKey, baseURL, children }) => {
    const client = new FraudClient_1.UdeneClient({ apiKey, baseURL });
    const trackInteraction = (data) => __awaiter(void 0, void 0, void 0, function* () {
        return client.trackInteraction(data);
    });
    const getMetrics = () => __awaiter(void 0, void 0, void 0, function* () {
        return client.getMetrics();
    });
    return value = {};
    {
        client, trackInteraction, getMetrics;
    }
};
exports.FraudProvider = FraudProvider;
 >
    { children }
    < /FraudContext.Provider>;
;
;
/**
 * Hook for accessing fraud detection functionality
 * @returns Fraud detection methods and client
 */
const useFraud = () => {
    const context = (0, react_1.useContext)(FraudContext);
    if (!context) {
        throw new Error('useFraud must be used within a FraudProvider');
    }
    return context;
};
exports.useFraud = useFraud;
