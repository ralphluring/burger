$(function() {


$("#submit-btn").on("click", function(event) {
    // Make sure to preventDefault on a submit event.
    // console.log("submitted")
    event.preventDefault();

    var newBurger = {
      burger_name: $("#burger-text").val().trim(),
    };
    // console.log(newBurger)
    // Send the POST request.
    $.ajax("/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        // console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });


  $(".devour-btn").on("click", function(event){
    event.preventDefault();
    let filterId = $(this).data("id");
    
    console.log(filterId);
    let newDevoured = {
        devoured:filterId
    }
        // Send the PUT request.
        $.ajax("/burgers", {
            type: "PUT",
            data: newDevoured
          }).then(
            function() {
              console.log("changed devoured", newDevoured);
              // Reload the page to get the updated list
              location.reload();
            }
        );
  })

  // $(".delete-btn").on("click", function(event){
  //   event.preventDefault();
  //   let filterId = $(this).data("id");
  //   console.log(`id of row I want to delete:${filterId} ${typeof filterId}`);
  //   let newDelete = {
  //       deleted:filterId
  //   }
  //       // Send the PUT request.
  //       $.ajax("/burgers/" + filterId, {
  //           type: "DELETE",
  //           data: newDelete

  //         }).then(
  //           function() {
  //             console.log("deleted", newDelete);
  //             // Reload the page to get the updated list
  //             location.reload();
  //           }
  //       );
  // })



})