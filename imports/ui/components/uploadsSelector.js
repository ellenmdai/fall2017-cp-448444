import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Uploads } from '../../api/uploads.js';
import './uploadsSelector.html';

Template.uploadsSelector.onCreated(function() {
  Meteor.subscribe('uploads');
});

Template.uploadsSelector.helpers({
  // show only this user's uploads
  uploads: function() {
    return Uploads.find({owner: Meteor.userId()});
  }
});

//uploadSelector's events are handled in the parent templates because it'll be used differently.