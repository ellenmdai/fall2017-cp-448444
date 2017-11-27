import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
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
    const target = event.target;
	//console.log("target: " + target.id);
	//console.log("caption: " + target.image-to-upload-caption.value);
    const file = document.getElementById('image-to-upload').value;
	const caption = document.getElementById('image-to-upload-caption').value;
 
    // Insert a task into the collection
    Meteor.call('uploads.insert', file, caption);
 
    // Clear form
    document.getElementById('image-to-upload').value = '';
	document.getElementById('image-to-upload-caption').value = '';
  },
});