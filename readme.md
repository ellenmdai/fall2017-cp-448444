DONT FORGET:
meteor mongo before making a database, maybe?
meteor add reactive-dict -- done
meteor add accounts-ui accounts-password -- done
WHEN READY FOR SECURITY: meteor remove insecure
WHEN READY FOR PRIVACY:  meteor remove autopublish
FOR TESTING????: meteor add practicalmeteor:mocha

kill -9 `ps ax | grep node | grep meteor | awk '{print $1}'`


used cfs:gridfs to store uploads https://github.com/CollectionFS/Meteor-CollectionFS
meteor add pahans:reactive-modal

TODO:
initiate the upload in uploads.js-- event????