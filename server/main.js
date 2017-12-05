import { Meteor } from 'meteor/meteor';
import '../imports/api/uploads.js';
import '../imports/api/galleries.js';
import '../imports/api/follows.js';
import '../imports/api/submitrequests.js';
import '../imports/api/activities.js';

Meteor.users.allow({
	update: function(userId, docs, fields, modifier) {
	  return true; 
	}
});

//https://stackoverflow.com/questions/19391308/custom-fields-on-meteor-users-not-being-published
Meteor.publish('userData', function() {
  if(!this.userId) return null;
  return Meteor.users.find({}, {fields: {
    following: 1,
  }});
});