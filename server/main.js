import { Meteor } from 'meteor/meteor';
import { BrowserPolicy } from 'meteor/browser-policy';
import '../imports/api/uploads.js';
import '../imports/api/galleries.js';
//import '../imports/api/follows.js';
import '../imports/api/submitrequests.js';
import '../imports/api/activities.js';

Meteor.users.allow({
	update: function(userId, docs, fields, modifier) {
	  return true; 
	}
});

Meteor.startup(function() {
	/*extra defense agains XXS attacks
	 *http://www.east5th.co/blog/2015/09/07/hijacking-meteor-accounts-with-xss/*/
	BrowserPolicy.content.disallowInlineScripts();
});

//https://stackoverflow.com/questions/19391308/custom-fields-on-meteor-users-not-being-published
Meteor.publish('userData', function() {
  if(!this.userId) return null;
  return Meteor.users.find({}, {fields: {
    following: 1,
  }});
});