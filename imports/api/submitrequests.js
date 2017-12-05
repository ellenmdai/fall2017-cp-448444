import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
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
  }).validator(),
  run(submitReq) {
    if (!Meteor.userId) {
      throw new Meteor.Error('unauthorized', 'You must be logged in');
    }
    SubmitRequests.insert(submitReq);
  }
});


if (Meteor.isServer) {
  Meteor.publish('submitrequests', function() {
    return SubmitRequests.find();
  });
}



Meteor.methods({
//  'submitrequests.insert'({name, regImages, featured}) {
//    //check(text, String);
// 
//    // Make sure the user is logged in before inserting a task
//    if (! Meteor.userId()) {
//			alert("You are not logged in. Cannot create gallery");
//      throw new Meteor.Error('not-authorized');
//    }
//		console.log(regImages);
//		console.log(featured);
//    Galleries.insert({
//			name,
//      regImages,
//			featured,
//      createdAt: new Date(),
//      owner: Meteor.userId(),
//      username: Meteor.user().username,
//    });
//  },
//  'galleries.remove'(taskId) {
//    check(taskId, String);
// 
//	const task = Tasks.findOne(taskId);
//    if (task.private && task.owner !== Meteor.userId()) {
//      // If the task is private, make sure only the owner can delete it
//      throw new Meteor.Error('not-authorized');
//    } 
// 
//    Tasks.remove(taskId);
//  },
//  'tasks.setChecked'(taskId, setChecked) {
//    check(taskId, String);
//    check(setChecked, Boolean);
//	
//	const task = Tasks.findOne(taskId);
//    if (task.private && task.owner !== Meteor.userId()) {
//      // If the task is private, make sure only the owner can delete it
//      throw new Meteor.Error('not-authorized');
//    }
// 
//    Tasks.update(taskId, { $set: { checked: setChecked } });
//  },
});