# Photoblogger
A photoblogging site that supports multiple accounts and presenting photos in curated galleries. Galleries can also amalgamate from multiple users.  
This was my final creative project for a university course.  The goal was to create a site that had the streamlined photo storage and organization of an app like Google Photos, coupled with the feed format of social media platforms like Instagram and Tumblr.  Furthermore, I intend for it to be tailored specifically for photoblogging, so that the photos take center stage per gallery and the interplay between images and text will provide an intuitively readable and writable experience.

## Framework
This project was built on [Meteor.js](https://www.meteor.com/). 
- Also requires [Node.js and npm](https://nodejs.org/en/).

## Package dependencies and sites referenced for how to use them:
Note: the following is copied from the command `meteor list`; some are automatically created upon creating the project.  Those that are not can be added with `meteor add package-name`.  
Also note: the version of gridfs given by CollectionFS is glitcy and stores images as zero bytes.  A working version can be found at https://github.com/ellenmdai/Meteor-CollectionFS/tree/master/packages/gridfs.  To use, create a /packages folder in your project directory and add the gridfs folder into it, in conjunction with `meteor add cfs:gridfs`.

 - accounts-password        1.5.0  Password support for accounts
	https://www.meteor.com/tutorials/blaze/adding-user-accounts
 - accounts-ui              1.2.0  Simple templates to add login widgets to an app
 - aldeed:simple-schema     1.5.3  A simple schema validation object with reacti...
	https://github.com/meteor/validated-method
 - autopublish              1.0.7  (For prototyping only) Publish the entire dat...
 - blaze-html-templates     1.1.2  Compile HTML templates into reactive UI with ...
 - browser-policy           1.1.0  Configure security policies enforced by the b...
 - cfs:gridfs               0.0.34+ GridFS storage adapter for CollectionFS
 - cfs:standard-packages    0.5.9  Filesystem for Meteor, collectionFS
	https://github.com/CollectionFS/Meteor-CollectionFS#storage-adapters
 - ecmascript               0.9.0  Compiler plugin that supports ES2015+ in all ...
 - es5-shim                 4.6.15  Shims and polyfills to improve ECMAScript 5 ...
 - insecure                 1.0.7  (For prototyping only) Allow all database wri...
 - iron:router              1.1.2  Routing specifically designed for Meteor
	http://iron-meteor.github.io/iron-router/
 - jquery                   1.11.10  Manipulate the DOM using CSS selectors
	https://atmospherejs.com/meteor/jquery
 - mdg:validated-method     1.1.0  A simple wrapper for Meteor.methods
	https://github.com/meteor/validated-method
 - meteor-base              1.2.0  Packages that every Meteor app needs
 - mobile-experience        1.0.5  Packages for a great mobile user experience
 - mongo                    1.3.0  Adaptor for using MongoDB and Minimongo over DDP
 - msavin:mongol            4.0.1  In-App MongoDB Editor.. now with improved thi...
 - numtel:cfs-image-resize  0.0.4  Resize images in CollectionFS using Jimp
	https://forums.meteor.com/t/solved-cfs-graphicsmagic-alternative/9805
	https://github.com/numtel/meteor-cfs-image-resize
 - reactive-var             1.0.11  Reactive variable
	https://www.meteor.com/tutorials/blaze/temporary-ui-state
 - shell-server             0.3.0* Server-side component of the `meteor shell` c...
 - standard-minifier-css    1.3.5  Standard css minifier used with Meteor apps b...
 - standard-minifier-js     2.2.3  Standard javascript minifiers used with Meteo...
 - tracker                  1.1.3  Dependency tracker to allow reactive callbacks

## Notable Features
- Users can use this site for photo storage.  Uploaded photos are private to the uploader until included in a gallery.
- Galleries are a collection of chosen photos grouped for public viewing together.  They can also be accompanied by blocks of text to resemble more of a classic blog post, or the user can choose to not include additional text at all.  Other users can also submit their own images to be included in "open" galleries (after approval by the gallery creator) as a form of collaboration.  This gives the user more creative license over how to present their work.
- Pure text posts are currently created by not including any images in a gallery.
- This site supports multiple users.  Logged in users can upload images, create galleries, follow other users, get alerts, and submit photos.  Visitors not logged in can only view galleries.
- Security
  - Uses mgd:validate-method to check method arguments when inserting content into the database.

## Todo
 - for security, use ValidatedMethod for updating databases.
 - create an API reference
 - remove autopublish
 - show image captions as a disappearing bar on their respective images
 - generally improve UI
 - fix multiple refresh/duplicates glitch that occurs switching between pages
 - allow viewing the personal pages of other users
 - allow more options for formatting of each gallery individually, such as image order, individual image size, etc.
 - improve photo storage organization
 - [security!](https://guide.meteor.com/v1.2/security.html)
