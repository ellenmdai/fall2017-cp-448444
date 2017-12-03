import { Meteor } from 'meteor/meteor';
//
//Meteor.startup(() => {
//  // code to run on server at startup
//});

//import { GridFS } from 'meteor/cfs:gridfs';
//import { Mongo } from 'meteor/mongo';

import '../imports/api/uploads.js';
import '../imports/api/galleries.js';
import '../imports/api/follows.js';
import '../imports/api/submitrequests.js';
//import '../imports/ui/components/uploads-grid.js';

Meteor.users.allow({
	update: function(userId, docs, fields, modifier) {
	  return true; 
	
	  /**
	   * Don't use `return true` in production!
	   * You probably need something like this:
	   * return Meteor.users.findOne(userId).profile.isAdmin;
	   */
	}
});

Meteor.publish('userData', function() {
  if(!this.userId) return null;
  return Meteor.users.find(this.userId, {fields: {
    following: 1,
  }});
});