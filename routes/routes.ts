export {};
const express = require("express");
const rootDir = require("../helper/path");
const path = require("path");
const groupController = require("../controller/group");
const clipboardyForBrowser = require('copy-text-to-clipboard');

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

router.get("/joinGroup", (req: any, res: any, next: any) =>{
  const playlistID = req.query.playlistID
  if(req.session.isLoggedIn === true){
   console.log("jo es geht ab man ");
  
  }else{
    res.cookie("playlistID", playlistID, { path: '/loggedIn'});
    res.redirect("/login");
  }
})



module.exports = router;