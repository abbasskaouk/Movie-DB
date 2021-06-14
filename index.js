const express = require('express')
const app = express()
const port = 3000
var d = new Date();
var date = d.getHours() + ":" + d.getMinutes();

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













app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})