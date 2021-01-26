# Todo app server

## Dependencies

- [NodeJS](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Setup

### Install

``` sh
# Clone repository
git clone https://github.com/happotato/todo-server.git

# Change directory
cd todo-server

# Install dependencies
yarn install
```

### Environment

- setup `.env` file using the [template](.template.env).

### Database

``` sh
# Create database
yarn migrate db:create <dbname> --env pg-create

# Update database
yarn migrate up
```

## Running

``` sh
node index.js
```

## Running with Docker

``` sh
# Build 
docker build -t todo-server .

# Run
docker run -d -p <port>:80 todo-server
```

## License

[MIT](LICENSE.txt)
