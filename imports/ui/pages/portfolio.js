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
});

Template.portfolio.helpers({
  uploads: function() {
    return Uploads.find();
  }
});

Template.portfolio.events({
  'click #new_gallery_btn'() {
    event.preventDefault();
    console.log(event);
    alert("new gallery button clicked.  Will add modal later.");
  }
});