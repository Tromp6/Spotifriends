export {};
const express = require("express");
const rootDir = require("../helper/path");
const path = require("path");
const groupController = require("../controller/group");

const router = express.Router();


router.post("/createGroup",async(req: any, res: any, next: any) => {
  
    
  await groupController.createGroup(req.body.Groupname, req.session.userID);
    res.redirect("/");
    
    
});

router.get("/", async(req: any, res: any, next: any) =>{
  
  if(req.session.isLoggedIn === true){
    const groups = await groupController.getGroups(req.session.userID);
    res.render("homepage", {docTitle: "Max", groups: groups})
  }else{
    res.redirect("/login");
  }

});



module.exports = router;