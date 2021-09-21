const mongoose = require('mongoose');

//mongoose connection/config
mongoose.connect("mongodb+srv://root:rootroot@mernprojects.9thih.mongodb.net/examdb?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Something went wrong when connecting to the database ', err));
