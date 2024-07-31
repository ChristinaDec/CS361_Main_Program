/* Original Code by Chanda Decker
CS 361 Project
app.js loads modules, defines routes, and creates the listener needed to run the application.
Last Modified: 7/10/2024
*/

/*
Setup
*/
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://deckecha:89LMIWEKa9HNPMt7@spoons.vvgldyq.mongodb.net/?retryWrites=true&w=majority&appName=spoons";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


var db = require('mongodb');
var express = require('express');
var app = express();
const { engine } = require('express-handlebars');
var expresshbs = require('express-handlebars');

app.set('view engine', '.hbs');
app.engine('.hbs', engine({ extname: ".hbs" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

PORT = 3000;

// Functions

// Get object from activities collection belonging to a user.
// Returns a default activities object if nothing in the database matches
async function getActivity(user) {
    // Check db for user. Returns object if found in activities collection.
    var cursor = client.db('spoons').collection('activities').find({username: user})
    if (await cursor.hasNext()) {
        return await cursor.next()
    }

    // Return default activities object.
    return result = {
        username: user,
        collection: [],
        max: 0            
    }
}

// Function puts an object in the db activities collection.
// Returns true if object was updated or inserted in database.
async function putActivity(obj) {
    // Check database for user, return object if found in collection
    var coll = client.db('spoons').collection('activities')
    if (obj._id) {
        let res = await coll.replaceOne({_id : obj._id}, obj)
        return res.acknowledged && res.matchedCount > 0
    } else {
        let res = await coll.insertOne(obj)
        return res.acknowledged
    }
}

/*
Routes
*/

// Render Homepage.
app.get('/index', function (req, res) {
    res.render('index')
});

// Render Registration Page.
app.get('/signup', function (req, res) {
    res.render('signup')
});

// Register new user.
app.post('/post-signup'), async function(req, res) {
    let data = req.body
    var coll = client.db('spoons').collection('users')
    if (await coll.insertOne(data)) { 
        return res.acknowledged
    }
}

// Add activities to collection.
app.post('/post-activities', async function(req, res) {
    let items = req.body
    var activity = await getActivity("user")
    activity.collection = activity.collection.concat(items)

    if(putActivity(activity)) {
        console.log("Add activity successful.")
        res.status(200).send()
    } else {
        res.status(500).send("Failed to add activity.")
    }
})

// Render Welcome intermediate page.
app.get('/welcome', function (req, res) {
    res.render('welcome')
});


// Populate mySpoons Collection and Max Spoons.
app.get('/myspoons_home', async function(req, res) {
    var activity = await getActivity("user")
    console.log('activites:', activity)

    res.render('myspoons_home', { data: activity.collection, max: activity.max })
})

// Render Add Activity Page.
app.get('/myspoons_add_activity', function(req, res) {
    res.render('myspoons_add_activity')
})

// Add Activity to Collection.
app.post('/post-activities', async function(req, res) {
    let items = req.body
    var activity = await getActivity("user")
    activity.collection = activity.collection.concat(items)

    if(putActivity(activity)) {
        console.log("Add activity successful.")
        res.status(200).send()
    } else {
        res.status(500).send("Failed to add activity.")
    }
})

// Delete Activity from Collection.
app.delete('/delete-activity', async function(req, res) {
    var activity = await getActivity("user")
    activity.collection.splice(req.body.index, 1)
    
    if(putActivity(activity)) {
        console.log("Delete activity successful.")
        res.status(200).send()
    } else {
        // send error to browser
        res.status(500).send("Delete activity failed.")
    }
})

// Render Edit Activity Page.
app.get('/myspoons_edit_activity', function(req, res) {
    res.render('myspoons_edit_activity', {
        to_edit: {
            index: req.query.index,
            activity: req.query.activity,
            spoons: req.query.spoons,
        },
    });
})

// Edit activity.
app.put('/put_single_activity', async function(req, res) {
    let data = req.body;
    
    index = data.index;
    activity = data.activity;
    spoons = data.spoons;
    
    
    items = [activity, spoons];

    var activity = await getActivity("user");
    activity.collection.splice(req.body.index, 1, items);
    
    if(putActivity(activity)) {
        console.log("Edit activity successful.");
        res.status(200).send();
    } else {
        res.status(500).send("Edit activity failed.");
    }   
})

// Render Edit Max Spoons.
app.get('/myspoons_edit_maxspoons', function (req, res) {
    res.render('myspoons_edit_maxspoons', {
        to_edit: {
            max: req.query.maxspoons,
        },
    });   
});


// Edit Max Spoons.
app.put('/put-max', async function(req, res) {
        let data = req.body;
        max_new = data.max;
        
        var activity = await getActivity("user")
        activity.max = max_new
    
        if(putActivity(activity)) {
            console.log("Add activity successful.")
            res.status(200).send()
        } else {
            res.status(500).send("Failed to add activity.")
        }
})

/*
// Render dailySpoons Page.
app.get('/dailyspoons_home', function(req, res) {
    res.render('dailyspoons_home')
})
*/

// Populate dailySpoons Collection.
app.get('/dailyspoons_home', async function(req, res) {
    var activity = await getActivity("user");
    console.log('activites:', activity)
    var sum = 0;
    var net = activity.max - sum;
    res.render('dailyspoons_home', { data: activity.collection, max: activity.max, sum: sum, net: net})
})

/*
app.get('/myspoons_home', async function(req, res) {
    var activity = await getActivity("user")
    console.log('activites:', activity)

    res.render('myspoons_home', { data: activity.collection, max: activity.max })
    
      var sum = 0;
    var net = activity.max - sum;
})
*/
/*
app.put('/select_activities'), function(req, res)
{
  var sum = 0;
    
for(let i = 0; i < length.activity.collection; ++i) {
    //sum = sum + activity.collection[i][1]
}
var net = max - sum;  
}
*/


app.get('/login', function(req, res) {
    res.render('login')
})

app.get('/logout', function(req, res) {
    res.render('logout')
})



/*
Listener
*/
app.listen(PORT, function() {
    console.log('Express started on http://localhost:' + PORT)
});