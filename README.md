# User Management Application

This project is a React application built with TypeScript, utilizing the TanStack Router and React Query for efficient data fetching and routing. The application fetches user data from the [GoRest API](https://gorest.co.in/) and displays it in a user-friendly interface.

## Demo

https://adesso-tanstack.vercel.app/

## Features

1. **User List Page**:

   - Displays a list of users fetched from the GoRest API.
   - The list can be filtered by "name", "email", "status", and "gender".
   - Pagination is implemented to navigate through the user list.

2. **User Detail Page**:

   - Displays detailed information about a selected user from the list.
   - Includes user details such as name, email, gender, and status.

3. **Multilingual Support**:

   - The application supports multiple languages (English and Italian).
   - Language detection and translation are handled using `i18next`.

4. **Styling**:

   - PrimeReact components are used for UI elements like buttons and data tables.

## Development

To set up the project locally, follow these steps:

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/TagirSharipov/adesso-tanstack.git
   cd <repository-directory>
   ```
2. **Install dependencies**:

```sh
npm install
```

3. **Run the development server**:

```sh
npm run dev
```

4.  **Open your browser and navigate to `http://localhost:3000`.**
