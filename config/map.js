module.exports = {
  baseLayers: [
    {
      type: 'tileLayer',
      arguments: [
        'https://mapproxy.kargo.test.kalisio.xyz/wmts/osm/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          label: 'OpenStreetMap',
          attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        }
      ]
    },
    {
      type: 'tileLayer',
      arguments: [
        'http://mapproxy.xwind-ai.com/wmts/bdortho_5m-aeroway/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          label: 'BD Ortho (5m) & Aeroway data',
          attribution: 'Imagery © <a href="http://ign.fr">IGN</a> & Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        }
      ]
    }
  ],
  overlayLayers: [
    {
      type: 'realtime',
      name: 'Vigicrues',
      arguments: [
        'https://s3.eu-central-1.amazonaws.com/krawler/vigicrue.json',
        {
          interval: 15 * 60 * 1000,
          id: 'properties.gid'
        }
      ]
    },
    {
      type: 'realtime',
      name: 'ADS-B',
      arguments: [
        'https://s3.eu-central-1.amazonaws.com/krawler/adsb.json',
        {
          interval: 5 * 1000,
          id: 'properties.icao'
        }
      ]
    }
  ]
}