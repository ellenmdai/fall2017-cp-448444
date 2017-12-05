import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Match } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const SubmitRequests = new Mongo.Collection('submitrequests');

export const insertSubmitRequest = new ValidatedMethod({
  name: 'submitrequests.insert',
  validate: new SimpleSchema({
    from: {type: String},
    to: {type: String},
    gallery: {type: String},
    image: {type: String},
    message: {type: Match.OneOf(String, null)}
  }).validator(),
  run(submitReq) {
    if (!Meteor.userId) {
      throw new Meteor.Error('unauthorized', 'You must be logged in');
    }
    SubmitRequests.insert(submitReq);
  }
});

export const removeSubmitRequest = new ValidatedMethod({
  name: 'submitrequests.remove',
  validate: new SimpleSchema({
    _id: {type: String},
  }).validator(),
  run(removeReq) {
    if (!Meteor.userId) {
      throw new Meteor.Error('unauthorized', 'You must be logged in');
    }
    SubmitRequests.remove(removeReq);
  }
});


if (Meteor.isServer) {
  Meteor.publish('submitrequests', function() {
    return SubmitRequests.find();
  });
}