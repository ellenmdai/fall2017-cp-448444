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
get upload_box to actually be a modal box
uploads-grid helper firing multiple times?
router.go() doing database querying before new page loads...
dialog boxes, can use jquery?
filter galleries by subscription, using instance states (see feedbody)
hyperlink username in feed_in_gallery to their page.
check that featured and not featured show up in same grid.
Allow multi-pic uploads if time
if time, do iron router layout and configure and stuff.
table css: uploads, galleries, selecting featured.
if time: for adding and removing images from gallery, allow re-adding of submitted images
scrollable tables
temporary states in editGallery
allow viewing of anyone's portfolio, not just your own.
	
FIRST THINGS FIRST: get follow selector to add data to accounts,
then get feedbody to respond the the follow only checkbox
	
	
Showalluseruploads runs twice on initial (first time returns nothing),
	4 times on upload, once on delete
Router.go doesn't show queries because they are run before the new page is loaded
	
	
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