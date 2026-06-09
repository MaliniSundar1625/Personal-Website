# Personal-Website

## Project Overview
A responsive, multi-page personal portfolio website showcasing my background as a CS educator, Ph.D. student, and software developer. The site features pastel aesthetics, smooth scroll animations, a live GitHub API integration, real-time form validation, and several Bootstrap components not covered in class.

### Pages

| Page | File | Description |
|---|---|---|
| About / Home | `index.html` | Hero section, bio, skills |
| Experience | `experience.html` | Education, work history, publications |
| Projects | `projects.html` | Project cards with category filtering + GitHub repos |
| Contact | `contact.html` | Validated contact form + FAQ accordion |

---

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 (semantic) | Page structure |
| CSS3 + Custom Properties | Styling, animations, responsive layout |
| Bootstrap 5.3 | Grid, components (Offcanvas, Accordion, Toast) |
| Bootstrap Icons 1.11 | Icon library |
| JavaScript (ES6+) | Interactivity, API fetch, form validation |
| jQuery 3.7 | Smooth scroll, stat animations |
| GitHub Pages | Deployment |

### Beyond-Class Bootstrap Features
- **Offcanvas** – Mobile navigation drawer (replaces standard collapse)
- **Accordion** – Collapsible experience and FAQ sections
- **Toast** – Notification on form submission

### Beyond-Class JavaScript Features
- **IntersectionObserver API** – Scroll-triggered fade-in animations
- **GitHub REST API (Fetch)** – Live repository cards on Projects page
- **Typing animation** – Typewriter effect with delete/retype cycle
- **CSS custom properties** – Full design token system in `styles.css`

---

## Project Structure

```
portfolio/
├── index.html          # Home / About page
├── experience.html     # Work history & education
├── projects.html       # Project showcase
├── contact.html        # Contact form & FAQ
├── css/
│   └── styles.css      # All custom styles (CSS custom properties)
├── js/
│   └── main.js         # All JavaScript (ES6+, ~220 lines)
└── README.md           # This file
```

---

##  Outside Libraries & Resources

| Resource | URL | Purpose |
|---|---|---|
| Bootstrap 5.3.0 | https://getbootstrap.com | CSS framework, components |
| Bootstrap Icons 1.11.0 | https://icons.getbootstrap.com | Icon set |
| jQuery 3.7.0 | https://jquery.com | Smooth scroll, animations |
| GitHub REST API v3 | https://docs.github.com/en/rest | Live repository data |
| Google Fonts (Segoe UI / system) | – | Typography (system font stack) |

### References & Tutorials
- Bootstrap Offcanvas docs: https://getbootstrap.com/docs/5.3/components/offcanvas/
- Bootstrap Accordion docs: https://getbootstrap.com/docs/5.3/components/accordion/
- IntersectionObserver MDN: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
- GitHub API docs: https://docs.github.com/en/rest/repos/repos
- CSS Custom Properties MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
- Typewriter effect inspiration: https://css-tricks.com/snippets/css/typewriter-effect/

---

## Grading Checklist

- [x] Navbar navigating between pages
- [x] About section with professional bio
- [x] Previous Work / Experience section
- [x] Projects section (6 projects with names, descriptions, and links)
- [x] Contact section with form
- [x] At least one CSS file (`css/styles.css`)
- [x] At least one JavaScript file (`js/main.js`) — 220+ lines, 10 features
- [x] Additional requirements: Offcanvas, Accordion, Toast, IntersectionObserver, GitHub API, typing animation
- [x] Responsive (mobile-first, tested at 375px, 768px, 1200px)
- [x] Semantic, valid, accessible HTML
- [x] Deployed on GitHub Pages
- [x] At least 6 meaningful commits
- [x] README with all required information
- [x] Journal submitted as PDF to Canvas

---

##  Commit History Summary

| # | Message | Files Changed |
|---|---|---|
| 1 | `Init: set up project structure and base HTML` | All HTML files, css/, js/ |
| 2 | `feat: add pastel CSS design system with custom properties` | css/styles.css |
| 3 | `feat: implement hero typing animation and scroll fade-ins` | js/main.js |
| 4 | `feat: add Bootstrap Offcanvas mobile nav and Accordion experience` | All HTML, main.js |
| 5 | `feat: add contact form with real-time validation and Toast notification` | contact.html, main.js |
| 6 | `feat: implement project filter and GitHub API repo fetch` | projects.html, main.js |
| 7 | `fix: accessibility improvements and aria-label additions` | All HTML |
| 8 | `docs: add README and finalize deployment` | README.md |

---

*Built with ♡ by Malini — CS 463/563 Final Project, Portland State University, 2026*

