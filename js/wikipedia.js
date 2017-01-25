<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Wikipedia Serch</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
</head>

<body>
  <div class="container">
    <h1>Wikipedia </h1>

    <!-- We'll be dumping our JSON contents in here -->
    <div id="intro-view"></div>

    <!-- This form will be where users input data about the movies -->
    <form id="intro-form">
      <label for="wiki-input">Search</label>
      <input type="text" id="wiki-input"><br>

      <!-- This button will trigger our AJAX call -->
      <input id="find-intro" type="submit" value=" Search">
      <div id= 'results'>Results 

      </div>
    </form>

<script
  src="https://code.jquery.com/jquery-2.2.4.min.js"
  integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
  crossorigin="anonymous"></script>
    <script type="text/javascript">
      // This .on("click") function will trigger the AJAX Call
      $("#find-intro").on("click", function(event) {
        // Preventing the submit button from trying to submit the form
        // We're optionally using a form so the user may hit Enter to search instead of clicking the button
        event.preventDefault();
        // Here we grab the text from the input box
        var wikiIntro = $("#wiki-input").val();
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
        $("#results").html("Search Not Found. Try Searching Again." )

      }
      else if (data.parse.text) { 
       // var workable= $.parseHTML(data.parse.text['*'], $('#results'));
       var search= $('#results>p:first', data.parse.text['*']);
        $("#results")
       console.log(search);
        $("#results").html(data.parse.text['*']);
s
        $( "#results" ).removeClass( "references" )
        // console.log(data.parse.text['*']);
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
      
     
    </script>
  </div>
</body>

</html>