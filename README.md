This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

# Payouts Page

This project implements a React-based web application to display and manage payout information. It fetches data from an external API, allowing users to search for payouts by username and paginate through the results.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Payouts Page is a React application designed to provide users with an organized view of payout data, including date and time, status, value, and username. It utilizes pagination for efficient data handling and incorporates a search functionality to filter results based on the username.

## Features

- **Dynamic Data Fetching:** Utilizes the `fetch` API to dynamically retrieve payout data from an external API based on the current page and search term.
- **Pagination:** Implements a paginated table to display a limited number of payouts per page, improving user experience.
- **Search Functionality:** Enables users to search for payouts by entering a username, updating the displayed results in real-time.
- **Responsive Design:** The application is designed to be responsive, ensuring a consistent user experience across various devices.

## Project Structure

The project structure is organized as follows:

- **src/pages/index.tsx:** Contains the main component (`PayoutsPage`) responsible for rendering the payouts table and handling data fetching, pagination, and search.
- **src/components:** Contains reusable components such as the loading spinner and time formatter.
- **public:** Contains static assets and the HTML template.

## Dependencies

- **React:** A JavaScript library for building user interfaces.
- **react-spinners:** A collection of loading spinners for React applications.

## Usage

1. Open the application in your browser after starting the development server.
2. Enter a username in the search input to filter payouts by that username.
3. Use the pagination controls to navigate through different pages of payout data.
