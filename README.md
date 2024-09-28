# About the application

This backend application let's you upload a csv file and store the information in the database.

The file gets stored in the documents folder created inside the application and gets auto delete after it get parsed.

 # How to use the application

 Clone the application in the local machine

 Target the cloned directory using cmd and run the folling commands

 npm install

 npm run start

 # URL's of the application

/v1/upload
>> takes the csv file as " file : <CSV File> " in as form data.

/v1/balance
>> takes the json data as { timestamp: <Time> } 
