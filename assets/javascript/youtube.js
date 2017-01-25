
    // 'apiKey': 'AIzaSyBaodgFY4-d0mIdO68NmRIM763BxzA0TLU
      $("#searchBtn").on("click", function() {
<<<<<<< HEAD
=======
         $(".image").remove()
>>>>>>> 395f21712f4d5309ca6a4fab6ddbd472aeaba3b8
         $("#videoPlay3").empty();

        console.log("you just clicked the search button!");
        // call
        start();


      });


      function start() {
        console.log("whaddup");
        var query = $("#searchinput").val().trim();
        // Initializes the client with the API key and the Translate API.
        gapi.client.init({
          'apiKey': 'AIzaSyBaodgFY4-d0mIdO68NmRIM763BxzA0TLU',
          'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
        }).then(function() {
          // Executes an API request, and returns a Promise.
          // The method name `language.translations.list` comes from the API discovery.
           var request = gapi.client.youtube.search.list({
            q: query,
            maxResults: 1,
            part: 'snippet'

            });
           return request;
        }).then(function(response) {
          console.log(response.result.items);
          response.result.items.forEach(function(item) {
            var video = $('<div class="video">');
            video.append(item.snippet.title);
            video.append(item.snippet.description);
            video.append('<iframe width="500" height="300" src="https://www.youtube.com/embed/' + item.id.videoId  + '" frameborder="0" allowfullscreen></iframe>');
           $("#videoPlay3").prepend(video);
          })
        }, function(reason) {
          console.log('Error: ' + reason.result.error.message);

           $("#videoPlay3").prepend(video);
        });


      };
      // Loads the JavaScript client library and invokes `start` afterwards.
   


      // Loads the JavaScript client library and invokes `start` afterwards.
      gapi.load('client', allIsLoaded);

      function allIsLoaded() {
        console.log("loaded!!!");
        // do nothing
      }