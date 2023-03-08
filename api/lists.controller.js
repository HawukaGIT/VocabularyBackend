import ListsDAO from "../dao/listsDAO.js"

export default class ListsController {
  static async apiPostWord(req, res, next) {
    try {
      //const wordID = req.body.wordID
      const word = req.body.word
      const translation = req.body.translation
      //dodac reszte pol??

      const listResponse = await ListsDAO.addWord(
        //wordID,
        word,
        translation
        //dodac reszte pol
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetWord(req, res, next) {
    try {
      let id = req.params.id || {}
      let word = await ListsDAO.getWord(id)
      if (!word) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(word)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiUpdateWord(req, res, next) {
    try {
      //const wordID = req.params.id
      const word = req.body.word
      const translation = req.body.translation
      //dodać reszte pol

      const listResponse = await ListsDAO.updateWord(
        // wordID,
        word,
        translation
        //dodac reszte pol
      )

      var { error } = listResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (listResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update word",
        )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.satus(500).json({ error: e.message })
    }
  }

  static async apiDeleteWord(req, res, next) {
    try {
      const wordID = req.params.id
      const deleteResponse = await ListsDAO.deleteWord(wordID)

      var { error } = deleteResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (deleteResponse.deletedCount === 0) {
        throw new Error(
          "unable to delete word",
        )
      }

      res.json({ status: "success" })
      //res.json({ status: "success" })
      //res.json(deleteResponse)
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetWordsByList(req, res, next) {
    try {
      let param = req.params.list || {}
      let words = await ListsDAO.getWordsByList(param)
      if (!words) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(words)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
  static async apiGetWords(req, res, next) {
    try {
      let words = await ListsDAO.getWords()
      if (!words) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(words)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}