# HubCredo Assignment - React + Supabase + n8n

A full-stack authentication system built for the HubCredo internship assignment. It features a complete Signup/Login flow, Supabase authentication (email/password), and an automated webhook integration with n8n.

## 🚀 Live Demo
**Live Link:** [INSERT_VERCEL_LINK_HERE]  
https://hub-credo-gules.vercel.app/

## 🛠️ Tech Stack
* **Frontend:** React (Vite)
* **Styling:** Tailwind CSS (Clean, responsive UI)
* **Backend / Auth:** Supabase (PostgreSQL, Auth Helpers)
* **Automation:** n8n (Webhook integration)

## ✨ Features
1.  **Authentication Flow:**
    * Sign Up with **Name**, **Email**, **Password**, and **Confirm Password**.
    * Login with Email & Password.
    * Form validation (empty fields, password mismatch).
    * Error handling with clear UI messages.
2.  **Dashboard:**
    * Protected route (only accessible when logged in).
    * Displays the user's **Name** fetched from Supabase metadata.
    * Logout functionality.
3.  **Automation (Bonus):**
    * Triggers an n8n webhook on every successful signup.
    * Sends user `email`, `name`, and `timestamp` to the external workflow.

## ⚙️ Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/hubcredo-assignment.git](https://github.com/YOUR_USERNAME/hubcredo-assignment.git)
    cd hubcredo-assignment
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file in the root directory and add your keys:
    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    VITE_N8N_WEBHOOK_URL=your_n8n_webhook_url
    ```

4.  **Run the project:**
    ```bash
    npm run dev
    ```
