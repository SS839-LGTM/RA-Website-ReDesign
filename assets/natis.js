// assets/natis.js
// Interactive NATIS centres map using Leaflet (OpenStreetMap tiles)
// Marker clicks immediately open Google Maps directions; 'Find Nearest' uses geolocation.
(function(){
  let centresList = null;
  let map = null;
  let markerLayer = null;

  function loadLeaflet(timeoutMs = 3000) {
    const deadline = Date.now() + timeoutMs;
    (function poll(){
      if (typeof L !== 'undefined') return initMap();
      if (Date.now() > deadline) return showLeafletError();
      setTimeout(poll, 50);
    })();
  }

  function showLeafletError() {
    const mapEl = document.getElementById('natis-map');
    if (!mapEl) return;
    mapEl.innerHTML = '<div class="map-error"><strong>Map failed to load.</strong> You can view the full list of <a href="natis-licence.html">NATIS centres</a>.</div>';
  }

  function haversineDistance(a, b) {
    const toRad = v => v * Math.PI / 180;
    const R = 6371; // km
    const dLat = toRad(b[0]-a[0]);
    const dLon = toRad(b[1]-a[1]);
    const lat1 = toRad(a[0]);
    const lat2 = toRad(b[0]);
    const sinDlat = Math.sin(dLat/2);
    const sinDlon = Math.sin(dLon/2);
    const aa = sinDlat*sinDlat + sinDlon*sinDlon * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1-aa));
    return R * c; // km
  }

  function renderLoading() {
    const mapEl = document.getElementById('natis-map');
    if (!mapEl) return;
    mapEl.innerHTML = '<div class="map-loading">Loading map…</div>';
  }

  function initMap(){
    const mapEl = document.getElementById('natis-map');
    if (!mapEl) return;

    // show loading while we fetch
    renderLoading();

    map = L.map(mapEl).setView([-22.5609, 17.0658], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(map);

    markerLayer = L.layerGroup().addTo(map);

    fetch('assets/natis-centres.json').then(r => r.json()).then(centres => {
      if (!Array.isArray(centres) || centres.length === 0) throw new Error('No centres');
      centresList = centres.map(c => ({...c, coords: [c.lat, c.lng]}));

      const bounds = [];
      centresList.forEach(c => {
        const marker = L.marker(c.coords, {title: c.name});
        marker.on('click', () => {
          const gmapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(c.lat + ',' + c.lng)}`;
          window.open(gmapsUrl, '_blank', 'noopener');
        });
        marker.addTo(markerLayer);
        bounds.push(c.coords);
      });

      if (bounds.length) map.fitBounds(bounds, {padding:[60,60]});
      // ensure map shows
      setTimeout(() => map.invalidateSize(), 200);
      // remove loading if remains
      const loading = mapEl.querySelector('.map-loading'); if (loading) loading.remove();
    }).catch(e => {
      console.error('Failed to load NATIS centres', e);
      mapEl.innerHTML = '<div class="map-error"><strong>Could not load NATIS centres.</strong> <a href="natis-licence.html">View full list</a>.</div>';
    });

    // Attach Find Nearest handler even if centres not yet loaded
    attachFindNearestHandler();
  }

  function attachFindNearestHandler(){
    const findBtn = document.getElementById('findNatisBtn');
    if (!findBtn) return;
    if (findBtn._natis_attached) return; // idempotent
    findBtn._natis_attached = true;

    findBtn.addEventListener('click', () => {
      // require secure context for geolocation unless on localhost
      if (window.location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
        alert('Location services require a secure connection (HTTPS). Please access this site over HTTPS or use localhost for testing.');
        return;
      }

      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser.');
        return;
      }

      if (!centresList) {
        alert('Centre data is still loading. Please wait a moment and try again.');
        return;
      }

      findBtn.disabled = true; findBtn.textContent = 'Locating...';

      navigator.geolocation.getCurrentPosition(pos => {
        const userCoords = [pos.coords.latitude, pos.coords.longitude];
        let best = null; let bestDist = Infinity;
        centresList.forEach(c => {
          const d = haversineDistance(userCoords, c.coords);
          if (d < bestDist) { bestDist = d; best = c; }
        });

        if (!best) { alert('No NATIS centres available.'); findBtn.disabled = false; findBtn.textContent = 'Find Nearest NATIS'; return; }

        const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(userCoords.join(','))}&destination=${encodeURIComponent(best.lat + ',' + best.lng)}`;
        window.open(directionsUrl, '_blank', 'noopener');
        findBtn.disabled = false; findBtn.textContent = 'Find Nearest NATIS';
      }, err => {
        console.warn('Geolocation error', err);
        alert('Unable to access your location. Please allow location access or search for a centre manually.');
        findBtn.disabled = false; findBtn.textContent = 'Find Nearest NATIS';
      }, { enableHighAccuracy: true, timeout: 12000 });
    });
  }

  // Initialize when DOM ready
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => loadLeaflet(4000)); else loadLeaflet(4000);
})();