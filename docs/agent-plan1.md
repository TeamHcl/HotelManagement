# Frontend-Backend Integration Plan

This plan details how we will connect the existing React frontend UI (`HotelManagement`) to the Spring Boot backend (`HotelManagementSystem`) using the endpoints specified in `doc.json`.

## User Review Required

> [!WARNING]
> Please review this integration plan and let me know if you approve or require changes.
> I will wait for your approval before writing any code to implement the API connections.

## Proposed Architecture

1.  **Axios Instance Configuration**: 
    Create a centralized API client with base URL pointing to the Spring Boot application (e.g., `http://localhost:8080/api/v1`—*exact port to be confirmed*).
2.  **Authentication Context (Global State)**: 
    Implement a React Context (`AuthContext.tsx`) to store the JWT `token`, `userId`, `email`, and `role`. This will manage the global authenticated state.
3.  **Authentication Interceptors**: 
    Configure the Axios instance to automatically attach the `Authorization: Bearer <token>` header to all outgoing requests to protected endpoints.

---

## 🏗️ Proposed Changes by Component

### 1. API Client Setup
#### [NEW] `src/lib/api.ts`
- Create an Axios instance (`apiClient`).
- Create request interceptors to inject the JWT token from `localStorage` (or Context).
- Create response interceptors to handle `401 Unauthorized` responses and trigger forced logouts if the token expires.

### 2. Authentication Context
#### [NEW] `src/contexts/AuthContext.tsx`
- Manage `user` state and `token`.
- Expose `login`, `register`, and `logout` functions globally.
- Persist sessions across page reloads using `localStorage`.

#### [MODIFY] `src/App.tsx` or `src/main.tsx`
- Wrap the application routing in `<AuthProvider>`.

### 3. API Services (Endpoints from `doc.json`)
#### [NEW] `src/services/authService.ts`
- `POST /auth/login` - Takes `email` and `password`, returns token.
- `POST /auth/register` - Takes `name, email, password, role`.

#### [NEW] `src/services/userService.ts`
- `GET /users/me` - Fetches authenticated user's profile.
- `PUT /users/me` - Updates profile information.
- `GET /users/me/loyalty` - Retrieves the user's loyalty points balance.

### 4. Updating Application Forms (UI Integration)
#### [MODIFY] `src/features/auth/pages/Login.tsx`
- Replace mock form submission with a call to `authService.login()`.
- Upon success, update `AuthContext` and navigate the user to `/` (or their dashboard).
- Add robust loading indicators and error toasts using `sonner` if login fails.

#### [MODIFY] `src/features/auth/pages/Register.tsx`
- Hook up form fields directly to `authService.register()`.
- Add validation and trigger error popups for taken emails or weak passwords.

## Open Questions
> [!IMPORTANT]
> 1. What port is the Spring Boot backend configured to run on locally? (Normally `8080`).
> 2. Should we assign new registrants the `CUSTOMER` role by default, or provide a UI dropdown to let them choose?
> 3. Does the backend append a prefix like `/api/v1` to the URLs in `doc.json`, or are they mounted directly at the root (e.g. `http://localhost:8080/auth/login`)?

## Verification Plan
### Manual Verification
1. Boot the Spring Boot application.
2. In the React app, fill out the `/register` form and verify that a new user appears in your database.
3. Verify that the login form correctly receives the JWT token.
4. Verify that accessing the profile/dashboard correctly pulls user data (`/users/me`) using the injected Bearer token.
