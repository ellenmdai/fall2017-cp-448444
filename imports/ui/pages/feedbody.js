import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Router} from 'meteor/iron:router';

import { Galleries } from '../../api/galleries.js';
//import { Uploads } from '../../api/uploads.js';  // for testingn only; remove later

import './feedbody.html';
import '../components/gallery-in-feed.js';
import '../components/uploads-grid.js';
import '../components/header.js';

Template.feedbody.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('uploads');
});

//Template.body.helpers({
//  tasks() {
//    const instance = Template.instance();
//    if (instance.state.get('hideCompleted')) {
//      // If hide completed is checked, filter tasks
//      return Tasks.find({checked:{$ne:true}}, {sort:{createdAt:-1}});
//    }
//    // Otherwise, return all of the tasks
//    return Tasks.find({}, {sort: {createdAt:-1}});
//  },
//  incompleteCount() {
//    return Tasks.find({ checked: { $ne: true } }).count();
//  },
//});
//

Template.feedbody.helpers({
  galleries: function() {
    return Galleries.find();
    //TODO: filter by subscriptions
  }
});

Template.feedbody.events({
  'click .goto-upload'(event) {
    event.preventDefault();
    console.log(event);
    alert("upload button clicked.  Will add modal later.");
    //$('#upload-box').dialog('show');
  }
});