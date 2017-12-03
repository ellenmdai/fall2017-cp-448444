import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import { Router } from 'meteor/iron:router';

import { Galleries } from '../../api/galleries.js';
import { Uploads } from '../../api/uploads.js';  // for testingn only; remove later

import './portfolio.html';
import '../components/gallery-in-feed.js';
import '../components/uploads-grid.js';
import '../components/header.js';

Template.portfolio.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('uploads');
  Meteor.subscribe('galleries');
});

Template.portfolio.helpers({
  usersUploads: function() {
    return Uploads.find({owner: Meteor.userId()});
  },
  usersGalleries: function() {
    return Galleries.find({owner: Meteor.userId()});
  }
});

Template.portfolio.events({
  'click #new_gallery_btn'(event) {
    event.preventDefault();
    console.log(event);
    Router.go('/newGallery');
  }
});