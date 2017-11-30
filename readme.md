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
move uploading to uploads.js instead of upload-box.js
get image to display on page, not just on click
css
routing pages
get upload_box to actually be a modal box
template error?????
uploads-grid helper firing multiple times?
replace the imageview in feedbody with uploads_grid
	why is .find({id}) giving me nothing?
	
FIRST THINGS FIRST: router.go() doing database querying before new page loads...
dialog boxes, can use jquery?
	
	
Showalluseruploads runs twice on initial (first time returns nothing),
	4 times on upload, once on delete
Router.go doesn't show queries because they are run before the new page is loaded
	
	
DONE:
	ALSO: files not saved after server is stopped?
	HALLELUJAH IT WORKS now using gridfs after adding packages folder from dude's github https://github.com/badmark/Meteor-CollectionFS


do all inserting on client side



creative:
look into drop zone
lookup check()
modal dialog boxes

http://experimentsinmeteor.com/photo-blog-part-1/