
var map;
var infoWindow;
var service;
var userLatitude;
var userLongitude;
var userCoordinates;
var markerArray=[];

function getLocation(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
          console.log(position);
          userCoordinates=position.coords;
          userLatitude=userCoordinates.latitude;
          userLongitude=userCoordinates.longitude; 
          console.log(userCoordinates);
          console.log(userLatitude);
          console.log(userLongitude);


           map.setCenter({lat: userLatitude, lng: userLongitude}); 

      });
  } else{
    console.log("The Browser Does Not Support Geolocation");
  };
};

function initMap(userLatitude, userLongitude) {
  
  console.log("calling map");

  var mapProperties = {
  zoom: 11,
  styles: [{
  stylers: [{ visibility: 'simplified' }]
  }, {
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
    }]
  };

  if (userLatitude && userLongitude) {
    mapProperties.center = {lat: userLatitude, lng: userLongitude };
  }

  map = new google.maps.Map(document.getElementById('map'), mapProperties);

  infoWindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);

  getLocation();
  //The idle event is a debounced event, so we can query & listen without
  //throwing too many requests at the server.
  //map.addListener('idle', performSearch);

}


function callAjax (){
  var keywordName=$("#searchinput").val();
  console.log(keywordName);
  //var queryURL="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + userLatitude + "," + userLongitude + "radius=5000&type=gym&keyword=" + keywordName + "&key=AIzaSyBtd0Rm6EoowNo16BoCBpQwxqgv40Z5P0U"

  var queryURL="https://maps.googleapis.com/maps/api/geocode/json?address=" + userLatitude + "," + userLongitude + "&radius=40000&type=gym&keyword=" + keywordName + "&key=AIzaSyBtd0Rm6EoowNo16BoCBpQwxqgv40Z5P0U"
  console.log(queryURL);
  $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
   
                console.log('response', response);
                function performSearch() {
                  var keywordName=$("#searchinput").val();
                  var request = {
                    bounds: map.getBounds(),
                    type: "gym",
                    keyword: keywordName,
                  };
                  service.radarSearch(request, callback);
                }
                performSearch();

                function callback(results, status) {
                  console.log(results, status);
                  if (status !== google.maps.places.PlacesServiceStatus.OK) {
                    console.error(status);
                    return;
                  }
                  for (var i = 0, result; result = results[i]; i++) {
                    addMarker(result);
                  }
                }


                function addMarker(place) {
                  var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location,
                    icon: {
                      url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
                      anchor: new google.maps.Point(10, 10),
                      scaledSize: new google.maps.Size(10, 17)
                    }
                  });   

                  google.maps.event.addListener(marker, 'click', function() {
                    service.getDetails(place, function(result, status) {
                      if (status !== google.maps.places.PlacesServiceStatus.OK) {
                        console.error(status);
                        return;
                      }
                      infoWindow.setContent(result.name);
                      infoWindow.open(map, marker);
                    });
                  });
                } 
       
      });
};

$("#searchBtn").click( function(){
  callAjax();
});
