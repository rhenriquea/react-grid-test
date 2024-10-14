# EnergyWorx Interactive Grid Challenge

This project is a frontend challenge that implements an interactive 50x50 grid of cells where each cell's value is incremented when clicked. Additionally, it highlights cells based on Fibonacci sequence checks and provides visual feedback for the user.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Scripts](#scripts)
- [License](#license)

## Features

- **Interactive Grid**: A 50x50 grid of cells, where clicking on a cell increases the value of all cells in the same row and column.
- **Fibonacci Check**: After each click, the grid checks for 5 consecutive Fibonacci numbers in rows and columns and resets those cells to zero.
- **Visual Feedback**:
  - Affected cells are highlighted in yellow after clicking.
  - Cells forming a Fibonacci sequence are highlighted in green.
- **Responsive and Accessible**: Designed with user experience and accessibility in mind.
- **Optimized with React.memo**: Components wrapped with `React.memo` to prevent unnecessary re-renders and improve performance.
- **State Management with React Hooks**: State is managed using React's `useReducer` and `useCallback` hooks for efficient interaction handling.

## Technologies Used

- **React**: A popular library for building user interfaces.
- **React Hooks**: `useReducer`, `useCallback`, and other hooks were used to manage state and optimize event handling.
- **React.memo**: Applied for component optimization to minimize unnecessary re-renders.
- **TypeScript**: Provides static typing to catch errors during development.
- **Vite**: A fast build tool and development server.
- **SASS**: Used for writing maintainable styles with variables and nesting.
- **ESLint**: Enforces coding standards and best practices.
- **React Hooks**: For managing state and side effects in functional components.

## Installation

1. Unzip the files wherever you want
2. Install dependencies using Yarn:

```bash
yarn install
```
## Running the Project
To run the project in development mode, use the following command:
```bash
yarn dev
```
This will start a local development server, typically available at http://localhost:5173.

To build the project for production, use:
```bash
yarn build
```
The build artifacts will be generated in the dist folder.

To preview the production build:
```bash
yarn preview
```

## Scripts
- `yarn dev`: Starts the development server.
- `yarn build`: Builds the project for production.
- `yarn lint`: Runs ESLint to check for code quality issues.
- `yarn preview`: Previews the built project locally.

## License
This project is for educational purposes and part of an interview technical challenge. Feel free to use or modify it as needed.