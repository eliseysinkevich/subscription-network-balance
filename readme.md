# API for calculating network balance

## How to start the project
1. Start a MySQL DBMS at localhost (127.0.0.1) with user `root`/`root` and create a database called `subscription`. If you are using docker:
    ```bash
    docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=root -d -p 3306:3306 mysql:8

    docker exec -it some-mysql mysql -u root -p
    # asking for password

    > CREATE DATABASE subscription;
    > exit
    ```
2. Install the dependencies:
    ```bash
    cd /path/to/project
    npm install
    ```    
3. Execute migrations and seeders:
    ```bash
    cd src
    npx sequelize db:migrate
    npx sequelize db:seed:all
    ```
4. Start the server:
   ```bash
   node ./bin/www
   # Server is listening on port 3000.
   ```
