import express from "express"
import ListsCtrl from "./lists.controller.js"

const router = express.Router()

//router.route("/lists").get(ListsCtrl.apiGetLists)
//router.route("/lists/new").post(ListsCtrl.apiPostList)
//router.route("/lists/:nazwa")
//  .get(ListsCtrl.apiGetList)
//  .put(ListsCtrl.apiUpdateList)
//  .delete(ListsCtrl.apiDeleteList)
router.route("/words").get(ListsCtrl.apiGetWords)
router.route("/list/:list").get(ListsCtrl.apiGetWordsByList)
router.route("/words/new").post(ListsCtrl.apiPostWord)
router.route("/words/:id")
  .get(ListsCtrl.apiGetWord)
  .put(ListsCtrl.apiUpdateWord)
  .delete(ListsCtrl.apiDeleteWord)


export default router