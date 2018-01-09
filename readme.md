#Photoblogger
Built on Meteor.js. A photoblogging site that supports multiple accounts and presenting photos in curated galleries. Galleries can also amalgamate from multiple users.

<<<<<<< HEAD
## Framework
This project was built on [Meteor.js](https://www.meteor.com/). 
- Also requires [Node.js and npm](https://nodejs.org/en/).

## Package dependencies and sites referenced for how to use them:
- Note: the following is copied from the command `meteor list`; some are automatically created upon creating the project.  Those that are not can be added with `meteor add package-name`. 
-accounts-password        1.5.0  Password support for accounts
=======
##Package dependencies and sites referenced for how to use them:
accounts-password        1.5.0  Password support for accounts
>>>>>>> parent of 272c7df... readme.md: fleshed out intro a bit.  TODO: notable features.
	https://www.meteor.com/tutorials/blaze/adding-user-accounts
-accounts-ui              1.2.0  Simple templates to add login widgets to an app
-aldeed:simple-schema     1.5.3  A simple schema validation object with reacti...
	https://github.com/meteor/validated-method
-autopublish              1.0.7  (For prototyping only) Publish the entire dat...
-blaze-html-templates     1.1.2  Compile HTML templates into reactive UI with ...
-browser-policy           1.1.0  Configure security policies enforced by the b...
-cfs:gridfs               0.0.34+ GridFS storage adapter for CollectionFS
-cfs:standard-packages    0.5.9  Filesystem for Meteor, collectionFS
	https://github.com/CollectionFS/Meteor-CollectionFS#storage-adapters
-ecmascript               0.9.0  Compiler plugin that supports ES2015+ in all ...
-es5-shim                 4.6.15  Shims and polyfills to improve ECMAScript 5 ...
-insecure                 1.0.7  (For prototyping only) Allow all database wri...
-iron:router              1.1.2  Routing specifically designed for Meteor
	http://iron-meteor.github.io/iron-router/
-jquery                   1.11.10  Manipulate the DOM using CSS selectors
	https://atmospherejs.com/meteor/jquery
-mdg:validated-method     1.1.0  A simple wrapper for Meteor.methods
	https://github.com/meteor/validated-method
-meteor-base              1.2.0  Packages that every Meteor app needs
-mobile-experience        1.0.5  Packages for a great mobile user experience
-mongo                    1.3.0  Adaptor for using MongoDB and Minimongo over DDP
-msavin:mongol            4.0.1  In-App MongoDB Editor.. now with improved thi...
-numtel:cfs-image-resize  0.0.4  Resize images in CollectionFS using Jimp
	https://forums.meteor.com/t/solved-cfs-graphicsmagic-alternative/9805
	https://github.com/numtel/meteor-cfs-image-resize
-reactive-var             1.0.11  Reactive variable
	https://www.meteor.com/tutorials/blaze/temporary-ui-state
-shell-server             0.3.0* Server-side component of the `meteor shell` c...
-standard-minifier-css    1.3.5  Standard css minifier used with Meteor apps b...
-standard-minifier-js     2.2.3  Standard javascript minifiers used with Meteo...
-tracker                  1.1.3  Dependency tracker to allow reactive callbacks

## Todo
- for security, use ValidatedMethod for updating databases.
- remove autopublish
- generally improve UI
- fix multiple refresh/duplicates glitch that occurs switching between pages
- allow viewing the personal pages of other users