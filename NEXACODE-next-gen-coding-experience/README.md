

# **NexaCode (Next-gen coding experience)**  
**A Full-Stack AI Development Environment**  
*Next-gen AI agent with in-browser code execution, real-time collaboration, and Gemini AI integration*  

---

## **🚀 Technology Stack**  

### **Frontend (Vite + React)**  
| Category          | Technologies Used |  
|-------------------|-------------------|  
| **Core Framework** | React 18, React Router DOM |  
| **Build Tool**    | Vite 6.0 |  
| **Styling**       | Tailwind CSS 3.4 + Autoprefixer |  
| **Real-Time**     | Socket.IO Client 4.8 |  
| **AI Markdown**   | `markdown-to-jsx` + Highlight.js |  
| **HTTP Client**   | Axios |  
| **Icons**         | RemixIcon |  
| **In-Browser IDE**| `@webcontainer/api` (CodeSandbox-like execution) |  

### **Backend (Node.js + Express)**  
| Category          | Technologies Used |  
|-------------------|-------------------|  
| **Server**        | Express 4.x |  
| **Database**      | MongoDB (Mongoose ODM) |  
| **Authentication**| JWT + Bcrypt |  
| **AI Integration**| Google Generative AI SDK |  
| **Real-Time**     | Socket.IO Server |  
| **Caching**       | Redis (ioredis) |  
| **Validation**    | express-validator |  

---

## **🛠️ Setup & Installation**  

### **1. Backend Setup**  
```bash
cd backend
npm install
```
**Environment Variables (`backend/.env`)**  
```env
MONGODB_URI=mongodb://localhost:27017/devin-ai
GEMINI_API_KEY=your_google_ai_key_here
JWT_SECRET=your_jwt_secret_here
REDIS_URL=redis://localhost:6379
PORT=3000
```

**Start Backend Server**  
```bash
node server.js
```

---

### **2. Frontend Setup**  
```bash
cd frontend
npm install
```
**Environment Variables (`frontend/.env`)**  
```env
VITE_API_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
```

**Start Development Server**  
```bash
npm run dev
```

---

## **✨ Key Features**  

### **Frontend Highlights**  
✅ **WebContainer-Powered Code Execution**  
- Runs JavaScript/Node.js directly in the browser using `@webcontainer/api`  
- Sandboxed environment (similar to CodeSandbox/StackBlitz)  
- Supports real-time code collaboration  

✅ **AI-Powered Chat Interface**  
- Markdown rendering (`markdown-to-jsx`)  
- Syntax highlighting (`highlight.js`)  
- Streaming responses via Socket.IO  

✅ **Responsive UI**  
- Tailwind CSS for adaptive design  
- Dark/Light mode toggle  
- RemixIcon integration  

### **Backend Highlights**  
🔐 **JWT Authentication**  
- Secure login/signup with `bcrypt` hashing  
- Protected API routes  

🤖 **Google Gemini AI Integration**  
- Natural language processing  
- Context-aware responses  

🔌 **Real-Time Communication**  
- Socket.IO for live updates  
- Redis for session management  

---

## **📂 Project Structure**  

### **Backend**  
```
backend/
├── server.js          # Express entry point
├── controllers/       # Route handlers
├── models/            # MongoDB schemas
├── routes/            # API endpoints
├── middleware/        # Auth & validation
└── utils/             # Helpers (JWT, logger)
```

### **Frontend**  
```
frontend/
├── src/
│   ├── components/    # React UI components
│   ├── pages/         # Next.js-like routing
│   ├── hooks/         # Custom hooks (Socket, WebContainer)
│   ├── styles/        # Tailwind config
│   ├── utils/         # API clients, helpers
│   └── App.jsx        # Main entry
├── public/            # Static assets
└── index.html         # Vite entry
```

---

## **🌐 Deployment**  

### **Frontend (Static Hosting)**  
```bash
cd frontend
npm run build  # Generates `dist/` folder
```
- Deploy `dist/` to **Vercel, Netlify, or GitHub Pages**  

### **Backend (Node.js Server)**  
- Requires **Node.js 18+**  
- Recommended: **Docker** or **PM2** for production  

---

## **🔧 Troubleshooting**  
- **WebContainer API Issues?**  
  - Ensure Chrome/Edge (Chromium-based browsers)  
  - Check for CORS policies if running locally  

- **Socket.IO Connection Failed?**  
  - Verify backend URL in `frontend/.env`  

---

