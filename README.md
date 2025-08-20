# Website Security Scanner
The Web Security Scanner API is a Node.js & Express-based backend project that provides automated website security scanning.
It analyzes SSL certificates, response headers, and CORS policies, then generates a security grade (A–F) with a detailed list of vulnerabilities.
This tool helps developers, system administrators, and security researchers quickly assess basic security hygiene of any public website.

---

## 🚀 Features

* **User Authentication** (JWT based)
* **Role-based Access Control** (`admin`, `user`, `athlete`)
* **API Key Management** (create, toggle, delete)
* **Website Security Scanner**

  * SSL/TLS Certificate check
  * HTTP Headers analysis
  * CORS policy validation
  * Security grading system (A–F)
  * Vulnerability detection (e.g., missing headers)
* **Feedback System**
* **Notifications System**
* **Logs Tracking**
* **Admin & User Dashboards**

---

## 🛠️ Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: MongoDB, Mongoose
* **Authentication**: JWT, bcrypt
* **Utilities**: Axios, ssl-checker, Morgan, CORS
* **Error Handling**: Centralized `catchError` middleware

---

## 🗂️ Project Structure

```
project/
│-- src/
│   ├── modules/
│   │   ├── auth/
│   │   ├── apiKey/
│   │   ├── scanResult/
│   │   ├── feedback/
│   │   ├── notification/
│   │   ├── accessLog/
│   │   └── dashboard/
│   ├── middleware/
│   └── utils/
│-- database/
│-- server.ts
```

---

## 🗄️ Database Models

### User

```ts
{
  username: String,
  email: String,
  password: String,
  role: { type: String, enum: ["admin", "user", "athlete"] }
}
```

### ScanResult

```ts
{
  url: String,
  scanDate: Date,
  sslStatus: "valid" | "expired" | "invalid",
  headers: [{ key: String, value: String }],
  corsPolicy: String,
  securityGrade: String,
  vulnerabilities: [{
    title: String,
    severity: String,
    description: String
  }],
  owner: ObjectId
}
```

---

## 🔗 API Endpoints

### Authentication

* `POST /api/v1/auth/signUp`
* `POST /api/v1/auth/signIn`
* `PATCH /api/v1/auth/` (change password)
* `GET /api/v1/auth/` (admin: list all users)
* `GET /api/v1/auth/:id` (admin: get user by id)
* `DELETE /api/v1/auth/` (athlete: delete own account)

### API Keys

* `POST /api/v1/apiKey/`
* `GET /api/v1/apiKey/`
* `PATCH /api/v1/apiKey/toggle`
* `DELETE /api/v1/apiKey/`

### Scan Results

* `POST /api/v1/scanResult/scan` → Trigger a website scan
* `GET /api/v1/scanResult/` → Get all scans
* `GET /api/v1/scanResult/getById/:id`
* `DELETE /api/v1/scanResult/remove`

### Feedback

* `POST /api/v1/feedback/`
* `GET /api/v1/feedback/`
* `GET /api/v1/feedback/scan/:scanId`
* `DELETE /api/v1/feedback/:id`

### Notifications

* `POST /api/v1/notification/`
* `GET /api/v1/notification/`
* `PATCH /api/v1/notification/:id/read`
* `DELETE /api/v1/notification/:id`

### Logs

* `POST /api/v1/log/`
* `GET /api/v1/log/`
* `GET /api/v1/log/:id`

### Dashboard

* `GET /api/v1/dashboard/user`
* `GET /api/v1/dashboard/admin`

---

## ⚙️ Environment Variables

Create `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/security_scanner
JWT_SECRET=your_secret_key
```

---

## 📬 Example Requests

### Run a Website Scan

```bash
curl -X POST http://localhost:3000/api/v1/scanResult/scan \
  -H "Content-Type: application/json" \
  -d '{ "url": "https://www.microsoft.com" }'
```

### Create API Key

```bash
curl -X POST http://localhost:3000/api/v1/apiKey/ \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

---

## 📊 Security Grade System

* **A** → 90–100
* **B** → 75–89
* **C** → 60–74
* **D** → 40–59
* **F** → Below 40

Deductions are based on missing headers, invalid SSL, and failed fetch attempts.

---

## 🧰 Tools Used

* **Node.js / Express** → REST API framework
* **MongoDB + Mongoose** → Database & ODM
* **JWT** → Authentication
* **bcrypt** → Password hashing
* **axios** → HTTP requests
* **ssl-checker** → SSL validation
* **morgan** → Logging
* **cors** → Cross-origin requests

---

## 📌 Next Steps

* Add more detailed vulnerability checks (XSS, CSRF, SQLi patterns)
* Integrate automated email notifications
* Enhance dashboard with analytics and charts

---

✅ This project provides a **foundation for a web security auditing tool**, extendable with more security tests and integrations.
