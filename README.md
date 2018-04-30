## dk-file-upload 

This is a simple POC for file upload. Initially the goal was: how to get a form AND file up and process. But then you were concerned about the form failing server side an file still making it. Nothing much to stop the file, no validation, just mongo being down, so can assume it will make it. The form on the other hand, will run into json schema and mongoose validations, so makes sense to process the form first, then file upload, or... just file upload on it's own, say: upload resume, or even with the (change) event on "input type=file". Either way, the form then upload greatly simplifies things just that it forces 2 calls instead of 1.

**form-then-upload**  
simplifies things, you do your normal json form stuff, then do your file upload on the side. Problem is: what if you needed the fileId in the contact data? Then a third call is required to update the contact with fileId. 


**upload-then-form**  
This processes the contact info along with the file, and has the file info available for inserting into contact along with contact data. Also, this branch uses mongoose populate to populate the contact.file field with fs.files data, might be a use case for that.   
  

Not liking it though, the complexity involved with trying to do both. I'd rather keep separate and if you need to:  
post contact  
post file  
put contact, so be it. Or could:   
post file  
post contact wi h file info  
  
then just like upload-then-form, but no harm done then, always json the forms, always process upload/download separately in its own service/endpoint. Makes sense to keep these things separate. This is a mongo file system. Should have its own endpoint as such and its own service client side.   
  
to recap we have:  
ui:  
contactService // normal json crud  
fileService:  
getInfoMany/One  
upload  
remove  
  
// download has to happen in normal <a> tag, the browser has to pick that up. If done xhr, just get an xhr response body with the data,  
// don't get the normal download file action in the browser  
  
server:  
get /api/file/info, api/file/info/:id // get fs.files records  
post /api/file // upload file with metadata in body  
get /api/file/:id // dowload a file  
delete /api/file/:id  // delete a file  

  


todo:   
* test the file size/count limits in multer
* come up with a dos plan as this is how it would go down, too many hits in too short of period by same user
