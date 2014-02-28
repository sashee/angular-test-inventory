'use strict'

var express = require('express');
var _ = require('underscore');
var fs = require('fs');
var app = express();

app.use(express.bodyParser());
app.use(express.urlencoded());

var places;
var stuffs;


var files={};

fs.readdir('testdata',function(e,f){
    _.each(f,function(file){
        fs.readFile('testdata/'+file,function(e,data){
            files[file]=data;
        });
    })
})

app.use("/", express.static(__dirname + '/../client/'));

function resetDb(){
    places=[{
        id:'1',
        name:'place1',
        description:'a nice place'
    },{
        id:'2',
        name:'place2',
        description:'a not so nice place'
    },{
        id:'3',
        name:'place3',
        description:'a very nice place'
    }];
    stuffs=[{
        id:'1',
        name:'stuff1',
        description:'a useful stuff',
        at:'2',
        history:[{date:new Date('2014.01.11')},{date:new Date('2014.01.13'),at:"2"}]
    },{
        id:'2',
        name:'stuff2',
        description:'a very useful stuff',
        at:'2',
        history:[{date:new Date('2014.01.10'),at:"2"}]
    },{
        id:'3',
        name:'stuff3',
        description:'a not so useful stuff',
        at:'3',
        history:[{date:new Date('2014.01.15')},{date:new Date('2014.01.16'),at:"3"},{date:new Date('2014.01.17')},{date:new Date('2014.01.18'),at:"3"}]
    },{
        id:'4',
        name:'stuff4',
        description:'a mostly useful stuff',
        history:[{date:new Date('2014.02.12')}]
    }];
}

app.post('/rest/resetdb',function(req,res){
    resetDb();
    res.send(200);
});

resetDb();


app.get('/rest/place', function(req, res){
    res.send(places)
});

app.get('/rest/stuff', function(req, res){
    res.send(stuffs)
});

app.get('/rest/stuff/:id', function(req, res){
    res.send(_.find(stuffs,function(stuff){
        return stuff.id===req.params.id;
    }));
});

app.get('/rest/place/:id', function(req, res){
    res.send(_.find(places,function(place){
        return place.id===req.params.id;
    }));
});

app.get('/rest/stuff/for_place/:placeid', function(req, res){
    res.send(_.filter(stuffs,function(stuff){
        return stuff.at && stuff.at===req.params.placeid;
    }))
});

app.post('/rest/stuff/new',function(req,res){
    req.body.history=[{date:new Date(),at:req.body.at}];
    req.body.id= parseInt(_.max(_.pluck(stuffs,'id')))+1+"";
    stuffs= _.union(stuffs,[req.body]);
    res.send(200);
});

app.post('/rest/place/new',function(req,res){
    req.body.id= parseInt(_.max(_.pluck(places,'id')))+1+"";
    places= _.union(places,[req.body]);
    res.send(200);
});

app.post('/rest/stuff',function(req,res){
    var existing= _.find(stuffs,function(stuff){return stuff.id===req.body.id});
    req.body.history=existing.history || [];
    if(req.body.at!==existing.at){
        req.body.history.push({date:new Date(),at:req.body.at});
    }
    stuffs= _.map(stuffs,function(stuff){
        return stuff.id===req.body.id?req.body:stuff;
    });
    res.send(200)
});

app.post('/rest/place',function(req,res){
    places= _.map(places,function(place){
        return place.id===req.body.id?req.body:place;
    });
    res.send(200)
});

app.post('/rest/stuff/:stuffid/image',function(req,res){
    var existing=_.find(stuffs,function(stuff){return stuff.id===req.params.stuffid});
    var imgs=existing.images||[];
    imgs.push(req.files.img.path);

    fs.readFile(req.files.img.path, "binary", function(error, file) {
        files[req.files.img.path]=file;
    });

    existing.images=imgs;
    res.send(200)
});

app.get('/rest/stuff/:stuffid/image/:imagenum',function(req,res){
    var existing=_.find(stuffs,function(stuff){return stuff.id===req.params.stuffid});
    res.writeHead(200, {"Content-Type": "image/png"});
    res.write(files[existing.images[req.params.imagenum]], "binary");
});

app.listen(3000);