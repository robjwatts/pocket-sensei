$(document).ready(function(){

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
    
 
    $.ajax({
        type: "GET",
        url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page="+wikiIntro+"&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json"
    }).done(function (data, textStatus, jqXHR) {
      // console.log(data, textStatus, jqXHR);
    
      
      if (data.error) {
        $("#wikiResults").html("Search Not Found. Try Searching Again." )
      }
      else if (data.parse.text) { 

        console.log('prsed results',  $.parseHTML(data.parse.text['*']));
      
       var search= $('#results > p:first', $.parseHTML(data.parse.text['*']));
     
       console.log(search);
        
//code use to remove images and references (clean Wiki API respose)

        $("#wikiResults").html(data.parse.text['*']);
       
        $("#wikiResults").remove(".references");

        $("#wikiResults").find('img, .mbox-image, .mbox-text.plainlist, .references').remove();

      
      }
    }).fail(function (err) {
      console.log(err);
    });
});
     
         });