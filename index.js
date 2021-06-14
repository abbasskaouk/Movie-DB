const express = require('express')
const app = express()
const port = 3000
var d = new Date();
var date = d.getHours() + ":" + d.getMinutes();
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
];
/*******************************
 * Step 2 
 * 
 * listen and send ok
 */
app.get('/', (req, res) => {
  res.send('ok')
})


/********************
 * step 3
 * 
 * url/test -> gives status 200 and message ok
 * 
 * url/time -> give status 200 and message time like 14:02
 */
app.get('/test', (req, res) => {
    res.send({status:200, message:"ok"})
  })

app.get('/time', (req, res) => {
    res.send({status:200, message:date})
  })


/*********
 * step 4
 * 
 * url/hello/<ID> -> gives status 200 and message "hello, <ID>"
 * and if
 * url/hello/   -> gives status 200 and message "hello, "
 * 
 * url/search?s=<SEARCH> -> gives status 200 and message ok and data:<SEARCH>
 * and if
 * url/search?s=    -> sets status to 500 and error true and you have to provide a search
 * 
 */
app.get('/hello/:name', (req, res) => {
    res.send({status:200, message:"hello, "+req.params.name+"!"});
  })

app.get('/hello/', (req, res) => {
    res.send({status:200, message:"hello, !"});
  })

app.get('/search', (req, res) => {
    const search = req.query.s;
    if(search == ""){
        res.status(500);
        res.send({status:500, error:true, message:"you have to provide a search"});
    }
    res.send({status:200, message:"ok", data:search});
  })



/**********
 * 
 * Step 5 
 * create: /movies/add, /movies/get, /movies/edit, /movies/delete,
 * make /movies/get returns the movies in movies array
 * 
 */
app.get('/movies/add', (req, res) => {

  })

app.get('/movies/get', (req, res) => {
    res.send({status:200, data:movies});
})

app.get('/movies/edit', (req, res) => {

})

app.get('/movies/delete', (req, res) => {

})

/**
 * 
 * Step 6
 * 
 */
app.get('/movies/get/by-date', (req, res) => {
    movies.sort(function(a, b) {
        var dateA = new Date(a.year), dateB = new Date(b.year);
        return dateA - dateB;
    });
    res.send({status:200, data:movies});
})

app.get('/movies/get/by-rating', (req, res) => {
    movies.sort(function(b, a) {
        return a.rating - b.rating;
    });
    res.send({status:200, data:movies});
})

app.get('/movies/get/by-title', (req, res) => {
    movies.sort(function(a, b) {
        var titleA = a.title.toLowerCase(), titleB = b.title.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
    });
    res.send({status:200, data:movies});
})

/**
 * 
 * Step 7
 * 
 */
app.get('/movies/read/id/:id', (req, res) => {
    selectedId = req.params.id - 1;
    var result;
    if(!isNaN(selectedId)){
        if(selectedId < movies.length || selectedId < 0 ){
            result = movies[selectedId];
            res.send({status:200, message:result});
        }
        else {
            console.log("dghsidj");
            res.status(404);
            res.send({status:404, error:true , message: "the movie " + (selectedId+1) +" does not exist"});
        }
    }
    else {
        res.status(500);
        res.send({status:500, error:true , message: "Please enter a number"});
    }

    //const result = movies[selectedId];
    
  })







app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})