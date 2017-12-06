import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Match } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const Activities = new Mongo.Collection('activities');

export const insertActivity = new ValidatedMethod({
  name: 'activities.insert',
  validate: new SimpleSchema({
    reciever: {type: String},
    type: {type: String},
    galleryName: {type: String},
    open: {type: Boolean},
    sender: {type: String},
		senderUsername: {type: String}
  }).validator(),
  run(activity) {
    if (!Meteor.userId) {
      throw new Meteor.Error('unauthorized', 'You must be logged in');
    }
    Activities.insert(activity);
  }
});

export const removeActivity = new ValidatedMethod({
  name: 'activities.remove',
  validate: new SimpleSchema({
    _id: {type: String},
  }).validator(),
  run(activity) {
    if (!Meteor.userId) {
      throw new Meteor.Error('unauthorized', 'You must be logged in');
    }
    Activities.remove(activity);
  }
});

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('activities', function() {
    return Activities.find();
  });
	
}