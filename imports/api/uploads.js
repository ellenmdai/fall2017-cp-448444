import { Meteor } from 'meteor/meteor';
//import { FileSystem } from 'meteor/cfs:filesystem';
import { GridFS } from 'meteor/cfs:gridfs';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// setting up the collection based on https://github.com/CollectionFS/Meteor-CollectionFS#storage-adapters
var imageStore = new FS.Store.GridFS("images", {
  //mongoUrl: 'mongodb://127.0.0.1:27017/test/', // optional, defaults to Meteor's local MongoDB
  //mongoOptions: {...},  // optional, see note below
  //transformWrite: myTransformWriteFunction, //optional
  //transformRead: myTransformReadFunction, //optional
  //maxTries: 1, // optional, default 5
  //chunkSize: 1024*1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
  //                      // Default: 2MB. Reasonable range: 512KB - 4MB
});

export const Uploads = new FS.Collection('uploads', {
	stores: [
		//https://github.com/numtel/meteor-cfs-image-resize
		new FS.Store.GridFS("thumbs", {
      beforeWrite: function(fileObj) {
        // We return an object, which will change the
        // filename extension and type for this store only.
        return {
          extension: 'jpeg',
          type: 'image/jpeg'
        };
      },
      transformWrite: resizeImageStream({
        width: 240,
        height: 180,
        format: 'image/jpeg',
        quality: 50
      })
    }),
		imageStore
	],
	filter: {
    //maxSize: 1048576, // in bytes
    //ADD BACK LATER
		allow: {
      contentTypes: ['image/*'],
    },
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
	'insert': function(){
		return true;
	},
	'update': function(){
		return true;
	},
	'remove': function(){
		return true;
	},
	'download': function(){
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
			alert("You are not logged in.");
      throw new Meteor.Error('not-authorized');
    }
		console.log(files);
		console.log(caption);
		for (var i = 0; i < files.length; i++) {
			// from https://forums.meteor.com/t/insert-data-to-collectionfs-cfs-filesystem-cfs-standard-packages/5304/3
			var tmpdoc = new FS.File(files[i]);
			tmpdoc.owner = Meteor.userId();
			tmpdoc.caption = "filler caption here: " + caption;
			tmpdoc.url = 
			Uploads.insert(tmpdoc, function(err, fileObj) {
				// Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
				
			});
			console.log("uploads.insert loop ran.");
		}
		console.log("uploads.insert ran, but not the inserting loop.");
  },
  'uploads.remove'(uploadId) {
    check(uploadId, String);
	const upload = Uploads.findOne({_id: uploadId});
    if (upload.owner !== Meteor.userId()) {
      //make sure only the owner can delete it
	  alert("You are the the owner of this image. Cannot delete.")
      throw new Meteor.Error('not-authorized');
    }  
    Uploads.remove({_id: uploadId});
  },
  'uploads.display-users-all'(user) {
	//images: function () {
		return Uploads.find(); // Where Images is an FS.Collection instance
	//}
  }
});