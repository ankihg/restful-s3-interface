### *GET /users
##### — Gets a list of all the users from your database

### *POST /users
##### — Creates a new user and adds it to your database
##### — Optional: Create a new key in your s3 bucket

### *GET /users/:user
##### — Gets the details for one user in particular from your database

### PUT /users/:user
##### — Updates or changes the information for a particular user in your database
##### —(TODO) Optional: If applicable to the PUT, rename a previously defined key in your s3 bucket, and handle any objects that were previously saved under the old key name

### (TODO) *DELETE /users/:user
#### — Deletes a particular user from your database
##### — Deletes all files (objects) stored for that user in the s3 bucket

### GET /users/:user/files
##### — Gets a list of all the files for a particular user from your database

### POST /users/:user/files
##### — Creates a new file for a particular user in your database
##### — Creates a new file (object) in your s3 bucket

### GET users/:user/files/:file
##### — Gets a specific file from a particular user from your database

### PUT users/:user/files/:file
##### —(TODO) Updates or changes a particular file (object) in your s3 and update your  database if the s3 url has changed

### DELETE users/:user/files/:file
##### —(TODO) Deletes a specific file from your database
##### — Deletes a specific file (object) from your s3 bucket
##### —(TODO) Updates the user in your database by removing the reference to the deleted file
