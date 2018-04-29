## dk-file-upload - form-then-upload branch

the idea here is to tackle the form first, THEN tackle the upload, reason being: if form is invalid and fails
server side, we dont' want that file coming up. This also separates the file from the form so form can go
json like normal and gridfs stuff is confined to one endpoint, much better. YOu want to upload or download a file? api/file
rest has its own endpoints. 

so far we have:
get api/file/:id
and 
post api/file/single
post api/file/multiple

todo: 
* PUT THIS IN CONFIG: need to set limits on multer for file size and number for dos attacks
* need to hold off on server creation till you have a connection to mongo, then can stop the promise stuff for mongoos connection

* fileservice: regular crud for fs.files and separate upload/download methods, so you can get file info with normal crud, the upload
  download being something outside of all that. Then you're donw.
   
