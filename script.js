/**
 * Main Public Homepage Script for Ethiopian Online Lottery (የኢትዮጲያ ሎተሪ እጣ)
 */

let cachedLotteryData = null;

function initMainApp() {
  // 1. Initialize Language System
  initLanguageSystem();

  // 2. Load Dynamic Lottery Data (Header, Categories, Carousels)
  loadLotteryDataAndRender();

  // 3. Bind Modal Close Handlers
  initModalHandlers();

  // 4. Listen for language changes to update dynamic strings if needed
  window.addEventListener("languageChanged", () => {
    updateDynamicTranslations();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMainApp);
} else {
  initMainApp();
}

/**
 * Initialize 8-Language Selector Topbar
 */
function initLanguageSystem() {
  const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : "am";
  
  // Set active language button state
  document.querySelectorAll(".lang-btn").forEach(btn => {
    const lang = btn.getAttribute("data-lang");
    if (lang === currentLang) {
      btn.classList.add("active-lang");
    } else {
      btn.classList.remove("active-lang");
    }

    btn.addEventListener("click", () => {
      if (window.setLanguage) {
        window.setLanguage(lang);
      }
    });
  });

  // Apply initial translations
  if (window.setLanguage) {
    window.setLanguage(currentLang);
  }
}

/**
 * Load Lottery Data and Render Categories
 */
async function loadLotteryDataAndRender() {
  const container = document.getElementById("categories-container");
  const headerImg = document.getElementById("header-main-image");

  // First bind any pre-rendered cards
  bindExistingCategoryButtons();
  initAllCategorySliders();

  try {
    if (window.LotteryDB && window.LotteryDB.getLotteryData) {
      const data = await window.LotteryDB.getLotteryData();
      cachedLotteryData = data;

      // 1. Update Header Image
      if (headerImg && data.headerImage) {
        headerImg.src = data.headerImage;
      }

      // 2. Render 7 Categories dynamically if data available
      if (container && data.categories && data.categories.length > 0) {
        container.innerHTML = "";
        data.categories.forEach((cat, index) => {
          const card = createCategoryCardElement(cat, index);
          container.appendChild(card);
        });
        initAllCategorySliders();
      }
    }
  } catch (err) {
    console.error("Error loading lottery data:", err);
  }
}

function bindExistingCategoryButtons() {
  document.querySelectorAll(".open-category-btn").forEach(btn => {
    const catId = btn.getAttribute("data-category-id");
    if (catId) {
      btn.onclick = () => openCategoryDetailModal(catId);
    }
  });
}

/**
 * Create a single Category Card element
 */
function createCategoryCardElement(category, index) {
  const card = document.createElement("div");
  card.className = "category-card";
  card.id = `category-card-${category.id}`;

  const previewImages = (category.previewImages && category.previewImages.length > 0)
    ? category.previewImages
    : [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80"
      ];

  const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : "am";
  const catNameTranslated = window.t ? window.t(`cat_${category.id}`, currentLang) : category.name;
  const catDescTranslated = window.t ? window.t(`cat_${category.id}_desc`, currentLang) : "";

  card.innerHTML = `
    <div class="slider-container" id="slider-${category.id}">
      <div class="slider-track" id="track-${category.id}">
        <div class="slider-slide">
          <img src="${previewImages[0]}" alt="${category.name} 1" class="slider-img" loading="lazy">
        </div>
        <div class="slider-slide">
          <img src="${previewImages[1] || previewImages[0]}" alt="${category.name} 2" class="slider-img" loading="lazy">
        </div>
      </div>
      <button type="button" class="slider-nav-btn slider-prev" data-cat="${category.id}" aria-label="Previous image">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <button type="button" class="slider-nav-btn slider-next" data-cat="${category.id}" aria-label="Next image">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>
      <div class="slider-dots" id="dots-${category.id}">
        <span class="slider-dot active" data-slide="0"></span>
        <span class="slider-dot" data-slide="1"></span>
      </div>
    </div>
    
    <div class="category-content">
      <div class="category-header-row">
        <h3 class="category-name" data-i18n="cat_${category.id}">${catNameTranslated}</h3>
        <span class="category-badge">2 ${window.t ? window.t("categoriesTitle") : "እጣዎች"}</span>
      </div>
      <p class="category-desc" data-i18n="cat_${category.id}_desc">${catDescTranslated}</p>
      
      <button type="button" class="btn-primary open-category-btn" data-category-id="${category.id}">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
        <span data-i18n="viewPrizes">${window.t ? window.t("viewPrizes", currentLang) : "ሽልማቶችን ይመልከቱ"}</span>
      </button>
    </div>
  `;

  // Bind Open Detail Modal button
  const openBtn = card.querySelector(".open-category-btn");
  openBtn.addEventListener("click", () => {
    openCategoryDetailModal(category.id);
  });

  return card;
}

/**
 * Initialize Sliders for all categories (Auto-slide + Click Nav)
 */
function initAllCategorySliders() {
  if (!cachedLotteryData || !cachedLotteryData.categories) return;

  cachedLotteryData.categories.forEach((cat) => {
    const track = document.getElementById(`track-${cat.id}`);
    const dots = document.querySelectorAll(`#dots-${cat.id} .slider-dot`);
    const prevBtn = document.querySelector(`.slider-prev[data-cat="${cat.id}"]`);
    const nextBtn = document.querySelector(`.slider-next[data-cat="${cat.id}"]`);

    let currentSlide = 0;

    function goToSlide(index) {
      currentSlide = index % 2;
      if (track) {
        track.style.transform = `translateX(-${currentSlide * 50}%)`;
      }
      dots.forEach((dot, i) => {
        if (i === currentSlide) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        goToSlide(currentSlide === 0 ? 1 : 0);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        goToSlide(currentSlide === 0 ? 1 : 0);
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        goToSlide(idx);
      });
    });

    // Auto rotate every 5.5 seconds
    setInterval(() => {
      goToSlide(currentSlide === 0 ? 1 : 0);
    }, 5500 + Math.random() * 2000);
  });
}

/**
 * Open Category Detail Modal with 2 Sections
 */
function openCategoryDetailModal(categoryId) {
  const modal = document.getElementById("category-modal");
  const modalBody = document.getElementById("modal-category-body");
  const modalTitle = document.getElementById("modal-category-title");

  if (!modal || !cachedLotteryData) return;

  const category = cachedLotteryData.categories.find(c => c.id === categoryId);
  if (!category) return;

  const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : "am";
  const catNameTranslated = window.t ? window.t(`cat_${category.id}`, currentLang) : category.name;

  if (modalTitle) {
    modalTitle.textContent = `${catNameTranslated} - ${window.t ? window.t("categoriesTitle", currentLang) : "የሽልማት ዝርዝር"}`;
  }

  // Populate 2 Prize Sections
  modalBody.innerHTML = "";

  const sections = category.sections || [
    {
      id: 1,
      title: "ዋናው ፕሪሚየም ሽልማት",
      price: "500",
      ticketsTotal: 5000,
      ticketsRemaining: 3400,
      description: "ሙሉ አማራጭ ያለው ዘመናዊ ፕሪሚየም ሽልማት።",
      images: category.previewImages
    },
    {
      id: 2,
      title: "ልዩ የሁለተኛ ደረጃ ሽልማት",
      price: "300",
      ticketsTotal: 8000,
      ticketsRemaining: 5200,
      description: "ሁለተኛ ደረጃ ምርጥ ሽልማት።",
      images: category.previewImages
    }
  ];

  sections.forEach((sec, idx) => {
    const secEl = document.createElement("div");
    secEl.className = "prize-section-card";
    
    const secImages = (sec.images && sec.images.length > 0) ? sec.images : category.previewImages;

    secEl.innerHTML = `
      <div class="slider-container" id="modal-slider-${category.id}-${sec.id}" style="height: 230px; border-radius: 14px;">
        <div class="slider-track" id="modal-track-${category.id}-${sec.id}">
          <div class="slider-slide">
            <img src="${secImages[0]}" alt="${sec.title} 1" class="slider-img">
          </div>
          <div class="slider-slide">
            <img src="${secImages[1] || secImages[0]}" alt="${sec.title} 2" class="slider-img">
          </div>
        </div>
        <button type="button" class="slider-nav-btn slider-prev" id="modal-prev-${category.id}-${sec.id}" aria-label="Previous">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button type="button" class="slider-nav-btn slider-next" id="modal-next-${category.id}-${sec.id}" aria-label="Next">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
        </button>
        <div class="slider-dots" id="modal-dots-${category.id}-${sec.id}">
          <span class="slider-dot active" data-slide="0"></span>
          <span class="slider-dot" data-slide="1"></span>
        </div>
      </div>

      <div class="section-details-wrapper">
        <div class="section-tag">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
          <span>${idx === 0 ? (window.t("section1Title", currentLang) || "ክፍል 1") : (window.t("section2Title", currentLang) || "ክፍል 2")}</span>
        </div>
        <h4 class="section-prize-title">${sec.title}</h4>
        <p class="section-prize-desc">${sec.description}</p>
        
        <div class="prize-meta-row">
          <span class="meta-item-label">${window.t("ticketPriceLabel", currentLang) || "የቲኬት ዋጋ:"}</span>
          <span class="meta-item-value">${sec.price} ${window.t("currency", currentLang) || "ብር"}</span>
        </div>

        <a href="payment.html?cat=${category.id}&sec=${sec.id}&title=${encodeURIComponent(sec.title)}&price=${sec.price}" class="btn-cut-ticket">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>
          <span>${window.t("cutTicket", currentLang) || "ቁረጥ"}</span>
        </a>
      </div>
    `;

    modalBody.appendChild(secEl);

    // Bind slider events
    setTimeout(() => {
      const track = document.getElementById(`modal-track-${category.id}-${sec.id}`);
      const dots = document.querySelectorAll(`#modal-dots-${category.id}-${sec.id} .slider-dot`);
      const prev = document.getElementById(`modal-prev-${category.id}-${sec.id}`);
      const next = document.getElementById(`modal-next-${category.id}-${sec.id}`);
      let slide = 0;

      function go(idx) {
        slide = idx % 2;
        if (track) track.style.transform = `translateX(-${slide * 50}%)`;
        dots.forEach((d, i) => d.classList.toggle("active", i === slide));
      }

      if (prev) prev.addEventListener("click", () => go(slide === 0 ? 1 : 0));
      if (next) next.addEventListener("click", () => go(slide === 0 ? 1 : 0));
      dots.forEach((d, i) => d.addEventListener("click", () => go(i)));
    }, 50);
  });

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Bind modal close buttons
function initModalHandlers() {
  const modal = document.getElementById("category-modal");
  const closeBtn = document.getElementById("modal-close-btn");

  if (closeBtn && modal) {
    closeBtn.onclick = () => {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    };

    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    };
  }
}

function updateDynamicTranslations() {
  if (cachedLotteryData) {
    loadLotteryDataAndRender();
  }
}
