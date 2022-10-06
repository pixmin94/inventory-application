#! /usr/bin/env node

console.log('Running populatedb...')

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Plant = require('./models/plants')
var Flower = require('./models/flowers')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var plants = []
var flowers = []

function plantCreate(name, price, cb) {
  plantdetail = {name:name , price:price }
  
  var plant = new Plant(plantdetail);
       
  plant.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Plant: ' + plant);
    plants.push(plant)
    cb(null, plant)
  }  );
}

function flowerCreate(name, price, cb) {
    flowerdetail = {name:name , price:price }
    
    var flower = new Flower(flowerdetail);
         
    flower.save(function (err) {
      if (err) {
        cb(err, null)
        return
      }
      console.log('New Flower: ' + flower);
      flowers.push(flower)
      cb(null, flower)
    }  );
  }


function createPlants(cb) {
    async.parallel([
        function(callback) {
          plantCreate('Snake Plant', 8 , callback);
        },
        function(callback) {
            plantCreate('String of Hearts', 9 , callback);
        },
        function(callback) {
            plantCreate('Pothos', 3 , callback);
        },
        function(callback) {
            plantCreate('Nerve Plant', 4 , callback);
        },
        ],
        // optional callback
        cb);
}

function createFlowers(cb) {
    async.parallel([
        function(callback) {
          flowerCreate('Sunflower', 2 , callback);
        },
        function(callback) {
            flowerCreate('Orchid', 10 , callback);
        },
        function(callback) {
            flowerCreate('Marigold', 5 , callback);
        },
        function(callback) {
            flowerCreate('Pansies', 6 , callback);
        },
        ],
        // optional callback
        cb);
}




async.series([
    createPlants,
    createFlowers
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Done!');
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});
