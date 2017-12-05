import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Router} from 'meteor/iron:router';
import { Galleries } from '../../api/galleries.js';
import { Uploads } from '../../api/uploads.js';
import { Activities } from '../../api/activities.js';
import './newGallery.html';
import '../components/header.js';
import '../components/uploadsSelector.js';

Template.newGallery.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('galleries');
  Meteor.subscribe('uploads');
  Meteor.subscribe('userData');
});

Template.newGallery.helpers({
  //user can only choose from own uploads
  usersUploads: function() {
    return Uploads.find({owner: Meteor.userId()});
  },
});

Template.newGallery.events({
  'submit #new_gallery_form'(event) {
    event.preventDefault();
    console.log(event);
    var galName = document.getElementById('newGalName').value;
    //name can't be empty
    if (galName === null || galName.trim() === "") {
      alert("You must give your gallery a name.");
      throw new Meteor.Error('empty-name');
    }
    var descriptionInput = document.getElementById('newGalDesc').value;
    //https://stackoverflow.com/questions/19766044/best-way-to-get-all-selected-checkboxes-values-in-jquery
    var selectedImages = $('.selected:checked').map(function() {
      return this.value;
    }).get();
    var isOpen = document.getElementById('makeOpen').checked;
    // Make sure the user is logged in before creating a gallery
    if (! Meteor.userId()) {
      alert("You are not logged in. Cannot create gallery");
      throw new Meteor.Error('not-authorized');
    }
    //create new gallery using given data
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
    // send notifications to followers
    var followers = [];
    Meteor.users.find().forEach(function(usr) {
      if (usr.following !== undefined && usr.following.includes(Meteor.userId())) {
        followers.push(usr._id);
      }
    });
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
    
    alert("Created " + galName);
    Router.go('/portfolio');
  }  
});