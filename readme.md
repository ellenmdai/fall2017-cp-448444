DONT FORGET:
meteor mongo before making a database, maybe?
meteor add reactive-dict -- done
meteor add accounts-ui accounts-password -- done
WHEN READY FOR SECURITY: meteor remove insecure
WHEN READY FOR PRIVACY:  meteor remove autopublish
FOR TESTING????: meteor add practicalmeteor:mocha
for thumbnails: meteor add cfs:graphicsmagick
meteor add numtel:cfs-image-resize
for routing: meteor add kadira:flow-router
meteor add iron:router -- done
meteor add jquery -- done
meteor add raix:ui-dropped-event for drop zone
meteor add msavin:mongol
meteor add browser-policy


kill -9 `ps ax | grep node | grep meteor | awk '{print $1}'`


used cfs:filesystem to store uploads https://github.com/CollectionFS/Meteor-CollectionFS

TODO:
css
table css: uploads, galleries, selecting featured.
scrollable tables
	
FIRST THINGS FIRST:
	
	
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

SECURITY
https://www.quora.com/Is-meteor-js-secure-Since-everything-is-happening-on-the-client-side-isnt-it-possible-for-someone-to-intercept-or-read-the-DB-calls-in-the-console
XXS
http://www.east5th.co/blog/2015/09/07/hijacking-meteor-accounts-with-xss/
	add package browser-policy and run disallowInlineScripts() in the server




creative:
look into drop zone
lookup check()
modal dialog boxes

http://experimentsinmeteor.com/photo-blog-part-1/