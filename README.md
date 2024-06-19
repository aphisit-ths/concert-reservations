# Project Overview


## Description

The **Concert Reservations** project is a web application built using Next.js for the frontend and NestJS for the backend. It allows users to reserve seats for concerts and manage their reservations. The application is containerized using Docker for easy deployment.

## Components

- **Next.js Client**: Frontend application built with React framework Next.js. Provides an interactive user interface for viewing available concerts, reserving seats, and managing reservations.

- **NestJS Server**: Backend application built with NestJS, a TypeScript framework. Handles authentication, reservation management, and interacts with the database.

## Technologies Used

- **Next.js**: React framework for server-rendered React applications.
- **NestJS**: TypeScript framework for building server-side applications.
- **Docker**: Containerization platform for deploying applications.
- **Prisma**: Database toolkit for TypeScript and Node.js.
- **SQLite**: Lightweight relational database.

## Setup Options

    

### Option 1: Run with Single Docker Compose File  (Recommend)

1. **Clone the Repository**

    ```sh
    git clone https://github.com/aphisit-ths/concert-reservations.git
    cd concert-reservations
    ```
   

2. **Build and Start Containers**

    ```sh
    docker-compose up --build -d
    ```
   OR
   ```sh
    make build
    ```
   

3. **Access the Applications**

    - **Next.js Client**: [http://localhost:3000](http://localhost:3000)
    - **NestJS Server**: [http://localhost:4000](http://localhost:4000)

### Option 2: Run with Separate Docker Compose Files

1. **Clone the Repository**

    ```sh
    git clone https://github.com/aphisit-ths/concert-reservations.git
    cd concert-reservations
    ```

2. **Build and Start Client Container**

    ```sh
    cd client
    docker-compose -f docker-compose.client.prod.yml up --build -d
    ```

3. **Build and Start Server Container**

    ```sh
    cd server
    docker-compose -f docker-compose.server.prod.yml up --build -d
    ```


4. **Access the Applications**

    - **Next.js Client**: [http://localhost:3000](http://localhost:3000)
    - **NestJS Server**: [http://localhost:4000](http://localhost:4000)

### Option 3: Run Locally for Production

1. **System requirement**

    ```
    NodeJs version >= 20
    ```

2. **Run Next.js Client in Production Mode**

    ```sh
    cd client
    npm install
    npm run build
    npm run start
    ```

   Access the client at [http://localhost:3000](http://localhost:3000).

3. **Run NestJS Server in Production Mode**

   Open a new terminal and navigate to the server directory:

    ```sh
    cd server
    npm install
    npm run local:deploy
    ```

   Access the server at [http://localhost:4000](http://localhost:4000).

## Stopping Containers

To stop the running containers, use the following command:

```sh
docker-compose down
```

## Run Unittest for NestJS 

To running unittest and coverage

```sh
npm run test:cov
```

## Bonus Task
- Express your opinion about how to optimize your website in case that this
  website contains intensive data and when more people access, the lower speed
  you get? 
  - sever-side
    - use in-memory, optimize database query (indexing).
    - Load balancing strategy .
  - client-side
    - Make independent GET API requests in parallel to reduce wait times.
    - Static Content Caching: Use CDNs to deliver static content faster by caching it closer to users.
    - Reduce Repaints and Reflows: Optimize CSS and JavaScript to reduce layout thrashing, repaints, and **reflows, which can significantly slow down rendering.**



- Express your opinion about how to handle when many users want to reserve the
   ticket at the same time? We want to ensure that in the concerts there is no one
   that needs to stand up during the show.
  - Constraints: Implement strict database constraints to ensure data integrity.
  - Message Queuing: Use Message Queuing to manage reservation requests. Message Queuing easily scale consumers to handle high volumes of requests during peak times.
  - Lottery system in pre-reservation (Optional): Random user selection for high-demand events, requires confirmation to reduce load and ensure real interest.
