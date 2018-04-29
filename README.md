## fin-file-upload - upload-then-form-on-endpoint

we post to contacts:

  .post('/', upload.single('fileUploadField'), ctrl.add.bind(ctrl))

this uploads file and has the file info available to contact handler, so now not only are we putting contact
info in contact collection, but we're also putting in fileId, then... when we get contact we query.populat('Files')
with the Files model we created on fs.files collection. We end up getting all file info, not what's in the schema, so the 
schema is worthless it seems, could loop through the properties in both and delete whagt's not in schema.

So...you're thinking this is backwards, i.e. if you fail on contacts post, file still makes it. Not cool. You're thinking:
turn it around, that's what the form-then-upload branch is about. BUT... then you saw that this approach gave you the fileId 
and file info available for the contacts collection. Hmmm. multer could give you that, maybe a multer.none() before the contact
handler, then a multer.single() after??


