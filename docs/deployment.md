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
The project includes a `Dockerfile` configured for Cloud Run:
- Uses `nginx:alpine` to serve static files.
- Configured to listen on port **8080** (Cloud Run default).
- Includes a startup script that automatically injects your `API_KEY` environment variable into the browser application securely.

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
  --set-env-vars="API_KEY=your_actual_api_key_here"
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
   - **Framework Preset**: Select "Other" (or Vite if you are using a build step).
   - **Output Directory**: `.` (Current directory) or `dist` if you are building.
5. **Environment Variables** (Crucial):
   - Expand the "Environment Variables" section.
   - Key: `API_KEY`
   - Value: `Your_Actual_Gemini_API_Key_String`
   - *Note*: Since this is a client-side app, you may need to ensure Vercel exposes this to the client (often by prefixing with `NEXT_PUBLIC_` or `VITE_` if using a framework, or manually handling injection as described below).
6. Click **Deploy**.

---

## 4. Technical Notes

### Environment Variables
This application uses `process.env.API_KEY`. 
- **Docker/Cloud Run**: The included `Dockerfile` automatically injects this value from the server environment into the HTML page at runtime.
- **Vercel/Static**: You may need to update the code to use a hardcoded key or a specific build plugin if `process` is not defined in your environment.

### Production Readiness
- **HTTPS**: Camera access requires HTTPS. Both Cloud Run and Vercel provide this automatically.
- **Quota**: If you encounter 503/429 errors, the app has built-in retry logic, but ensure your Gemini API quota is sufficient.
