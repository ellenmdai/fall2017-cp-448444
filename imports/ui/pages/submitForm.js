import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Router} from 'meteor/iron:router';
import { Uploads } from '../../api/uploads.js';
import { SubmitRequests } from '../../api/submitrequests.js';
import { insertSubmitRequest } from '../../api/submitrequests.js';
import './submitForm.html';
import '../components/header.js';

Template.submitForm.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('galleries');
  Meteor.subscribe('uploads');
  Meteor.subscribe('submitrequests');
});

Template.submitForm.helpers({
	// get only this user's uploads
  usersUploads: function() {
    return Uploads.find({owner: Meteor.userId()});
  }
});

Template.submitForm.events({
  'submit #new_submit_form'(event) {
		event.preventDefault();
		console.log(event);
		var galleryId = Template.parentData(0)._id;	// get the gallery id from the parent template
		//see newGallery.js for reference
		var selectedImageId = $('.selected:checked').map(function() {
      return this.value;
    }).get();
		if (selectedImageId.length !== 1) {
			alert("Please selected strictly one image.");
			return;
		}
		var galOwnerId = Template.parentData(0).owner;
		var msg = Template.instance().find('#msg').value;
		// insert request into database
		insertSubmitRequest.call({
					from: Meteor.userId(),
					to: galOwnerId,
					gallery: galleryId,
					image: selectedImageId[0],
					message: msg
		}, function(err) {
			if(err) {
				alert(err.reason);
			}
		});
		alert("Your submission has been sent. If the gallery's owner approves it, it will be added to the collection.");
		Router.go('home');
	},
	'click #goHome'(event) {
		event.preventDefault();
		console.log(event);
		Router.go('home');
  },
});