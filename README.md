# Eduforum

`https://eduforum-95bce.web.app/`

Eduforum is a web forum designed for university students to share thoughts, resources, and engage in discussions. It provides a platform for students to connect with each other and foster a collaborative learning environment.

You can include the deployed URL for your app in your `README.md` file using markdown. Here's an example:


## Live Demo

You can access the live demo of the application at [https://eduforum-95bce.web.app/](https://eduforum-95bce.web.app/)


## Technologies Used

### Frontend

- React: Including React Router
- TypeScript
- Vite
- Joy UI: A React UI library that provides a set of high-quality components out of the box.

### Backend

- Go: Using the Gin framework to build a RESTful API.

### Database

- MySQL: A relational database management system that stores data in tables.

### Deployment & Hosting
- AWS RDS: A relational database service that provides an easy way to set up, operate, and scale a relational database in the cloud. Used to host the MySQL database.
- Render: A cloud platform that provides a simple and flexible way to host web applications and microservices. Used to deploy the backend API.
- Firebase: A mobile and web application development platform developed by Google. Used to deploy the frontend application.

## Features

- User Registration and Authentication: Users can create accounts and log in to the forum, powered by Firebase Authentication.
- Post Creation and Commenting: Users can create posts and engage in discussions by commenting on posts.
- Sorting and Filtering: Users can sort posts by date or popularity (number of comments) and filter posts by category.
- Intuitive UI: The forum is designed to be intuitive and easy to use, with a clean and modern UI. Also have dark and light mode support.

## Setup

### Prerequisites

Before you start, make sure you have the following software installed on your machine:

- Git: [Download Git](https://git-scm.com/downloads)
- Node.js: [Download Node.js](https://nodejs.org/en/download/)
- Go: [Download Go](https://golang.org/dl/)
- MySQL: [Download MySQL](https://dev.mysql.com/downloads/installer/)
- MySQL Workbench: [Download MySQL Workbench](https://dev.mysql.com/downloads/workbench/)
- Vite: Install Vite globally using npm:

    ```bash
    npm install -g create-vite
    ```

## Clone the Repository

First, clone the repository to your local machine. Open your terminal and run the following command:

```bash
git clone https://github.com/shayaansultan/eduforum.git
```

### Database Setup

We are using MySQL for our database. Follow the steps below to set up the database:

#### Using MySQL Workbench (Recommended)

1. **Open MySQL Workbench** and connect to your MySQL server.

2. **Create a new database schema**: If you want to create a new database schema, you can use the `CVWO_Schema_Dump.sql` script. To do this, open the script in MySQL Workbench and execute it.

    If you want to use an existing database schema, use the `CVWO_Schema_Dump_Without_Create.sql` script instead.

3. **Populate the Categories table**: After setting up the database schema, open the `Categories.sql` script in MySQL Workbench and execute it. This will populate the Categories table with some necessary data.


#### Database Setup using MySQL CLI

1. **Open your terminal**.

2. **Log in to your MySQL server**. Replace `<your-username>` with your MySQL username:

    ```bash
    mysql -u <your-username> -p
    ```

    You'll be prompted to enter your password.

3. **Create a new database schema** (optional): If you want to create a new database schema, you can use the `CVWO_Schema_Dump.sql` script. To do this, run the following command in your terminal (replace `<path-to-sql>` with the path to the `CVWO_Schema_Dump.sql` file):

    ```bash
    source <path-to-file>/CVWO_Schema_Dump.sql
    ```

    If you want to use an existing database schema, use the `CVWO_Schema_Dump_Without_Create.sql` script instead.

4. **Populate the Categories table**: After setting up the database schema, run the `Categories.sql` script. This will populate the Categories table with some necessary data. Replace `<path-to-sql>` with the path to the `Categories.sql` file:

    ```bash
    source <path-to-sql>/Categories.sql
    ```

### Backend Setup using Go (Gin)

1. **Navigate to the /server folder**:

    ```bash
    cd /path-to-your-project/server
    ```

    Replace `/path-to-your-project/` with the actual path to your project.

2. **Download the relevant libraries and dependencies**:

    The `go.mod` and `go.sum` files list the required libraries and dependencies. You can download them using the following command:

    ```bash
    go mod download
    ```

3. **Set up the .env file**:

    Create a `.env` file in the `/server` directory. This file should contain the `DB_CONNECTION_STRING` in the format needed to run the MySQL database. Here's an example:

    ```env
    DB_CONNECTION_STRING=username:password@protocol(address)/dbname?param=value
    ```

    Replace `username:password@protocol(address)/dbname?param=value` with your actual database connection string.

4. **Run the server**:

    You can start the server using the `main.go` file:

    ```bash
    go run main.go
    ```

    If everything is set up correctly, you should see the server running on your specified port.


### Frontend Setup using Vite, React, and TypeScript

1. **Navigate to the /frontend-client folder**:

    ```bash
    cd /path-to-your-project/frontend-client
    ```

    Replace `/path-to-your-project/` with the actual path to your project.

2. **Install the necessary dependencies**:

    ```bash
    npm install
    ```

    This command installs the necessary dependencies listed in your `package.json` file.

3. **Update the API_STRING.ts file**:

    Open the `API_STRING.ts` file and replace the `BASE_API_STRING` with your localhost URL where your Go server is running:

    ```typescript
    const BASE_API_STRING = "http://localhost:8080";
    export default BASE_API_STRING;
    ```

    Replace `http://localhost:8080` with the actual localhost URL and port where your Go server is running.

4. **Run the development server**:

    ```bash
    npm run dev
    ```

    This command starts the development server. If everything is set up correctly, you should see the server running on your specified port.

You should now have a fully functioning full-stack web forum running on your local environment.

