import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';

import { Galleries } from '../../api/galleries.js';
import { Uploads } from '../../api/uploads.js';  // for testingn only; remove later

import './gallery-in-feed.js';
import './feedbody.html';
import '../components/upload-box.js';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
//  Meteor.subscribe('tasks');
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
Template.body.events({
  'click .goto-upload'(event) {
    event.preventDefault();
    console.log(event);
    alert("upload button clicked.  Will add modal later.");
    //$('#upload-box').dialog('show');
  }
//  'submit .new-task'(event) {
//    // Prevent default browser form submit
//    event.preventDefault();
//    console.log(event);
//    // Get value from form element
//    const target = event.target;
//    const text = target.text.value;
// 
//    // Insert a task into the collection
//    Metoer.call('tasks.insert', text);
// 
//    // Clear form
//    target.text.value = '';
//  },
//  'change .hide-completed input'(event, instance) {
//    instance.state.set('hideCompleted', event.target.checked);
//  },
});