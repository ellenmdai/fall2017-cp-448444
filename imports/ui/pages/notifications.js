import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import { SubmitRequests } from '../../api/submitrequests.js';
import { Activities } from '../../api/activities.js';
import { removeActivity } from '../../api/activities.js';
import './notifications.html';
import '../components/header.js';
import '../components/submitRequestUI.js';

Template.notifications.onCreated(function() {
  this.state = new ReactiveDict();
  Meteor.subscribe('uploads');
  Meteor.subscribe('galleries');
	Meteor.subscribe('submitrequests');
	Meteor.subscribe('userData');	//for following
	Meteor.subscribe('activities');
});

Template.notifications.helpers({
	following: function() {
		var folIds = Meteor.user().following;
		console.log(folIds);
		if (folIds !== undefined) {
			return Meteor.users.find({_id: { $in: folIds }});
		}
		return [];
	},
	notFollowing: function() {
		var folIds2 = Meteor.user().following;
		if (folIds2 !== undefined) {
			//list won't include yourself despite not following yourself.
			return Meteor.users.find({ $and: [{_id: { $not: { $in: folIds2 } } }, {_id: { $not: Meteor.userId() }}] });
		}
		return Meteor.users.find({_id: { $not: Meteor.userId() } });
	},
	//retrieve any activities meant for you
	followActivity: function() {
		return Activities.find({reciever: Meteor.userId()});
	},
	//retrieve requests to your galleries
	requests: function() {
		return SubmitRequests.find({to: Meteor.userId()});
	}
});

Template.notifications.events({
  'submit #addFollow'(event) {
		event.preventDefault();
		console.log(event);
		var addSelector = Template.instance().find('#addSelector');
		var newFollowArray = Meteor.user().following;
		if (newFollowArray === undefined) {
			newFollowArray = [];
		}
		newFollowArray.push(addSelector.options[addSelector.selectedIndex].value);
		console.log(newFollowArray);
		Meteor.users.update({_id: Meteor.userId()}, {
			$set: {
				"following": newFollowArray
			}
		});
		alert("You are now following someone new.");
	},
	'submit #removeFollow'(event) {
		event.preventDefault();
		console.log(event);
		var addSelector = Template.instance().find('#removeSelector');
		var newFollowArray = Meteor.user().following;
		var index = newFollowArray.indexOf(addSelector.options[addSelector.selectedIndex].value);
		newFollowArray.splice(index, 1);
		console.log(newFollowArray);
		Meteor.users.update({_id: Meteor.userId()}, {
			$set: {
				"following": newFollowArray
			}
		});
		alert("You are no longer following that user.");
	},
});

//ACTIVITIES TEMPLATE

Template.activity.onCreated(function() {
	Meteor.subscribe('activities');
});

Template.activity.helpers({
	newGallery: function() {
		return (this.type === "new gallery");
	}
});

Template.activity.events({
	'click #markRead'(event) {
		event.preventDefault();
		console.log(event);
		removeActivity.call(
			{_id: this._id},
		function(err) {
			if(err) {
				alert(err.reason);
			}
		});
	}
});