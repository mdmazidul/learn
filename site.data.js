/* ============================================================
   SITE.DATA.JS
   ------------------------------------------------------------
   This is the ONLY file you need to touch to add or change
   content on the site: your bio, projects, writing, glimpses,
   and community submissions all live here as plain objects.

   Every page reads from this file at load time (see render.js)
   and builds itself automatically. Add a new project? Add one
   object to PROJECTS below and it appears on the Projects page
   AND on the Home page if it's newest. Nothing else to edit.

   RULE OF THUMB: newest item goes FIRST in every array.
   ============================================================ */

const SITE = {

  /* ---------- 1. PROFILE (used on Home + About) ---------- */
  profile: {
    name: "Md Mazidul Islam",
    role: "Statistics Student",
    location: "India",
    tagline: "Learning to turn numbers into stories, and stories into code.",
    photo: "assets/images/profile.jpg", // drop your real photo here (same filename)
    email: "mazidulrough@gmail.com",
    linkedin: "https://www.linkedin.com/in/md-islam-374926356",
    instagram: "https://www.instagram.com/__.mazidul.__/",

    // Short paragraphs for the About page. Add/edit freely — each
    // string becomes one paragraph.
    bio: [
      "I'm a statistics student who fell into code almost by accident, and stayed for the way a good query can make a messy pile of numbers say something true.",
      "This site is where I keep the things I make: small data-analysis projects, scripts I wrote to solve my own problems, notes while I learn libraries like pandas and numpy, and writing that has nothing to do with code at all.",
      "I'm early in this — plenty of these projects are rough on purpose. I'd rather show the working draft than wait for a polished one that never ships."
    ],

    education: [
      { title: "B.Sc. in Statistics", place: "Add your college name", years: "20XX – 20XX" },
      { title: "Higher Secondary (PUC)", place: "Add your school/college name", years: "20XX – 20XX" }
    ],

    interests: [
      "Data analysis", "Python", "Statistics", "Personal finance tools", "Photography", "Writing"
    ],

    courses: [
      "Add course or certificate name",
      "Add course or certificate name",
      "Add course or certificate name"
    ]
  },

  /* ---------- 2. PROJECTS ---------- */
  /* category: "Data Analysis" | "Tools & Scripts" | "Reference Notes"
     (feel free to invent a new category string — the filter chips
     on the Projects page are generated from whatever appears here) */
  projects: [
    {
      slug: "spending-analysis",
      title: "PUC Student Spending & Scholarship Analysis",
      category: "Data Analysis",
      summary: "A real-world look at how spending habits shift across income brackets, scholarship status and family background for PUC students.",
      date: "2025-01",
      tags: ["statistics", "survey data", "visualization"],
      content: "content/projects/spending-analysis.html",
      featured: true
    },
    {
      slug: "finance-tracker",
      title: "Spending & Income Tracker",
      category: "Tools & Scripts",
      summary: "A command-line Python + MySQL tool that logs daily spending, tracks income sources, and answers questions like \"how much did I spend on food this month?\" on demand.",
      date: "2024-11",
      tags: ["python", "mysql", "cli"],
      content: "content/projects/finance-tracker.html"
    },
    {
      slug: "coded-conversation",
      title: "Coded Conversation",
      category: "Tools & Scripts",
      summary: "A tiny Tkinter chat window that encrypts every message with a custom substitution cipher before it's shown or saved — built as a playful way to text someone in private.",
      date: "2024-10",
      tags: ["python", "tkinter", "gui"],
      content: "content/projects/coded-conversation.html"
    },
    {
      slug: "pandas-notes",
      title: "Learning pandas: the basics that actually stuck",
      category: "Reference Notes",
      summary: "Working notes from learning pandas — the handful of methods I reach for in almost every analysis, kept here so future-me can find them fast.",
      date: "2024-09",
      tags: ["python", "pandas", "notes"],
      content: "content/projects/pandas-notes.html"
    },
    {
      slug: "numpy-notes",
      title: "Learning numpy: arrays over loops",
      category: "Reference Notes",
      summary: "Short reference notes on numpy — arrays, broadcasting, and why vectorised code replaced most of the for-loops I used to write.",
      date: "2024-08",
      tags: ["python", "numpy", "notes"],
      content: "content/projects/numpy-notes.html"
    }

    /* Add a new project by copying this block:
    {
      slug: "unique-url-friendly-slug",
      title: "Project title",
      category: "Data Analysis",
      summary: "One or two sentences shown on the project index.",
      date: "2025-06",
      tags: ["tag1", "tag2"],
      content: "content/projects/unique-url-friendly-slug.html"
    },
    then create content/projects/unique-url-friendly-slug.html with just the
    inner content (no <html>/<head>/nav — see any existing file as a template),
    or generate that file automatically from a docx/pdf in Admin → Studio. */
  ],

  /* ---------- 3. WRITING ---------- */
  /* category: "Article" | "Reflection" | "Short Story" | "Blog" — anything you like */
  writings: [
    {
      slug: "starting-this-space",
      title: "Starting this space",
      category: "Note",
      excerpt: "A short placeholder post — replace this with your first real piece of writing whenever you're ready.",
      date: "2025-09",
      readMins: 2,
      content: "content/writings/starting-this-space.html"
    }

    /* Add new writing the same way as projects — copy the block, give it
    a slug, and create content/writings/<slug>.html. The Admin → Studio
    page can generate that HTML file for you automatically from a
    .docx or .pdf you upload. */
  ],

  /* ---------- 4. GLIMPSES (casual life photos) ---------- */
  glimpses: [
    {
      caption: "Add your own photos here — trips, friends, everyday moments.",
      date: "2025-09",
      image: "assets/images/glimpse-placeholder.svg"
    }
    /* Add more the same way:
    { caption: "...", date: "2025-09", image: "assets/images/your-photo.jpg" },
    */
  ],

  /* ---------- 5. PUBLISHED (community submissions you've approved) ---------- */
  /* New submissions arrive by email via the Submit form (formsubmit.co) —
     there's no database behind this site, so nothing appears here
     automatically. When you like a submission, add one entry here. */
  published: [
    /* Example — uncomment and edit once you approve your first one:
    {
      title: "Submission title",
      author: "Submitted by name",
      category: "Article",
      date: "2025-09",
      link: "https://drive.google.com/..." // or a file you've hosted
    },
    */
  ]
};
