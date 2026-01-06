// Main JavaScript for Roads Authority Website

document.addEventListener('DOMContentLoaded', function() {
    // Canonical navbar markup injected for consistency across pages
    (function ensureCanonicalNav(){
        const canonical = `
        <div class="nav-container calmer">
          <a href="/index.html" class="logo">
            <img src="/assets/logo.png" alt="RA Logo" id="logo-img">
            <span class="logo-text">Roads Authority<br><small>of Namibia</small></span>
          </a>
          <div class="nav-controls">
            <button class="menu-toggle" aria-label="Toggle navigation" aria-expanded="false"><span class="hamburger"></span></button>
          </div>
          <ul class="nav-menu">
            <li><a href="/index.html#home" class="nav-link" data-transition="a">Home</a></li>
            <li class="nav-item nav-dropdown">
              <button class="nav-link nav-dropdown-toggle" aria-expanded="false" aria-haspopup="true" aria-controls="about-menu">About RA <span class="caret">▾</span></button>
              <ul class="dropdown-menu" id="about-menu" role="menu" aria-label="About RA menu">
                <li role="none"><a role="menuitem" href="/background.html" class="nav-link">Background</a></li>
                <li role="none"><a role="menuitem" href="/corporate.html" class="nav-link">Corporate</a></li>
                <li role="none"><a role="menuitem" href="/board.html" class="nav-link">Board</a></li>
                <li role="none"><a role="menuitem" href="/committee.html" class="nav-link">Executive Committee</a></li>
                <li role="none"><a role="menuitem" href="/strategy.html" class="nav-link">Strategy</a></li>
              </ul>
            </li>
            <li class="nav-item nav-dropdown">
              <button class="nav-link nav-dropdown-toggle" aria-expanded="false" aria-haspopup="true" aria-controls="procurement-menu">Procurement <span class="caret">▾</span></button>
              <ul class="dropdown-menu" id="procurement-menu" role="menu" aria-label="Procurement menu">
                <li role="none"><a role="menuitem" href="legislation.html" class="nav-link">Legislation</a></li>
                <li role="none"><a role="menuitem" href="procurement-plan.html" class="nav-link">Procurement Plan</a></li>
                <li role="none"><a role="menuitem" href="open-bids.html" class="nav-link">Open Bids</a></li>
                <li role="none"><a role="menuitem" href="register.html" class="nav-link">Opening Register</a></li>
                <li role="none"><a role="menuitem" href="awards.html" class="nav-link">Awards</a></li>
              </ul>
            </li>
            <li class="nav-item nav-dropdown">
              <button class="nav-link nav-dropdown-toggle" aria-expanded="false" aria-haspopup="true" aria-controls="natis-menu">NatisServices <span class="caret">▾</span></button>
              <ul class="dropdown-menu" id="natis-menu" role="menu" aria-label="NaTIS Services menu">
                <li role="none"><a role="menuitem" href="personalized.html" class="nav-link">Personalized</a></li>
                <li role="none"><a role="menuitem" href="natisonline.html" class="nav-link" target="_blank" rel="noopener">NaTIS Online</a></li>
                <li role="none"><a role="menuitem" href="registration.html" class="nav-link">Registration</a></li>
                <li role="none"><a role="menuitem" href="natis-licence.html" class="nav-link">NaTIS Licence</a></li>
              </ul>
            </li>
            <li class="nav-item nav-dropdown">
              <button class="nav-link nav-dropdown-toggle" aria-expanded="false" aria-haspopup="true" aria-controls="publications-menu">Publications <span class="caret">▾</span></button>
              <ul class="dropdown-menu" id="publications-menu" role="menu" aria-label="Publications menu">
                <li role="none"><a role="menuitem" href="news.html" class="nav-link">News</a></li>
                <li role="none"><a role="menuitem" href="newsletters.html" class="nav-link">Newsletters</a></li>
                <li role="none"><a role="menuitem" href="annual-reports.html" class="nav-link">Annual Reports</a></li>
                <li role="none"><a role="menuitem" href="speeches.html" class="nav-link">Speeches</a></li>
              </ul>
            </li>
            <li class="nav-item nav-dropdown">
              <button class="nav-link nav-dropdown-toggle" aria-expanded="false" aria-haspopup="true" aria-controls="roadservices-menu">Road Services <span class="caret">▾</span></button>
              <ul class="dropdown-menu" id="roadservices-menu" role="menu" aria-label="Road Services menu">
                <li role="none"><a role="menuitem" href="networks.html" class="nav-link">Road Networks</a></li>
                <li role="none"><a role="menuitem" href="weighbridge.html" class="nav-link">Weighbridge</a></li>
                <li role="none"><a role="menuitem" href="permits.html" class="nav-link">Permits</a></li>
              </ul>
            </li>
            <li class="nav-item nav-dropdown">
              <button class="nav-link nav-dropdown-toggle" aria-expanded="false" aria-haspopup="true" aria-controls="careers-menu">Careers <span class="caret">▾</span></button>
              <ul class="dropdown-menu" id="careers-menu" role="menu" aria-label="Careers menu">
                <li role="none"><a role="menuitem" href="vacancies.html" class="nav-link">Vacancies</a></li>
                <li role="none"><a role="menuitem" href="bursaries.html" class="nav-link">Bursaries</a></li>
                <li role="none"><a role="menuitem" href="internship.html" class="nav-link">Internships</a></li>
              </ul>
            </li>
            <li><a href="contact.html" class="nav-link" data-transition="a">Contact</a></li>
            <li><button class="search-toggle nav-link" aria-label="Open site search"><i class="fas fa-search"></i></button></li>
          </ul>
        </div>
        `.trim();
        document.querySelectorAll('.navbar').forEach(nav=>{
           if (nav.innerHTML.trim() !== canonical) nav.innerHTML = canonical;
        });
    })();

    // Ensure footer exists on all pages (inject if missing)
    (function ensureCanonicalFooter(){
        const html = `
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <div class="footer-logo">
                        <img src="/assets/logo.png" alt="RA Logo">
                        <h3>Roads Authority<br>of Namibia</h3>
                    </div>
                    <p class="footer-description">Constructing and maintaining Namibia's road sector for safety, efficiency, and economic development since our establishment.</p>
                    <div class="social-links">
                        <a href="https://www.facebook.com/" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f" aria-hidden="true"></i></a>
                        <a href="https://x.com/RANamibia" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer"><i class="fab fa-x" aria-hidden="true"></i></a>
                        <a href="https://www.youtube.com/" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube" aria-hidden="true"></i></a>
                        <a href="https://www.linkedin.com/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin-in" aria-hidden="true"></i></a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/index.html#home">Home</a></li>
                        <li><a href="/index.html#network">Road Network</a></li>
                        <li><a href="permits.html">Permits</a></li>
                        <li><a href="weighbridge.html">Weighbridge</a></li>
                        <li><a href="/index.html#natis">NATIS Centres</a></li>
                        <li><a href="news.html">News</a></li>
                        <li><a href="board.html">Board</a></li>
                        <li><a href="committee.html">Executive Committee</a></li>
                        <li><a href="strategy.html">Strategy</a></li>
                        <li><a href="background.html">Background</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Important Resources</h4>
                    <ul>
                        <li><a href="permits.html">Road Transportation Act</a></li>
                        <li><a href="permits.html">Permit Application Forms</a></li>
                        <li><a href="background.html">Road Safety Guidelines</a></li>
                        <li><a href="news.html">Annual Reports</a></li>
                        <li><a href="news.html">Tender Notices</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Emergency Contacts</h4>
                    <ul>
                        <li><strong>Road Emergencies:</strong> 0800 300 100</li>
                        <li><strong>Fraud Hotline:</strong> 0800 309 231</li>
                        <li><strong>Traffic Police:</strong> 10111</li>
                        <li><strong>Ambulance:</strong> 203 2276</li>
                    </ul>
                    <div class="newsletter">
                        <p>Subscribe for road alerts & updates</p>
                        <form class="newsletter-form" aria-label="Subscribe to newsletter">
                            <label for="newsletterEmail" class="visually-hidden">Email address</label>
                            <div class="newsletter-inner">
                                <input id="newsletterEmail" type="email" placeholder="Email address" required aria-required="true">
                                <button type="submit" aria-label="Subscribe"><i class="fas fa-paper-plane"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Roads Authority of Namibia. All rights reserved. | <a href="privacy.html">Privacy Policy</a> | <a href="accessibility.html">Accessibility</a> | <a href="terms.html">Terms of Use</a></p>
                <p class="affiliation">A Government Agency under the Ministry of Works and Transport</p>
                <div class="footer-controls">
                    <button class="theme-toggle" aria-label="Toggle theme" title="Toggle theme"><i class="fa-solid fa-moon" aria-hidden="true"></i> <span class="theme-text">Light</span></button>
                </div>
            </div>
        </div>
        `.trim();
        // Replace any existing footer(s) with canonical content for consistency
        document.querySelectorAll('.footer').forEach(f => { f.innerHTML = html; });
        // If no footer exists, append one to the end of the body
        if (!document.querySelector('.footer')) {
            const footer = document.createElement('footer');
            footer.className = 'footer';
            footer.innerHTML = html;
            document.body.appendChild(footer);
        }
    })();

    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle aria-expanded attribute for accessibility (use string values)
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        });
    }

    // Theme toggle (light / dark)
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('ra_theme', theme);
        if (themeToggle) {
            // Display an icon and a short label to make the toggle's state clear
            if (theme === 'dark') {
                themeToggle.innerHTML = '<i class="fa-solid fa-sun" aria-hidden="true"></i> <span class="theme-text">Dark</span>';
                themeToggle.setAttribute('aria-pressed', 'true');
            } else {
                themeToggle.innerHTML = '<i class="fa-solid fa-moon" aria-hidden="true"></i> <span class="theme-text">Light</span>';
                themeToggle.setAttribute('aria-pressed', 'false');
            }
        }
    }

    // Initialize theme from preference or system
    const savedTheme = localStorage.getItem('ra_theme');
    if (savedTheme) applyTheme(savedTheme); else applyTheme(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });
    }
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle) menuToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Keep nav state consistent across resizes (e.g., mobile -> desktop)
    function syncNavOnResize() {
        if (!navMenu || !menuToggle) return;
        // On desktop sizes ensure the mobile overlay is closed
        if (window.innerWidth >= 768) {
            if (menuToggle.classList.contains('active') || navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
            }
        }
    }

    // Run once to initialise and on each resize
    window.addEventListener('resize', syncNavOnResize);
    syncNavOnResize();

    // Procurement dropdown accessibility and interaction
    const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
    function closeAllDropdowns() {
        document.querySelectorAll('.nav-item.open').forEach(item => {
            item.classList.remove('open');
            const btn = item.querySelector('.nav-dropdown-toggle');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });
    }

    dropdownToggles.forEach(btn => {
        const parent = btn.closest('.nav-item');
        btn.addEventListener('click', (e) => {
            const currentlyOpen = parent.classList.contains('open');
            // Close all other dropdowns first so only one can be open
            closeAllDropdowns();
            if (!currentlyOpen) {
                parent.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            } else {
                parent.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
            }
        });

        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            } else if (e.key === 'Escape') {
                parent.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
                btn.focus();
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-item.nav-dropdown')) {
            closeAllDropdowns();
        }
    });

    // Close dropdowns on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllDropdowns();
    });

    // Search overlay: create on demand and search current page links
    function createSearchOverlay() {
        if (document.querySelector('.search-overlay')) return;
        const overlay = document.createElement('div');
        overlay.className = 'search-overlay';
        overlay.innerHTML = `
            <div class="search-panel" role="dialog" aria-modal="true" aria-hidden="true">
                <button class="search-close" aria-label="Close search">&times;</button>
                <input class="search-input" type="search" placeholder="Search site (e.g., newsletters, reports, speeches)..." aria-label="Search the site">
                <ul class="search-results" role="listbox" aria-label="Search results"></ul>
            </div>
        `.trim();
        document.body.appendChild(overlay);

        const input = overlay.querySelector('.search-input');
        const results = overlay.querySelector('.search-results');
        const closeBtn = overlay.querySelector('.search-close');

        // Try to load a prebuilt search index (site-wide) for better results
        let siteIndex = [];
        fetch('assets/search-index.json').then(r => {
            if (r.ok) return r.json();
        }).then(data => { if (Array.isArray(data)) siteIndex = data; }).catch(() => { /* ignore */ });

        // keyboard navigation state for overlay search
        let overlayLastFinal = [];
        let overlaySelectedIndex = -1;

        function updateOverlaySelection() {
            const items = Array.from(results.querySelectorAll('li'));
            items.forEach((li, i) => {
                li.classList.toggle('selected', i === overlaySelectedIndex);
                const a = li.querySelector('a');
                if (a) {
                    a.setAttribute('aria-selected', i === overlaySelectedIndex ? 'true' : 'false');
                    a.setAttribute('tabindex', i === overlaySelectedIndex ? '0' : '-1');
                }
            });
            // ensure visible
            const sel = items[overlaySelectedIndex]; if (sel) sel.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }

        function close() { overlay.classList.remove('open'); overlay.setAttribute('aria-hidden', 'true'); input.value = ''; results.innerHTML = ''; overlayLastFinal = []; overlaySelectedIndex = -1; // allow transition to finish before hiding
            setTimeout(()=>{ overlay.style.display = 'none'; }, 220);
        }
        function open() { overlay.style.display = 'flex'; overlay.classList.add('open'); overlay.setAttribute('aria-hidden', 'false'); // focus after paint to ensure keyboard opens on mobile
            setTimeout(()=>{ input.focus(); input.select(); }, 50);
        }

        closeBtn.addEventListener('click', close);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

        function scoreTextMatch(text, q) {
            text = (text || '').toLowerCase();
            const words = q.split(/\s+/).filter(Boolean);
            if (!words.length) return 0;
            let hits = 0;
            words.forEach(w => { if (text.includes(w)) hits++; });
            return hits / words.length;
        }

        input.addEventListener('input', (e) => {
            const q = e.target.value.trim().toLowerCase();
            if (!q) { results.innerHTML = ''; overlayLastFinal = []; overlaySelectedIndex = -1; return; }

            const seen = new Set();
            const candidates = [];

            // 1) Results from site index (titles + snippets)
            siteIndex.forEach(item => {
                const score = Math.max(scoreTextMatch(item.title, q), scoreTextMatch(item.snippet, q));
                if (score > 0) candidates.push({ href: item.url, title: item.title, snippet: item.snippet, score });
            });

            // 2) Local anchors and link text (current page links)
            Array.from(document.querySelectorAll('a'))
                .map(a => ({ text: a.textContent.trim(), href: a.href, title: a.title || '', aria: a.getAttribute('aria-label') || '' }))
                .filter(a => a.href && !a.href.startsWith('mailto:'))
                .forEach(a => {
                    const key = a.href + '||' + a.text;
                    if (seen.has(key)) return; seen.add(key);
                    const combined = (a.text + ' ' + (a.title || '') + ' ' + (a.aria || '')).toLowerCase();
                    const score = scoreTextMatch(combined, q) || scoreTextMatch(a.href, q);
                    if (score > 0) candidates.push({ href: a.href, title: a.text || a.href, snippet: a.title || '', score });
                });

            // 3) Search snippets from local page content (headings and paragraphs)
            Array.from(document.querySelectorAll('h1,h2,h3,h4,p,li')).forEach(el => {
                const text = el.textContent.trim();
                if (!text) return;
                const score = scoreTextMatch(text, q);
                if (score > 0) {
                    // if inside a link, point to that link; otherwise to page
                    const anchor = el.closest('a') ? el.closest('a').href : window.location.href;
                    const snippet = text.length > 120 ? text.slice(0, 117) + '...' : text;
                    candidates.push({ href: anchor, title: snippet.split('\n')[0], snippet, score: score * 0.8 });
                }
            });

            // Sort by score and remove duplicates by href keeping best score
            candidates.sort((a,b) => b.score - a.score);
            const final = [];
            const seenHref = new Set();
            for (const c of candidates) {
                const simpleHref = c.href.replace(location.origin, '');
                if (seenHref.has(simpleHref)) continue;
                seenHref.add(simpleHref);
                final.push(c);
                if (final.length >= 20) break;
            }

            console.log('[search-overlay] q=', q, 'siteIndex=', siteIndex.length, 'candidates=', candidates.length, 'final=', final.length, final.slice(0,3).map(c=>({title:c.title,score:c.score}))); 

            overlayLastFinal = final;
            if (final.length === 0) {
                results.innerHTML = '<li class="no-results">No results found</li>';
                overlaySelectedIndex = -1;
                const nr = results.querySelector('.no-results'); if (nr) nr.style.opacity='1';
            } else {
                results.innerHTML = final.map(m => `\n                <li><a href="${m.href}"><div class="result-title">${m.title}</div><div class="result-snippet">${m.snippet ? m.snippet : '<span class="result-path">'+m.href.replace(location.origin,'')+'</span>'}</div></a></li>\n            `).join('');
                // set default selected item (first result)
                overlaySelectedIndex = 0;
                results.querySelectorAll('li').forEach(li => li.setAttribute('role','option'));
                updateOverlaySelection();

                // animate overlay results with a small stagger
                Array.from(results.querySelectorAll('li')).forEach((li, i) => {
                    // Add animate-result to trigger enter animation; do not remove it afterwards
                    // (removing it caused results to revert to opacity:0 after the animation finished)
                    li.classList.remove('animate-result');
                    li.style.animationDelay = `${i * 35}ms`;
                    void li.offsetWidth;
                    li.classList.add('animate-result');
                });
                // Close overlay on result click to provide a smooth navigation
                results.querySelectorAll('.result-path').forEach(el => el.remove());
                results.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=> close()));
                // allow mouse hover to change selection
                Array.from(results.querySelectorAll('li')).forEach((li, i)=> li.addEventListener('mouseover', ()=>{ overlaySelectedIndex = i; updateOverlaySelection(); }));
            }
        });

        // keyboard navigation for overlay
        input.addEventListener('keydown', (e)=>{
            if (e.key === 'ArrowDown'){
                e.preventDefault(); if (overlayLastFinal.length === 0) return; overlaySelectedIndex = Math.min(overlaySelectedIndex + 1, overlayLastFinal.length - 1); updateOverlaySelection();
            } else if (e.key === 'ArrowUp'){
                e.preventDefault(); if (overlayLastFinal.length === 0) return; overlaySelectedIndex = Math.max(overlaySelectedIndex - 1, 0); updateOverlaySelection();
            } else if (e.key === 'Enter'){
                e.preventDefault(); if (overlaySelectedIndex >= 0 && overlayLastFinal[overlaySelectedIndex]){ window.location.href = overlayLastFinal[overlaySelectedIndex].href; close(); }
            }
        });

        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { close(); } });

        // expose open for external use
        overlay.open = open;

        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { close(); } });

        // expose open for external use
        overlay.open = open;
    }

    // Create an inline search panel attached to the navbar (desktop)
    function createNavSearch() {
        if (document.querySelector('.nav-search')) return;
        const navContainer = document.querySelector('.nav-container');
        if (!navContainer) return;
        const searchToggle = document.querySelector('.search-toggle');
        const insertAnchor = searchToggle ? searchToggle.parentElement : navContainer;
        const container = document.createElement('div');
        container.className = 'nav-search';
        container.innerHTML = `
            <div class="search-panel-inline" role="dialog" aria-hidden="true">
                <input class="search-input-inline" type="search" placeholder="Search site..." aria-label="Search the site">
                <ul class="search-results-inline" role="listbox" aria-label="Search results"></ul>
            </div>
        `;
        // Insert the inline search directly after the search toggle for contextual placement
        if (insertAnchor && insertAnchor.insertAdjacentElement) {
            insertAnchor.insertAdjacentElement('afterend', container);
        } else {
            navContainer.appendChild(container);
        }

        const input = container.querySelector('.search-input-inline');
        const results = container.querySelector('.search-results-inline');

        // local copy of siteIndex for inline search
        let siteIndex = [];
        fetch('assets/search-index.json').then(r => r.ok ? r.json() : []).then(d=>{ if (Array.isArray(d)) siteIndex = d; }).catch(()=>{});

        // keyboard navigation state for inline search
        let inlineLastFinal = [];
        let inlineSelectedIndex = -1;

        function updateInlineSelection(){
            const items = Array.from(results.querySelectorAll('li'));
            items.forEach((li,i)=>{
                li.classList.toggle('selected', i === inlineSelectedIndex);
                const a = li.querySelector('a'); if (a) { a.setAttribute('aria-selected', i === inlineSelectedIndex ? 'true' : 'false'); a.setAttribute('tabindex', i === inlineSelectedIndex ? '0' : '-1'); }
            });
            const sel = items[inlineSelectedIndex]; if (sel) sel.scrollIntoView({ block: 'nearest' });
        }

        function scoreTextMatch(text, q) {
            text = (text || '').toLowerCase();
            const words = q.split(/\s+/).filter(Boolean);
            if (!words.length) return 0;
            let hits = 0;
            words.forEach(w => { if (text.includes(w)) hits++; });
            return hits / words.length;
        }

        input.addEventListener('input', (e)=>{
            const q = e.target.value.trim().toLowerCase();
            if (!q) { results.innerHTML = ''; inlineLastFinal = []; inlineSelectedIndex = -1; return; }
            const candidates = [];
            siteIndex.forEach(item => {
                const score = Math.max(scoreTextMatch(item.title,q), scoreTextMatch(item.snippet,q));
                if (score>0) candidates.push({href:item.url,title:item.title,snippet:item.snippet,score});
            });
            Array.from(document.querySelectorAll('a'))
                .map(a => ({ text: a.textContent.trim(), href: a.href, title: a.title || '' }))
                .filter(a => a.href && !a.href.startsWith('mailto:'))
                .forEach(a => {
                    const combined = (a.text + ' ' + (a.title || '')).toLowerCase();
                    const score = scoreTextMatch(combined, q) || scoreTextMatch(a.href, q);
                    if (score > 0) candidates.push({href: a.href, title: a.text || a.href, snippet: a.title || '', score});
                });

            candidates.sort((a,b)=>b.score - a.score);
            const final = [];
            const seenHref = new Set();
            for (const c of candidates) {
                const simpleHref = c.href.replace(location.origin, '');
                if (seenHref.has(simpleHref)) continue;
                seenHref.add(simpleHref);
                final.push(c);
                if (final.length>=10) break;
            }

            inlineLastFinal = final;
            console.log('[search-inline] q=', q, 'siteIndex=', siteIndex.length, 'candidates=', candidates.length, 'final=', final.length, final.slice(0,3).map(c=>({title:c.title,score:c.score}))); 

            if (final.length === 0) {
                results.innerHTML = '<li class="no-results">No results found</li>';
                inlineSelectedIndex = -1;
                const nr = results.querySelector('.no-results'); if (nr) nr.style.opacity='1';
            } else {
                results.innerHTML = final.map(m => `\n                <li><a href="${m.href}"><div class="result-title">${m.title}</div><div class="result-snippet">${m.snippet ? m.snippet : '<span class="result-path">'+m.href.replace(location.origin,'')+'</span>'}</div></a></li>\n            `).join('');
                // set default selected item (first result)
                inlineSelectedIndex = 0;
                results.querySelectorAll('li').forEach(li => li.setAttribute('role','option'));
                updateInlineSelection();
                // animate inline results with a small stagger
                Array.from(results.querySelectorAll('li')).forEach((li, i) => {
                    // Add animate-result to trigger enter animation; do not remove it afterwards
                    // (removing it caused results to revert to opacity:0 after the animation finished)
                    li.classList.remove('animate-result');
                    li.style.animationDelay = `${i * 30}ms`;
                    void li.offsetWidth;
                    li.classList.add('animate-result');
                });
                results.querySelectorAll('.result-path').forEach(el => el.remove());
                results.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=> { container.querySelector('.search-panel-inline').classList.remove('open'); }));
                // hover to change selection
                Array.from(results.querySelectorAll('li')).forEach((li,i)=> li.addEventListener('mouseover', ()=>{ inlineSelectedIndex = i; updateInlineSelection(); }));
            }
        });

        // keyboard navigation for inline search
        input.addEventListener('keydown', (e)=>{
            if (e.key === 'ArrowDown'){
                e.preventDefault(); if (inlineLastFinal.length === 0) return; inlineSelectedIndex = Math.min(inlineSelectedIndex + 1, inlineLastFinal.length - 1); updateInlineSelection();
            } else if (e.key === 'ArrowUp'){
                e.preventDefault(); if (inlineLastFinal.length === 0) return; inlineSelectedIndex = Math.max(inlineSelectedIndex - 1, 0); updateInlineSelection();
            } else if (e.key === 'Enter'){
                e.preventDefault(); if (inlineSelectedIndex >= 0 && inlineLastFinal[inlineSelectedIndex]){ window.location.href = inlineLastFinal[inlineSelectedIndex].href; container.querySelector('.search-panel-inline').classList.remove('open'); }
            }
        });

        // close on outside click
        document.addEventListener('click', (e)=>{
            if (!e.target.closest('.nav-search') && !e.target.closest('.search-toggle')) {
                const panel = document.querySelector('.nav-search .search-panel-inline');
                if (panel) panel.classList.remove('open');
            }
        });
    }

    document.querySelectorAll('.search-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Prefer inline nav search on desktop-sized screens
            if (window.innerWidth >= 720 && document.querySelector('.nav-container')) {
                createNavSearch();
                const panel = document.querySelector('.nav-search .search-panel-inline');
                const input = document.querySelector('.nav-search .search-input-inline');
                panel.classList.toggle('open');
                if (panel.classList.contains('open')) setTimeout(()=> input.focus(), 50);
            } else {
                createSearchOverlay();
                document.querySelector('.search-overlay').open();
            }
        });
    });

    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Initial check

    // Navbar styling: using core `.navbar` class (futuristic skin removed).
    /* Page slide transitions (type A = Home/Contact/Privacy/Terms/Accessibility, type B = tab pages) */
    const TRANSITION_DURATION = 260; // ms

    function setPageTransitionClass(type, mode='out') {
        document.documentElement.classList.remove('transition-a-out','transition-a-in','transition-b-out','transition-b-in');
        if (type === 'a') document.documentElement.classList.add(`transition-a-${mode}`);
        else if (type === 'b') document.documentElement.classList.add(`transition-b-${mode}`);
    }

    // Hijack same-origin link clicks to play a short exit animation before navigating
    document.addEventListener('click', (e) => {
        const a = e.target.closest('a');
        if (!a || !a.href) return;
        if (a.target === '_blank' || a.href.startsWith('mailto:') || a.href.indexOf(location.origin) !== 0) return;
        const href = a.getAttribute('href');
        if (!href) return;
        // Avoid triggering on in-page anchors
        if (href.startsWith('#') || href.includes(location.pathname + '#')) return;
        // determine transition type: explicit data attribute wins, otherwise heuristics
        const type = a.dataset.transition || (/index\.html|\/$|contact\.html|privacy\.html|terms\.html|accessibility\.html/).test(href) ? 'a' : 'b';
        // Only animate when navigating to an HTML page on the same origin
        if (!/\.html$|\/$/.test(href) && !href.endsWith('/') ) return; // skip non-html targets
        e.preventDefault();
        setPageTransitionClass(type, 'out');
        setTimeout(()=> { location.href = a.href; }, TRANSITION_DURATION);
    });

    // Play enter animation on load that matches the current page
    (function playEnterOnLoad(){
        const path = location.pathname.split('/').pop();
        const type = (/^$|^index\.html$|contact\.html|privacy\.html|terms\.html|accessibility\.html/).test(path) ? 'a' : 'b';
        // Start by setting the out state briefly then switch to in to trigger
        setPageTransitionClass(type, 'out');
        requestAnimationFrame(()=> setTimeout(()=> setPageTransitionClass(type, 'in'), 20));
        setTimeout(()=> {
            document.documentElement.classList.remove('transition-a-in','transition-b-in');
        }, TRANSITION_DURATION + 80);
    })();

    // Transition preview removed (development helper)

    // Ensure there is a top-level .page-content node to target for the animation
    (function ensurePageContent() {
        const content = document.querySelector('main') || document.querySelector('.container');
        if (content && !content.classList.contains('page-content')) content.classList.add('page-content');
    })();

    // Animated counter for statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 20);
    }
    
    function checkCounterVisibility() {
        statNumbers.forEach(stat => {
            const position = stat.getBoundingClientRect();
            if (position.top < window.innerHeight - 100 && position.bottom >= 0) {
                const target = parseInt(stat.getAttribute('data-count'));
                if (!stat.classList.contains('animated')) {
                    animateCounter(stat, target);
                    stat.classList.add('animated');
                }
            }
        });
    }
    
    window.addEventListener('scroll', checkCounterVisibility);
    checkCounterVisibility(); // Initial check
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or a non-page anchor
            if (href === '#' || href.startsWith('#contactForm')) return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                // For accessibility: focus the section heading after scrolling
                try {
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus({ preventScroll: true });
                } catch(e){}
            }
        });
    });
    
    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    // Ensure top-level page link is active (based on filename) and reapply after scrolling
    function markCurrentPage() {
        const path = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link=>{
            try {
                const href = new URL(link.href).pathname.split('/').pop() || '';
                if (href === path) link.classList.add('active');
            } catch(e){}
        });
    }
    // Run on load and reapply after scroll (so highlightNavLink doesn't wipe it out)
    markCurrentPage();
    // open parent dropdown for any active submenu item
    document.querySelectorAll('.nav-item.nav-dropdown').forEach(item=>{
        if (item.querySelector('.nav-link.active')) {
            item.classList.add('open');
            const btn = item.querySelector('.nav-dropdown-toggle');
            if (btn) btn.setAttribute('aria-expanded','true');
        }
    });
    window.addEventListener('scroll', markCurrentPage);
    
    // Road Issue Form Submission
    const roadIssueForm = document.getElementById('roadIssueForm');
    
    if (roadIssueForm) {
        // Image preview handling for selected files
        const imageInput = document.getElementById('reportImages');
        const imagePreview = document.getElementById('imagePreview');
        if (imageInput && imagePreview) {
            imageInput.addEventListener('change', function() {
                imagePreview.innerHTML = '';
                const files = Array.from(this.files || []);
                const maxFiles = 5;
                if (files.length > maxFiles) {
                    const note = document.createElement('div');
                    note.style.color = '#b02a37';
                    note.textContent = `Only up to ${maxFiles} images allowed. Showing first ${maxFiles}.`;
                    imagePreview.appendChild(note);
                }
                files.slice(0, maxFiles).forEach(file => {
                    if (!file.type.startsWith('image/')) return;
                    const reader = new FileReader();
                    const wrap = document.createElement('div'); wrap.className = 'thumb';
                    reader.onload = function(ev) {
                        const img = document.createElement('img');
                        img.src = ev.target.result;
                        img.alt = file.name;
                        wrap.appendChild(img);
                    };
                    reader.readAsDataURL(file);
                    imagePreview.appendChild(wrap);
                });
            });
        }

        roadIssueForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const issueType = document.getElementById('issueType').value;
            const location = document.getElementById('location').value;
            const description = document.getElementById('description').value;
            const contactInfo = document.getElementById('contactInfo').value;
            const imagesEl = document.getElementById('reportImages');
            const files = imagesEl ? Array.from(imagesEl.files || []) : [];
            // client-side validation: limit files and size
            const MAX_FILES = 5; const MAX_SIZE = 5 * 1024 * 1024; // 5MB
            if (files.length > MAX_FILES) {
                alert(`Please select up to ${MAX_FILES} images.`);
                return;
            }
            for (const f of files) {
                if (f.size > MAX_SIZE) { alert(`File ${f.name} exceeds 5MB limit.`); return; }
            }
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Simulate form submission to RA system
            submitButton.textContent = 'Reporting Issue...';
            submitButton.disabled = true;
            
            // In a real implementation, this would send data to RA's backend
            setTimeout(() => {
                // Show success message
                submitButton.textContent = 'Issue Reported!';
                submitButton.style.backgroundColor = '#28a745';
                
                // Create confirmation message
                const confirmation = document.createElement('div');
                confirmation.className = 'form-confirmation';
                confirmation.innerHTML = `
                    <h4><i class="fas fa-check-circle"></i> Road Issue Reported Successfully</h4>
                    <p>Reference #RA${Math.floor(Math.random() * 10000)}. The Roads Authority will investigate the issue at: <strong>${location}</strong></p>
                    ${contactInfo ? `<p>Updates will be sent to: ${contactInfo}</p>` : ''}
                `;
                // Append list or preview of uploaded images
                if (files.length) {
                    const imagesContainer = document.createElement('div');
                    imagesContainer.style.marginTop = '0.8rem';
                    imagesContainer.innerHTML = `<strong>Attached images (${files.length}):</strong>`;
                    confirmation.appendChild(imagesContainer);
                    // show small previews by reading files
                    files.forEach(f => {
                        if (!f.type.startsWith('image/')) return;
                        const reader = new FileReader();
                        const wrap = document.createElement('div'); wrap.className = 'thumb'; wrap.style.width='96px'; wrap.style.height='72px'; wrap.style.marginRight='0.5rem'; wrap.style.display='inline-block';
                        reader.onload = function(ev) {
                            const img = document.createElement('img'); img.src = ev.target.result; img.alt = f.name; img.style.width='100%'; img.style.height='100%'; img.style.objectFit='cover';
                            wrap.appendChild(img);
                        };
                        reader.readAsDataURL(f);
                        imagesContainer.appendChild(wrap);
                    });
                }
                confirmation.style.cssText = `
                    background-color: #d4edda;
                    border: 1px solid #c3e6cb;
                    color: #155724;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                `;
                
                this.parentNode.insertBefore(confirmation, this.nextSibling);
                
                // Reset form after delay
                setTimeout(() => {
                    roadIssueForm.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.backgroundColor = '';
                    
                    // Remove confirmation after 5 seconds
                    setTimeout(() => {
                        if (confirmation.parentNode) {
                            confirmation.parentNode.removeChild(confirmation);
                        }
                    }, 5000);
                }, 3000);
            }, 1500);
        });
    }
    
    // Interactive map nodes (keyboard accessible)
    const mapNodes = document.querySelectorAll('.map-node');
    
    mapNodes.forEach(node => {
        const city = node.getAttribute('data-city') || 'Unknown location';
        node.setAttribute('tabindex','0');
        node.setAttribute('role','button');
        node.setAttribute('aria-label', `Road information for ${city}`);

        node.addEventListener('click', function() {
            alert(`Road information for ${city}: The Roads Authority maintains major highways connecting ${city} to other regions. Check the Road Network section for detailed maps and information.`);
        });

        node.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // NATIS location pins interaction (keyboard accessible)
    const locationPins = document.querySelectorAll('.location-pin');
    
    locationPins.forEach(pin => {
        const label = pin.querySelector('.pin-label') ? pin.querySelector('.pin-label').textContent : 'NATIS Centre';
        pin.setAttribute('tabindex','0');
        pin.setAttribute('role','button');
        pin.setAttribute('aria-label', `${label} NATIS Centre`);

        pin.addEventListener('click', function() {
            alert(`${label} NATIS Centre: Open weekdays 8:00 AM - 5:00 PM. Services: Permit applications, vehicle registration, driver's licenses, road information.`);
        });

        pin.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // News card click expansion
    const newsCards = document.querySelectorAll('.news-card');
    
    newsCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.news-link')) {
                this.classList.toggle('expanded');
            }
        });
    });
    
    // Newsletter subscription (now using a proper form with accessible label)
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = newsletterForm ? newsletterForm.querySelector('input[type="email"], #newsletterEmail') : null;
    const newsletterButton = newsletterForm ? newsletterForm.querySelector('button[type="submit"]') : null;
    
    if (newsletterForm && newsletterButton) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (newsletterInput && newsletterInput.value.trim() !== '' && newsletterInput.checkValidity()) {
                const originalHTML = newsletterButton.innerHTML;
                // Show loading state
                newsletterButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                newsletterButton.disabled = true;
                newsletterInput.disabled = true;

                // Simulate subscription
                setTimeout(() => {
                    newsletterButton.innerHTML = '<i class="fas fa-check"></i>';
                    newsletterButton.style.backgroundColor = '#28a745';

                    const confirmation = document.createElement('div');
                    confirmation.textContent = 'Subscribed to RA updates!';
                    confirmation.style.cssText = 'color: #155724; font-size: 0.875rem; margin-top: 0.5rem;';
                    newsletterForm.appendChild(confirmation);

                    setTimeout(() => {
                        newsletterButton.innerHTML = originalHTML;
                        newsletterButton.disabled = false;
                        newsletterButton.style.backgroundColor = '';
                        newsletterInput.disabled = false;
                        if (newsletterInput) newsletterInput.value = '';
                        if (confirmation.parentNode) confirmation.parentNode.removeChild(confirmation);
                    }, 3000);
                }, 1500);
            } else if (newsletterInput) {
                newsletterInput.style.border = '2px solid #dc3545';
                newsletterInput.focus();
                setTimeout(() => {
                    newsletterInput.style.border = '';
                }, 2000);
            }
        });
    }
    
    // Fraud hotline quick dial simulation
    const fraudHotlineElements = Array.from(document.querySelectorAll('.footer-col li strong')).filter(el => el.textContent && el.textContent.includes('0800 309 231'));
    
    fraudHotlineElements.forEach(element => {
        element.style.cursor = 'pointer';
        element.addEventListener('click', function() {
            alert('Calling RA Fraud Hotline: 0800 309 231\nThis is an anonymous service for reporting RA-related fraud and corruption.');
        });
    });
    
    // Emergency contact interaction
    const emergencyContacts = document.querySelectorAll('.footer-col li strong');
    
    emergencyContacts.forEach(contact => {
        if (contact.textContent.includes('0800') || contact.textContent.includes('10111')) {
            contact.style.cursor = 'pointer';
            contact.addEventListener('click', function() {
                const number = this.textContent.split(': ')[1];
                alert(`Emergency: ${this.parentNode.textContent}\n\nIn a real implementation, this would initiate a call to ${number}`);
            });
        }
    });
    
    // Interactive permit specifications
    const permitSpecs = document.querySelectorAll('.spec');
    
    permitSpecs.forEach(spec => {
        spec.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        });
        
        spec.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add current year to footer if needed
    const yearElements = document.querySelectorAll('.current-year');
    if (yearElements.length > 0) {
        yearElements.forEach(element => {
            element.textContent = new Date().getFullYear();
        });
    }
    
    // Initialize animations when elements come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.about-card, .permit-card, .news-card, .service, .feature');
    animateElements.forEach(el => observer.observe(el));
    
    // Add CSS for animate-in class
    const animateStyle = document.createElement('style');
    animateStyle.textContent = `
        .about-card, .permit-card, .news-card, .service, .feature {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .about-card.animate-in,
        .permit-card.animate-in,
        .news-card.animate-in,
        .service.animate-in,
        .feature.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .news-card.expanded {
            transform: scale(1.02);
            box-shadow: 0 1rem 3rem rgba(0,0,0,0.2);
        }
    `;
    document.head.appendChild(animateStyle);
    
    // Accordion for Permits page
    const accordionToggles = document.querySelectorAll('.accordion-toggle');
    accordionToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.accordion-item');
            const content = item.querySelector('.accordion-panel');
            if (!content) return;

            const opening = !item.classList.contains('open');
            item.classList.toggle('open');
            btn.setAttribute('aria-expanded', opening ? 'true' : 'false');

            if (opening) {
                // reveal: remove hidden (if present) then animate
                content.removeAttribute('hidden');
                // allow next frame to ensure transition
                requestAnimationFrame(() => {
                    content.style.maxHeight = content.scrollHeight + 'px';
                });
            } else {
                // hide: animate then set hidden after transition
                content.style.maxHeight = content.scrollHeight + 'px';
                requestAnimationFrame(() => {
                    content.style.maxHeight = null;
                });
                const onEnd = () => { content.setAttribute('hidden',''); content.removeEventListener('transitionend', onEnd); };
                content.addEventListener('transitionend', onEnd);
            }
        });

        // Allow Enter/Space to toggle
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });
    
    // Road condition simulation (for demo purposes)
    function simulateRoadUpdates() {
        const conditions = ['Clear', 'Minor Repairs', 'Construction', 'Detour', 'Closed'];
        const roads = ['B1 North', 'B2 West', 'C28', 'D1203', 'TR1/8'];
        
        setInterval(() => {
            // This would normally fetch from an API
            const randomRoad = roads[Math.floor(Math.random() * roads.length)];
            const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
            
            // In a real implementation, this would update a road status widget
            // console.log(`Road Update: ${randomRoad} - ${randomCondition}`);
        }, 30000); // Every 30 seconds
    }
    
    // Intro overlay for home page (plays once unless skipped)
    (function initIntroOverlay(){
        const path = window.location.pathname.split('/').pop();
        const isHome = path === '' || path === 'index.html' || path === 'index.htm';
        if (!isHome) return;
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const overlay = document.getElementById('intro-overlay');
            if (overlay) overlay.style.display = 'none';
            return;
        }
        const overlay = document.getElementById('intro-overlay');
        const video = document.getElementById('intro-video');
        const skipBtn = document.getElementById('skip-intro');
        if (!overlay || !video) return;
        const playedKey = 'ra_intro_played_v1';
        if (localStorage.getItem(playedKey)) { overlay.style.display = 'none'; return; }
        overlay.style.display = 'flex';
        overlay.setAttribute('aria-hidden','false');
        let revealed = false;
        function reveal() {
            if (revealed) return;
            revealed = true;
            overlay.classList.add('reveal');
            overlay.setAttribute('aria-hidden','true');
            setTimeout(()=>{ overlay.style.display = 'none'; localStorage.setItem(playedKey,'1'); }, 900);
        }
        skipBtn && skipBtn.addEventListener('click', reveal);
        video.addEventListener('ended', reveal);
        // fallback: reveal after 6s if video doesn't finish quickly
        const fallback = setTimeout(reveal, 6000);
        video.addEventListener('play', ()=> clearTimeout(fallback));
    })();

    // Start simulation
    simulateRoadUpdates();

    // Chat widget: simple FAQ-aware assistant
    function createChatWidget() {
        if (document.querySelector('.chat-toggle')) return;
        const CHAT_MATCH_THRESHOLD = 0.50; // tuned for better precision (configurable)
        // Toggle to show/hide FAQ suggestion buttons in the chat UI (false = hidden)
        const CHAT_SHOW_SUGGESTIONS = false;

        const btn = document.createElement('button');
        btn.className = 'chat-toggle';
        btn.setAttribute('aria-label','Open chat');
        btn.innerHTML = '<i class="fas fa-comment"></i>';
        document.body.appendChild(btn);

        const panel = document.createElement('div');
        panel.className = 'chat-panel';
        panel.innerHTML = `
            <div class="chat-header">
                <div>Ask RA</div>
                <button class="chat-close" aria-label="Close chat">&times;</button>
            </div>
            <div class="chat-messages" role="log" aria-live="polite"></div>
            <div class="chat-input">
                <input type="text" aria-label="Ask a question" placeholder="Ask about permits, NATIS, reports..." />
                <button class="chat-send">Ask</button>
            </div>
            <div class="chat-suggestions" role="list" aria-label="Suggested questions"></div>
        `;
        document.body.appendChild(panel);

        const messages = panel.querySelector('.chat-messages');
        const inputEl = panel.querySelector('input[type="text"]');
        const sendBtn = panel.querySelector('.chat-send');
        const closeBtn = panel.querySelector('.chat-close');

        let faqs = [];
        let faqSource = 'local'; // 'proxy' | 'live' | 'local'
        // Attempt to load live FAQs from the official site, falling back to local JSON
        async function loadFAQs(){
            // Prefer a local proxy if available (more reliable for live site scraping)
            try {
                // When running from file:// or a different host, allow a localhost proxy for development convenience
                const proxyUrl = (location.protocol === 'file:') ? 'http://localhost:5050/faqs' : '/proxy/faqs';
                const proxyResp = await fetch(proxyUrl);
                if (proxyResp && proxyResp.ok) {
                    const text = await proxyResp.text();
                    const parsed = parseFAQHtml(text);
                    if (parsed && parsed.length) {
                        faqs = parsed; faqSource = 'proxy';
                        populateSuggestions();
                        return;
                    }
                }
            } catch(e){ /* proxy not available */ }

            // try remote page directly (best-effort; may be blocked by CORS)
            try {
                const resp = await fetch('https://www.ra.org.na/faqs', { credentials: 'omit' });
                if (resp && resp.ok) {
                    const text = await resp.text();
                    const parsed = parseFAQHtml(text);
                    if (parsed && parsed.length) {
                        faqs = parsed; faqSource = 'live';
                        populateSuggestions();
                        return;
                    }
                }
            } catch (e) {
                // remote fetch failed (likely CORS)
                console.warn('Failed to fetch live FAQs directly (CORS or network):', e && e.message ? e.message : e);
            }

            // fallback local JSON (prefer the 500-entry bundle, then the smaller bundled file)
            try {
                let data = [];
                // Prefer the large local bundle if present
                try {
                    const prefer = await fetch('assets/faqs-500.json');
                    if (prefer && prefer.ok) data = await prefer.json();
                } catch(e) { /* prefer file missing or parse error */ }

                // If the preferred file is not available or empty, fall back to the original bundle
                if (!Array.isArray(data) || data.length === 0) {
                    try {
                        const local = await fetch('assets/faqs.json');
                        if (local && local.ok) data = await local.json();
                        faqSource = 'local';
                    } catch(e) { data = []; }
                } else {
                    faqSource = 'local-500';
                }

                if (Array.isArray(data)) faqs = data;
                window.__ra_faqs_loaded = Array.isArray(faqs) && faqs.length > 0;
                console.log('loadFAQs: source=', faqSource, 'count=', faqs.length);
            } catch(e) { faqs = []; window.__ra_faqs_loaded = false; console.warn('loadFAQs failed', e); }
            populateSuggestions();
        }

        // tolerant HTML parser for common FAQ structures
        function parseFAQHtml(htmlText){
            try {
                const doc = new DOMParser().parseFromString(htmlText, 'text/html');
                const results = [];

                // Common patterns: .faq-item, .faq, .question/.answer, dt/dd, details/summary
                // 1) structured faq items
                doc.querySelectorAll('.faq-item, .faq__item, .faq, .question-answer, .faq-item-wrap').forEach(node => {
                    const q = node.querySelector('.question, .faq-question, h3, h4, summary');
                    const a = node.querySelector('.answer, .faq-answer, p, div');
                    if (q && a) results.push({ question: q.textContent.trim(), answer: a.textContent.trim() });
                });

                // 2) details/summary patterns
                doc.querySelectorAll('details').forEach(d => {
                    const summ = d.querySelector('summary');
                    if (!summ) return;
                    // answer is all non-summary text inside details
                    const clone = d.cloneNode(true);
                    const sum = clone.querySelector('summary'); if (sum) sum.parentNode.removeChild(sum);
                    const ansText = clone.textContent.trim();
                    if (summ && ansText) results.push({ question: summ.textContent.trim(), answer: ansText });
                });

                // 3) definition lists
                doc.querySelectorAll('dl').forEach(dl => {
                    const terms = dl.querySelectorAll('dt');
                    const defs = dl.querySelectorAll('dd');
                    for (let i=0;i<Math.min(terms.length, defs.length); i++){
                        const q = terms[i].textContent.trim();
                        const a = defs[i].textContent.trim();
                        if (q && a) results.push({ question: q, answer: a });
                    }
                });

                // 4) fallback: headings followed by paragraphs (h3/h4 + next p)
                Array.from(doc.querySelectorAll('h2,h3,h4')).forEach(h => {
                    const next = h.nextElementSibling;
                    if (next && next.tagName.toLowerCase() === 'p') {
                        results.push({ question: h.textContent.trim(), answer: next.textContent.trim() });
                    }
                });

                // dedupe by question
                const seen = new Map();
                results.forEach(r => {
                    const key = r.question.replace(/\s+/g,' ').toLowerCase();
                    if (!seen.has(key)) seen.set(key, r);
                });
                return Array.from(seen.values());
            } catch (e){ console.warn('parseFAQHtml failed', e); return []; }
        }

        // helper: convert common "we/our" phrasing into first-person where appropriate
        function convertToFirstPerson(text){
            if (!text) return text;
            let s = text.trim();
            // common, conservative transforms
            s = s.replace(/\bWe are\b/g,'I am').replace(/\bwe are\b/g,'I am');
            s = s.replace(/\bWe\b/g,'I').replace(/\bwe\b/g,'I');
            s = s.replace(/\bour\b/gi,'my');
            s = s.replace(/\bOur\b/gi,'My');
            s = s.replace(/\bwe're\b/gi,"I'm");
            s = s.replace(/\bwe've\b/gi,"I've");
            s = s.replace(/\bthe Roads Authority\b/gi,'I');
            s = s.replace(/\bRoads Authority\b/gi,'I');
            return s;
        }

        // start loading faqs
        loadFAQs();

        const RECENT_KEY = 'ra_chat_recent';
        const RECENT_MAX = 8;

        function getRecent(){
            try {
                const raw = localStorage.getItem(RECENT_KEY);
                if (!raw) return [];
                const arr = JSON.parse(raw);
                if (!Array.isArray(arr)) return [];
                return arr.slice(0, RECENT_MAX);
            } catch(e){ return []; }
        }

        function saveRecent(q){
            if (!q) return;
            try {
                const list = getRecent();
                const normalized = q.trim();
                // remove duplicates (case-insensitive)
                const idx = list.findIndex(item => item.toLowerCase() === normalized.toLowerCase());
                if (idx === 0) return; // already top
                if (idx > -1) list.splice(idx,1);
                list.unshift(normalized);
                while (list.length > RECENT_MAX) list.pop();
                localStorage.setItem(RECENT_KEY, JSON.stringify(list));
            } catch(e){}
        }

        function clearRecent(){
            try { localStorage.removeItem(RECENT_KEY); } catch(e){}
            const s = panel.querySelector('.chat-suggestions'); if (s) populateSuggestions();
        }

        function populateSuggestions(){
            const suggestions = panel.querySelector('.chat-suggestions');
            if (!suggestions) return;
            // clear previous suggestions
            suggestions.innerHTML = '';

            // If suggestions are disabled, show a small note and return
            if (!CHAT_SHOW_SUGGESTIONS) {
                suggestions.innerHTML = '<div class="chat-note">Type your question above.</div>';
                return;
            }

            if (!Array.isArray(faqs) || faqs.length === 0) {
                const loading = document.createElement('div');
                loading.className = 'chat-loading';
                loading.textContent = 'Loading FAQs...';
                suggestions.appendChild(loading);
                const retry = document.createElement('button');
                retry.type = 'button'; retry.className = 'chat-retry'; retry.textContent = 'Retry';
                retry.style.marginLeft = '0.5rem'; retry.addEventListener('click', ()=> { addMessage('Retrying to loadFAQs...', 'bot'); loadFAQs(); });
                suggestions.appendChild(retry);
                return;
            }

            // Recent queries (personalised) — show first if any
            const recent = getRecent();
            if (recent.length){
                const recentLabel = document.createElement('div');
                recentLabel.className = 'chat-suggestion-group';
                recentLabel.textContent = 'Recent:';
                suggestions.appendChild(recentLabel);

                recent.slice(0,6).forEach(q=>{
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'chat-recent';
                    btn.textContent = q;
                    btn.title = 'Ask again: ' + q;
                    btn.addEventListener('click', ()=>{ inputEl.value = q; ask(); });
                    suggestions.appendChild(btn);
                });

                // Clear button
                const clearBtn = document.createElement('button');
                clearBtn.type = 'button';
                clearBtn.className = 'chat-clear';
                clearBtn.textContent = 'Clear recent';
                clearBtn.addEventListener('click', clearRecent);
                suggestions.appendChild(clearBtn);
            }

            // Then show top FAQ suggestions (avoid duplicates)
            const recLower = new Set(recent.map(r=>r.toLowerCase()));
            faqs.filter(f=> !recLower.has(f.question.toLowerCase())).slice(0,6).forEach(f=>{
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'chat-suggestion';
                btn.textContent = f.question;
                btn.setAttribute('aria-label', 'Suggestion: ' + f.question);
                btn.addEventListener('click', ()=>{
                    inputEl.value = f.question;
                    inputEl.focus();
                    ask();
                });
                suggestions.appendChild(btn);
            });
        }

        function addMessage(text, from='bot', opts = {}){
            const el = document.createElement('div');
            el.className = 'chat-bubble ' + (from === 'user' ? 'user' : 'bot');

            // Use a text node container to avoid accidental HTML injection
            const textNode = document.createElement('div');
            textNode.textContent = text;
            el.appendChild(textNode);



            messages.appendChild(el);
            messages.scrollTop = messages.scrollHeight;
        }

        function scoreMatch(a,b){
            a = (a||'').toLowerCase(); b = (b||'').toLowerCase();
            const words = b.split(/\s+/).filter(Boolean);
            if (!words.length) return 0;
            let hits=0; words.forEach(w=>{ if (a.includes(w)) hits++; });
            return hits/words.length;
        }

        function ask() {
            const q = inputEl.value.trim();
            if (!q) return;
            addMessage(q, 'user');
            // Save recent immediately and refresh suggestions
            try { saveRecent(q); populateSuggestions(); } catch(e){}
            inputEl.value = '';
            if (!Array.isArray(faqs) || faqs.length === 0) {
                addMessage("I'm still loading my FAQ knowledge base — please try again in a moment.", 'bot');
                return;
            }
            // find best faq match
            let best = {score:0, idx:-1};
            faqs.forEach((f,i)=>{
                const s = Math.max(scoreMatch(f.question, q), scoreMatch(f.answer, q));
                if (s > best.score) { best = {score:s, idx:i}; }
            });
            setTimeout(()=>{
                if (best.score >= CHAT_MATCH_THRESHOLD && faqs[best.idx]){
                    // deliver the matched answer directly (first-person)
                    const ans = convertToFirstPerson(faqs[best.idx].answer);
                    addMessage("I think this may help: " + ans, 'bot');
                } else if (best.score > 0 && faqs[best.idx]) {
                    const ans = convertToFirstPerson(faqs[best.idx].answer);
                    addMessage("I found something related: " + ans, 'bot');
                } else {
                    addMessage("I couldn't find a matching answer. Please try rephrasing or visit /faqs", 'bot');
                }
            }, 200);
        }

        btn.addEventListener('click', ()=>{ panel.classList.toggle('open'); panel.classList.contains('open') ? panel.setAttribute('aria-hidden','false') : panel.setAttribute('aria-hidden','true'); if (panel.classList.contains('open')) setTimeout(()=> inputEl.focus(), 50); console.log('chat opened: faqs_loaded=', window.__ra_faqs_loaded, 'faqs_len=', faqs ? faqs.length : 0, 'source=', faqSource); });
        closeBtn.addEventListener('click', ()=>{ panel.classList.remove('open'); btn.focus(); });
        sendBtn.addEventListener('click', ask);
        inputEl.addEventListener('keydown', e=>{ if (e.key === 'Enter') ask(); });

        // Close panel on ESC
        document.addEventListener('keydown', (e)=>{
            if (e.key === 'Escape' && panel.classList.contains('open')) {
                panel.classList.remove('open'); btn.focus();
            }
        });

        // small greeting
        setTimeout(()=> addMessage("Hi — I'm here to help. Ask me about permits, NATIS centres, reports and more.", 'bot'), 500);

        // --- Contact page helpers: enforce 250-word limit on message/description fields ---
        function registerContactWordLimits(){
            const limit = 250;
            function setup(textareaId, counterId){
                const ta = document.getElementById(textareaId);
                const counter = document.getElementById(counterId);
                if (!ta || !counter) return;
                function update(){
                    const words = (ta.value.match(/\S+/g) || []).length;
                    const remaining = Math.max(0, limit - words);
                    counter.textContent = `${remaining} words remaining`;
                    if (words > limit){
                        // trim to limit
                        const trimmed = (ta.value.match(/\S+/g) || []).slice(0,limit).join(' ');
                        ta.value = trimmed;
                        counter.textContent = `0 words remaining`;
                    }
                }
                ta.addEventListener('input', update);
                ta.addEventListener('paste', ()=> setTimeout(update, 5));
                // initialize
                update();
            }
            setup('message','message-count');
            setup('description','description-count');

            // enforce at submit time as well (safety net)
            const contactForm = document.getElementById('contactForm');
            if (contactForm) contactForm.addEventListener('submit', (e)=>{
                const words = (document.getElementById('message').value.match(/\S+/g) || []).length;
                if (words > limit) { e.preventDefault(); alert('Message cannot exceed 250 words. Please shorten it.'); }
            });
            const roadForm = document.getElementById('roadIssueForm');
            if (roadForm) roadForm.addEventListener('submit', (e)=>{
                const words = (document.getElementById('description').value.match(/\S+/g) || []).length;
                if (words > limit) { e.preventDefault(); alert('Description cannot exceed 250 words. Please shorten it.'); }
            });
        }

        // register contact helpers when DOM is ready (script is loaded at end of body, so run now)
        try { registerContactWordLimits(); } catch(e){}

        // Member bio popover: accessible hover/focus/tap tooltips for .member-card
        (function memberBioPopovers(){
            const pop = document.createElement('div');
            pop.id = 'member-bio-popover';
            pop.className = 'member-bio-popover';
            pop.setAttribute('role','tooltip');
            pop.setAttribute('aria-hidden','true');
            document.body.appendChild(pop);

            let activeTarget = null;
            function showPopover(target){
                const text = target.getAttribute('data-bio');
                if (!text) return;
                pop.textContent = text;
                pop.setAttribute('aria-hidden','false');
                activeTarget = target;
                target.setAttribute('aria-describedby', pop.id);

                // position popover near the target (try above, fall back below)
                const rect = target.getBoundingClientRect();
                pop.style.left = '0px'; pop.style.top = '0px'; // reset so offsetWidth is accurate
                const popW = pop.offsetWidth;
                const popH = pop.offsetHeight;
                // center horizontally on target
                let left = rect.left + (rect.width / 2) - (popW / 2) + window.scrollX;
                // prefer above
                let top = rect.top - popH - 12 + window.scrollY;
                // if not enough space above, place below
                if (top < window.scrollY + 8) top = rect.bottom + 12 + window.scrollY;
                // clamp horizontally
                left = Math.max(8 + window.scrollX, Math.min(left, window.scrollX + document.documentElement.clientWidth - popW - 8));
                pop.style.left = `${Math.round(left)}px`;
                pop.style.top = `${Math.round(top)}px`;

                // visible state
                pop.setAttribute('aria-hidden','false');
            }
            function hidePopover(target){
                if (activeTarget) activeTarget.removeAttribute('aria-describedby');
                activeTarget = null;
                pop.setAttribute('aria-hidden','true');
            }

            // attach handlers
            const members = Array.from(document.querySelectorAll('.member-card[data-bio]'));
            members.forEach(m => {
                // hover
                m.addEventListener('mouseenter', ()=> showPopover(m));
                m.addEventListener('mouseleave', ()=> hidePopover(m));
                // focus / blur for keyboard access
                m.addEventListener('focus', ()=> showPopover(m));
                m.addEventListener('blur', ()=> hidePopover(m));
                // click to toggle for touch users
                m.addEventListener('click', (e)=>{
                    // if popover already visible for this target, hide it
                    if (activeTarget === m) { hidePopover(m); return; }
                    showPopover(m);
                });
            });

            // dismiss on escape or click outside
            document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape') hidePopover(); });
            document.addEventListener('click', (e)=>{ if (!e.target.closest('.member-card') && !e.target.closest('.member-bio-popover')) hidePopover(); });
            window.addEventListener('resize', ()=> { if (activeTarget) showPopover(activeTarget); });
            window.addEventListener('scroll', ()=> { if (activeTarget) showPopover(activeTarget); }, { passive: true });
        })();

    }

    createChatWidget();
});