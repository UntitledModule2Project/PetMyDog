const geolocate = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          const myPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          resolve(myPosition);
        },
        () => reject("Error in the geolocation service.")
      );
    } else {
      reject("Browser does not support geolocation.");
    }
  });
};

document.addEventListener(
  "DOMContentLoaded",
  () => {
    //MAIN MAP
    if (document.getElementById("map")) {
      const ironhackMDRZ = {
        lat: 40.4154514,
        lng: -3.707412
      };
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: ironhackMDRZ
      });

      window.dogs.forEach(dog => {
        let contentString = `<h1  class="firstHeading">${dog.name}</h1>
        <img src="/${dog.photo}">
        <p>${dog.breed}</p>
        <p>${dog.age} Years</p>
        <a href="/dog/dogProfile/${dog._id}">See profile</a>`;

        const infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        let marker = new google.maps.Marker({
          position: {
            lat: dog.location.coordinates[0],
            lng: dog.location.coordinates[1]
          },
          map: map,
          title: `${dog.name} -${dog.age}- ${dog.breed}`
        });
        marker.addListener("click", function() {
          infowindow.open(map, marker);
        });
      });

      geolocate().then(position => {
        const myMarker = new google.maps.Marker({
          position,
          map: map,
          title: "I'm here"
        });
        map.setCenter(position);
      });
    }

    //SECOND MAP

    if (document.getElementById("map2")) {
      const map2 = new google.maps.Map(document.getElementById("map2"), {
        zoom: 15
      });
      geolocate().then(position => {
        const myMarker = new google.maps.Marker({
          position,
          map: map2,
          title: "I'm here"
        });
        map2.setCenter(position);
      });

      let markers = [];

      google.maps.event.addListener(map2, "click", event => {
        clearMarkers();
        fillFields(event);

        const marker = new google.maps.Marker({
          position: {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          },
          map: map2,
          draggable: true
        });

        google.maps.event.addListener(marker, "dragend", event => {
          fillFields(event);
        });

        markers.push(marker);
      });

      const clearMarkers = () => {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markers = [];
      };

      const fillFields = event => {
        document.getElementById("lat").value = event.latLng.lat();
        document.getElementById("lng").value = event.latLng.lng();
      };
    }
    // MAP 3
    if (document.getElementById("map3")) {
      const map3 = new google.maps.Map(document.getElementById("map3"), {
        zoom: 15
      });
      const dog = window.dog
      const position = {
        lat: dog.location.coordinates[0],
        lng: dog.location.coordinates[1]
      }
      const dogMarker = new google.maps.Marker({
        position: position,
        map: map3,
        title: "It's here"
      });
      map3.setCenter(position);
    }
  },

  false
);
