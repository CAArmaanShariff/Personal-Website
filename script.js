document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------
     BIO MODAL
     ------------------------------------------------------------------ */
  const modal = document.getElementById('bioModal');
  const openTrigger = document.getElementById('bioTrigger');
  const closeBtn = document.getElementById('bioClose');
  const backdrop = modal.querySelector('[data-close-modal]');

  let lastFocused = null;

  function openModal() {
    lastFocused = document.activeElement;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeydown);
    if (lastFocused) lastFocused.focus();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') closeModal();
  }

  openTrigger.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  /* ------------------------------------------------------------------
     BOOKSHELF — WRITINGS
     ------------------------------------------------------------------ */
  const books = {
    'blurred-bloodlines': {
      type: 'image',
      cover: 'images/blurred_bloodlines_cover.jpg',
      category: 'Book',
      title: 'Blurred Bloodlines',
      desc: 'I published a short story based on the Babri Masjid issue back in 2019 (before the dreaded Covid period). The story showed the power of secularism, peace and brotherhood. You can buy my short story (PS: It is based on a true story!)',
      ctaLabel: 'Buy on Amazon',
      ctaHref: 'https://www.amazon.in/Blurred-Bloodlines-brotherhood-Armaan-Shariff/dp/1648284337',
    },
    'student-reporter': {
      type: 'css',
      cssColor: 'linear-gradient(90deg, #132240 0%, #233d73 50%, #132240 100%)', // Dark Blue
      category: 'Journalism',
      title: 'Student Reporter',
      desc: 'Following the footsteps of my sister, I was the Times of India student reporter in my school. I also used to report the events occurring in Chennai occasionally for Yocee (Students newspaper). It was inevitable considering that I loved reading & writing! ',
      ctaLabel: 'Read my article',
      ctaHref: 'https://yocee.in/author/armaan_shariff/',
    },
    'youthpur': {
      type: 'image',
      cover: 'images/youthpur.jpg', // Make sure to add your Youthpur image here!
      category: 'Blog',
      title: 'Youthpur',
      desc: 'This was a passion project that my friend and I took up in 2019-20. The theme was all things youth. I learnt many things about blog writing, virality, SEO optimization, different types of content. We tried everything – blogs, carousels, tweets, reels, concept videos, podcasts, interviews and we had so much fun in the process! ',
      ctaLabel: 'Check out the blog',
      ctaHref: 'https://youthpurofficial.wordpress.com/blog-2/',
    },
    'poetry': {
      type: 'css',
      cssColor: 'linear-gradient(90deg, #14281c 0%, #244733 50%, #14281c 100%)', // Dark Green
      category: 'Prose & Poetry',
      title: 'Prose & Poetry',
      desc: 'I tend to write poems generally on the themes of melancholy, nostalgia, tragedy, childhood, loss, etc. I draw inspiration from the likes of giants like Khaled Hosseini (the author of ‘The Kite Runner’) and Mahmoud Darwish (the Palestinian poet).',
      ctaLabel: 'Read more',
      ctaHref: 'files/Prose & Poetry.pdf', // Replace poems.docx with your exact file name
    },
  };

  const spines = document.querySelectorAll('.spine');
  const panel = document.getElementById('bookPanel');
  const panelCover = document.getElementById('bookCover');
  const cssCover = document.getElementById('cssCover'); // New
  const cssCoverTitle = document.getElementById('cssCoverTitle'); // New
  const panelCategory = document.getElementById('bookCategory');
  const panelTitle = document.getElementById('bookTitle');
  const panelDesc = document.getElementById('bookDesc');
  const panelCta = document.getElementById('bookCta');

  function showBook(key) {
    const book = books[key];
    if (!book || !panel) return;

    // Reveal the panel if it was hidden on page load
    if (panel.style.display === 'none') {
      panel.style.display = 'flex';
    }

    panel.classList.add('is-updating');

    window.setTimeout(() => {
      // Toggle between Image and CSS Cover
      if (book.type === 'image') {
        panelCover.style.display = 'block';
        cssCover.style.display = 'none';
        panelCover.src = book.cover;
        panelCover.alt = `${book.title} cover`;
      } else {
        panelCover.style.display = 'none';
        cssCover.style.display = 'flex';
        cssCover.style.background = book.cssColor;
        cssCoverTitle.textContent = book.title;
      }

      panelCategory.textContent = book.category;
      panelTitle.textContent = book.title;
      panelDesc.textContent = book.desc;
      panelCta.textContent = book.ctaLabel;
      panelCta.href = book.ctaHref;
      panel.classList.remove('is-updating');
    }, 150);
  }
  spines.forEach((spine) => {
    spine.addEventListener('click', () => {
      spines.forEach((otherSpine) => {
        otherSpine.classList.remove('is-active');
        otherSpine.setAttribute('aria-selected', 'false');
      });
      spine.classList.add('is-active');
      spine.setAttribute('aria-selected', 'true');
      showBook(spine.dataset.book);
    });
  });
  /* ------------------------------------------------------------------
     VINYL — JAMMING TO
     ------------------------------------------------------------------ */
  const vinylRecord = document.getElementById('vinyl-record');
  const bgMusic = document.getElementById('bg-music');

  if (vinylRecord && bgMusic) {
    vinylRecord.addEventListener('click', () => {
      if (bgMusic.paused) {
        bgMusic.play();
      } else {
        bgMusic.pause();
      }
    });

    // Let the audio element's own state drive the spin, so the vinyl
    // stays in sync even if playback starts/stops some other way.
    bgMusic.addEventListener('play', () => {
      vinylRecord.classList.add('is-playing');
    });

    bgMusic.addEventListener('pause', () => {
      vinylRecord.classList.remove('is-playing');
    });

    bgMusic.addEventListener('ended', () => {
      vinylRecord.classList.remove('is-playing');
    });
  }
  /* ------------------------------------------------------------------
     ACCORDION
     ------------------------------------------------------------------ */
  const triggers = document.querySelectorAll('.accordion__trigger');

  triggers.forEach((trigger) => {
    const panel = trigger.nextElementSibling;
    panel.style.maxHeight = '0px';

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      triggers.forEach((otherTrigger) => {
        if (otherTrigger !== trigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
          otherTrigger.nextElementSibling.style.maxHeight = '0px';
        }
      });

      trigger.setAttribute('aria-expanded', String(!isOpen));
      panel.style.maxHeight = isOpen ? '0px' : `${panel.scrollHeight}px`;
    });
  });

  /* ------------------------------------------------------------------
     FOOTER YEAR
     ------------------------------------------------------------------ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  // Show SRK pose on mobile touch & scroll
  const srkTouch = document.createElement('img');
  srkTouch.src = 'images/srk-cursor.png';
  srkTouch.style.cssText = `
    position: fixed;
    width: 52px;
    height: auto;
    pointer-events: none;
    z-index: 99999;
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
    transition: opacity 0.4s ease, transform 0.2s ease;
  `;
  document.body.appendChild(srkTouch);

  let touchTimer;
  function showSrkAt(x, y) {
    srkTouch.style.left = `${x}px`;
    srkTouch.style.top = `${y}px`;
    srkTouch.style.opacity = '1';
    srkTouch.style.transform = 'translate(-50%, -50%) scale(1)';

    clearTimeout(touchTimer);
    // Stays visible for 2.5 seconds (2500ms). 
    // TIP: If you want it to stay on screen PERMANENTLY after the first tap, delete the 4 lines below!
    touchTimer = setTimeout(() => {
      srkTouch.style.opacity = '0';
      srkTouch.style.transform = 'translate(-50%, -50%) scale(0.9)';
    }, 750);

  }

  window.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    showSrkAt(touch.clientX, touch.clientY);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    showSrkAt(touch.clientX, touch.clientY);
  }, { passive: true });
});