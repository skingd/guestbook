Messages = new Mongo.Collection("messages");

Router.route('/', function () {
    this.render('guestBook');        //render guestbook template
    this.layout('layout');          //set the layout
});

Router.route("/about", function () {
    this.render('about');
    this.layout('layout');
});



Router.route('/messages/:_id', function () {
        //Render the message and an object for it
        this.render('message', {

            //Data is a specific keyword for routing
            data: function () {
                //retrieve a message from database (findOne is a database command)
                //Messages = database object to look in
                //this.params._id is defined in the router header (Router.route('/messages/:_id', function(){)
                return Messages.findOne({_id: this.params._id});
            }
        });

        this.layout('layout');
    },
    {
        name: 'message.show'
    });

if (!Meteor.isClient) {


} else {

    //subscribe to database
    Meteor.subscribe("messages");
    Meteor.subscribe("currentuserData");

    Template.guestBook.helpers({
        "messages": function () {
            return Messages.find({}, {sort: {createdOn: -1}}) || {};
            //Return all message objects, or an empty object
            //if database is invalid
        }
    });


    Template.guestBook.events(
        {
            "submit form": function (event) {
                event.preventDefault();

                var messageBox = $(event.target).find('textarea[name=guestBookMessage]');


                var messageText = messageBox.val();

                if (messageText.length > 0) {
                console.log(Meteor.user().username);
                    Messages.insert({

                        name: Meteor.user().username,
                        message: messageText,
                        createdOn: new Date()
                    });

                    messageBox.val("");
                } else{
                    if (messageBox.val == ("")) {
                        messageBox.classList.setAttribute('class', 'has-warning');
                    }
                }
            }
        }
    );
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // de to run on server at startup
    });

    Meteor.publish("messages", function () {
        return Messages.find();
    });
}