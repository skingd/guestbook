/**
 * Created by Stephen on 3/6/2016.
 */

Accounts.onCreateUser(function(options,user){
    if(options.pofile) {
        user.profile = options.profile;
    }else{
        user.profile = {};
    }
    user.profile.rank = 'Noob';
    return user;
});