/* render.js — Unified Logic for Mazidul's Portfolio */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Detect if we are in a subfolder to fix paths
    const isSub = window.location.pathname.includes('/projects/') || 
                  window.location.pathname.includes('/writing/') || 
                  window.location.pathname.includes('/glimpses/') || 
                  window.location.pathname.includes('/community/');
    const pathPrefix = isSub ? '../' : '';

    // 2. Mobile Nav Toggle
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.main-nav');
    if(toggle) toggle.onclick = () => nav.classList.toggle('is-open');

    // 3. Scroll Reveal Animation
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('is-visible') });
    });
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

    // 4. Route Rendering based on Body ID
    const pageId = document.body.id;
    if (pageId === 'home-page') renderHome();
    if (pageId === 'about-page') renderAbout();
    if (pageId === 'project-page') renderList('projects', 'project-list', pathPrefix);
    if (pageId === 'writing-page') renderList('writings', 'writing-list', pathPrefix);
    if (pageId === 'glimpses-page') renderGlimpses(pathPrefix);
    if (pageId === 'published-page') renderPublished();
});

function renderHome() {
    const hero = document.querySelector('.hero-content');
    hero.innerHTML = `
        <span class="eyebrow" data-reveal>STATISTICS & CODE</span>
        <h1 data-reveal>${SITE.profile.name}</h1>
        <p class="tagline" data-reveal>${SITE.profile.tagline}</p>
        <div class="cta-row" data-reveal>
            <a href="projects/index.html" class="btn btn-primary">View Projects</a>
            <a href="about.html" class="btn btn-ghost">Contact Me</a>
        </div>
    `;

    const latestGrid = document.getElementById('latest-grid');
    const all = [...SITE.projects, ...SITE.writings]
        .sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

    latestGrid.innerHTML = all.map(item => `
        <div class="latest-card" data-reveal>
            <span class="eyebrow">${item.category}</span>
            <h3>${item.title}</h3>
            <p>${item.summary || item.excerpt}</p>
            <a href="${item.category === 'Data Analysis' ? 'projects/' : 'writing/'}index.html?id=${item.slug}" class="go">READ MORE _</a>
        </div>
    `).join('');
}

function renderList(type, containerId, prefix) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const container = document.getElementById(containerId);

    if (id) {
        const item = SITE[type].find(i => i.slug === id);
        container.innerHTML = `
            <div class="detail-head" data-reveal>
                <a href="index.html" class="back-link">← BACK TO LIST</a>
                <h1 style="margin-top:20px">${item.title}</h1>
                <div class="detail-meta"><span>${item.date}</span> • <span>${item.category}</span></div>
            </div>
            <div class="article-body" id="article-content" data-reveal>Loading content...</div>
        `;
        fetch(prefix + item.content).then(res => res.text()).then(html => {
            document.getElementById('article-content').innerHTML = html;
        });
    } else {
        container.innerHTML = SITE[type].map(item => `
            <div class="index-row" onclick="location.href='?id=${item.slug}'" data-reveal>
                <div class="idx-date">${item.date}</div>
                <div><h3>${item.title}</h3><p>${item.summary || item.excerpt}</p></div>
                <div class="idx-arrow">→</div>
            </div>
        `).join('');
    }
}

function renderAbout() {
    document.getElementById('bio-content').innerHTML = SITE.profile.bio.map(p => `<p>${p}</p>`).join('');
    document.getElementById('edu-list').innerHTML = SITE.profile.education.map(e => `
        <div class="row"><b>${e.years}</b> <span>${e.title} <br><small>${e.place}</small></span></div>
    `).join('');
    document.getElementById('interest-pills').innerHTML = SITE.profile.interests.map(i => `<span class="tag">${i}</span>`).join('');
}

function renderGlimpses(prefix) {
    const grid = document.getElementById('glimpse-grid');
    grid.innerHTML = SITE.glimpses.map(g => `
        <div class="glimpse-tile" data-reveal onclick="openLightbox('${prefix}${g.image}', '${g.caption}')">
            <img src="${prefix}${g.image}" alt="Life update">
            <div class="cap">${g.caption}</div>
        </div>
    `).join('');
}
