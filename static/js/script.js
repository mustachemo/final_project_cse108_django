// // Actions:

// const closeButton = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
// <title>remove</title>
// <path d="M27.314 6.019l-1.333-1.333-9.98 9.981-9.981-9.981-1.333 1.333 9.981 9.981-9.981 9.98 1.333 1.333 9.981-9.98 9.98 9.98 1.333-1.333-9.98-9.98 9.98-9.981z"></path>
// </svg>
// `;
// const menuButton = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
// <title>ellipsis-horizontal</title>
// <path d="M16 7.843c-2.156 0-3.908-1.753-3.908-3.908s1.753-3.908 3.908-3.908c2.156 0 3.908 1.753 3.908 3.908s-1.753 3.908-3.908 3.908zM16 1.98c-1.077 0-1.954 0.877-1.954 1.954s0.877 1.954 1.954 1.954c1.077 0 1.954-0.877 1.954-1.954s-0.877-1.954-1.954-1.954z"></path>
// <path d="M16 19.908c-2.156 0-3.908-1.753-3.908-3.908s1.753-3.908 3.908-3.908c2.156 0 3.908 1.753 3.908 3.908s-1.753 3.908-3.908 3.908zM16 14.046c-1.077 0-1.954 0.877-1.954 1.954s0.877 1.954 1.954 1.954c1.077 0 1.954-0.877 1.954-1.954s-0.877-1.954-1.954-1.954z"></path>
// <path d="M16 31.974c-2.156 0-3.908-1.753-3.908-3.908s1.753-3.908 3.908-3.908c2.156 0 3.908 1.753 3.908 3.908s-1.753 3.908-3.908 3.908zM16 26.111c-1.077 0-1.954 0.877-1.954 1.954s0.877 1.954 1.954 1.954c1.077 0 1.954-0.877 1.954-1.954s-0.877-1.954-1.954-1.954z"></path>
// </svg>
// `;

// const actionButtons = document.querySelectorAll('.action-button');

// if (actionButtons) {
//   actionButtons.forEach(button => {
//     button.addEventListener('click', () => {
//       const buttonId = button.dataset.id;
//       let popup = document.querySelector(`.popup-${buttonId}`);
//       console.log(popup);
//       if (popup) {
//         button.innerHTML = menuButton;
//         return popup.remove();
//       }

//       const deleteUrl = button.dataset.deleteUrl;
//       const editUrl = button.dataset.editUrl;
//       button.innerHTML = closeButton;

//       popup = document.createElement('div');
//       popup.classList.add('popup');
//       popup.classList.add(`popup-${buttonId}`);
//       popup.innerHTML = `<a href="${editUrl}">Edit</a>
//       <form action="${deleteUrl}" method="delete">
//         <button type="submit">Delete</button>
//       </form>`;
//       button.insertAdjacentElement('afterend', popup);
//     });
//   });
// }

// Menu

const dropdownMenu = document.querySelector(".dropdown-menu");
const dropdownButton = document.querySelector(".dropdown-button");

if (dropdownButton) {
  dropdownButton.addEventListener("click", () => {
    dropdownMenu.classList.toggle("show");
  });
}

// Upload Image
const photoInput = document.querySelector("#avatar");
const photoPreview = document.querySelector("#preview-avatar");
if (photoInput)
  photoInput.onchange = () => {
    const [file] = photoInput.files;
    if (file) {
      photoPreview.src = URL.createObjectURL(file);
    }
  };

// Scroll to Bottom
const conversationThread = document.querySelector(".room__box");
if (conversationThread) conversationThread.scrollTop = conversationThread.scrollHeight;

document.addEventListener('DOMContentLoaded', function () {
  var map = L.map('map', {
      center: [37.364333, -120.425583], // Center of the map
      zoom: 16,
      maxBounds: L.latLngBounds(
          L.latLng(37.354333, -120.435583), // Southwest corner of the boundary
          L.latLng(37.374333, -120.415583)  // Northeast corner of the boundary
      ),
      maxBoundsViscosity: 1.0, // Makes the bounds fully solid
      zoomControl: true, // Enable zoom control buttons
      attributionControl: true, // Enable attribution control
      scrollWheelZoom: false // Disables zooming with the scroll wheel and touchpad gestures

  });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // Create a home button
  L.easyButton('fa-home', function(btn, map){
      map.setView([37.364333, -120.425583], 16);
  }, 'Go to Default View').addTo(map);

  // Custom icon setup
  var customIcon = L.icon({
    iconUrl: '/static/images/map-marker.png', // Replace with your image path
    iconSize: [50, 50], // size of the icon
    popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
  });

  // Array of marker data
  var locations = [
      [37.362896059964946, -120.42595859928308, "TRV Lounge","Open 8:00 AM - 9:00 PM", "/static/images/trv.jpeg"],
      [37.36634316703297, -120.42443484196352, "Kolligan Library", "Open 8:00 AM - 9:00 PM", "/static/images/koliganlibrary.jpeg"],
      [37.36728539137442, -120.42203925056452, "Student Services Building","Open 8:00 AM - 9:00 PM", "/static/images/SSB.jpeg"],
  ];

  // Adding markers to the map
  locations.forEach(function(location) {
      var marker = L.marker([location[0], location[1]], {icon: customIcon}).addTo(map);
      marker.bindPopup("<b>" + location[2] + "</b>").openPopup();

      marker.on('click', function() {
        document.getElementById('studyRoomLink').textContent = location[2];
        document.getElementById('studyRoomTextarea').textContent = location[3];
        document.getElementById('image').src = location[4];
      });
  });
  //  // Add click event listener to the map to log the coordinates
  //  map.on('click', function(e) {
  //   var lat = e.latlng.lat;
  //   var lng = e.latlng.lng;
  //   console.log(`Lat, Long: ${lat}, ${lng}`);
  // });

});
