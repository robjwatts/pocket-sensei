
      // This .on("click") function will trigger the AJAX Call
      $("#searchBtn").on("click", function(event) {
        $("#wikiResults").empty()
    

        console.log("wiki wiki wiki wiki WIKI")
        // Preventing the submit button from trying to submit the form
        // We're optionally using a form so the user may hit Enter to search instead of clicking the button
        event.preventDefault();
        // Here we grab the text from the input box
        var wikiIntro = $("#searchinput").val().trim();
        // Here we construct our URL
        
        
        // Write code between the dashes below to hit the queryURL with $ajax, then take the response data
        $(document).ready(function(){
 
    $.ajax({
        type: "GET",
        url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page="+wikiIntro+"&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json"
    }).done(function (data, textStatus, jqXHR) {
      // console.log(data, textStatus, jqXHR);
    
      
      if (data.error) {
        $("#wikiResults").html("Search Not Found. Try Searching Again." )
      }
      else if (data.parse.text) { 
       // var workable= $.parseHTML(data.parse.text['*'], $('#results'));
       var search= $('#wikiResults>p:first', data.parse.text['*']);
        $("#wikiResults")
       console.log(search);
        $("#wikiResults").html(data.parse.text['*']);
        // console.log(data.parse.text['*']);

        $("#wikiResults").remove(".references");

        $("#wikiResults").find("img").remove();
      }
    }).fail(function (err) {
      console.log(err);
    });
});
        
        //
        // 
        //
        //
        // YOUR CODE GOES IN THESE DASHES. DO NOT MANUALLY EDIT THE HTML ABOVE
         });
        // =================================================================
        // CODE GOES HERE
        // =================================================================
      
