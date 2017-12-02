import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';

import { Galleries } from '../../api/galleries.js';
import { Uploads } from '../../api/uploads.js';  // for testingn only; remove later

import './notifications.html';
import '../components/header.js';

Template.notifications.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('uploads');
  Meteor.subscribe('galleries');
});

Template.notifications.helpers({
	following: function() {
		return Meteor.user().following;
	}
});

Template.notifications.events({
  'click #new_gallery_btn'(event) {
    event.preventDefault();
    console.log(event);
    alert("new gallery button clicked.  Will add modal later.");
  },
  'submit #new_gallery_form'(event) {
    event.preventDefault();
    var galName = document.getElementById('newGalName').value;
    if (galName === null || galName.trim() === "") {
      alert("You must give your gallery a name.");
      throw new Meteor.Error('empty-name');
    }
    var descriptionInput = document.getElementById('newGalDesc').value;
    var selectedImages = $('#imageSelector').val(); // array of image ids
    var isOpen = document.getElementById('makeOpen').checked;
    //check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      alert("You are not logged in. Cannot create gallery");
      throw new Meteor.Error('not-authorized');
    }
    console.log(selectedImages);
    console.log(galName);
    console.log(descriptionInput);
    Galleries.insert({
      name: galName,
      description: descriptionInput,
      regImages: selectedImages,
      featured: [],
      open: isOpen,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
    // clear form?
    document.getElementById('newGalName').value = "";
    document.getElementById('newGalDesc').value = "";
    // reset select box somehow
    	alert("Created " + galName);
  }  
});