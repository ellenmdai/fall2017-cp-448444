import { Meteor } from 'meteor/meteor';
import { FileSystem } from 'meteor/cfs:filesystem';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

var imageStore = new FS.Store.FileSystem("images", {
  path: "../../uploads/images", //optional, default is "/cfs/files" path within app container
  //transformWrite: myTransformWriteFunction, //optional
  //transformRead: myTransformReadFunction, //optional
  //maxTries: 1 //optional, default 5
});

//var createThumb = function(fileObj, readStream, writeStream) {
//  // Transform the image into a 10x10px thumbnail
//  gm(readStream, fileObj.name()).resize('50', '50').stream().pipe(writeStream);
//};

export const Uploads = new FS.Collection('uploads', {
	stores: [
		//new FS.Store.GridFS('thumbs', {transformWrite: createThumb}),
		imageStore
	],
	filter: {
    //maxSize: 1048576, // in bytes
    //ADD BACK LATER
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
  'uploads.insert'(files, caption) {
    //check(file, File???????); lookup
	//check(caption, String); // causes match error if empty
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
		console.log(files);
		console.log(caption);
		for (var i = 0; i < files.length; i++) {
			// from https://forums.meteor.com/t/insert-data-to-collectionfs-cfs-filesystem-cfs-standard-packages/5304/3
			var tmpdoc = new FS.File(files[i]);
			tmpdoc.owner = Meteor.userId();
			tmpdoc.caption = "filler caption here: " + caption;
			Uploads.insert(tmpdoc, function(err, fileObj) {
				// Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
			});
			console.log("uploads.insert loop ran.");
		}
		console.log("uploads.insert ran, but not the inserting loop.");
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