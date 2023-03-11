import ListsDAO from "../dao/listsDAO.js"
import bcrypt from "bcrypt"

export default class UserCtrl {
  static async CreateUser(req, res, next) {
    try {
      const login = req.body.login
      //sprawdzenie czy jest już taki user
      const userExist = await ListsDAO.getUser(login);
      if (userExist)
        return res.status(400).json({
          err: `Login ${login} already exist`
        });
      //hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const userresponse = await ListsDAO.createUser(
        login,
        hashedPassword
      )
      console.log(userresponse)
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }


  static async loginUser(req, res, next) {
    try {
      const login = req.body.login
      //sprawdzenie czy jest już taki user
      const user = await ListsDAO.getUser(login);
      if (!user)
        return res.status(400).json({
          err: `Login ${login} not exist`
        });
      // check if password is corrrect
      const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({
      err: "Invalid password"
    });

      
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
}