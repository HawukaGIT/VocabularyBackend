import app from "./server.js"
import mongodb from "mongodb"
import listsDAO from "./dao/listsDAO.js"
//import mongoose from "mongoose"


const MongoClient = mongodb.MongoClient
const mongoPassword = process.env['MongoPassword']
const mongoUsername = process.env['MongoUsername']
const uri = `mongodb+srv://${mongoUsername}:${mongoPassword}@slowka.qprfm5a.mongodb.net/?retryWrites=true&w=majority`

const port = process.env.PORT || 8000

MongoClient.connect(
  uri,
  {
    maxPoolSize: 5,
    wtimeoutMS: 2500,
    useNewUrlParser: true
  }
)
  .catch(err => {
    console.error(err.stack)
    //console.log(err)
    process.exit(1)
  })
  .then(async client => {
    //connect with listsDAO
    await listsDAO.injectDB(client)

    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })