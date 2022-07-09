const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const byeMessage = {
  id: 1,
  from: "Shmart",
  text: "Bye to CYF chat system!",
};


//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage, byeMessage];
let newMessageId = 4

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function(request, response) {
  response.send(messages)
});

app.get('/messages/:id', function(request, response) {
  const requestedMessageId = request.params.id

  const message = messages.find( (entry) => {
    if (entry.id == requestedMessageId) {
      return true
    } else {
      return false
    }
  })
  if (message) {
    response.send(message)
  } else {
    response.status(404).send('Message not found');
  }
});

app.post('/messages', (req, res) => {
 
  newMessageId = newMessageId + 1
  const newMessage = req.body;

  newMessage.id = newMessageId

  console.log(newMessage)
  messages.push(newMessage)

  res.send('Message is added to the database');
});


app.delete('/messages/:id', (req, res) => {
  
  const messageId = req.params.id;

  // Remove message
  messages = messages.filter(i => {
      if (i.id != messageId) {
          return true;
      }
      return false;
  });

  res.send('Message is deleted');
});

app.listen(3000, () => {
   console.log("Listening on port 3000")
  });
