document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

  const google = "https://maps.google.com";

  const matadero = {
    lat: 40.392581,
    lng: -3.697344
  }

  const map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 14,
      center: matadero
    }
  );

  window.dogs.forEach( dog => {
    new google.maps.Marker({
      position: {
        lat: dog.location.coordinates[0],
        lng: dog.location.coordinates[1]
      },
      map: map,
      title: `${dog.name} - ${dog.location}`
    });
  })


}, false);


