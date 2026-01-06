// assets/natis.js
// Interactive NATIS centres map using Leaflet (OpenStreetMap tiles)
// Marker clicks immediately open Google Maps directions; 'Find Nearest' uses geolocation.
(function(){
  let centresList = null;
  let map = null;
  let markerLayer = null;

  function loadLeaflet(timeoutMs = 8000) {
    const deadline = Date.now() + timeoutMs;
    (function poll(){
      if (typeof L !== 'undefined') return initMap();
      if (Date.now() > deadline) {
        console.warn('Leaflet did not become available within timeout');
        return showLeafletError();
      }
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

    try {
      map = L.map(mapEl).setView([-22.5609, 17.0658], 6);
      const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);

      markerLayer = L.layerGroup().addTo(map);

      // If tiles fail to load (corporate networks/offline), show a textual fallback
      let fallbackShown = false;
      function escapeHtml(s){ return String(s||'').replace(/[&<>\"]+/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]||ch)); }
      function renderFallbackList(centres) {
        if (fallbackShown) return; fallbackShown = true;
        const existing = mapEl.querySelector('.natis-fallback-list'); if (existing) existing.remove();
        const wrap = document.createElement('div'); wrap.className = 'natis-fallback-list';
        let html = '<h3>List of NATIS Centres</h3><ul>';
        if (Array.isArray(centres) && centres.length) {
          centres.slice(0, 30).forEach(c => {
            const addr = c.address ? ' — ' + escapeHtml(c.address) : '';
            html += `<li><strong>${escapeHtml(c.name)}</strong>${addr} <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.lat + ',' + c.lng)}" target="_blank" rel="noopener">Directions</a></li>`;
          });
        } else {
          html += `<li>Unable to load the local list here. <a href="natis-licence.html">View the full list</a>.</li>`;
        }
        html += '</ul>';
        wrap.innerHTML = html; mapEl.appendChild(wrap);
      }
      function hideFallback() { const ex = mapEl.querySelector('.natis-fallback-list'); if (ex) ex.remove(); fallbackShown = false; }

      tileLayer.on('tileerror', () => { console.warn('NATIS map tile error detected — showing textual fallback'); if (centresList) renderFallbackList(centresList); else renderFallbackList(null); });
      tileLayer.on('load', () => { hideFallback(); });

      // Use absolute path so pages in subfolders can reliably fetch the dataset
      fetch('/assets/natis-centres.json').then(r => {
        if (!r.ok) throw new Error('Network response was not ok: ' + r.status);
        return r.json();
      }).then(centres => {
        if (!Array.isArray(centres) || centres.length === 0) throw new Error('No centres');
        centresList = centres.map(c => ({...c, coords: [c.lat, c.lng]}));

        const bounds = [];
        centresList.forEach(c => {
          const marker = L.marker(c.coords, {title: c.name});

          // Popup content with services list and accessible directions link
          const popupHtml = `\n            <div class="natis-popup" role="group" aria-labelledby="natis-${escapeHtml(c.id || c.name)}">\n              <h4 id="natis-${escapeHtml(c.id || c.name)}">${escapeHtml(c.name)}</h4>\n              <p>Access Roads Authority services at our nationwide Namibia Traffic Information System centres.</p>\n              <ul class="natis-popup-services">\n                <li>Permit Applications</li>\n                <li>Vehicle Registration</li>\n                <li>Driver's Licenses</li>\n                <li>Road Information</li>\n                <li>Public Inquiries</li>\n                <li>Document Services</li>\n              </ul>\n              <p><a class="natis-directions" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(c.lat + ',' + c.lng)}" target="_blank" rel="noopener">Directions</a></p>\n            </div>`;

          marker.bindPopup(popupHtml, {minWidth: 220});

          // When marker is clicked, open popup (default) and focus it for keyboard users
          marker.on('click', () => {
            marker.openPopup();
            // Focus popup content after it opens
            setTimeout(() => {
              const pop = document.querySelector('.leaflet-popup-content .natis-popup');
              if (pop) { pop.setAttribute('tabindex', '-1'); pop.focus(); }
            }, 40);
          });

          marker.addTo(markerLayer);
          bounds.push(c.coords);
        });

        if (bounds.length) {
          map.fitBounds(bounds, {padding:[60,60]});
          // ensure map shows and corrects to layout
          setTimeout(() => map.invalidateSize(), 200);
          setTimeout(() => map.invalidateSize(), 1000);
        }

        // remove loading if remains when the map is ready
        map.whenReady(() => {
          const loading = mapEl.querySelector('.map-loading'); if (loading) loading.remove();
          // final size correction after tiles load
          setTimeout(() => map.invalidateSize(), 300);
        });

      }).catch(e => {
        console.error('Failed to load NATIS centres', e);
        mapEl.innerHTML = '<div class="map-error"><strong>Could not load NATIS centres.</strong> <a href="natis-licence.html">View full list</a>.</div>';
      });

    } catch (err) {
      console.error('Leaflet map initialization failed', err);
      mapEl.innerHTML = '<div class="map-error"><strong>Map failed to initialize.</strong> Please try again later.</div>';
    }

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

  // Initialize when DOM ready (allow extra time for Leaflet to load on slower connections)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => loadLeaflet(8000)); else loadLeaflet(8000);
})();