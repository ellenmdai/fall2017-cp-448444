import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import './upload-box.html';
 
Template.upload-box.helpers({
//  isOwner() {
//    return this.owner === Meteor.userId();
//  },
});

Template.upload-box.events({
	'submit #upload-form'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    console.log(event);
    // Get value from form element
    const target = event.target;
	console.log("target: " + target);
    const file = target.image-to-upload.value;
 
    // Insert a task into the collection
    Meteor.call('uploads.insert', file);
 
    // Clear form
    target.file.value = '';
  },
});