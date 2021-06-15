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
 * step 8
 * /movies/add?title=..&year=..&rating=..
 * adds the requested data in the link
 * where {
 *    title cannot be empty
 *    year cannot be empty or not a number or length different from 4
 *    and if rating is empty: rating = 4
 * }
 * 
 * Step 9
 * /movies/delete/<ID>
 * delete the movie with the requested ID
 * 
 */
app.get('/movies/add', (req, res) => {
    const titleToAdd = req.query.title;
    const yearToAdd = req.query.year;
    const ratingToAdd = req.query.rating;
    var str = yearToAdd.toString();
    var length = str.length;
    if(titleToAdd == "" || yearToAdd == "" || isNaN(yearToAdd) || length != 4){
      res.status(403);  
      res.send({status:403, error:true, message:'you cannot create a movie without providing a title and a year'})
    }
    else {
      var intYear = parseInt(yearToAdd);
      var intRating = parseInt(ratingToAdd);
      if (ratingToAdd == ""){
        movies.push({title:titleToAdd,year:intYear,rating:4})
        res.send({status:200, data:movies});
      }
      else {
        movies.push({title:titleToAdd,year:intYear,rating:intRating})
        res.send({status:200, data:movies});
      }
    }
})

app.get('/movies/get', (req, res) => {
    res.send({status:200, data:movies});
})

app.get('/movies/edit/:id', (req, res) => {
    selectedId = req.params.id - 1;
    let titleToEdit , yearToEdit , ratingToEdit ;
    let x = {};
    if (req.query.title) titleToEdit = req.query.title;
    if (req.query.year) yearToEdit = parseInt(req.query.year);
    if (req.query.rating) ratingToEdit = parseInt(req.query.rating);
    
    if (titleToEdit){
      x.title = titleToEdit;
    }
    if (yearToEdit){
      x.year = yearToEdit;
    }
    if (ratingToEdit){
      x.rating = ratingToEdit;
    }

    
    if ( x.hasOwnProperty('title')){
      movies[selectedId].title = x.title;
    }
    if ( x.hasOwnProperty('year')){
      movies[selectedId].year = x.year;
    }
    if ( x.hasOwnProperty('rating')){
      movies[selectedId].rating = x.rating;
    }
    res.send({status:200 , data:movies});
})

app.get('/movies/delete/:id', (req, res) => {
    selectedId = req.params.id - 1;
    var result;
    if(!isNaN(selectedId)){
        if(selectedId < movies.length && selectedId >= 0 ){
            movies.splice(selectedId,1);
            res.send({status:200, message:movies});
        }
        else {
            res.status(404);
            res.send({status:404, error:true , message: "the movie " + (selectedId+1) +" does not exist"});
        }
    }
    else {
        res.status(500);
        res.send({status:500, error:true , message: "Please enter a number"});
    }
})

/**
 * 
 * Step 6
 * 
 * get movies by date, by rating and by title
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
 * select a specific movie from the array
 * 
 */
app.get('/movies/read/id/:id', (req, res) => {
    selectedId = req.params.id - 1;
    var result;
    console.log(movies.length);
    if(!isNaN(selectedId)){
        if(selectedId < movies.length && selectedId >= 0 ){
            result = movies[selectedId];
            res.send({status:200, message:result});
        }
        else {
            res.status(404);
            res.send({status:404, error:true , message: "the movie " + (selectedId+1) +" does not exist"});
        }
    }
    else {
        res.status(500);
        res.send({status:500, error:true , message: "Please enter a number"});
    }
  })


/**************
 * 
 * Step 8
 * 
 */
 



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})