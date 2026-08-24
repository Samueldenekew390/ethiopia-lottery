/**
 * Ethiopian Online Lottery (የኢትዮጲያ ሎተሪ እጣ)
 * Fully Functional Admin Dashboard Script
 */

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Check Authentication Status
  checkAdminAuth();

  // 2. Setup Login Form
  setupLoginForm();

  // 3. Setup Navigation Tabs
  setupTabs();

  // 4. Setup Logout Button
  setupLogout();

  // 5. Setup Copy SQL Script
  setupCopySql();
});

/**
 * Authentication Verification
 */
function checkAdminAuth() {
  const session = window.LotteryDB ? window.LotteryDB.getAdminSession() : null;
  const loginView = document.getElementById("admin-login-view");
  const dashboardView = document.getElementById("admin-dashboard-view");
  const adminEmailEl = document.getElementById("admin-user-email");

  if (session && session.email) {
    if (loginView) loginView.style.display = "none";
    if (dashboardView) dashboardView.style.display = "flex";
    if (adminEmailEl) adminEmailEl.textContent = session.email;

    // Load all admin modules
    loadAdminDashboardData();
  } else {
    if (loginView) loginView.style.display = "flex";
    if (dashboardView) dashboardView.style.display = "none";
  }
}

function setupLoginForm() {
  const form = document.getElementById("admin-login-form");
  const emailInput = document.getElementById("admin-email");
  const passInput = document.getElementById("admin-password");
  const errorMsg = document.getElementById("login-error-msg");
  const loginBtn = document.getElementById("btn-admin-login");
  const loginText = document.getElementById("login-btn-text");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = (emailInput.value || "").trim();
    const pass = (passInput.value || "").trim();

    if (!email || !pass) {
      showError(errorMsg, "እባክዎ ኢሜል እና የይለፍ ቃል ያስገቡ");
      return;
    }

    loginBtn.disabled = true;
    loginText.textContent = "በማረጋገጥ ላይ...";

    try {
      const res = await window.LotteryDB.adminLogin(email, pass);
      if (res && res.success) {
        checkAdminAuth();
      } else {
        showError(errorMsg, res.message || "የተሳሳተ ኢሜል ወይም የይለፍ ቃል!");
      }
    } catch (err) {
      showError(errorMsg, "ስህተት ተፈጥሯል: " + err.message);
    } finally {
      loginBtn.disabled = false;
      loginText.textContent = "ግባ (Sign In)";
    }
  });
}

function setupLogout() {
  const logoutBtn = document.getElementById("btn-admin-logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      if (confirm("ከአስተዳዳሪ ክፍል መውጣት ይፈልጋሉ? (Are you sure you want to log out?)")) {
        await window.LotteryDB.adminLogout();
        checkAdminAuth();
      }
    });
  }
}

/**
 * Tab Navigation Handling
 */
function setupTabs() {
  const tabBtns = document.querySelectorAll(".admin-tab-btn");
  const tabContents = document.querySelectorAll(".admin-tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTabId = btn.getAttribute("data-tab");

      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      tabContents.forEach((content) => {
        if (content.id === targetTabId) {
          content.style.display = "block";
        } else {
          content.style.display = "none";
        }
      });
    });
  });
}

/**
 * Load all Admin Data
 */
let adminLotteryData = null;

async function loadAdminDashboardData() {
  try {
    adminLotteryData = await window.LotteryDB.getLotteryData();

    // 1. Header Image Management
    initHeaderImageManager();

    // 2. Category & Section Images Management
    renderImageSlots();

    // 3. Customer Purchases
    await loadCustomerPurchases();

    // 4. Payment Methods
    await loadAdminPaymentMethods();

    // Setup Category Filter Listener
    const filterSelect = document.getElementById("admin-category-filter");
    if (filterSelect) {
      filterSelect.addEventListener("change", () => {
        renderImageSlots();
      });
    }
  } catch (err) {
    console.error("Error loading admin dashboard data:", err);
  }
}

/* ==========================================================================
   MODULE 1: HEADER IMAGE MANAGER
   ========================================================================== */
function initHeaderImageManager() {
  const previewImg = document.getElementById("admin-header-preview");
  const fileInput = document.getElementById("admin-header-file-input");
  const chooseBtn = document.getElementById("btn-select-header-file");
  const urlInput = document.getElementById("admin-header-url-input");
  const saveUrlBtn = document.getElementById("btn-save-header-url");
  const resetBtn = document.getElementById("btn-reset-header-img");

  if (!adminLotteryData) return;

  if (previewImg && adminLotteryData.headerImage) {
    previewImg.src = adminLotteryData.headerImage;
    if (urlInput) urlInput.value = adminLotteryData.headerImage;
  }

  // Choose File Trigger
  if (chooseBtn && fileInput) {
    chooseBtn.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", async (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        chooseBtn.disabled = true;
        chooseBtn.innerHTML = `<span class="spinner"></span> <span>በመስቀል ላይ...</span>`;

        try {
          const uploadedUrl = await window.LotteryDB.uploadImageToStorage(file, "headers");
          await window.LotteryDB.updateHeaderImage(uploadedUrl);
          adminLotteryData.headerImage = uploadedUrl;
          if (previewImg) previewImg.src = uploadedUrl;
          if (urlInput) urlInput.value = uploadedUrl;
          showToast("የራስጌ ምስል በተሳካ ሁኔታ ተቀይሯል! (Header Image Updated)");
        } catch (err) {
          alert("ምስሉን ማስገባት አልተቻለም: " + err.message);
        } finally {
          chooseBtn.disabled = false;
          chooseBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> <span>ምስል ይምረጡና ይስቀሉ (Choose & Upload)</span>`;
        }
      }
    });
  }

  // Direct URL Save
  if (saveUrlBtn && urlInput) {
    saveUrlBtn.addEventListener("click", async () => {
      const url = urlInput.value.trim();
      if (!url) return;
      await window.LotteryDB.updateHeaderImage(url);
      adminLotteryData.headerImage = url;
      if (previewImg) previewImg.src = url;
      showToast("የራስጌ ምስል ተቀምጧል!");
    });
  }

  // Reset Default
  if (resetBtn) {
    resetBtn.addEventListener("click", async () => {
      const defaultUrl = "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1600&q=80";
      await window.LotteryDB.updateHeaderImage(defaultUrl);
      adminLotteryData.headerImage = defaultUrl;
      if (previewImg) previewImg.src = defaultUrl;
      if (urlInput) urlInput.value = defaultUrl;
      showToast("ወደ ነባሪ ምስል ተመልሷል");
    });
  }
}

/* ==========================================================================
   MODULE 2: CATEGORY & SECTION IMAGE MANAGEMENT (28+ Slots)
   ========================================================================== */
function renderImageSlots() {
  const container = document.getElementById("admin-image-slots-container");
  const filterSelect = document.getElementById("admin-category-filter");
  if (!container || !adminLotteryData) return;

  const selectedFilter = filterSelect ? filterSelect.value : "all";
  container.innerHTML = "";

  adminLotteryData.categories.forEach((cat) => {
    if (selectedFilter !== "all" && cat.id !== selectedFilter) return;

    // 1. Category Preview Image 1
    const p1Card = createImageSlotCard({
      title: `${cat.name} - የፊት ምስል 1 (Preview 1)`,
      badge: `${cat.name} 1`,
      imageUrl: cat.previewImages[0] || "",
      onUpload: async (file) => {
        const url = await window.LotteryDB.uploadImageToStorage(file, `categories/${cat.id}`);
        await window.LotteryDB.updateCategoryPreviewImage(cat.id, 0, url);
        cat.previewImages[0] = url;
        renderImageSlots();
      },
      onUrlSave: async (url) => {
        await window.LotteryDB.updateCategoryPreviewImage(cat.id, 0, url);
        cat.previewImages[0] = url;
        renderImageSlots();
      },
      onDelete: async () => {
        await window.LotteryDB.updateCategoryPreviewImage(cat.id, 0, "");
        cat.previewImages[0] = "";
        renderImageSlots();
      }
    });
    container.appendChild(p1Card);

    // 2. Category Preview Image 2
    const p2Card = createImageSlotCard({
      title: `${cat.name} - የፊት ምስል 2 (Preview 2)`,
      badge: `${cat.name} 2`,
      imageUrl: cat.previewImages[1] || "",
      onUpload: async (file) => {
        const url = await window.LotteryDB.uploadImageToStorage(file, `categories/${cat.id}`);
        await window.LotteryDB.updateCategoryPreviewImage(cat.id, 1, url);
        cat.previewImages[1] = url;
        renderImageSlots();
      },
      onUrlSave: async (url) => {
        await window.LotteryDB.updateCategoryPreviewImage(cat.id, 1, url);
        cat.previewImages[1] = url;
        renderImageSlots();
      },
      onDelete: async () => {
        await window.LotteryDB.updateCategoryPreviewImage(cat.id, 1, "");
        cat.previewImages[1] = "";
        renderImageSlots();
      }
    });
    container.appendChild(p2Card);

    // 3. Section 1 Images & Description
    if (cat.sections && cat.sections[0]) {
      const s1 = cat.sections[0];
      const s1Img1Card = createImageSlotCard({
        title: `${cat.name} - ክፍል 1 ምስል 1`,
        badge: `ክፍል 1 (Sec 1)`,
        subtitle: s1.title,
        imageUrl: (s1.images && s1.images[0]) ? s1.images[0] : "",
        description: s1.description,
        showDescEditor: true,
        onUpload: async (file) => {
          const url = await window.LotteryDB.uploadImageToStorage(file, `sections/${cat.id}`);
          await window.LotteryDB.updateSectionData(cat.id, 1, 0, url, null);
          if (!s1.images) s1.images = [];
          s1.images[0] = url;
          renderImageSlots();
        },
        onUrlSave: async (url) => {
          await window.LotteryDB.updateSectionData(cat.id, 1, 0, url, null);
          if (!s1.images) s1.images = [];
          s1.images[0] = url;
          renderImageSlots();
        },
        onDescSave: async (desc) => {
          await window.LotteryDB.updateSectionData(cat.id, 1, null, null, desc);
          s1.description = desc;
          showToast("መግለጫው ተቀምጧል! (Description Saved)");
        },
        onDelete: async () => {
          await window.LotteryDB.updateSectionData(cat.id, 1, 0, "", null);
          if (s1.images) s1.images[0] = "";
          renderImageSlots();
        }
      });
      container.appendChild(s1Img1Card);

      const s1Img2Card = createImageSlotCard({
        title: `${cat.name} - ክፍል 1 ምስል 2`,
        badge: `ክፍል 1 (Sec 1)`,
        subtitle: s1.title,
        imageUrl: (s1.images && s1.images[1]) ? s1.images[1] : "",
        onUpload: async (file) => {
          const url = await window.LotteryDB.uploadImageToStorage(file, `sections/${cat.id}`);
          await window.LotteryDB.updateSectionData(cat.id, 1, 1, url, null);
          if (!s1.images) s1.images = [];
          s1.images[1] = url;
          renderImageSlots();
        },
        onUrlSave: async (url) => {
          await window.LotteryDB.updateSectionData(cat.id, 1, 1, url, null);
          if (!s1.images) s1.images = [];
          s1.images[1] = url;
          renderImageSlots();
        },
        onDelete: async () => {
          await window.LotteryDB.updateSectionData(cat.id, 1, 1, "", null);
          if (s1.images) s1.images[1] = "";
          renderImageSlots();
        }
      });
      container.appendChild(s1Img2Card);
    }

    // 4. Section 2 Images & Description
    if (cat.sections && cat.sections[1]) {
      const s2 = cat.sections[1];
      const s2Img1Card = createImageSlotCard({
        title: `${cat.name} - ክፍል 2 ምስል 1`,
        badge: `ክፍል 2 (Sec 2)`,
        subtitle: s2.title,
        imageUrl: (s2.images && s2.images[0]) ? s2.images[0] : "",
        description: s2.description,
        showDescEditor: true,
        onUpload: async (file) => {
          const url = await window.LotteryDB.uploadImageToStorage(file, `sections/${cat.id}`);
          await window.LotteryDB.updateSectionData(cat.id, 2, 0, url, null);
          if (!s2.images) s2.images = [];
          s2.images[0] = url;
          renderImageSlots();
        },
        onUrlSave: async (url) => {
          await window.LotteryDB.updateSectionData(cat.id, 2, 0, url, null);
          if (!s2.images) s2.images = [];
          s2.images[0] = url;
          renderImageSlots();
        },
        onDescSave: async (desc) => {
          await window.LotteryDB.updateSectionData(cat.id, 2, null, null, desc);
          s2.description = desc;
          showToast("መግለጫው ተቀምጧል!");
        },
        onDelete: async () => {
          await window.LotteryDB.updateSectionData(cat.id, 2, 0, "", null);
          if (s2.images) s2.images[0] = "";
          renderImageSlots();
        }
      });
      container.appendChild(s2Img1Card);

      const s2Img2Card = createImageSlotCard({
        title: `${cat.name} - ክፍል 2 ምስል 2`,
        badge: `ክፍል 2 (Sec 2)`,
        subtitle: s2.title,
        imageUrl: (s2.images && s2.images[1]) ? s2.images[1] : "",
        onUpload: async (file) => {
          const url = await window.LotteryDB.uploadImageToStorage(file, `sections/${cat.id}`);
          await window.LotteryDB.updateSectionData(cat.id, 2, 1, url, null);
          if (!s2.images) s2.images = [];
          s2.images[1] = url;
          renderImageSlots();
        },
        onUrlSave: async (url) => {
          await window.LotteryDB.updateSectionData(cat.id, 2, 1, url, null);
          if (!s2.images) s2.images = [];
          s2.images[1] = url;
          renderImageSlots();
        },
        onDelete: async () => {
          await window.LotteryDB.updateSectionData(cat.id, 2, 1, "", null);
          if (s2.images) s2.images[1] = "";
          renderImageSlots();
        }
      });
      container.appendChild(s2Img2Card);
    }
  });
}

/**
 * Helper to build an interactive image slot card
 */
function createImageSlotCard({ title, badge, subtitle, imageUrl, description, showDescEditor, onUpload, onUrlSave, onDescSave, onDelete }) {
  const card = document.createElement("div");
  card.className = "image-slot-card";

  const placeholderImg = "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=400&q=80";

  card.innerHTML = `
    <div class="slot-preview-box">
      <img src="${imageUrl || placeholderImg}" alt="${title}" class="slot-preview-img" loading="lazy">
      <span class="slot-badge">${badge}</span>
    </div>

    <div>
      <h4 style="font-size: 1rem; font-weight: 800; color: #ffffff;">${title}</h4>
      ${subtitle ? `<div style="font-size: 0.8rem; color: var(--gold-light); margin-bottom: 0.35rem;">${subtitle}</div>` : ""}
    </div>

    ${showDescEditor ? `
      <div style="margin-top: 0.25rem;">
        <label style="font-size: 0.75rem; color: var(--text-sub);">የሽልማቱ መግለጫ (Description):</label>
        <textarea class="form-input slot-desc-input" style="font-size: 0.8rem; padding: 0.4rem; height: 60px; resize: vertical;">${description || ""}</textarea>
        <button type="button" class="btn-sm btn-emerald btn-save-desc" style="margin-top: 0.3rem; width: 100%;">መግለጫ አስቀምጥ</button>
      </div>
    ` : ""}

    <div class="slot-actions" style="margin-top: auto; flex-wrap: wrap;">
      <input type="file" class="slot-file-input" accept="image/*" style="display: none;">
      <button type="button" class="btn-sm btn-emerald btn-upload-slot" style="flex: 1;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        <span>Upload</span>
      </button>

      <button type="button" class="btn-sm btn-primary btn-url-slot">
        <span>URL</span>
      </button>

      <button type="button" class="btn-sm btn-danger btn-delete-slot" title="Delete Image">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/></svg>
      </button>
    </div>
  `;

  // Bind Events
  const fileInput = card.querySelector(".slot-file-input");
  const uploadBtn = card.querySelector(".btn-upload-slot");
  const urlBtn = card.querySelector(".btn-url-slot");
  const deleteBtn = card.querySelector(".btn-delete-slot");
  const saveDescBtn = card.querySelector(".btn-save-desc");
  const descInput = card.querySelector(".slot-desc-input");

  if (uploadBtn && fileInput) {
    uploadBtn.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", async (e) => {
      if (e.target.files && e.target.files[0]) {
        uploadBtn.disabled = true;
        uploadBtn.innerHTML = `<span class="spinner" style="width: 12px; height: 12px;"></span>`;
        try {
          await onUpload(e.target.files[0]);
          showToast("ምስሉ ተጭኗል! (Image Uploaded Successfully)");
        } catch (err) {
          alert("Error: " + err.message);
        } finally {
          uploadBtn.disabled = false;
        }
      }
    });
  }

  if (urlBtn) {
    urlBtn.addEventListener("click", async () => {
      const newUrl = prompt("የምስል ሊንክ ያስገቡ (Enter Image URL):", imageUrl);
      if (newUrl !== null && newUrl.trim()) {
        await onUrlSave(newUrl.trim());
        showToast("ምስል ተቀይሯል!");
      }
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener("click", async () => {
      if (confirm("ይህንን ምስል ማጥፋት ይፈልጋሉ? (Delete this image?)")) {
        await onDelete();
        showToast("ምስሉ ጠፍቷል");
      }
    });
  }

  if (saveDescBtn && descInput) {
    saveDescBtn.addEventListener("click", async () => {
      await onDescSave(descInput.value.trim());
    });
  }

  return card;
}

/* ==========================================================================
   MODULE 3: CUSTOMER PURCHASES WITH DELETE & ZOOM
   ========================================================================== */
let allPurchases = [];

async function loadCustomerPurchases() {
  const tableBody = document.getElementById("purchases-table-body");
  const countBadge = document.getElementById("purchases-count-badge");
  const searchInput = document.getElementById("purchases-search-input");
  const exportBtn = document.getElementById("btn-export-csv");

  if (!tableBody) return;

  tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 2rem;"><span class="spinner"></span> በማምጣት ላይ...</td></tr>`;

  try {
    allPurchases = await window.LotteryDB.getTicketPurchases();
    if (countBadge) countBadge.textContent = allPurchases.length;
    renderPurchasesTable(allPurchases);

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        const filtered = allPurchases.filter((p) =>
          (p.phone && p.phone.includes(query)) ||
          (p.id && p.id.toLowerCase().includes(query)) ||
          (p.categoryName && p.categoryName.toLowerCase().includes(query))
        );
        renderPurchasesTable(filtered);
      });
    }

    if (exportBtn) {
      exportBtn.addEventListener("click", () => exportPurchasesToCSV(allPurchases));
    }
  } catch (err) {
    console.error("Error loading purchases:", err);
  }
}

function renderPurchasesTable(purchases) {
  const tableBody = document.getElementById("purchases-table-body");
  if (!tableBody) return;

  if (!purchases || purchases.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-sub); padding: 2.5rem;">ምንም የተቆረጠ ቲኬት አልተገኘም (No purchases recorded yet)</td></tr>`;
    return;
  }

  tableBody.innerHTML = "";

  purchases.forEach((p) => {
    const tr = document.createElement("tr");

    const formattedDate = new Date(p.createdAt).toLocaleDateString() + " " + new Date(p.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    tr.innerHTML = `
      <td style="font-family: monospace; font-weight: 800; color: var(--gold-pure);">${p.id}</td>
      <td style="font-weight: 700; color: #ffffff;">${p.phone}</td>
      <td>
        <span class="category-badge" style="font-size: 0.75rem;">${p.categoryName || p.categoryId}</span>
        <div style="font-size: 0.8rem; color: var(--text-muted);">${p.sectionTitle || ""}</div>
      </td>
      <td style="font-weight: 800; color: var(--gold-light);">${p.ticketPrice || "500"} ብር</td>
      <td>
        <img src="${p.screenshotUrl}" alt="Proof" class="thumbnail-clickable" data-img="${p.screenshotUrl}">
      </td>
      <td style="font-size: 0.8rem; color: var(--text-sub);">${formattedDate}</td>
      <td>
        <span class="category-badge" style="background: rgba(16, 185, 129, 0.2); border-color: #10b981; color: #6ee7b7;">
          ${p.status || "Pending"}
        </span>
      </td>
      <td>
        <button type="button" class="btn-sm btn-danger btn-delete-purchase" data-id="${p.id}" title="Delete Record">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/></svg>
          <span>አጥፋ (Delete)</span>
        </button>
      </td>
    `;

    // Clickable Screenshot Lightbox
    const thumb = tr.querySelector(".thumbnail-clickable");
    thumb.addEventListener("click", () => openLightbox(p.screenshotUrl));

    // Working Delete Button
    const delBtn = tr.querySelector(".btn-delete-purchase");
    delBtn.addEventListener("click", async () => {
      if (confirm(`ይህንን የደንበኛ ቲኬት መረጃ (${p.phone} - ${p.id}) ማጥፋት ይፈልጋሉ?`)) {
        await window.LotteryDB.deleteTicketPurchase(p.id);
        allPurchases = allPurchases.filter((item) => item.id !== p.id);
        renderPurchasesTable(allPurchases);
        const countBadge = document.getElementById("purchases-count-badge");
        if (countBadge) countBadge.textContent = allPurchases.length;
        showToast("የቲኬት መረጃው ተሰርዟል! (Record Deleted)");
      }
    });

    tableBody.appendChild(tr);
  });
}

function openLightbox(imageUrl) {
  const modal = document.getElementById("image-lightbox-modal");
  const imgEl = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close-btn");

  if (!modal || !imgEl) return;

  imgEl.src = imageUrl;
  modal.classList.add("active");

  closeBtn.onclick = () => modal.classList.remove("active");
  modal.onclick = (e) => {
    if (e.target === modal) modal.classList.remove("active");
  };
}

function exportPurchasesToCSV(purchases) {
  if (!purchases || purchases.length === 0) {
    alert("ምንም መረጃ የለም");
    return;
  }

  let csv = "Ticket ID,Phone Number,Category,Section,Price,Date,Status,Screenshot URL\n";
  purchases.forEach((p) => {
    csv += `"${p.id}","${p.phone}","${p.categoryName || p.categoryId}","${p.sectionTitle || ''}","${p.ticketPrice || ''}","${p.createdAt}","${p.status}","${p.screenshotUrl}"\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", `Ethiopian_Lottery_Purchases_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ==========================================================================
   MODULE 4: PAYMENT METHODS MANAGEMENT (Add/Edit/Delete)
   ========================================================================== */
async function loadAdminPaymentMethods() {
  const container = document.getElementById("admin-payment-methods-grid");
  const addBtn = document.getElementById("btn-add-payment-method");

  if (!container) return;

  const methods = await window.LotteryDB.getPaymentMethods();
  container.innerHTML = "";

  methods.forEach((method) => {
    const card = document.createElement("div");
    card.className = "payment-method-card";

    card.innerHTML = `
      <div class="pay-card-header">
        <div class="pay-bank-name">
          <span>${method.name}</span>
        </div>
        <span class="category-badge">${method.englishName || method.name}</span>
      </div>
      
      <div class="pay-account-box" style="margin-bottom: 0.5rem;">
        <span class="pay-account-number" style="font-size: 1.15rem;">${method.accountNumber}</span>
      </div>

      <div class="pay-account-holder" style="margin-bottom: 1rem;">${method.accountHolder || ""}</div>

      <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
        <button type="button" class="btn-sm btn-emerald btn-edit-pm" data-id="${method.id}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
          <span>አስተካክል (Edit)</span>
        </button>
        <button type="button" class="btn-sm btn-danger btn-delete-pm" data-id="${method.id}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/></svg>
          <span>አጥፋ</span>
        </button>
      </div>
    `;

    // Edit Event
    card.querySelector(".btn-edit-pm").addEventListener("click", () => openPaymentMethodModal(method));

    // Delete Event
    card.querySelector(".btn-delete-pm").addEventListener("click", async () => {
      if (confirm(`ይህንን የክፍያ አካውንት (${method.name}) መሰረዝ ይፈልጋሉ?`)) {
        await window.LotteryDB.deletePaymentMethod(method.id);
        await loadAdminPaymentMethods();
        showToast("አካውንቱ ተሰርዟል!");
      }
    });

    container.appendChild(card);
  });

  if (addBtn) {
    addBtn.onclick = () => openPaymentMethodModal(null);
  }
}

function openPaymentMethodModal(method) {
  const modal = document.getElementById("payment-method-modal");
  const form = document.getElementById("payment-method-form");
  const idInput = document.getElementById("pm-id");
  const nameInput = document.getElementById("pm-name");
  const enNameInput = document.getElementById("pm-en-name");
  const accInput = document.getElementById("pm-account");
  const holderInput = document.getElementById("pm-holder");
  const closeBtn = document.getElementById("payment-modal-close");
  const cancelBtn = document.getElementById("btn-cancel-pm");

  if (!modal || !form) return;

  if (method) {
    idInput.value = method.id;
    nameInput.value = method.name;
    enNameInput.value = method.englishName || "";
    accInput.value = method.accountNumber;
    holderInput.value = method.accountHolder || "";
  } else {
    form.reset();
    idInput.value = "";
  }

  modal.classList.add("active");

  form.onsubmit = async (e) => {
    e.preventDefault();
    await window.LotteryDB.savePaymentMethod({
      id: idInput.value || undefined,
      name: nameInput.value.trim(),
      englishName: enNameInput.value.trim(),
      accountNumber: accInput.value.trim(),
      accountHolder: holderInput.value.trim()
    });

    modal.classList.remove("active");
    await loadAdminPaymentMethods();
    showToast("የክፍያ አካውንት ተቀምጧል!");
  };

  closeBtn.onclick = () => modal.classList.remove("active");
  cancelBtn.onclick = () => modal.classList.remove("active");
}

/* ==========================================================================
   MODULE 5: SQL SETUP COPY
   ========================================================================== */
function setupCopySql() {
  const copyBtn = document.getElementById("btn-copy-sql");
  const codeBlock = document.getElementById("sql-code-block");

  if (copyBtn && codeBlock) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(codeBlock.textContent.trim());
        showToast("SQL ኮድ ተቀድቷል! (SQL Copied to Clipboard)");
      } catch (err) {
        showToast("SQL Copied!");
      }
    });
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  const msgEl = document.getElementById("toast-message");
  if (toast && msgEl) {
    msgEl.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }
}

function showError(element, text) {
  if (element) {
    element.textContent = text;
    element.style.display = "block";
  }
}
