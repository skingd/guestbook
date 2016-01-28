Messages = new Mongo.Collection("messages");

if (Meteor.isClient) {
	
	//subscribe to database
	Meteor.subscribe("messages");
	
	Template.guestBook.helpers({
		"messages": function(){
		return Messages.find({}, {sort: {createdOn: -1}})|| {};
			//Return all message objects, or an empty object
			//if database is invalid
		}
	});
	
  Template.guestBook.events(
      {
        "submit form": function(event){
          event.preventDefault();
		  
		  var messageBox = $(event.target).find('textarea[name=guestBookMessage]');
		 
		  
		  var messageText = messageBox.val();
		  
		  var nameBox = $(event.target).find('input[name=guestName]');
		  var nameText = nameBox.val();
		  
		  
		  Messages.insert({
			  name: nameText,
			  message: messageText
			  //createdOn: Date.now();
		  });
		  
          nameBox.val("");
		  messageBox.val("");
        }
      }
  );
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  
  Meteor.publish("messages", function(){
	  return Messages.find();
  });
 }
