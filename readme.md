DONT FORGET:
meteor mongo before making a database, maybe?
meteor add reactive-dict -- done
meteor add accounts-ui accounts-password -- done
WHEN READY FOR SECURITY: meteor remove insecure
WHEN READY FOR PRIVACY:  meteor remove autopublish
FOR TESTING????: meteor add practicalmeteor:mocha
for thumbnails: meteor add cfs:graphicsmagick
for routing: meteor add kadira:flow-router
meteor add iron:router -- done
meteor add jquery -- done
meteor add raix:ui-dropped-event for drop zone
meteor add msavin:mongol


kill -9 `ps ax | grep node | grep meteor | awk '{print $1}'`


used cfs:filesystem to store uploads https://github.com/CollectionFS/Meteor-CollectionFS
meteor add pahans:reactive-modal

TODO:
initiate the upload in uploads.js-- event????
get image to display on page, not just on click
css
uploads-grid helper firing multiple times?
router.go() doing database querying before new page loads...
table css: uploads, galleries, selecting featured.
scrollable tables
allow users to choose galleries to add the image to upon first uploading
delete uploads
	
FIRST THINGS FIRST: get follow selector to add data to accounts,
	
	
Showalluseruploads runs twice on initial (first time returns nothing),
	4 times on upload, once on delete
Router.go doesn't show queries because they are run before the new page is loaded
Could not for the life of me figure out how to update user profiles in the user db, so made a new collection for follows.	
possible source of img display issues: The provided value 'undefined' is not a valid enum value of type XMLHttpRequestResponseType.
loads on delete
	
DONE:
	ALSO: files not saved after server is stopped?
	HALLELUJAH IT WORKS now using gridfs after adding packages folder from dude's github https://github.com/badmark/Meteor-CollectionFS
	Currently gallery-grid is not used, keeping it there just in case, but delete at end.

do all inserting on client side



creative:
look into drop zone
lookup check()
modal dialog boxes

http://experimentsinmeteor.com/photo-blog-part-1/