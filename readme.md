DONT FORGET:
meteor mongo before making a database, maybe?
meteor add reactive-dict -- done
meteor add accounts-ui accounts-password -- done
WHEN READY FOR SECURITY: meteor remove insecure
WHEN READY FOR PRIVACY:  meteor remove autopublish
FOR TESTING????: meteor add practicalmeteor:mocha
for thumbnails: meteor add cfs:graphicsmagick
for routing: meteor add kadira:flow-router
meteor add iron:router
meteor add jquery

kill -9 `ps ax | grep node | grep meteor | awk '{print $1}'`


used cfs:gridfs to store uploads https://github.com/CollectionFS/Meteor-CollectionFS
meteor add pahans:reactive-modal

TODO:
initiate the upload in uploads.js-- event????
move uploading to uploads.js instead of upload-box.js
get image to display on page, not just on click
css
routing pages
get upload_box to actually be a modal box
template error?????


do all inserting on client side



creative:
look into drop zone
lookup check()
modal dialog boxes