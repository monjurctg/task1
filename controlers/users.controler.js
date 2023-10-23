const Pool = require("../db/index");

const usersController = {};

usersController.getAll = async (req, res) => {
  try {
    const [rows, fields] = await Pool.query("select * from users");
    res.send(rows);
  } catch (err) {}
};

usersController.addUser = async(req,res)=>{
  try{

  }
  catch(err){

  }
}

module.exports = usersController;
