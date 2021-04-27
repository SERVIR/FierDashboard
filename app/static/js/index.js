$(function(){
    $(".nav .nav-link").on("click", function(){
        $(".nav").find(".active").removeClass("active");
        $(this).addClass("active");
    });


    mapboxgl.accessToken = 'pk.eyJ1Ijoia20wMDMzIiwiYSI6ImNrOWFsMmw3eDA0cm8zbWxrczB4OXA2OWUifQ.0NUvgcQYupWVsnu2vB974A';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        zoom: 6,
        center: [105,12],
        minZoom: 2,
        maxZoom: 14
    });

    map.on('load', function() {

        map.addSource('basins', {
            type: 'geojson',
            data: 'static/data/KH_basins.geojson'
        });
        
        map.addLayer({
            'id': 'basin-layer',
            'type': 'fill',
            'source': 'basins',
            'layout': {},
            'paint': {
                'fill-color': '#1f77b4', // blue color fill
                'fill-opacity': 0.5,
                'fill-outline-color': '#f0f0f0',
            }
        });

        map.addSource('test-tiles', {
            'type': 'raster',
            'url': '../static/data/example_reof_sythesis_t00.mbtiles',
            'tileSize': 256,
        });
        map.addLayer({
            'id': 'test-layer',
            'type': 'raster',
            'source': 'test-tiles',
        });
    });
    // Change the cursor to a pointer when the it enters a feature in the 'circle' layer.
    map.on('mouseenter', 'basin-layer', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'basin-layer', function () {
        map.getCanvas().style.cursor = '';
    });
    

// end main level function
})