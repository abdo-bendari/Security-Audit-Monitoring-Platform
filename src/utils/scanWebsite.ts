import axios from "axios";
import sslChecker from "ssl-checker";

export async function scanWebsite(url: string) {
  let sslStatus = "unknown";
  let headers: { key: string; value: string }[] = [];
  let corsPolicy = "Not set";
  let vulnerabilities: {
    title: string;
    severity: "low" | "medium" | "high";
    description?: string;
  }[] = [];

  try {
    // ✅ فحص SSL
    const sslInfo = await sslChecker(
      url.replace(/^https?:\/\//, "").replace(/\/$/, "")
    );
    sslStatus = sslInfo.valid ? "valid" : "invalid";
  } catch (err) {
    sslStatus = "invalid";
  }

  try {
    // ✅ فحص HTTP headers
    const response = await axios.get(url, { timeout: 5000 });

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
        description:
          "CSP helps prevent XSS attacks by restricting sources of scripts.",
      });
    }
    if (!response.headers["x-frame-options"]) {
      vulnerabilities.push({
        title: "Missing X-Frame-Options header",
        severity: "medium",
        description:
          "This header protects against clickjacking attacks by controlling if a page can be embedded in iframes.",
      });
    }
    if (!response.headers["x-content-type-options"]) {
      vulnerabilities.push({
        title: "Missing X-Content-Type-Options header",
        severity: "low",
        description:
          "This header prevents MIME-type sniffing which can cause security issues.",
      });
    }
  } catch (err) {
    vulnerabilities.push({
      title: "Failed to fetch headers",
      severity: "high",
      description: "The scanner could not fetch response headers from the site.",
    });
  }

  // ✅ حساب درجة الأمان A–F
  let securityGrade = "F";
  const score = 100;

  const deductions: Record<string, number> = {
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

  if (sslStatus !== "valid") totalScore -= 30;

  if (totalScore >= 90) securityGrade = "A";
  else if (totalScore >= 75) securityGrade = "B";
  else if (totalScore >= 60) securityGrade = "C";
  else if (totalScore >= 40) securityGrade = "D";
  else securityGrade = "F";

  return {
    url,
    sslStatus,
    headers,
    corsPolicy,
    vulnerabilities,
    securityGrade,
    scanDate: new Date(),
  };
}
