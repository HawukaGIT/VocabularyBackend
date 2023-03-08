import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let slowka
let users

export default class ListsDAO {
  static async injectDB(conn) {
    if (slowka) {
      return
    }
    if (users) {
      return
    }
    try {
      slowka = await conn.db("slowka").collection("slowka")
      users = await conn.db("slowka").collection("uzyt")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addWord(word, translation) {
    console.log(`dodawanie słówka: ${word} (${translation})`)
    try {
      const wordDoc = {
        //wordID: wordID,
        word: word,
        translation: translation
        
      }

      return await slowka.insertOne(wordDoc)
    } catch (e) {
      console.error(`Unable to post word: ${e}`)
      return { error: e }
    }
  }

  static async getWord(wordID) {
    try {
      let id = new ObjectId(wordID)
      return await slowka.findOne({ _id: id })
    } catch (e) {
      console.error(`Unable to get word: ${e}`)
      return { error: e }
    }
  }

  static async updateWord(wordID, word, translation) {
    console.log("word", wordID)
    try {
      let id = new ObjectId(wordID)
      const updateResponse = await slowka.updateOne(
        { _id: id },
        { $set: { word: word, translation: translation } }
      )
      return updateResponse
    } catch (e) {
      console.error(`Unable to update word: ${e}`)
      return { error: e }
    }
  }
  static async deleteWord(wordID) {
    try {
      let id = new ObjectId(wordID)
      const deleteResponse = await slowka.deleteOne({
        _id: id
      })
      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete word: ${e}`)
      return { error: e }
    }
  }

  static async getWordsByList(list) {
    console.log("list:", list)
    try {
      //const cursor = await slowka.find({ list: list })
      const cursor = await listy.find()
      return cursor.toArray()
    } catch (e) {
      console.error(`Unable to get list: ${e}`)
      return { error: e }
    }
  }

  static async getWords() {
    console.log("all words")
    try {
      const cursor = await slowka.find({})
      return cursor.toArray()
    } catch (e) {
      console.error(`Unable to get words: ${e}`)
      return { error: e }
    }
  }
}