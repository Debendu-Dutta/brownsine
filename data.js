/* =====================================================================
   data.js  —  EDIT THIS FILE to update your whole website.
   Add blog posts, PDFs, photos, and personal info here. No other file
   needs changing for routine updates.
   ===================================================================== */

window.SITE = {
  name: "Debendu Dutta",
  tagline: "Pure Mathematics · IIT Bombay",
  roles: [
    "M.Sc. Pure Mathematics at IIT Bombay",
    "Lover of proofs & structure",
    "Real Analysis & Measure Theory",
    "Web & Design Secretary, Math Association",
    "Patient, honest, curious"
  ],
  location: "Mumbai, Maharashtra, India  ·  Home: Egra, West Bengal",
  email: "debendu003@gmail.com",
  linkedin: "https://www.linkedin.com/in/debendudutta-0b9a21238",
  github: "",            // e.g. "https://github.com/yourusername"
  instagram: "",         // optional
  photo: "assets/profile.jpg",   // replace with your own photo (same name, or change path)
  cv: "pdfs/CV_Debendu_Dutta.pdf", // put your CV PDF here (see README)

  about: [
    "I am an M.Sc. student in Pure Mathematics at IIT Bombay, deeply interested in understanding basic mathematical ideas and structures. My studies focus on proof-based learning, logical thinking, and clear reasoning.",
    "Outside academics, I like thoughtful discussions with people who care about deep ideas and original thinking. I believe good research takes patience, honesty, hard work, and true teamwork over a long time."
  ],

  stats: [
    { num: 47,  label: "AIR · IIT JAM Mathematics 2025" },
    { num: 100, label: "/100 · Maths, Higher Secondary 2022" },
    { num: 2,   label: "Scholarships (SVMCM, MCM)" },
    { num: 50,  label: "Students helped as doubt faculty", suffix: "+" }
  ],

  education: [
    { when: "2025 – 2027", title: "M.Sc. Mathematics", where: "Indian Institute of Technology Bombay", note: "Pure Mathematics. Merit-cum-Means Scholarship (2025–26)." },
    { when: "2022 – 2025", title: "B.Sc. Mathematics (Computer Science & Physics)", where: "Midnapore College (Autonomous), Vidyasagar University", note: "76.70%. SVMCM Scholarship, Govt. of West Bengal (2022–25)." },
    { when: "2020 – 2022", title: "Higher Secondary (Class 11 & 12)", where: "Egra J.L. High School", note: "88.60% · 100/100 in Mathematics (WBCHSE)." },
    { when: "2014 – 2020", title: "Class 5 – 10", where: "Nilda High School", note: "87.57% · 97/100 in Mathematics (Madhyamik, WBBSE)." }
  ],

  experience: [
    { when: "2026 – Present", title: "Real Analysis & Measure Theory Intern", where: "Dept. of Mathematics, IIT Patna",
      points: ["Developing lecture content on Jordan measure, Lebesgue outer measure, the Cantor set and measurability.", "Designing LaTeX Beamer slides with custom TikZ diagrams."] },
    { when: "2026 – Present", title: "Web & Design Secretary", where: "Mathematics Association, IIT Bombay",
      points: ["Managing the association's website, Instagram and LinkedIn; designing posters, certificates and merchandise.", "Creating large-screen visuals for major departmental events."] },
    { when: "2026 – Present", title: "Design Nominee, Core Team", where: "Institute Student Companion Programme (ISCP), IIT Bombay",
      points: ["Managing ISCP's Instagram and designing creatives for institute-wide activities.", "Contributing to Core Council decisions; leading T-shirt and merchandise design."] },
    { when: "May – Jul 2026", title: "Mathematics Doubt Faculty", where: "Egra Science Institute",
      points: ["Resolved doubts for ~50 students of Classes XI–XII (WBJEE, JEE Main/Advanced, WB Board) online and offline."] },
    { when: "Jan 2026 – Present", title: "Mathematics Tutor / Subject Matter Expert", where: "PhotoStudy",
      points: ["Step-by-step solutions and conceptual explanations for academic and competitive-exam problems."] },
    { when: "Sep – Oct 2025", title: "Student Volunteer", where: "PGcult / PG Night, IIT Bombay", points: [] }
  ],

  achievements: [
    "AIR 47 in IIT JAM Mathematics (conducted by IIT Delhi), 2025",
    "Shortlisted for Integrated PhD interview at IISc Bangalore, 2025",
    "SVMCM Scholarship, Government of West Bengal (2022–25)",
    "Merit-cum-Means Scholarship, IIT Bombay (2025–26)",
    "97/100 in Mathematics, Madhyamik (2020); 100/100, Higher Secondary (2022)"
  ],

  courses: ["Real Analysis","Functional Analysis","Topology","Group Theory","Ring Theory","Linear Algebra","Complex Analysis","Measure Theory","Riemann Integration","Sequences & Series of Functions","Differential Equations","PDE","Numerical Analysis","Number Theory","Probability & Statistics","Linear Programming & Game Theory","Calculus / MVC"],

  skills: ["Python","C / C++","LaTeX & TikZ","MATLAB","Scilab","Desmos","Canva Pro","CapCut / VN Editor","MS Office"],

  languages: ["Bengali (native)","English (working)","Hindi (speaking & reading)","Odia (speaking)"],

  /* ---------------- BLOG POSTS ----------------
     Add a new object at the TOP of the list for each new post.
     body = HTML. Maths: inline \( ... \)  and display \[ ... \]  (KaTeX).   */
  posts: [
    {
      id: "welcome",
      title: "Welcome: why I'm writing this blog",
      date: "2026-11-22",
      tags: ["personal", "thoughts"],
      excerpt: "A place for slow thinking: proofs I enjoyed, ideas I'm stuck on, and notes from my journey in pure mathematics.",
      body: `
        <p>Mathematics rewards patience. This blog is where I will slow down and write what I understand — and, just as honestly, what I don't.</p>
        <p>Expect notes from courses at IIT Bombay, ideas from my analysis work, and the occasional reflection on how to learn deeply.</p>
        <blockquote>Good research takes patience, honesty, hard work, and true teamwork over a long time.</blockquote>
        <p><em>(This is a sample post — edit or delete it in <code>data.js</code>.)</em></p>`
    },
    {
      id: "cantor-set",
      title: "The Cantor set: nothing and everything",
      date: "2026-11-15",
      tags: ["analysis", "measure theory"],
      excerpt: "Uncountable, yet of measure zero. A short tour of the most famous 'small but big' set.",
      body: `
        <p>Start with \\([0,1]\\), remove the open middle third, then repeat on each remaining interval. What survives is the Cantor set \\(C\\).</p>
        <p>At step \\(n\\) we have removed intervals of total length
        \\[ \\sum_{k=1}^{n} \\frac{2^{k-1}}{3^{k}} \\;\\longrightarrow\\; 1, \\]
        so \\(\\lambda(C)=0\\). Yet \\(C\\) consists of exactly those numbers in \\([0,1]\\) having a ternary expansion using only the digits 0 and 2, giving a bijection with \\(\\{0,1\\}^{\\mathbb N}\\) — hence \\(C\\) is uncountable.</p>
        <p><strong>Take-away:</strong> measure and cardinality measure very different things.</p>
        <p><em>(Sample post — replace with your own writing.)</em></p>`
    },
    {
      id: "euler",
      title: "A favourite identity",
      date: "2026-11-01",
      tags: ["notes"],
      excerpt: "Why the Basel sum equals \\(\\pi^2/6\\) still gives me goosebumps.",
      body: `
        <p>\\[ \\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}. \\]</p>
        <p>A statement about whole numbers whose answer involves a circle. That is the kind of surprise that made me fall in love with the subject.</p>
        <p><em>(Sample post.)</em></p>`
    }
  ],

  /* ---------------- PDF LIBRARY ----------------
     1) Copy the PDF into the  pdfs/  folder.  2) Add a line below.          */
  pdfs: [
    { title: "Sample: Cantor set picture", desc: "Placeholder PDF — replace with your own notes, slides or papers.", file: "pdfs/sample-notes.pdf", tag: "sample" }
    // { title: "Lebesgue Outer Measure — Beamer slides", desc: "Lecture slides prepared at IIT Patna.", file: "pdfs/lebesgue-outer-measure.pdf", tag: "slides" },
  ],

  /* ---------------- GALLERY ----------------
     Drop your photos in assets/ (or a new folder) and add them here.        */
  gallery: [
    { src: "assets/mandelbrot.jpg", caption: "Mandelbrot set — complexity from z² + c" },
    { src: "assets/cantor.jpg", caption: "Cantor set — the first 8 stages" },
    { src: "assets/torus.jpg", caption: "A torus — the shape of topology" },
    { src: "assets/complex.jpg", caption: "Domain colouring of a rational function" },
    { src: "assets/lissajous.jpg", caption: "Lissajous curves" }
  ]
};
