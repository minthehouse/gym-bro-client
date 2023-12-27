# GymBro (Fitness Tracker App)

## Overview

Welcome to the repository for GymBro! This client application is designed to help users track their daily workouts at the gym and monitor their food intake. It is built with TypeScript using Angular and Ionic, and state management is handled by NGXS. The app includes features for searching and saving exercises and foods, as well as displaying the history of both workouts and food intake, complete with nutritional information for macros and calories.

## Features

### 1. Exercise Tracking
- **Search and Save:** Users can easily search for exercises and save them to their workout history.
- **Workout History:** View a detailed history of all exercises performed, with timestamps.

### 2. Food Intake Tracking
- **Search and Save:** Users can search for foods and save them to their daily food intake records.
- **Nutritional Information:** The app provides nutritional information, including macros and calories, for each food item.
- **Food History:** Display a history of daily food intake, showing what was consumed and when.

### 3. Visualized Progress
- **Workout Progress Chart:** Utilizing D3.js, the app visualizes workout progress through interactive charts.

## Technologies Used

### 1. Angular and Ionic
- **TypeScript:** The app is developed using TypeScript for enhanced code quality and maintainability.
- **Angular:** A robust web application framework that provides a powerful platform for building scalable and maintainable client applications.
- **Ionic:** A framework for building cross-platform mobile applications using web technologies.

### 2. State Management with NGXS
- **NGXS:** A state management library for Angular applications, ensuring a centralized and predictable state.

### 3. Data Stream Handling with RxJS
- **RxJS:** Used for handling data streams and possibly asynchronous operations, providing a reactive approach to programming.

### 4. Responsive UI with Tailwind CSS
- **Tailwind CSS:** A utility-first CSS framework that helps in building responsive and highly customizable user interfaces.

### 5. Visualizing Progress with D3.js
- **D3.js:** A powerful JavaScript library for creating interactive and dynamic data visualizations in the browser.

## Getting Started

To get started with GymBro app, follow these steps:

### 1. Client Application (Frontend)

1. Clone the client repository:
   ```bash
   git clone https://github.com/minthehouse/gym-bro-client.git
   ```

2. Navigate to the client directory:
   ```bash
   cd gym-bro-client
   ```

3. Install client dependencies:
   ```bash
   npm install
   ```

4. Run the client app:
   ```bash
   ng serve
   ```

   Open your browser and navigate to `http://localhost:4200` to view the app.

### 2. Server Application (Backend)

1. Clone the server repository:
   ```bash
   git clone https://github.com/minthehouse/gym-bro-node-api.git
   ```

2. Navigate to the server directory:
   ```bash
   cd gym-bro-node-api
   ```

3. Install server dependencies:
   ```bash
   npm install
   ```

4. Configure the server settings:
   - Open the configuration file (e.g., `config.json`) and set the required parameters such as database connection details.

5. Run the server app:
   ```bash
   npm start
   ```

   Ensure the server is running on the specified port (e.g., `http://localhost:3000`).

### 3. Connect Frontend and Backend

Make sure the client application is configured to communicate with the server. Check the API endpoint configurations in the client app to match the server's address.

Now, both the client and server applications are up and running, providing a seamless fitness tracking experience.

Feel free to replace the placeholder URLs and instructions with the correct details for your actual repositories and setup.
