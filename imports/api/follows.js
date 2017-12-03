import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Follows = new Mongo.Collection('follows');


if (Meteor.isServer) {
  Meteor.publish('follows', function galleriesPublication() {
    return Follows.find();
  });
}

Meteor.methods({
//  'galleries.insert'(name, regImages, featured) {
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