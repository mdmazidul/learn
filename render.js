/* render.js — The logic that builds your site from SITE.DATA.JS */

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const page = path.split("/").pop() || "index.html";

    // 1. GLOBAL NAV TOGGLE (Mobile)
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.main-nav');
    if(toggle) {
        toggle.onclick = () => nav.classList.toggle('is-open');
    }

    // 2. REVEAL ANIMATION
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('is-visible') });
    });
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

    // 3. PAGE SPECIFIC RENDERING
    if (page === "index.html") renderHome();
    if (page === "projects.html") renderList('projects', 'project-list');
    if (page === "writing.html") renderList('writings', 'writing-list');
    if (page === "about.html") renderAbout();
    if (page === "glimpses.html") renderGlimpses();
    if (page === "published.html") renderPublished();
});

// --- HOME PAGE ---
function renderHome() {
    const hero = document.querySelector('.hero-content');
    hero.innerHTML = `
        <span class="eyebrow">WELCOME</span>
        <h1>${SITE.profile.name}</h1>
        <p class="tagline">${SITE.profile.tagline}</p>
        <div class="cta-row">
            <a href="projects.html" class="btn btn-primary">View Projects</a>
            <a href="about.html" class="btn btn-ghost">About Me</a>
        </div>
    `;

    // Render 3 latest across categories
    const latestGrid = document.getElementById('latest-grid');
    const allRecent = [...SITE.projects, ...SITE.writings]
        .sort((a,b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

    latestGrid.innerHTML = allRecent.map(item => `
        <div class="latest-card" data-reveal>
            <span class="eyebrow">${item.category}</span>
            <h3>${item.title}</h3>
            <p>${item.summary || item.excerpt}</p>
            <a href="${item.readMins ? 'writing.html' : 'projects.html'}?id=${item.slug}" class="go">READ MORE _</a>
        </div>
    `).join('');
}

// --- LISTS (Projects/Writing) with SLUG/ID support ---
function renderList(type, containerId) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const container = document.getElementById(containerId);

    if (id) {
        // RENDER DETAIL VIEW
        const item = SITE[type].find(i => i.slug === id);
        if (!item) { container.innerHTML = "Not found."; return; }
        
        container.innerHTML = `
            <div class="detail-head" data-reveal>
                <a href="${type === 'projects' ? 'projects.html' : 'writing.html'}" class="back-link">← BACK TO LIST</a>
                <h1 style="margin-top:20px">${item.title}</h1>
                <div class="detail-meta">
                    <span>${item.date}</span> • <span>${item.category}</span>
                </div>
            </div>
            <div class="article-body" id="article-content">Loading content...</div>
        `;

        // Fetch the external HTML fragment from the 'content' folder
        fetch(item.content)
            .then(res => res.text())
            .then(html => document.getElementById('article-content').innerHTML = html)
            .catch(() => document.getElementById('article-content').innerHTML = "Error loading content.");

    } else {
        // RENDER LIST VIEW
        container.innerHTML = SITE[type].map(item => `
            <div class="index-row" onclick="location.href='?id=${item.slug}'" data-reveal>
                <div class="idx-date">${item.date}</div>
                <div>
                    <h3>${item.title}</h3>
                    <p>${item.summary || item.excerpt}</p>
                </div>
                <div class="idx-arrow">→</div>
            </div>
        `).join('');
    }
}

// --- ABOUT PAGE ---
function renderAbout() {
    const bio = document.getElementById('bio-content');
    bio.innerHTML = SITE.profile.bio.map(p => `<p>${p}</p>`).join('');

    const ed = document.getElementById('edu-list');
    ed.innerHTML = SITE.profile.education.map(e => `
        <div class="row"><b>${e.years}</b> <span>${e.title} <br><small>${e.place}</small></span></div>
    `).join('');

    const int = document.getElementById('interest-pills');
    int.innerHTML = SITE.profile.interests.map(i => `<span class="tag">${i}</span>`).join('');
}

// --- GLIMPSES ---
function renderGlimpses() {
    const grid = document.getElementById('glimpse-grid');
    grid.innerHTML = SITE.glimpses.map(g => `
        <div class="glimpse-tile" data-reveal onclick="openLightbox('${g.image}', '${g.caption}')">
            <img src="${g.image}" alt="Life update">
            <div class="cap">${g.caption}</div>
        </div>
    `).join('');
}

function openLightbox(img, cap) {
    const lb = document.getElementById('lightbox');
    lb.querySelector('img').src = img;
    lb.querySelector('.cap').innerText = cap;
    lb.classList.add('is-open');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('is-open');
}
