# Deployment Guide: FixPro AI Maintenance Expert

This guide provides step-by-step instructions on how to deploy the FixPro application to production environments.

## 1. Prerequisites
- **Gemini API Key**: Obtain your key from [Google AI Studio](https://aistudio.google.com/).
- **Google Cloud Account**: Required for Cloud Run.
- **GitHub Account**: Required for CI/CD and Vercel.

---

## 2. Deploying to Google Cloud Run

Google Cloud Run is an excellent choice for this app as it handles scaling and only charges when the app is in use.

### Step A: Verify the Dockerfile
A `Dockerfile` has been created in the root directory. It uses `nginx:alpine` to serve your static files and is configured to listen on port **8080**, which is the default requirement for Cloud Run.

### Step B: Build and Push to Container Registry
Open your terminal and run the following commands:

```bash
# 1. Login to Google Cloud
gcloud auth login

# 2. Set your project ID
export PROJECT_ID="your-google-cloud-project-id"
gcloud config set project $PROJECT_ID

# 3. Build the container image using Cloud Build
gcloud builds submit --tag gcr.io/$PROJECT_ID/fixpro
```

### Step C: Deploy to Cloud Run
Deploy the container with your API Key injected as an environment variable:

```bash
gcloud run deploy fixpro \
  --image gcr.io/$PROJECT_ID/fixpro \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="API_KEY=your_gemini_api_key_here"
```

Once deployed, Google Cloud Run will provide you with a secure HTTPS URL (e.g., `https://fixpro-xyz-uc.a.run.app`).

---

## 3. Deploying via GitHub & Vercel

Vercel is the fastest way to deploy this frontend application globally.

### Step A: Push Code to GitHub
1. Initialize your local repository if you haven't:
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   ```
2. Create a new repository on GitHub.
3. Link and push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/fixpro.git
   git push -u origin main
   ```

### Step B: Connect to Vercel
1. Log in to [Vercel](https://vercel.com).
2. Click **"Add New"** > **"Project"**.
3. Select your **fixpro** repository from the list.
4. **Configure Project**:
   - **Framework Preset**: Select "Other" (since we are using raw HTML/TSX with ESM).
   - **Build Command**: Leave empty.
   - **Output Directory**: Leave empty (or set to `.` if asked).
5. **Environment Variables** (Crucial):
   - Expand the "Environment Variables" section.
   - Key: `API_KEY`
   - Value: `Your_Actual_Gemini_API_Key_String`
6. Click **Deploy**.

---

## 4. Technical Architecture Note
This application utilizes a modern "no-build" architecture for development, loading React and dependencies directly via `esm.sh` in the browser.

- **Cloud Run**: Uses Nginx to serve the static files.
- **Vercel**: Serves the static files from the edge network.

**Security Notice**: The `API_KEY` is currently injected into the client-side process. For high-security enterprise deployments, it is recommended to implement a lightweight proxy server (using Node.js or Cloud Functions) to handle the Gemini API requests and keep the key hidden from the browser.

---

## 5. Troubleshooting
- **Error 503 / Quota Exceeded**: The app includes automatic retry logic. If errors persist, check your Google Cloud billing or quota limits.
- **Camera/Mic Permissions**: Ensure your deployed site uses **HTTPS**. Browsers block camera access on insecure HTTP connections (except localhost). Cloud Run and Vercel provide HTTPS by default.
