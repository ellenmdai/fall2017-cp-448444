import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';

import { Galleries } from '../../api/galleries.js';
import { Uploads } from '../../api/uploads.js';  // for testingn only; remove later

import './gallery-in-feed.js';
import './portfolio.html';
import '../components/uploads-grid.js';
import '../components/header.js';

Template.portfolio.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('uploads');
  Meteor.subscribe('galleries');
});

Template.portfolio.helpers({
  uploads: function() {
    return Uploads.find();
  }
});

Template.portfolio.events({
  'click #new_gallery_btn'(event) {
    event.preventDefault();
    console.log(event);
    alert("new gallery button clicked.  Will add modal later.");
  },
  'submit #new_gallery_form'(event) {
    event.preventDefault();
    var galName = document.getElementById('newGalName').value;
    var selectedImages = $('#imageSelector').val(); // array of image ids
    //check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      alert("You are not logged in. Cannot create gallery");
      throw new Meteor.Error('not-authorized');
    }
    console.log(selectedImages);
    console.log(galName);
    Galleries.insert({
      name: galName,
      regImages: selectedImages,
      featured: [],
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
    }  
});