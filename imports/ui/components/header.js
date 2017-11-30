import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { JQuery } from 'meteor/jquery';
import { Router } from 'meteor/iron:router';

//import { Uploads } from '../../api/uploads.js';

import './header.html';
import './upload-box.js';

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

Template.headerTemplate.helpers({
  
});

Template.headerTemplate.events({
  'click .goto-upload'(event) {
    event.preventDefault();
    console.log(event);
    alert("upload button clicked.  Will add modal later.");
    this.$('#upload-box').dialog();
  },
  'click .my-page'(event) {
    event.preventDefault();
    console.log(event);
    Router.go('/portfolio');
  },
  'click .home'(event) {
    event.preventDefault();
    console.log(event);
    Router.go('home');
  }
});