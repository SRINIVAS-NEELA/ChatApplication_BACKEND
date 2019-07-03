const MongoClient = require('mongodb').MongoClient

const state = {
  db: null,
}

exports.connect = (url, done) => {
  if (state.db) return done()
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) return done(err)
    state.db = client.db('MessageApp')
    done()
  })
}

exports.getCollection = (collectionName) =>  state.db.collection(collectionName)

exports.getDB = () => state.db

exports.close = (done) => {
  if (state.db) {
    state.db.close((err, result) => {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}