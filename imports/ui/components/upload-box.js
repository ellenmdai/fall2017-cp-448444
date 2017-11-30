import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import {Dropzone} from 'meteor/raix:ui-dropped-event';
import { Uploads } from '../../api/uploads.js';
import './upload-box.html';
 
Template.upload_box.helpers({
//  isOwner() {
//    return this.owner === Meteor.userId();
//  },
});

Template.upload_box.events({
	'submit #upload-form'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    console.log(event);
    // Get value from form element
	//console.log("fileList size from upload-box.js: " + document.getElementById('image-to-upload').files.length);
	//console.log("file path from upload-box.js: " + document.getElementById('image-to-upload').value);
    const files = Array.from(document.getElementById('image-to-upload').files);
	console.log(files);
	const caption = document.getElementById('image-to-upload-caption').value;
	console.log(caption);
	
	if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
		//console.log(files);
		//console.log(caption);
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
 
    // Insert a task into the collection THE PROPER WAY
//    Meteor.call('uploads.insert', files, caption, (err, res) => {
//		if (err) {
//		  alert(err);
//		} else {
//		  // success!
//		}
//	});
 
    // Clear form
    document.getElementById('image-to-upload').value = '';
	document.getElementById('image-to-upload-caption').value = '';
  },
  'dropped #dropzone': function(e) {
    console.log('dropped a file');
  }
});