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

var createThumb = function(fileObj, readStream, writeStream) {
  // Transform the image into a 10x10px thumbnail
  gm(readStream, fileObj.name()).resize('50', '50').stream().pipe(writeStream);
};

export const Uploads = new FS.Collection('uploads', {
	stores: [
		//new FS.Store.GridFS('thumbs', {transformWrite: createThumb}),
		imageStore
	],
	filter: {
    //maxSize: 1048576, // in bytes
    allow: {
      contentTypes: ['image/*'],
      extensions: ['png']
    },
    //deny: {
    //  contentTypes: ['image/*'],
    //  extensions: ['png']
    //},
	//unnecessary given presence of allow
    onInvalid: function (message) {
      if (Meteor.isClient) {
        alert(message);
      } else {
        console.log(message);
      }
    }
  }
});

if (Meteor.isServer) {
  // This code only runs on the server
  Uploads.allow({
	'insert': function() {
		// add custom authentication code here
		return true;
	}
  });
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('uploads', function uploadsPublication() {
	// stuff here
	return Uploads.find();
  });
}

Meteor.methods({
  'uploads.insert'(file, caption) {
    //check(file, File???????); lookup
	check(caption, String);
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
	FS.Utility.eachFile(event, function(file, caption) {
		// from https://forums.meteor.com/t/insert-data-to-collectionfs-cfs-filesystem-cfs-standard-packages/5304/3
		var tmpdoc = new FS.File(file);
		tmpdoc.owner = Meteor.userId();
		tmpdoc.caption = "filler caption here: " + caption;
		Uploads.insert(tmpdoc, function(err, fileObj) {
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
  'uploads.display-users-all'(user) {
	//images: function () {
		return Uploads.find(); // Where Images is an FS.Collection instance
	//}
  }
});