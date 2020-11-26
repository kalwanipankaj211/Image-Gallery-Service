## Steps to run
1. Run npm install
2. Run npm start 
3. test get api 

## About Project

1. controllers are responsible for only getting and sending the data
2. Business Logic will be written into services
3. Model is about metadata or schema of a particular  entity
4. Helper section is for file which will be used throughout the project. Other entity apis can be used here as client for following micro-service architecture. 
5. Swagger is used for exposing movies api http://localhost:3000/api-docs/

## Steps to Execute
1. Run mongod (mongo server) on your local system
2. connect to mongo gui (Mongo Compass) using connection url mongodb://localhost:27017/moment
3. Test api http://localhost:3000/api/users/register and  http://localhost:3000/api/users/login
