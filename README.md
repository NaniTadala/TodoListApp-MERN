![AppScreenshot](https://github.com/NaniTadala/TodoListApp-MERN/assets/92290291/6d853180-55ae-450b-ad61-42f7afe49cad)


# MERN Stack ToDo List App

This is a simple ToDo list application built using the MERN (MongoDB, Express, React, Node.js) stack. It allows users to create, update, delete, and view their tasks.

## Table of Contents

-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Usage](#usage)

## Prerequisites

Before you begin, ensure you have met the following requirements:

-   [Node.js](https://nodejs.org/) installed on your development machine.
-   [MongoDB](https://www.mongodb.com/) installed and running locally or a MongoDB Atlas account.

## Installation

**Clone the repository:**

```sh
git clone https://github.com/NaniTadala/TodoListApp-MERN.git

```

### Setup Server

**1. Navigate to the server folder:**

```sh
cd ./server
```

**2. Install the server dependencies:**

```sh
npm install
```

**3. Setup mongodb connection**

```env
MONGODB_URI=mongodb://localhost:27017/todoApp
```

Replace mongodb://localhost:27017/todoApp with your MongoDB URI.

**4. Start the server:**

```sh
node todoServer.js
```

### Setup Client

**1. Open a new terminal window/tab, navigate to the client folder:**

```sh
cd ../client
```

**2. Install the client dependencies:**

```sh
npm install
```

**3. Start the client:**

```sh
npm run dev
```

# Usage

Open your web browser and go to http://localhost:5173 to access the ToDo list app.
