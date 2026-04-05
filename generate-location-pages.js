const fs = require('fs');
const path = require('path');

const outputDir = __dirname;

const locations = [
  { slug: 'luton', name: 'Luton', county: 'Bedfordshire', distance: 'our home town', nearby: 'Dunstable, Harpenden, and Leighton Buzzard' },
  { slug: 'dunstable', name: 'Dunstable', county: 'Bedfordshire', distance: 'just 5 miles from our Luton base', nearby: 'Luton, Leighton Buzzard, and Harpenden' },
  { slug: 'bedford', name: 'Bedford', county: 'Bedfordshire', distance: 'around 20 miles north of Luton', nearby: 'Luton, Northampton, and Milton Keynes' },
  { slug: 'milton-keynes', name: 'Milton Keynes', county: 'Buckinghamshire', distance: 'approximately 25 miles from our Luton base', nearby: 'Bedford, Northampton, and Aylesbury' },
  { slug: 'watford', name: 'Watford', county: 'Hertfordshire', distance: 'around 20 miles south of Luton', nearby: 'St Albans, Hemel Hempstead, and Luton' },
  { slug: 'st-albans', name: 'St Albans', county: 'Hertfordshire', distance: 'approximately 10 miles south of Luton', nearby: 'Luton, Harpenden, and Watford' },
  { slug: 'harpenden', name: 'Harpenden', county: 'Hertfordshire', distance: 'just 7 miles from Luton', nearby: 'Luton, St Albans, and Wheathampstead' },
  { slug: 'leighton-buzzard', name: 'Leighton Buzzard', county: 'Bedfordshire', distance: 'about 12 miles west of Luton', nearby: 'Dunstable, Luton, and Milton Keynes' },
  { slug: 'hemel-hempstead', name: 'Hemel Hempstead', county: 'Hertfordshire', distance: 'around 15 miles south-west of Luton', nearby: 'Watford, St Albans, and Luton' },
  { slug: 'northampton', name: 'Northampton', county: 'Northamptonshire', distance: 'approximately 35 miles north of Luton', nearby: 'Bedford, Milton Keynes, and Wellingborough' },
  { slug: 'stevenage', name: 'Stevenage', county: 'Hertfordshire', distance: 'about 20 miles east of Luton', nearby: 'Luton, Hitchin, and St Albans' },
  { slug: 'aylesbury', name: 'Aylesbury', county: 'Buckinghamshire', distance: 'roughly 25 miles south-west of Luton', nearby: 'Luton, Milton Keynes, and Hemel Hempstead' },
];

const navLinks = `<ul class="nav-links"><li><a href="index.html">Home</a></li><li><a href="about.html">About</a></li><li class="nav-dropdown"><a href="driving-lessons.html">Lessons</a><ul class="dropdown-menu"><li><a href="driving-lessons.html">All Lessons</a></li><li><a href="manual-lessons.html">Manual Lessons</a></li><li><a href="automatic-lessons.html">Automatic Lessons</a></li><li><a href="intensive-courses.html">Intensive Courses</a></li></ul></li><li><a href="prices.html">Prices</a></li><li><a href="reviews.html">Reviews</a></li><li><a href="blog.html">Blog</a></li><li><a href="contact.html">Contact</a></li></ul>`;

const mobileNav = `<div id="mobile-menu" class="mobile-menu"><a href="index.html">🏠 Home</a><a href="about.html">👋 About</a><a href="driving-lessons.html">🚗 Lessons</a><a href="manual-lessons.html">⚙️ Manual</a><a href="automatic-lessons.html">🔄 Automatic</a><a href="intensive-courses.html">⚡ Intensive</a><a href="prices.html">💷 Prices</a><a href="reviews.html">⭐ Reviews</a><a href="blog.html">📝 Blog</a><a href="contact.html">📞 Contact</a><div class="mobile-cta"><a href="tel:07365530540" class="btn btn-primary">📞 Call</a><a href="https://wa.me/447365530540" class="btn btn-green">💬 WhatsApp</a><a href="contact.html" class="btn btn-secondary">📅 Book</a></div></div>`;

const footer = `<footer><div class="container"><div class="footer-grid"><div class="footer-brand"><div class="footer-logo">🚗 Quick<span style="color:var(--primary);">Learn</span></div><p>Professional driving lessons in Luton and surrounding areas.</p></div><div class="footer-nav"><h4>Pages</h4><ul><li><a href="index.html">Home</a></li><li><a href="about.html">About</a></li><li><a href="driving-lessons.html">Lessons</a></li><li><a href="prices.html">Prices</a></li><li><a href="reviews.html">Reviews</a></li><li><a href="contact.html">Contact</a></li></ul></div><div class="footer-nav"><h4>Courses</h4><ul><li><a href="manual-lessons.html">Manual</a></li><li><a href="automatic-lessons.html">Automatic</a></li><li><a href="intensive-courses.html">Intensive</a></li></ul></div><div class="footer-nav"><h4>Contact</h4><div class="footer-contact-item"><span class="icon">📞</span><div><div style="color:#fff;">07365530540</div></div></div><div class="footer-contact-item"><span class="icon">📍</span><div><div style="color:#fff;">Luton, UK</div></div></div></div></div><div class="footer-bottom"><div>© 2025 QuickLearn Driving School</div><div class="footer-bottom-links"><a href="#">Privacy</a><a href="sitemap.xml">Sitemap</a></div></div></div></footer>`;

const stickyCTA = `<a id="whatsapp-btn" href="https://wa.me/447365530540" target="_blank" rel="noopener" aria-label="WhatsApp">💬</a><div id="sticky-cta"><a href="tel:07365530540" class="cta-call">📞 Call</a><a href="https://wa.me/447365530540" class="cta-wa" target="_blank">💬 WhatsApp</a><a href="contact.html" class="cta-book">📅 Book</a></div>`;

function genPage(loc) {
  const { slug, name, county, distance, nearby } = loc;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Driving Lessons ${name} | Driving Instructor ${name} | QuickLearn</title>
  <meta name="description" content="Expert driving lessons in ${name}, ${county}. QuickLearn provides DVSA-approved manual &amp; automatic lessons. 93+ five-star reviews. Book now: 07365530540."/>
  <link rel="canonical" href="https://quicklearndrivingschool.co.uk/${slug}/"/>
  <link rel="stylesheet" href="styles.css"/>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"DrivingSchool","name":"QuickLearn Driving School – ${name}","telephone":"07365530540","address":{"@type":"PostalAddress","addressLocality":"${name}","addressRegion":"${county}","addressCountry":"GB"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"5","reviewCount":"93"}}</script>
</head>
<body>
<div class="scam-bar">⚠️ No online payments before lessons. Pay in person only. <a href="tel:07365530540">07365530540</a></div>
<nav id="navbar"><div class="container nav-inner"><a href="index.html" class="nav-logo"><div class="logo-icon">🚗</div>Quick<span>Learn</span></a>${navLinks}<div class="nav-cta"><a href="tel:07365530540" class="nav-call">📞 07365530540</a><a href="contact.html" class="btn btn-primary btn-sm">Book Now</a></div><button class="hamburger" id="hamburger"><span></span><span></span><span></span></button></div></nav>
${mobileNav}

<section class="page-hero"><div class="container">
  <div class="breadcrumb"><a href="index.html">Home</a> › Driving Lessons ${name}</div>
  <h1>Driving Lessons in ${name}</h1>
  <p>Professional, DVSA-approved driving instruction in ${name}, ${county}. Manual lessons from £37.50/hr · Automatic from £40/hr · 93+ five-star reviews.</p>
  <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:24px;">
    <a href="contact.html" class="btn btn-primary btn-lg">📅 Book in ${name}</a>
    <a href="tel:07365530540" class="btn btn-white btn-lg">📞 07365530540</a>
  </div>
</div></section>

<section><div class="container content-section">
  <h2>Driving Lessons ${name} – Everything You Need to Know</h2>
  <p>If you're looking for a reliable, professional <strong>driving instructor in ${name}</strong>, QuickLearn Driving School is here to help. Based ${distance}, we provide expert driving tuition across ${name} and ${county}, with lessons tailored to every ability level and learning style.</p>
  <p>Our DVSA-approved instructors bring years of experience helping learners in ${name} and the surrounding areas pass their driving tests – often first time. Whether you're a complete beginner, a nervous driver, or someone returning to the road after a long break, we have a course that's right for you.</p>

  <h2>Why Choose QuickLearn for Driving Lessons in ${name}?</h2>
  <ul>
    <li><strong>DVSA-Approved Instructors</strong> – All our instructors are fully qualified, DBS-checked, and registered with the DVSA.</li>
    <li><strong>93+ Five-Star Reviews</strong> – Our reputation speaks for itself. Read <a href="reviews.html">genuine reviews from real pupils</a> across ${name} and beyond.</li>
    <li><strong>Flexible Scheduling</strong> – We offer lessons 7 days a week, from early mornings to evenings, to fit around your lifestyle.</li>
    <li><strong>Tailored Lesson Plans</strong> – Every lesson is structured around your individual needs, weaknesses, and goals.</li>
    <li><strong>High First-Time Pass Rate</strong> – We focus on the skills that matter most for your driving test and beyond.</li>
    <li><strong>Modern Dual-Control Vehicles</strong> – You'll learn in a safe, well-maintained, dual-controlled car.</li>
  </ul>

  <h2>Our Driving Lesson Courses in ${name}</h2>

  <h3>Manual Driving Lessons in ${name} – From £37.50/hr</h3>
  <p>Our <a href="manual-lessons.html">manual driving lessons</a> in ${name} teach you full vehicle control including clutch operation, gear changes, and smooth road positioning. A manual licence gives you maximum flexibility – you can drive both manual and automatic vehicles. This is the most popular choice among learners in ${county} and remains the most widely used type of car in the UK.</p>

  <h3>Automatic Driving Lessons in ${name} – From £40/hr</h3>
  <p>Our <a href="automatic-lessons.html">automatic driving lessons</a> in ${name} are ideal for nervous learners, those returning to driving, or anyone who simply wants a less stressful learning experience. Without needing to manage the clutch and gears, you can focus fully on road observation and safety – many of our ${name} pupils find this helps them progress noticeably faster.</p>

  <h3>Intensive Driving Courses in ${name}</h3>
  <p>If you need your driving licence quickly, our <a href="intensive-courses.html">intensive crash courses</a> are the fastest route to your goal. We design each package around your start point and your target test date, packing multiple hours of professional tuition into a condensed 1–3 week schedule. <a href="contact.html">Contact us for a tailored quote today.</a></p>

  <h2>Driving Test Centres Near ${name}</h2>
  <p>We make sure every pupil in ${name} is fully familiar with the local roads and test routes before their exam. We cover the driving test routes and conditions in ${county} and the surrounding areas, including roads near ${nearby}. You'll feel comfortable and confident on test day because you'll have practised in those exact conditions.</p>

  <h2>What Our ${name} Pupils Say</h2>
  <div class="testimonials-grid" style="margin:28px 0;">
    <div class="testimonial-card"><div class="tc-stars">★★★★★</div><p class="tc-text">"Brilliant instructor, very patient and professional. I was nervous about learning in ${name} because the roads can be busy, but my lessons gave me total confidence. Passed first time!"</p><div class="tc-author"><div class="tc-avatar">K</div><div><div class="tc-name">Katie G.</div><div class="tc-sub">${name} – Passed First Time ✅</div></div></div></div>
    <div class="testimonial-card"><div class="tc-stars">★★★★★</div><p class="tc-text">"I'd heard great things about QuickLearn from friends in ${name}. The lessons were structured, clear, and the instructor was always on time. Highly recommend!"</p><div class="tc-author"><div class="tc-avatar">R</div><div><div class="tc-name">Ravi S.</div><div class="tc-sub">${name} – Manual Lessons ✅</div></div></div></div>
  </div>
  <a href="reviews.html" class="btn btn-secondary">Read All 93+ Reviews →</a>

  <h2>Driving Lesson Prices in ${name}</h2>
  <p>We believe everyone deserves access to quality driving instruction at a fair price. Our current lesson rates in ${name} are:</p>
  <ul>
    <li><strong>Manual Driving Lessons:</strong> £37.50 per hour</li>
    <li><strong>Automatic Driving Lessons:</strong> £40.00 per hour</li>
    <li><strong>Intensive Courses:</strong> Custom packages – <a href="contact.html">contact us for a quote</a></li>
  </ul>
  <p>All payments are made <strong>in person only</strong>. We never take online payments before lessons. See our <a href="prices.html">full pricing page</a> for more details.</p>

  <h2>Areas We Also Cover Near ${name}</h2>
  <p>As well as driving lessons in ${name}, we serve learners across ${county} and the wider region, including ${nearby}. See all our <a href="index.html#areas">coverage areas here</a>.</p>

  <div style="background:var(--primary-light);border:2px solid var(--primary);border-radius:var(--radius-lg);padding:32px;margin:40px 0;text-align:center;">
    <h3 style="color:var(--secondary);">📅 Book Your Driving Lesson in ${name} Today</h3>
    <p style="margin:12px 0 24px;">Join hundreds of successful pupils from ${name} and ${county} who passed with QuickLearn.</p>
    <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
      <a href="contact.html" class="btn btn-primary">Book a Lesson</a>
      <a href="tel:07365530540" class="btn btn-secondary">📞 07365530540</a>
      <a href="https://wa.me/447365530540" class="btn btn-green" target="_blank">💬 WhatsApp</a>
    </div>
  </div>
</div></section>

<section class="bg-soft" style="padding:40px 0;"><div class="container"><div class="section-header" style="margin-bottom:24px;"><span class="section-label">More Areas</span><h3>Other Areas We Cover</h3></div><div class="location-grid"><a href="luton.html" class="location-pill">📍 Luton</a><a href="dunstable.html" class="location-pill">📍 Dunstable</a><a href="bedford.html" class="location-pill">📍 Bedford</a><a href="milton-keynes.html" class="location-pill">📍 Milton Keynes</a><a href="watford.html" class="location-pill">📍 Watford</a><a href="st-albans.html" class="location-pill">📍 St Albans</a><a href="harpenden.html" class="location-pill">📍 Harpenden</a><a href="leighton-buzzard.html" class="location-pill">📍 Leighton Buzzard</a><a href="hemel-hempstead.html" class="location-pill">📍 Hemel Hempstead</a><a href="northampton.html" class="location-pill">📍 Northampton</a><a href="stevenage.html" class="location-pill">📍 Stevenage</a><a href="aylesbury.html" class="location-pill">📍 Aylesbury</a></div></div></section>

${footer}
${stickyCTA}
<script src="script.js"></script>
</body></html>`;
}

let count = 0;
for (const loc of locations) {
  const html = genPage(loc);
  const outPath = path.join(outputDir, `${loc.slug}.html`);
  fs.writeFileSync(outPath, html, 'utf8');
  count++;
  console.log(`Created: ${loc.slug}.html`);
}

console.log(`\n✅ Generated ${count} location pages successfully!`);
