import { Meteor } from 'meteor/meteor';
import { GridFS } from 'meteor/cfs:gridfs';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

var imageStore = new FS.Store.GridFS("images", {
  //mongoOptions: {...},  // optional, see note below
  //transformWrite: myTransformWriteFunction, //optional
  //transformRead: myTransformReadFunction, //optional
  //maxTries: 1, // optional, default 5
  //chunkSize: 1024*1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
                        // Default: 2MB. Reasonable range: 512KB - 4MB
});

export const Uploads = new FS.Collection('uploads', {
	stores: [imageStore]
});

if (Meteor.isServer) {
  // This code only runs on the server
  Uploads.allow({
	'insert': function() {
		// add custom authentication code here
		return true;
	}
  })
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('uploads', function uploadsPublication() {
	// stuff here
  });
}

Meteor.methods({
  'uploads.insert'(file) {
    check(file, String);
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
	FS.Utility.eachFile(event, function(file) {
		Uploads.insert(file, function(err, fileObj) {
			// Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
		});
	});
//    Uploads.insert({
//      image: what,
//      createdAt: new Date(),
//      owner: Meteor.userId(),
//      caption: "filler caption here: " + text,
//	  //id????
//    });
  },
  'uploads.remove'(uploadId) {
    check(uploadId, String);
	const upload = Tasks.findOne(uploadId);
    if (upload.owner !== Meteor.userId()) {
      //make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }  
    Uploads.remove(uploadId);
  },
});