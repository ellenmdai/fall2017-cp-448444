import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import './header.html';

Template.headerTemplate.events({
  'click .goto-upload'(event) {
    event.preventDefault();
    console.log(event);
    Router.go('/uploadForm');
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
  },
  'click .notifications'(event) {
    event.preventDefault();
    console.log(event);
    Router.go('/notifications/' + Meteor.userId());
  }
});