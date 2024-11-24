# Soar Frontend

Soar's frontend application is built with React.js and modern web technologies to provide a seamless user experience for financial management and investment solutions. The application features a responsive design, efficient state management, and comprehensive UI components.

## Features

- **Modern UI/UX**: Built with shadcn/ui components and Tailwind CSS for a clean, responsive design
- **State Management**: Centralized state management using Redux Toolkit
- **API Integration**: Efficient API handling with RTK Query for automatic data caching and synchronization
- **Authentication**: Complete auth flow with JWT and Google OAuth integration
- **Theme Support**: Custom theming with CSS variables and Tailwind
- **Form Management**: Robust form handling with React Hook Form and Zod validation
- **Data Visualization**: Interactive charts and graphs using Recharts
- **File Handling**: Drag and drop file uploads with react-dropzone
- **Date Management**: Advanced date handling with date-fns and react-day-picker
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Toast Notifications**: User feedback system using Sonner
- **Type Safety**: Strong typing support with proper configurations
- **Route Protection**: Protected routes and authentication flow

## Prerequisites

Before you begin, ensure you have:
- Node.js (LTS version)
- pnpm (recommended) or npm
- Modern web browser
- Backend server running (refer to backend documentation)

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/AbhishekKolge/soar-client.git
cd soar-client
```

### 2. Install dependencies
```bash
pnpm install
# or
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

### local env

```env
VITE_BASE_URL="http://localhost:8000/api/v1"
VITE_ENV="development"
VITE_ACCESS_TOKEN_EXPIRATION_TIME="3600000"
VITE_TIME_BUFFER="300000"
VITE_EMAIL="admin@soar.com"
VITE_PASSWORD="Admin@123"
VITE_GOOGLE_LOGIN_URL='http://localhost:8000/api/v1/auth/google'
```

### prod env

```env
VITE_BASE_URL="https://soar-server.onrender.com/api/v1"
VITE_ENV="production"
VITE_ACCESS_TOKEN_EXPIRATION_TIME="3600000"
VITE_TIME_BUFFER="300000"
VITE_EMAIL="admin@soar.com"
VITE_PASSWORD="Admin@123"
VITE_GOOGLE_LOGIN_URL='https://soar-server.onrender.com/api/v1/auth/google'
```

### 4. Start Development Server
```bash
pnpm dev
# or
npm run dev
```

## Project Structure

```
src/
├── assets/          # Static assets (icons, illustrations, etc.)
├── components/      # Global layout (suspense, auth checker) with custom Shadcn components
├── features/        # Feature specific api queries built with RTK Query
├── lib/             # Utility functions provided by Shadcn
├── modules/         # Complex modules that combine multiple features
├── providers/       # Redux store, tooltip, suspense and auth wrappers
├── routes/          # Route definitions and configurations for each module
├── schema/          # Validation schemas (Zod schemas)
├── state/           # Redux store and configuration
├── utils/           # Helper functions, utilities, constants and custom hooks
├── App.jsx          # Root application component
├── index.css        # Global styles and Tailwind imports
└── main.jsx         # Application entry point
```

## Key Technologies

### Core
- **React.js**: Frontend library
- **Vite**: Build tool
- **Redux Toolkit**: State management
- **RTK Query**: API data fetching and caching
- **React Router**: Client-side routing

### UI & Styling
- **shadcn/ui**: UI component library
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **CVA**: Component variant management
- **tailwind-merge**: Tailwind class merging utility

### Forms & Validation
- **React Hook Form**: Form management
- **Zod**: Schema validation
- **libphonenumber-js**: Phone number validation

### Data Visualization
- **Recharts**: Chart library
- **date-fns**: Date manipulation
- **react-day-picker**: Date picker component

### Additional Features
- **react-dropzone**: File upload
- **Embla Carousel**: Carousel component
- **Sonner**: Toast notifications
- **React Topbar Progress**: Progress indicator

### Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## System Architecture

### Diagrams

#### User Flow Diagram
View the detailed user flow diagram here:
[User Flow Diagram](https://app.eraser.io/workspace/2nWABkioYzntAg8KWpXi?origin=share)

#### Database Design Diagram
View the complete database design here:
[Database Design Diagram](https://app.eraser.io/workspace/WSpKHr0oA2YXewPsdLHG?origin=share)

## API Documentation

### Postman Collection

[![View API Documentation](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/17221325/2sAYBSkYh2)

### Available Endpoints

#### Auth Routes
- `POST /api/v1/auth/register` - Register a new user
  - Body: `{ name, username, email, password, dob, contactNumber }`
  - Returns: User object with token

- `POST /api/v1/auth/verify` - Verify user email
  - Body: `{ verificationCode }`
  - Returns: Success message

- `POST /api/v1/auth/forgot-password` - Initiate forgot password process
  - Body: `{ email }`
  - Returns: Success message

- `POST /api/v1/auth/reset-password` - Reset the user's password
  - Body: `{ resetPasswordCode, password }`
  - Returns: Success message

- `POST /api/v1/auth/login` - Login with credentials
  - Body: `{ email, password }`
  - Returns: User object with token

- `GET /api/v1/auth/google` - Initiate Google OAuth2 authentication
- `GET /api/v1/auth/google/callback` - Google OAuth2 callback

#### User Routes
- `GET /api/v1/user/show-me` - Get current user's details
  - Headers: `Authorization: Bearer <token>`
  - Returns: User profile details

- `POST /api/v1/user/profile-image` - Upload profile image
  - Headers: `Authorization: Bearer <token>`
  - Body: Form data with image file
  - Returns: Updated user object

- `DELETE /api/v1/user/profile-image` - Remove profile image
  - Headers: `Authorization: Bearer <token>`
  - Returns: Success message

- `PATCH /api/v1/user/` - Update user details
  - Headers: `Authorization: Bearer <token>`
  - Body: Updated user fields
  - Returns: Updated user object

- `DELETE /api/v1/user/` - Delete user account
  - Headers: `Authorization: Bearer <token>`
  - Returns: Success message

#### Security Settings
- `GET /api/v1/user/security` - Get security settings
  - Headers: `Authorization: Bearer <token>`
  - Returns: Security settings object

- `PATCH /api/v1/user/security` - Update security settings
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ twoFactorAuth }`
  - Returns: Updated security settings

#### Preferences
- `GET /api/v1/user/preference` - Get preferences
  - Headers: `Authorization: Bearer <token>`
  - Returns: User preferences

- `PATCH /api/v1/user/preference` - Update preferences
  - Headers: `Authorization: Bearer <token>`
  - Body: Updated preference fields
  - Returns: Updated preferences

#### Account Routes
- `GET /api/v1/account` - Get account details
  - Headers: `Authorization: Bearer <token>`
  - Returns: Array of user accounts

- `POST /api/v1/account` - Add new account
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ number, name, bankId }`
  - Returns: Created account object

- `PATCH /api/v1/account/:id` - Update account
  - Headers: `Authorization: Bearer <token>`
  - Params: `id` - Account ID
  - Body: Updated account fields
  - Returns: Updated account object

- `DELETE /api/v1/account/:id` - Delete account
  - Headers: `Authorization: Bearer <token>`
  - Params: `id` - Account ID
  - Returns: Success message

#### Credit Card Routes
- `GET /api/v1/credit-card` - Get credit card details
  - Headers: `Authorization: Bearer <token>`
  - Returns: Array of user credit cards

- `POST /api/v1/credit-card` - Add new credit card
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ number, name, validity, pin }`
  - Returns: Created card object

- `PATCH /api/v1/credit-card/:id` - Update credit card
  - Headers: `Authorization: Bearer <token>`
  - Params: `id` - Card ID
  - Body: Updated card fields
  - Returns: Updated card object

- `DELETE /api/v1/credit-card/:id` - Delete credit card
  - Headers: `Authorization: Bearer <token>`
  - Params: `id` - Card ID
  - Returns: Success message

#### Transaction Routes
- `GET /api/v1/transaction` - Get transaction history
  - Headers: `Authorization: Bearer <token>`
  - Query Params: 
    - `page` (optional) - Page number
    - `limit` (optional) - Items per page
  - Returns: Paginated transaction list

- `POST /api/v1/transaction/transfer/:id` - Transfer amount
  - Headers: `Authorization: Bearer <token>`
  - Params: `id` - Card or Account ID
  - Body: `{ amount, recipient, note, category }`
  - Returns: Transaction details

#### Analytics Routes
- `GET /api/v1/analytics/activity` - Get weekly activity
  - Headers: `Authorization: Bearer <token>`
  - Returns: Weekly activity statistics

- `GET /api/v1/analytics/expense` - Get expense statistics
  - Headers: `Authorization: Bearer <token>`
  - Returns: Expense breakdown by category

- `GET /api/v1/analytics/balance` - Get balance history
  - Headers: `Authorization: Bearer <token>`
  - Returns: Historical balance data

#### Utils Routes
- `GET /api/v1/utils/countries` - Get countries list
  - Returns: Array of countries

- `GET /api/v1/utils/banks` - Get banks list
  - Returns: Array of banks

## Available Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm preview`: Preview production build
- `pnpm lint`: Run ESLint

## Theme Customization

The application uses CSS variables for theming, defined in `index.css`. You can customize colors, spacing, and other design tokens:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 14%;
  --primary: 231 34% 31%;
  /* ... other variables */
}
```

## Contact

- **Author**: Abhishek Kolge
- **Email**: abhishekkolge96@gmail.com
