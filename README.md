## dk-file-upload - form-then-upload branch

the idea here is to tackle the form first, THEN tackle the upload, reason being: if form is invalid and fails
server side, we dont' want that file coming up. This also separates the file from the form so form can go
json like normal and gridfs stuff is confined to one endpoint, much better. YOu want to upload or download a file? api/file
rest has its own endpoints. 

so far we have:
get api/file/dowload/:id
post api/file/single
post api/file/multiple

then regular crud for fs.files so we can query file info, then download one, need to allow query by directory and type
