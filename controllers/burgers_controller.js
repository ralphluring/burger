var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    burger.All(function(data) {
      var hbsObject = {
        burgers: data
      };
      res.render("index",hbsObject);
    });
});

router.post("/burgers", function(req, res) {
  console.log(req.body)
  burger.Create(["burger_name","price"],[req.body.burger_name,req.body.price], function(result) {
    // Send back the ID
    res.json({ id: result.insertId });
  });
});


router.put("/burgers", function(req, res) {
  var condition = "burger_id = " + req.body.devoured;
  console.log("condition", condition);
  burger.update({
    devoured: true,
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/burgers/:id",function(req, res){
  console.log(`REQ.PARAMS ${req.params.id}`)
  console.log(`REQ.BODY ${req.body.deleted}`)
  var condition = "burger_id =" + req.body.deleted;
  burger.delete({
    condition,
    function(result){
      if(result.changedRows == 0){
        return res.status(404).end();
      }else{
        res.status(200).end();
        console.log("deleted");
      }
      res.send(result);
    }
  })
})

// Export routes for server.js to use.
module.exports = router;