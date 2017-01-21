var map;
var infoWindow;
var service;
function getLocation(){
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function (position) {
          console.log(position);
    });
  } else{
  }
};
function showPosition(position) {
    var userLatitude=position.coords.latitude;
    var userLongitude=position.coords.longitude; 
    console.log(userLatitude);
    console.log(userLongitude);
};
getLocation();
function initMap() {
  console.log("calling map")
  map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: -33.867, lng: 151.206},
  zoom: 15,
  styles: [{
  stylers: [{ visibility: 'simplified' }]
  }, {
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
    }]
  });
  infoWindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);
  //The idle event is a debounced event, so we can query & listen without
  //throwing too many requests at the server.
  //map.addListener('idle', performSearch);
  }
function callAjax (){
  var keywordName=$("#searchinput").val();
  var queryURL="https://maps.googleapis.com/maps/api/geocode/json?address=-33.8670522,151.1957362&radius=500&type=gym&keyword=" + keywordName + "&key=AIzaSyBtd0Rm6EoowNo16BoCBpQwxqgv40Z5P0U"
  $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
   
                console.log('response', response);
                function performSearch() {
                  var keywordName=$("#searchinput").val();
                  var request = {
                    bounds: map.getBounds(),
                    type: keywordName,
                  };
                  service.radarSearch(request, callback);
                }
                performSearch();
                function callback(results, status) {
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
$("#searchBtn").on("click", function(){
  console.log("hello");
  event.preventDefault();
  callAjax();
});