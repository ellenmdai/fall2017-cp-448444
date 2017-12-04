import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import {Router} from 'meteor/iron:router';

import { Uploads } from '../../api/uploads.js';  // for testingn only; remove later

import './editImage.html';
import '../components/header.js';

Template.editImage.onCreated(function bodyOnCreated() {
  Meteor.subscribe('uploads');
  
});

Template.editImage.onRendered(function() {
  
});

Template.editImage.helpers({

});

Template.editImage.events({
  'submit #edit_image_form'(event) {
    event.preventDefault();
    console.log(event);
    var newCaption = Template.instance().find('#newCaption').value;
	console.log(newCaption);
    Uploads.update({_id: this._id}, {
      $set: {
        caption: newCaption
      }
    });
    alert("The image has been updated.");
	Router.go('/portfolio');
  },
  'click #goBack'(event) {
	event.preventDefault();
	console.log(event);
	Router.go('/portfolio');
  }
});