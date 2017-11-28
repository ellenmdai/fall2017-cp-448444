import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Uploads } from '../../api/uploads.js';
import './gallery-in-feed.html';
 
Template.gallery_in_feed.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
  uploads: function() {
	return Uploads.find();
  }
});
//
//Template.task.events({
//  
//});