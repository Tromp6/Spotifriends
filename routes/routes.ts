export {};
const express = require("express");
const rootDir = require("../helper/path");
const path = require("path");
const groupController = require("../controller/group");

const router = express.Router();


router.post("/createGroup",(req: any, res: any, next: any) => {
  
    
    groupController.createGroup(req.body.Groupname,"dummyText","dummyText");
    res.redirect("/");
    
    
});

router.get("/", async(req: any, res: any, next: any) =>{

  const groups = await groupController.getGroups();
    res.render("homepage", {docTitle: "Max", groups: groups})
});



module.exports = router;