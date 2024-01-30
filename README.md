## Installation

```bash
$ npm install
```

Before running the project, make sure you have Redis installed. Below are instructions for installing Redis on different operating systems:

### Ubuntu

```bash
sudo apt-get update
sudo apt-get install redis-server
```
### macOS (using Homebrew)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install redis
brew services start redis
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Swagger documentation for the application
After launching the application, the documentation will be available at the following address:
[http://0.0.0.0:5000/docs](http://0.0.0.0:5000/docs)


## Authorization data
Authorization data for the user who has the Admin role
```json
{
  "email": "admin@gmail.com",
  "password": "admin"
}




