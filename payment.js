/**
 * Payment & Ticket Purchase Script for Ethiopian Online Lottery (የኢትዮጲያ ሎተሪ እጣ)
 */

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Language System Setup
  initLanguage();

  // 2. Parse Query Parameters from URL
  parseQueryParamsAndSetDefaults();

  // 3. Load Payment Methods from DB
  await loadPaymentMethods();

  // 4. Bind Copy Account Buttons
  bindCopyButtons();

  // 5. Setup File Upload & Drag-and-Drop
  setupFileUpload();

  // 6. Setup Form Submission & Validation
  setupFormSubmission();

  // 7. Setup Voucher Printing
  setupVoucherPrint();
});

function initLanguage() {
  const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : "am";

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const lang = btn.getAttribute("data-lang");
    if (lang === currentLang) btn.classList.add("active-lang");
    else btn.classList.remove("active-lang");

    btn.addEventListener("click", () => {
      if (window.setLanguage) window.setLanguage(lang);
    });
  });

  if (window.setLanguage) {
    window.setLanguage(currentLang);
  }
}

/**
 * Parse URL Query Params (?cat=car&sec=1&title=...&price=500)
 */
let currentCategory = "car";
let currentSection = 1;
let currentPrice = "500";
let currentTitle = "መኪና - ቶዮታ ቪ8 2024";

function parseQueryParamsAndSetDefaults() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat");
  const sec = params.get("sec");
  const title = params.get("title");
  const price = params.get("price");

  if (cat) currentCategory = cat;
  if (sec) currentSection = parseInt(sec, 10) || 1;
  if (title) currentTitle = decodeURIComponent(title);
  if (price) currentPrice = price;

  const catSelect = document.getElementById("form-category-select");
  const secSelect = document.getElementById("form-section-select");
  const summaryTitle = document.getElementById("summary-prize-title");
  const summaryPrice = document.getElementById("summary-prize-price");

  if (catSelect && cat) catSelect.value = cat;
  if (secSelect && sec) secSelect.value = String(sec);
  if (summaryTitle) summaryTitle.textContent = currentTitle;
  if (summaryPrice) {
    const curr = window.t ? window.t("currency") : "ብር";
    summaryPrice.textContent = `${currentPrice} ${curr}`;
  }

  // Update summary when dropdown changes
  if (catSelect) {
    catSelect.addEventListener("change", (e) => {
      currentCategory = e.target.value;
      const catText = catSelect.options[catSelect.selectedIndex].text;
      if (summaryTitle) summaryTitle.textContent = catText;
    });
  }
}

/**
 * Load Dynamic Payment Accounts
 */
async function loadPaymentMethods() {
  const container = document.getElementById("payment-methods-container");
  if (!container || !window.LotteryDB) return;

  try {
    const methods = await window.LotteryDB.getPaymentMethods();
    if (methods && methods.length > 0) {
      container.innerHTML = "";
      methods.forEach((method) => {
        const card = createPaymentCardElement(method);
        container.appendChild(card);
      });
      bindCopyButtons();
    }
  } catch (err) {
    console.error("Error loading payment methods:", err);
  }
}

function createPaymentCardElement(method) {
  const card = document.createElement("div");
  card.className = `payment-method-card ${method.id}-card`;
  card.id = `card-${method.id}`;

  const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : "am";

  card.innerHTML = `
    <div class="pay-card-header">
      <div class="pay-bank-name">
        <span style="display:inline-block; width: 14px; height: 14px; border-radius: 50%; background: var(--gold-primary);"></span>
        <span>${method.name}</span>
      </div>
      <span class="category-badge">${method.englishName || method.name}</span>
    </div>
    <div class="pay-account-box">
      <span class="pay-account-number" id="acc-${method.id}">${method.accountNumber}</span>
      <button type="button" class="btn-copy" data-target="acc-${method.id}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        <span data-i18n="clickToCopy">${window.t ? window.t("clickToCopy", currentLang) : "ኮፒ አድርግ"}</span>
      </button>
    </div>
    <div class="pay-account-holder">${method.accountHolder ? `${window.t ? window.t("accountHolder", currentLang) : "የሂሳብ ስም"}፡ ${method.accountHolder}` : ""}</div>
  `;

  return card;
}

/**
 * 1-Click Copy to Clipboard
 */
function bindCopyButtons() {
  document.querySelectorAll(".btn-copy").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const targetId = btn.getAttribute("data-target");
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      const text = targetEl.textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
        showToast(window.t ? window.t("copySuccess") : "ቁጥሩ ተቀድቷል!");
        btn.style.borderColor = "var(--gold-pure)";
        btn.style.color = "var(--gold-pure)";
        setTimeout(() => {
          btn.style.borderColor = "";
          btn.style.color = "";
        }, 1800);
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        showToast(window.t ? window.t("copySuccess") : "ቁጥሩ ተቀድቷል!");
      }
    });
  });
}

/**
 * File Upload with Preview & Drag-and-Drop
 */
let selectedProofFile = null;

function setupFileUpload() {
  const dropzone = document.getElementById("upload-dropzone");
  const fileInput = document.getElementById("payment-proof-input");
  const promptView = document.getElementById("dropzone-prompt");
  const previewView = document.getElementById("dropzone-preview");
  const previewImg = document.getElementById("preview-image-el");
  const fileNameBadge = document.getElementById("file-name-badge");
  const removeBtn = document.getElementById("btn-remove-preview");
  const errorMsg = document.getElementById("proof-error-msg");

  if (!dropzone || !fileInput) return;

  function handleFile(file) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showError(errorMsg, "እባክዎ ትክክለኛ የፎቶ/ምስል ፋይል ያስገቡ (JPG, PNG)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showError(errorMsg, "የፋይሉ መጠን ከ 10MB መብለጥ የለበትም");
      return;
    }

    hideError(errorMsg);
    selectedProofFile = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (previewImg) previewImg.src = e.target.result;
      if (fileNameBadge) fileNameBadge.textContent = file.name;
      if (promptView) promptView.style.display = "none";
      if (previewView) previewView.style.display = "block";
    };
    reader.readAsDataURL(file);
  }

  fileInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  });

  // Drag & Drop
  ["dragenter", "dragover"].forEach((eventName) => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.add("dragover");
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
    });
  });

  dropzone.addEventListener("drop", (e) => {
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  });

  if (removeBtn) {
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      selectedProofFile = null;
      fileInput.value = "";
      if (promptView) promptView.style.display = "block";
      if (previewView) previewView.style.display = "none";
    });
  }
}

/**
 * Form Validation & Real Ticket Submission
 */
function setupFormSubmission() {
  const form = document.getElementById("ticket-purchase-form");
  const phoneInput = document.getElementById("customer-phone");
  const phoneError = document.getElementById("phone-error-msg");
  const proofError = document.getElementById("proof-error-msg");
  const submitBtn = document.getElementById("btn-submit-ticket");
  const submitText = document.getElementById("submit-btn-text");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let isValid = true;
    const phoneVal = (phoneInput.value || "").trim();

    // 1. Phone number validation (Ethiopian phone formats: 09..., 07..., +251...)
    const phoneRegex = /^(\+251|0)?[97][0-9]{8}$/;
    if (!phoneVal || !phoneRegex.test(phoneVal.replace(/\s+/g, ""))) {
      showError(phoneError, window.t ? window.t("errorInvalidPhone") : "እባክዎ ትክክለኛ የኢትዮጵያ ስልክ ቁጥር ያስገቡ (09... ወይም 07...)");
      isValid = false;
    } else {
      hideError(phoneError);
    }

    // 2. Payment proof image validation
    if (!selectedProofFile) {
      showError(proofError, window.t ? window.t("errorNoProof") : "እባክዎ የክፍያ ማረጋገጫ ምስል (Screenshot) ያስገቡ");
      isValid = false;
    } else {
      hideError(proofError);
    }

    if (!isValid) return;

    // Start Submission Loading
    submitBtn.disabled = true;
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <span class="spinner"></span>
      <span>${window.t ? window.t("submitting") : "በማስገባት ላይ..."}</span>
    `;

    try {
      // 1. Upload Payment Proof to Supabase Storage
      const uploadedUrl = await window.LotteryDB.uploadImageToStorage(selectedProofFile, "proofs");

      // 2. Save Ticket Purchase to Supabase / Local DB
      const catSelect = document.getElementById("form-category-select");
      const secSelect = document.getElementById("form-section-select");

      const purchaseRecord = await window.LotteryDB.submitTicketPurchase({
        phone: phoneVal,
        categoryId: catSelect ? catSelect.value : currentCategory,
        categoryName: catSelect ? catSelect.options[catSelect.selectedIndex].text : currentCategory,
        sectionId: secSelect ? secSelect.value : currentSection,
        sectionTitle: currentTitle,
        ticketPrice: currentPrice,
        paymentMethod: "CBE/Telebirr/BOA",
        screenshotUrl: uploadedUrl
      });

      // 3. Show Exact Success Popup Modal
      showSuccessModal(purchaseRecord);
    } catch (err) {
      console.error("Submission failed:", err);
      showError(proofError, "ስህተት ተፈጥሯል፣ እባክዎ በድጋሚ ይሞክሩ። " + (err.message || ""));
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
    }
  });
}

/**
 * Show Success Modal
 */
function showSuccessModal(purchase) {
  const modal = document.getElementById("success-modal");
  const ticketIdEl = document.getElementById("modal-ticket-id");
  const phoneEl = document.getElementById("modal-ticket-phone");
  const prizeEl = document.getElementById("modal-ticket-prize");
  const dateEl = document.getElementById("modal-ticket-date");

  if (!modal) return;

  if (ticketIdEl) ticketIdEl.textContent = purchase.id;
  if (phoneEl) phoneEl.textContent = purchase.phone;
  if (prizeEl) prizeEl.textContent = `${purchase.categoryName} (${purchase.ticketPrice} ብር)`;
  if (dateEl) dateEl.textContent = new Date(purchase.createdAt).toLocaleString();

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

/**
 * Print Voucher Receipt
 */
function setupVoucherPrint() {
  const printBtn = document.getElementById("btn-print-voucher");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
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

function hideError(element) {
  if (element) {
    element.textContent = "";
    element.style.display = "none";
  }
}
