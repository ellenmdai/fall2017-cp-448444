import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Router} from 'meteor/iron:router';

import { Galleries } from '../../api/galleries.js';
import { Uploads } from '../../api/uploads.js';  // for testingn only; remove later

import './editGallery.html';
//import '../components/uploads-grid.js';
import '../components/header.js';

Template.editGallery.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('uploads');
  //TODO: code below doesn't belong in onCreated I think...
  //if (this.owner !== Meteor.userId()) {
  //  alert("You are not authorized to edit this gallery.");
  //  Router.go('home');
  //}
});

Template.editGallery.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
  featured: function() {
    return Uploads.find({_id: { $in: this.featured }});
  },
  regular: function() {
    console.log(this.regImages);
    return Uploads.find({_id: { $in: this.regImages }});
    //TODO: filter by subscriptions
  }
});

Template.editGallery.events({
  //'click .goto-upload'(event) {
  //  event.preventDefault();
  //  console.log(event);
  //  alert("upload button clicked.  Will add modal later.");
  //  //$('#upload-box').dialog('show');
  //}
});