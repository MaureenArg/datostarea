// Mapa Leaflet
	var mapa = L.map('mapid').setView([10, -84], 7);

	// Capa base 1
	var osm = L.tileLayer(
	  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', 
	  {
	    maxZoom: 19,
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	  }
	).addTo(mapa);		
	    
	//  Capa base 2
    var esri = L.tileLayer(
	  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 
	  {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	  }
	).addTo(mapa);	
	
	//  capa base 3
    var Natgeo = L.tileLayer(
	  'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',  {
            attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
	  }
	).addTo(mapa);
	
	//  capa base 4
    var Relieve = L.tileLayer(
	  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',  {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri'
	  }
	).addTo(mapa);    
	    
	
			
	// Conjunto de capas base
	var mapasBase = {
	    "ESRI": esri,		
	    "OSM": osm,
		"Natgeo": Natgeo,
		"Relieve": Relieve,
		
	};	    
	    

		
	// Control de escala
	L.control.scale({position: 'topleft'}).addTo(mapa);
	
	// Control de capas
	control_capas = L.control.layers(mapasBase).addTo(mapa);	
	

	// Capa vectorial en formato GeoJSON DENUNCIAS
	$.getJSON("https://maureenarg.github.io/datostarea/denuncias.geojson", function(geodata) {
		var denuncias = L.geoJson(geodata, {
			pointToLayer: function(feature, lating) {
				return L.circleMarker (lating, { radius:4, fillcolor: "#fc032d", color: "#fc032d", weight: 0.5, opacity: 1, fillOpacity: 0.8
	});
	
		},	
    onEachFeature: function(feature, layer) {
		var popupText = "<strong>Categoría</strong>: " + feature.properties.CATEGORIA_;
		layer.bindPopup(popupText);
		}			
	}).addTo(mapa);
	
	control_capas.addOverlay(denuncias, 'Denuncias');
	});	
		
	// Capa vectorial en formato GeoJSON CUENCA
	$.getJSON("https://maureenarg.github.io/datostarea/cuencas.geojson", function(geodata) {
		var cuencas = L.geoJson(geodata, {
		style: function(feature) {
				return {'color': "#3aa630", 'weight': 3.5, 'fillOpacity': 0.5}
		},
    onEachFeature: function(feature, layer) {
		var popupText = "<strong>Número de Cuenca</strong>: " + feature.properties.NUM_CUENCA + "<br>" + "<strong>Nombre</strong>: " + feature.properties.NOMBRE;
		layer.bindPopup(popupText);
		}			
	}).addTo(mapa);

	control_capas.addOverlay(cuencas, 'Cuenca');
	});
	
	// Capa vectorial en formato GeoJSON RIOS
	$.getJSON("https://maureenarg.github.io/datostarea/rios.geojson", function(geodata) {
		var rios = L.geoJson(geodata, {
		style: function(feature) {
				return {'color': "#1703fc", 'weight': 2.5, 'fillOpacity': 0.0}
		},
    onEachFeature: function(feature, layer) {
		var popupText = "<strong>Nombre</strong>: " + feature.properties.NOMBRE;
		layer.bindPopup(popupText);
		}			
	}).addTo(mapa);

	control_capas.addOverlay(rios, 'Ríos').addTo(mapa);
	});	
	




