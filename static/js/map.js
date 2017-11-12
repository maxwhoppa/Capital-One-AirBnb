/*<-Heatmap Settings->*/
mapboxgl.accessToken = 'pk.eyJ1IjoibWF4d2hvcHBhIiwiYSI6ImNqOTUyaDBqZzRhbzQzM3A2dDc2NnRwcmQifQ.iy2hs8PERN3_m9bGYi8VJQ'; //mapbox API created from geojson file

                var map = new mapboxgl.Map({
                    container: 'map', // container id
                    style: 'mapbox://styles/maxwhoppa/cj966l5f31k5t2rt20wcjtt8k' //style for geojson data
                });


  map.on('load', function() { //Colors and scale for the legend-keys
    var layers = ['$100-150', '$150-200', '$200-250', '$250-300', '$300-400', '$400-500', '$500+'];
    var colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026'];

    //Set legend key
    for (i = 0; i < layers.length; i++) {
        var layer = layers[i];
        var color = colors[i];
        var item = document.createElement('div');
        var key = document.createElement('span');
        key.className = 'legend-key';
        key.style.backgroundColor = color;
      
        var value = document.createElement('span');
        value.innerHTML = layer;
        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
      }
  });

  //Get prices from the map as user hovers over neighborhood
  map.on('mousemove', function(e) {
    var neighborhood = map.queryRenderedFeatures(e.point, {
      layers: ['Click to Toggle Prices']
    });
  
    //If mouse hovering on neighborhood, present data in top legend, else revert to original text
    if (neighborhood.length > 0) {
      document.getElementById('pd').innerHTML = '<h3><strong>' + neighborhood[0].properties.name + '</strong></h3><p><strong><em>$' + parseInt(neighborhood[0].properties.price) + '</strong> per night.</em></p>';
    } else {
      document.getElementById('pd').innerHTML = '<p>Hover for info</p>';
    }

  });

  //Allow for different layers to be toggled
  var toggleableLayerIds = [ 'Click to Toggle Prices','Click to Toggle Houses' ];
  for (var i = 0; i < toggleableLayerIds.length; i++) {
      var id = toggleableLayerIds[i];
  
      var link = document.createElement('a');
      link.href = '#';
      link.className = 'active';
      link.textContent = id;
  
      link.onclick = function (e) {
          var clickedLayer = this.textContent;
          e.preventDefault();
          e.stopPropagation();
  
          var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
  
          if (visibility === 'visible') {
              map.setLayoutProperty(clickedLayer, 'visibility', 'none');
              this.className = '';
          } else {
              this.className = 'active';
              map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
          }
      };
  
      var layers = document.getElementById('menu');
      layers.appendChild(link);
  }

//   Click to toggle houses button
map.on('click', 'Click to Toggle Houses', function (e) {
    var house = map.queryRenderedFeatures(e.point, {
    layers:['Click to Toggle Houses']
        });
    var coordinates = [house[0].properties.longitude, house[0].properties.latitude]
    var reviewScore = house[0].properties.review_scores_value 
    if (reviewScore == null){
        reviewScore = 'N/a'
    }

    var htmlString = "<h3><a href ='" + house[0].properties.listing_url + "' target='_blank'>" + house[0].properties.name + "</a></h3><p><strong>Price: </strong>" + house[0].properties.price + "<strong>\nNumber of Beds: </strong>" + house[0].properties.bedrooms+ "<strong>\nNumber of Bathrooms: </strong>" +house[0].properties.bathrooms + "<strong>\nRating: </strong>" + reviewScore+"/10" + "<strong>\nNumber of Reviews: </strong>" + house[0].properties.number_of_reviews + "</p>"
    new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(htmlString)
        .addTo(map);
});

// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'Click to Toggle Houses', function () {
    map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'Click to Toggle Houses', function () {
    map.getCanvas().style.cursor = '';
});
  
  //set cursor in default position
  map.getCanvas().style.cursor = 'default';

  map.addControl(new mapboxgl.FullscreenControl());
  var nav = new mapboxgl.NavigationControl();
  map.addControl(nav, 'bottom-left');

  map.scrollZoom.disable();
  

  //