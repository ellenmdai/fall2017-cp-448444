import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import { Uploads } from '../../api/uploads.js';
import { Router } from 'meteor/iron:router';

import './uploadsSelector.html';

Template.uploadsSelector.onCreated(function() {
  Meteor.subscribe('uploads');
});

Template.uploadsSelector.onRendered(function() {
  
});

Template.uploadsSelector.helpers({
  uploads: function() {
    return Uploads.find({owner: Meteor.userId()});
  }
});

Template.uploadsSelector.events({

});