## dk-file-upload - ng2-file-upload


you don't much from these packages. This stuff is easy to do: FormData additions and posting to the api...

you started posting form, then file separately which works better with these things, but in reality, all they give you is a queue to hold the files, so you can add more to th queue and status to know whihc ones have already beeen uploaded so you don't do it twice.

It only uploads one file at a time which isn't cool, what's wrong with doing all at once? 

The progress is nice, but you can get that just as easily with HttpRequest.showProgress. Only thing you can't do easiy is the drag/drop they do. NOt sure where they get that from, just that they have it. 

you have a hack for a nice upload button so don't need angular-file, this ng2-file-upload is just fine, if you have to go that route... you don't though. To recap what it gives you:

* unneeded: queue to hold files and status of each file and ability to upload one at a time (that's all it does anyway).
* unneeded: drag drop
* unneeded: progress (and can roll this yourself easily enough, its' expensive though, constantly churning digests

 



