import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

//https://stackoverflow.com/questions/34085438/attempting-to-update-meteor-users-results-in-access-denied
//but really should be updating profile, not data

if (Meteor.isServer) {
  /*DOESNT DO ANYTHING but also not getting in the way of anything so...
  https://guide.meteor.com/accounts.html#custom-user-data*/
  Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
      user.profile = options.profile;
    }
    user.following = [];
    return user;
  });
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
}
