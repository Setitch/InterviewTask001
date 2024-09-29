# InterviewTask001
CQRS or several simple commands

## Running in Dev Mode
Execute ```yarn``` followed by ```yarn run start:dev```

## Env File
Copy `.env.sample` into `.env` (not required for default configuration of sqlite)

## Database
Sequelize as ORM for database usage. 

## EsLint
Several rules are added (with some unicorns for better code visibility/usage)

## NOTICE
* Because of some database optimizations in handling column length, its more optimal to not text columns length in database, and use that in the app.* 
* Stock on order is checked in transaction mode against data from database.
* Project lacks jest tests, but library is ready. 
  * In ./test directory helper functions and test data would be stored
  * For the original files `<name>.spec.ts` files will be used for testing
  * Some classes (database services mostly) are already partially prepared for testing with some configuration by constructor parameters
* There is postman collection in `./test` directory

### What To Do More
* add logging for each request, winston, watchdog, sentry, or any other way of logging
* tests
* use no-sql databases for reading and/or cache, and (like now) relational one for storing data (truth source)

