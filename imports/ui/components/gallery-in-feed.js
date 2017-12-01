import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Uploads } from '../../api/uploads.js';
import { Galleries } from '../../api/galleries.js';
import './gallery-in-feed.html';
import './gallery-grid.js';
 
Template.gallery_in_feed.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
  uploads: function() {
	return Uploads.find();
  }
});

Template.gallery_in_feed.events({
  //TODO: edit button handler
});