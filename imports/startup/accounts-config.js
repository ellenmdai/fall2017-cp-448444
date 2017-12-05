import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

//https://www.meteor.com/tutorials/blaze/adding-user-accounts
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

//https://stackoverflow.com/questions/34085438/attempting-to-update-meteor-users-results-in-access-denied
//allow updating users, like with following data.
if (Meteor.isServer) {
  Meteor.users.allow({
    update: function(userId, docs, fields, modifier) {
      return true; 
    }
  });
}
