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
exports.scanWebsite = scanWebsite;
const axios_1 = __importDefault(require("axios"));
const ssl_checker_1 = __importDefault(require("ssl-checker"));
function scanWebsite(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let sslStatus = "unknown";
        let headers = [];
        let corsPolicy = "Not set";
        let vulnerabilities = [];
        try {
            // ✅ فحص SSL
            const sslInfo = yield (0, ssl_checker_1.default)(url.replace(/^https?:\/\//, "").replace(/\/$/, ""));
            sslStatus = sslInfo.valid ? "valid" : "invalid";
        }
        catch (err) {
            sslStatus = "invalid";
        }
        try {
            // ✅ فحص HTTP headers
            const response = yield axios_1.default.get(url, { timeout: 5000 });
            // تخزين headers كـ key/value بدل null
            headers = Object.entries(response.headers).map(([key, value]) => ({
                key,
                value: String(value),
            }));
            if (response.headers["access-control-allow-origin"]) {
                corsPolicy = response.headers["access-control-allow-origin"];
            }
            // ✅ أمثلة ثغرات structured
            if (!response.headers["content-security-policy"]) {
                vulnerabilities.push({
                    title: "Missing Content-Security-Policy header",
                    severity: "high",
                    description: "CSP helps prevent XSS attacks by restricting sources of scripts.",
                });
            }
            if (!response.headers["x-frame-options"]) {
                vulnerabilities.push({
                    title: "Missing X-Frame-Options header",
                    severity: "medium",
                    description: "This header protects against clickjacking attacks by controlling if a page can be embedded in iframes.",
                });
            }
            if (!response.headers["x-content-type-options"]) {
                vulnerabilities.push({
                    title: "Missing X-Content-Type-Options header",
                    severity: "low",
                    description: "This header prevents MIME-type sniffing which can cause security issues.",
                });
            }
        }
        catch (err) {
            vulnerabilities.push({
                title: "Failed to fetch headers",
                severity: "high",
                description: "The scanner could not fetch response headers from the site.",
            });
        }
        // ✅ حساب درجة الأمان A–F
        let securityGrade = "F";
        const score = 100;
        const deductions = {
            "Missing Content-Security-Policy header": 30,
            "Missing X-Frame-Options header": 20,
            "Missing X-Content-Type-Options header": 20,
            "Failed to fetch headers": 50,
        };
        let totalScore = score;
        for (const vuln of vulnerabilities) {
            if (deductions[vuln.title]) {
                totalScore -= deductions[vuln.title];
            }
        }
        if (sslStatus !== "valid")
            totalScore -= 30;
        if (totalScore >= 90)
            securityGrade = "A";
        else if (totalScore >= 75)
            securityGrade = "B";
        else if (totalScore >= 60)
            securityGrade = "C";
        else if (totalScore >= 40)
            securityGrade = "D";
        else
            securityGrade = "F";
        return {
            url,
            sslStatus,
            headers,
            corsPolicy,
            vulnerabilities,
            securityGrade,
            scanDate: new Date(),
        };
    });
}
