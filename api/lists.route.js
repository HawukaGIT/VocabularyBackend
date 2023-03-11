import express from "express"
import ListsCtrl from "./lists.controller.js"
import UserCtrl from "./user.controller.js"

const router = express.Router()

//router.route("/lists").get(ListsCtrl.apiGetLists)
//router.route("/lists/new").post(ListsCtrl.apiPostList)
//router.route("lists/:nazwa")
//  .get(ListsCtrl.apiGetList)
//  .put(ListsCtrl.apiUpdateList)
//  .delete(ListsCtrl.apiDeleteList)
//router.route("lists/quiz/:lista").get(ListsCtrl.apiQuizbylist)
//router.route("lists/quiz/").get(ListCtrl.apiQuiz)
router.route("/words").get(ListsCtrl.apiGetWords)
router.route("/lists/:list").get(ListsCtrl.apiGetWordsByList)
router.route("/words/new").post(ListsCtrl.apiPostWord)
router.route("/words/:id")
  .get(ListsCtrl.apiGetWord)
  .put(ListsCtrl.apiUpdateWord)
  .delete(ListsCtrl.apiDeleteWord)
router.route('/register').post(UserCtrl.CreateUser)
router.route('/login').post(UserCtrl.loginUser)


export default router