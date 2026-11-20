/* =====================================================================
   data.js  —  THIS IS THE ONLY FILE YOU NEED TO EDIT TO ADD CONTENT
   Add a post, a PDF, a photo or a link by copying one of the examples.
   ===================================================================== */

/* ---------- Your details ---------- */
const SITE = {
  name: "Debendu Dutta",
  // Words that type out under your name (add / change freely)
  roles: [
    "MSc Mathematics @ IIT Bombay",
    "BSc Mathematics, Midnapore College",
    "Curious mind. Lifelong learner."
  ],
  // To use your own photo: put it in the images folder (e.g. images/me.jpg)
  // and change this to "images/me.jpg"
  avatar: "images/avatar.svg",
  // Contact / social links. Remove any you don't want.
  links: [
    { label: "✉ Email",    href: "mailto:your-email@example.com" },
    { label: "GitHub",     href: "https://github.com/your-username" },
    { label: "LinkedIn",   href: "https://www.linkedin.com/in/your-profile" }
  ]
};

/* ---------- Education journey (newest first) ----------
   Add the years you attended in the "when" field. */
const JOURNEY = [
  {
    when: "Present",
    title: "MSc Mathematics",
    place: "Indian Institute of Technology (IIT) Bombay",
    text: "Postgraduate studies in Mathematics at one of India's premier institutes.",
    current: true
  },
  {
    when: "Undergraduate",
    title: "BSc Mathematics",
    place: "Midnapore College (Autonomous)",
    text: "Built my foundation in pure mathematics: analysis, algebra and the joy of proofs."
  },
  {
    when: "Class 11 & 12",
    title: "Higher Secondary",
    place: "Egra J.L. High School",
    text: "Where the love for mathematics turned serious."
  },
  {
    when: "Class 5 to 10",
    title: "Secondary Education",
    place: "Nilda High School",
    text: "The early years: curiosity, books, and the first taste of problem solving."
  }
];

/* ---------- Blog posts (newest first) ----------
   id      : unique short word, no spaces
   date    : "YYYY-MM-DD"
   tags    : used for the filter buttons
   cover   : an image from the images folder
   content : HTML. Use <p>, <h4>, <ul>, <blockquote>, <img src="images/x.jpg">,
             and <div class="math">a² + b² = c²</div> for formulas.            */
const POSTS = [
  {
    id: "welcome",
    title: "Welcome to my notebook",
    date: "2026-11-21",
    tags: ["Personal"],
    cover: "images/art-spiral.svg",
    excerpt: "Why I started this site, and what you can expect to find here.",
    content: `
      <p>Hello! I'm Debendu. This site is a place for the things I think about: mathematics, learning, and life as a student far from where I started.</p>
      <h4>What you'll find here</h4>
      <ul>
        <li>Short thoughts and long essays</li>
        <li>PDF notes I've written or collected</li>
        <li>Photographs from my journey</li>
      </ul>
      <blockquote>Mathematics is the art of giving the same name to different things.</blockquote>
      <p>That line is attributed to Henri Poincaré, and it captures why I love the subject so much. Thanks for visiting!</p>
    `
  },
  {
    id: "why-math",
    title: "Why I fell in love with mathematics",
    date: "2026-11-20",
    tags: ["Mathematics", "Personal"],
    cover: "images/art-waves.svg",
    excerpt: "From a village school to IIT Bombay, the story of a growing obsession with patterns.",
    content: `
      <p>Write your own story here. Replace this text with what first made you curious about numbers, and which teachers or books shaped you.</p>
      <div class="math">e<sup>iπ</sup> + 1 = 0</div>
      <p>Few equations feel as beautiful as this one: five fundamental constants in a single line.</p>
    `
  },
  {
    id: "sum-of-odds",
    title: "A tiny proof I love: odd numbers and squares",
    date: "2026-11-19",
    tags: ["Mathematics"],
    cover: "images/art-lissajous.svg",
    excerpt: "The sum of the first n odd numbers is always a perfect square. Here's a picture-proof.",
    content: `
      <p>Add the first few odd numbers:</p>
      <div class="math">1 + 3 + 5 + 7 = 16 = 4²</div>
      <p>It always works. Proof by induction: if 1 + 3 + … + (2n−1) = n², then adding the next odd number (2n+1) gives n² + 2n + 1 = (n+1)².</p>
      <p>Geometrically, each new odd number is an L-shaped layer wrapped around a square, making the square one size bigger.</p>
    `
  }
];

/* ---------- PDFs / documents ----------
   1. Put your PDF in the "pdfs" folder (create it on GitHub: Add file > Create new file > pdfs/readme.txt)
   2. Add an entry below. "file" must match the file name exactly.
   Example (remove the // to activate):                                     */
const DOCS = [
  // { title: "Real Analysis Notes", desc: "Lecture notes, Semester 1", file: "pdfs/real-analysis.pdf" },
  // { title: "My Resume / CV",      desc: "Updated November 2026",      file: "pdfs/resume.pdf" },
];

/* ---------- Photo gallery ----------
   Put photos in the "images" folder and list them here.                   */
const GALLERY = [
  { src: "images/art-spiral.svg",    caption: "Nested squares: symmetry in rotation" },
  { src: "images/art-waves.svg",     caption: "Waves: sine curves in harmony" },
  { src: "images/art-lissajous.svg", caption: "Rotating ellipses: a rose of curves" }
  // { src: "images/my-photo.jpg", caption: "IIT Bombay campus" },
];
