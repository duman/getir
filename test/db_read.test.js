const mongoose = require('mongoose');
const getir = require('../Models/getir');
const url = 'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true&authSource=admin';

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

mongoose.Promise = global.Promise;
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database');
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

describe('Reading item details', () => {
    it('Should retrieve data from test database with key value of \'oABnNNFj\'', function(done) {
        // Look up the 'key' from a previously saved data entry.
        getir.find({key: 'oABnNNFj'}, (err, name) => {
            if(err) {throw err;}
            if(name.length === 0) {throw new Error('No data!');}
            mongoose.connection.close(); // Otherwise process hangs, connection should be closed.
            done();
        });
    });
})

// Following the "Avoid Over Engineering" crucial point...
// Unit test has been only done for the DB read process, user doesn't have other permissions.