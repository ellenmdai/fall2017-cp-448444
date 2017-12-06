import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Match } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const Galleries = new Mongo.Collection('galleries');

//all ValidatedMethod code learned from https://github.com/meteor/validated-method
export const insertGallery = new ValidatedMethod({
  name: 'galleries.insert',
  validate: new SimpleSchema({
    name: {type: String},
    description: {type: Match.OneOf(String, null)},
    regImages: {type: [String]},
    featured: {type: [String]},
    open: {type: Boolean},
		createdAt: {type: Date},
		owner: {type: String},
		username: {type: String}
  }).validator(),
  run(newGallery) {
    if (!Meteor.userId) {
      throw new Meteor.Error('unauthorized', 'You must be logged in');
    }
    Galleries.insert(newGallery);
  }
});

export const removeGallery = new ValidatedMethod({
  name: 'galleries.remove',
  validate: new SimpleSchema({
    _id: {type: String},
  }).validator(),
  run(gallery) {
    if (!Meteor.userId) {
      throw new Meteor.Error('unauthorized', 'You must be logged in');
    }
    Galleries.remove(gallery);
  }
});

if (Meteor.isServer) {
  Meteor.publish('galleries', function galleriesPublication() {
    return Galleries.find();
  });
	
}