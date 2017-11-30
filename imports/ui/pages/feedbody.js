import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Router} from 'meteor/iron:router';

import { Galleries } from '../../api/galleries.js';
import { Uploads } from '../../api/uploads.js';  // for testingn only; remove later

import './gallery-in-feed.js';
import './feedbody.html';
import '../components/uploads-grid.js';
import '../components/header.js';

//Router.route('/', {template: 'feedbody'});  //no template named feedbody

Template.body.onCreated(function bodyOnCreated() {
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

Template.body.helpers({
  uploads: function() {
    return Uploads.find();
  }
});

Template.body.events({
  'click .goto-upload'(event) {
    event.preventDefault();
    console.log(event);
    alert("upload button clicked.  Will add modal later.");
    //$('#upload-box').dialog('show');
  }
});