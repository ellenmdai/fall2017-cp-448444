import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';

import { Galleries } from '../../api/galleries.js';
import { Uploads } from '../../api/uploads.js';
import { SubmitRequests } from '../../api/submitrequests.js';

import './notifications.html';
import '../components/header.js';
import '../components/submitRequestUI.js';

Template.notifications.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('uploads');
  Meteor.subscribe('galleries');
	Meteor.subscribe('submitrequests');
});

Template.notifications.helpers({
	following: function() {
		var folIds = Meteor.user().following;
		console.log(folIds);
		if (folIds !== undefined) {
			//for (var i = 0; i < folIds.length; i++) {
			//	folArray.push(Meteor.users.find( { _id: folIds[i] } ));
			//}
			return Meteor.users.find({_id: { $in: folIds }});
		}
		return [];
	},
	notFollowing: function() {
		var folIds2 = Meteor.user().following;
		if (folIds2 !== undefined) {
			//TODO: get urself off the not following list.
			return Meteor.users.find({ $and: [{_id: { $not: { $in: folIds2 } } }, {_id: { $not: Meteor.userId() }}] });
		}
		return Meteor.users.find();
	},
	requests: function() {
		return SubmitRequests.find({to: Meteor.userId()});
	}
});

Template.notifications.events({
  'submit #addFollow'(event) {
		event.preventDefault();
		console.log(event);
		console.log(Meteor.user().profile);
		var addSelector = Template.instance().find('#addSelector');
		var newFollowArray = Meteor.user().following;
		console.log(newFollowArray);
		if (newFollowArray === undefined) {
			newFollowArray = [];
		}
		else {
			newFollowArray.push(addSelector.options[addSelector.selectedIndex].value);
		}
		console.log(newFollowArray);
		Meteor.users.update({_id: Meteor.userId()}, {
			$set: {
				"following": newFollowArray
			}
		});
		alert("You are now following someone new.");
	}, 
});