import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Router} from 'meteor/iron:router';

import { Galleries } from '../../api/galleries.js';
import { Uploads } from '../../api/uploads.js';
import { SubmitRequests } from '../../api/submitrequests.js';

import './submitForm.html';
//import '../components/uploads-grid.js';
import '../components/header.js';

Template.submitForm.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('galleries');
  Meteor.subscribe('uploads');
  Meteor.subscribe('submitrequests');
});

Template.submitForm.onRendered(function() {
  
});

Template.submitForm.helpers({
  usersUploads: function() {
    return Uploads.find({owner: Meteor.userId()});
  }
});

Template.submitForm.events({
  'submit #new_submit_form'(event) {
	event.preventDefault();
	console.log(event);
	var galleryId = Template.parentData(0)._id;
	console.log(galleryId);
	var selector = Template.instance().find('#imageSelector');
	var selectedImageId = selector.options[selector.selectedIndex].value;
	var galOwnerId = Galleries.find({_id: galleryId}).owner;
	var msg = Template.instance().find('#msg').value;
	SubmitRequests.insert({
      from: Meteor.userId(),
      to: galOwnerId,
	  gallery: galleryId,
      image: selectedImageId,
      message: msg
    });
	alert("Your submission has been sent. If the gallery's owner approves it, it will be added to the collection.");
  },
  'click #goHome'(event) {
	event.preventDefault();
	console.log(event);
	Router.go('home');
  },
});