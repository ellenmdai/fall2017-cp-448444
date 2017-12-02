import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

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
}
