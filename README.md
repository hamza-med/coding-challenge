# Coding Challenge: Joke of the Day Web Application

This repository contains a full-stack application built with **React** (version 18.3.1, using **Vite** version 5.4.9 as the bundler) on the frontend and **Spring Boot** (version 3.3.5) on the backend. The application uses **React Query** (version 5.59.16) for data fetching and **React Router** (version 6.27.0) for client-side routing.

## Table of Contents
- [Getting Started](#getting-started)
- [Architecture and Design Decisions](#architecture-and-design-decisions)
- [API Endpoints](#api-endpoints)
- [Challenges and Solutions](#challenges-and-solutions)
- [Libraries and Tools](#libraries-and-tools)

## Getting Started

### Prerequisites
- **Node.js** (>= 14.x)
- **Java** (version 17, required by Spring Boot 3.3.5)
- **Maven** (optional, for building the Spring Boot app)

### Instructions to Build and Run the Application

1. **Backend Setup** (Spring Boot):
   - Navigate to the `backend` directory.
   - Build the application:
     ```bash
     ./mvnw clean install
     ```
   - Run the application:
     ```bash
     ./mvnw spring-boot:run
     ```
   - The backend server should now be running on `http://localhost:8080`.

2. **Frontend Setup** (React + Vite):
   - Navigate to the `frontend` directory.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Run the application:
     ```bash
     npm run dev
     ```
   - The frontend server should now be running on `http://localhost:5173`.

## Architecture and Design Decisions

### Architecture
This project follows a **client-server architecture**, separating frontend and backend concerns. The backend serves as an API provider using **RESTful endpoints**, while the frontend, built with React, fetches and displays data from the backend. **Vite** is used as a fast, efficient bundler for React, improving development speed and performance.

### Key Design Decisions
- **React Query**: Chosen to manage server state in the frontend, ensuring efficient data fetching, caching, and synchronization with minimal boilerplate code.
- **React Router**: Used for client-side routing to create a seamless, single-page application experience.

## API Endpoints

The backend provides the following endpoints to interact with the joke database:

### Joke Endpoints

1. **Add a New Joke**
   - **Endpoint**: `POST /jokes`
   - **Description**: Creates a new joke entry in the database.
   - **Request Body**: JSON object containing joke details (validated for required fields).

2. **Rate a Joke**
   - **Endpoint**: `PUT /jokes/{jokeId}/rate`
   - **Description**: Updates the rating of a specific joke.
   - **Parameters**:
     - `jokeId`: Path parameter specifying the ID of the joke.
     - `rating`: Query parameter specifying the new rating value.

3. **Get All Jokes**
   - **Endpoint**: `GET /jokes`
   - **Description**: Retrieves a list of all jokes stored in the database.
 
4. **Search Jokes by Keyword**
   - **Endpoint**: `GET /jokes/search`
   - **Description**: Searches for jokes containing a specific keyword.
   - **Parameters**: 
     - `keyword`: Query parameter specifying the keyword to search within joke content.
  
5. **Get a Random Joke**
   - **Endpoint**: `GET /jokes/random`
   - **Description**: Retrieves a random joke from the database.
   

## Challenges and Solutions

1. **State Management with Server Data**: 
   - **Challenge**: Managing data from the server, especially when there are frequent changes, can be complex.
   - **Solution**: Used **React Query** (version 5.59.16) for efficient data fetching and caching. It simplified our state management and reduced re-fetching, improving app performance.

2. **Routing in a Single Page Application**:
   - **Challenge**: Ensuring smooth navigation across pages and preserving browser history.
   - **Solution**: Implemented **React Router** (version 6.27.0) for client-side routing, enabling a dynamic, responsive user experience.

## Libraries and Tools

- **Spring Boot** (3.3.5): Provides a solid backend framework for building RESTful APIs with minimal configuration.
- **React Query** (5.59.16): Simplifies data fetching and caching. Chosen for its simplicity and ability to reduce boilerplate in managing server data.
- **React Router** (6.27.0): Allows for easy navigation and route management in a single-page application setup.
- **Vite** (5.4.9): Used for its fast build times and efficient bundling, resulting in a quicker development workflow.
- **Axios** (1.7.7): For making HTTP requests from the frontend.

## Future Improvements
- Consider adding error boundary components to manage unexpected errors.
- Add more specific unit tests for critical components.
