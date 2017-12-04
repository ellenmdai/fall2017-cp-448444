import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Router} from 'meteor/iron:router';

import { Galleries } from '../../api/galleries.js';
import { Uploads } from '../../api/uploads.js';
import { Activities } from '../../api/activities.js';

import './newGallery.html';
import '../components/header.js';

Template.newGallery.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('galleries');
  Meteor.subscribe('uploads');
  Meteor.subscribe('userData');
  //TODO: figure out how to access data context for below
  //this.state.set('tmpFeatured', this.featured);
  //this.state.set('tmpRegular', this.regImages);
  //TODO: code below doesn't belong in onCreated I think...
  //if (this.owner !== Meteor.userId()) {
  //  alert("You are not authorized to edit this gallery.");
  //  Router.go('home');
  //}
});

Template.newGallery.helpers({
  usersUploads: function() {
    return Uploads.find({owner: Meteor.userId()});
  },
});

Template.newGallery.events({
  'submit #new_gallery_form'(event) {
    event.preventDefault();
    var galName = document.getElementById('newGalName').value;
    if (galName === null || galName.trim() === "") {
      alert("You must give your gallery a name.");
      throw new Meteor.Error('empty-name');
    }
    var descriptionInput = document.getElementById('newGalDesc').value;
    var selectedImages = $('#imageSelector').val(); // array of image ids
    if (selectedImages === null) {
      selectedImages = [];
    }
    var isOpen = document.getElementById('makeOpen').checked;
    //check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      alert("You are not logged in. Cannot create gallery");
      throw new Meteor.Error('not-authorized');
    }
    //console.log(selectedImages);
    //console.log(galName);
    //console.log(descriptionInput);
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
    var followers = [];
    Meteor.users.find().forEach(function(usr) {
      if (usr.following !== undefined && usr.following.includes(Meteor.userId())) {
        followers.push(usr._id);
      }
    });
    console.log(followers);
    for (var i = 0; i < followers.length; i++) {
      Activities.insert({
        reciever: followers[i],
        type: "new gallery",
        galleryName: galName,
        open: isOpen,
        sender: Meteor.userId(),
        senderUsername: Meteor.user().username
      });
    }
    // clear form?
    document.getElementById('newGalName').value = "";
    document.getElementById('newGalDesc').value = "";
    alert("Created " + galName);
    Router.go('/portfolio');
  }  
});