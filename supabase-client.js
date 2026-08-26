/**
 * Ethiopian Online Lottery (የኢትዮጲያ ሎተሪ እጣ)
 * Supabase Database & Storage Client Integration
 * 
 * Instructions:
 * Replace SUPABASE_URL and SUPABASE_ANON_KEY with your project credentials
 * from the Supabase Project Dashboard (Settings -> API).
 */

const SUPABASE_URL = "https://windinkwlpdvqoqxjezx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpbmRpbmt3bHBkdnFvcXhqZXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2MDY1NzAsImV4cCI6MjEwMzE4MjU3MH0.qLlB_ULpdB496CaoWB1yrAPM7n5x_T1562_h6I9IWJk";

// Default Storage Bucket Name
const STORAGE_BUCKET = "lottery-images";

// Initialize Supabase Client safely
let supabaseClient = null;
let isSupabaseConfigured = false;

try {
  if (
    typeof supabase !== "undefined" &&
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    !SUPABASE_URL.includes("YOUR_SUPABASE") &&
    !SUPABASE_ANON_KEY.includes("YOUR_SUPABASE")
  ) {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });
    isSupabaseConfigured = true;
    console.log("✅ Supabase Client initialized successfully with connected cloud project.");
  } else {
    console.warn("⚠️ Supabase credentials not set or placeholder detected. Operating in high-reliability Demo/Offline mode with local persistence.");
  }
} catch (err) {
  console.error("❌ Error initializing Supabase client:", err);
}

// Initial Default State with luxury prizes and high quality imagery
const DEFAULT_LOTTERY_DATA = {
  headerImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1600&q=80",
  categories: [
    {
      id: "car",
      key: "cat_car",
      name: "መኪና",
      previewImages: [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80"
      ],
      sections: [
        {
          id: 1,
          title: "Jetour Dashing 2025",
          price: "2500",
          ticketsTotal: 5000,
          ticketsRemaining: 3420,
          description: "ዘመናዊ ሙሉ አማራጭ ያለው ቶዮታ ላንድ ክሩዘር ቪ8 (Toyota Land Cruiser V8) መኪና ከሙሉ ሰነድና ኢንሹራንስ ጋር።",
          images: [
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80"
          ]
        },
        {
          id: 2,
          title: "HOWO Sinotruck",
          price: "2500",
          ticketsTotal: 8000,
          ticketsRemaining: 5190,
          description: "አዲስ የከተማ ክሮስኦቨር ሂዩንዳይ ቱሶን 2024 ሞዴል ከዜሮ ኪሎሜትር ጋር።",
          images: [
            "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80"
          ]
        }
      ]
    },
    {
      id: "condo",
      key: "cat_condo",
      name: "ቤት",
      previewImages: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
      ],
      sections: [
        {
          id: 1,
          title: "ባለ 3 መኝታ ዘመናዊ አፓርትመንት (CMC)",
          price: "10000",
          ticketsTotal: 5000,
          ticketsRemaining: 2840,
          description: "ሲኤምሲ አካባቢ የሚገኝ ባለ 3 መኝታ፣ 2 መታጠቢያ ቤትና ዘመናዊ ኪችን ካቢኔት ያለው የቅንጦት አፓርትመንት።",
          images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80"
          ]
        },
        {
          id: 2,
          title: "ባለ 2 መኝታ ኮንዶሚኒዬም ቤት (ሰሚት)",
          price: "8000",
          ticketsTotal: 4500,
          ticketsRemaining: 2980,
          description: "ሰሚት አካባቢ ላይ ያረፈ ውብ መኖሪያ ቤት።",
          images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80"
          ]
        }
      ]
    },
    {
      id: "phones",
      key: "cat_phones",
      name: "ዘመናዊ ስልኮች",
      previewImages: [
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80"
      ],
      sections: [
        {
          id: 1,
          title: "iPhone 16 Pro Max 1TB",
          price: "200",
          ticketsTotal: 10000,
          ticketsRemaining: 7120,
          description: "ኦሪጅናል አፕል አይፎን 16 ፕሮ ማክስ (iPhone 16 Pro Max) ከሙሉ አክሰሰሪ እና ከፋብሪካ ዋስትና ጋር።",
          images: [
            "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80"
          ]
        },
        {
          id: 2,
          title: "Samsung Galaxy S25 Ultra 512GB",
          price: "150",
          ticketsTotal: 12000,
          ticketsRemaining: 8940,
          description: "ሳምሰንግ ጋላክሲ ኤስ25 አልትራ ከስቲለስ ፔን እና ከ 200MP ካሜራ ጋር።",
          images: [
            "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1000&q=80"
          ]
        }
      ]
    },
    {
      id: "cash",
      key: "cat_cash",
      name: "ገንዘብ",
      previewImages: [
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80"
      ],
      sections: [
        {
          id: 1,
          title: "5,000,000 የኢትዮጵያ ብር የጥሬ ገንዘብ ሽልማት",
          price: "200",
          ticketsTotal: 50000,
          ticketsRemaining: 11200,
          description: "አምስት ሚሊዮን ብር በቀጥታ ወደ ባንክ ሂሳብዎ የሚገባ ወይም በቼክ የሚሰጥ የጥሬ ገንዘብ ሽልማት።",
          images: [
            "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1000&q=80"
          ]
        },
        {
          id: 2,
          title: "2,000,000 የኢትዮጵያ ብር የጥሬ ገንዘብ ሽልማት",
          price: "100",
          ticketsTotal: 30000,
          ticketsRemaining: 14500,
          description: "ሁለት ሚሊዮን የኢትዮጵያ ብር በጥሬ ገንዘብ ለእድለኛ አሸናፊዎች።",
          images: [
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=1000&q=80"
          ]
        }
      ]
    },
    {
      id: "laptop",
      key: "cat_laptop",
      name: "ላፕቶፕ",
      previewImages: [
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80"
      ],
      sections: [
        {
          id: 1,
          title: "Apple MacBook Pro 16\" M3 Max",
          price: "150",
          ticketsTotal: 6000,
          ticketsRemaining: 4100,
          description: "አፕል ማክቡክ ፕሮ 16 ኢንች M3 Max ቺፕ፣ 36GB ራም እና 1TB ኤስኤስዲ።",
          images: [
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80"
          ]
        },
        {
          id: 2,
          title: "ASUS ROG Strix Gaming Laptop RTX 4080",
          price: "100",
          ticketsTotal: 8000,
          ticketsRemaining: 5600,
          description: "አሱስ ሮግ ሃይ ፐርፎርማንስ ጌሚንግ ላፕቶፕ ከ Nvidia RTX 4080 ግራፊክስ ካርድ ጋር።",
          images: [
            "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80"
          ]
        }
      ]
    },
    {
      id: "tv",
      key: "cat_tv",
      name: "ቴሌቪዥን",
      previewImages: [
        "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80"
      ],
      sections: [
        {
          id: 1,
          title: "Samsung 75\" Neo QLED 4K Smart TV",
          price: "100",
          ticketsTotal: 8000,
          ticketsRemaining: 5800,
          description: "ሳምሰንግ 75 ኢንች ኒዮ ኪውሌድ 4ኬ ስማርት ቴሌቪዥን ከዶልቢ አትሞስ ሳውንድ ሲስተም ጋር።",
          images: [
            "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=1000&q=80"
          ]
        },
        {
          id: 2,
          title: "LG 65\" OLED Cinema 4K Smart TV",
          price: "100",
          ticketsTotal: 10000,
          ticketsRemaining: 7400,
          description: "ኤልጂ 65 ኢንች ኦሌድ ሲኒማ ቴሌቪዥን እጅግ ጥራት ካለው ጥቁር ንፅፅር ጋር።",
          images: [
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=1000&q=80"
          ]
        }
      ]
    },
    {
      id: "sheep",
      key: "cat_sheep",
      name: "በግ",
      previewImages: [
        "https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1000&q=80"
      ],
      sections: [
        {
          id: 1,
          title: "የሰበተ የወሎ የበዓል ሰንጋ በግ",
          price: "150",
          ticketsTotal: 5000,
          ticketsRemaining: 3200,
          description: "ለአዲስ አመት እና ለመስቀል በዓል የሚሆን የሰባ የወሎ ትልቅ የበዓል ሰንጋ በግ።",
          images: [
            "https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=1000&q=80"
          ]
        },
        {
          id: 2,
          title: "የአርሲ ምርጥ ዝርያ የበዓል በግ",
          price: "150",
          ticketsTotal: 7000,
          ticketsRemaining: 4900,
          description: "ምርጥ የአርሲ ተወላጅ የሆነ የሰባ የበዓል በግ።",
          images: [
            "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1000&q=80"
          ]
        }
      ]
    }
  ],
  paymentMethods: [
    {
      id: "cbe",
      name: "ንግድ ባንክ",
      englishName: "Commercial Bank of Ethiopia (CBE)",
      accountNumber: "1000327468956",
      accountHolder: "የኢትዮጵያ ብሔራዊ ሎተሪ አስተዳደር",
      icon: "cbe-icon",
      order: 1
    },
    {
      id: "telebirr",
      name: "ቴሌብር",
      englishName: "Telebirr",
      accountNumber: "0964202064",
      accountHolder: "የኢትዮጵያ ሎተሪ እጣ",
      icon: "telebirr-icon",
      order: 2
    },
    {
      id: "boa",
      name: "አቢሲኒያ ባንክ",
      englishName: "Bank of Abyssinia (BOA)",
      accountNumber: "264416817",
      accountHolder: "የኢትዮጵያ ብሔራዊ ሎተሪ አስተዳደር",
      icon: "boa-icon",
      order: 3
    }
  ]
};

// Local storage key constants
const STORAGE_KEYS = {
  LOTTERY_DATA: "ethio_lottery_data",
  PURCHASES: "ethio_lottery_purchases",
  PAYMENT_METHODS: "ethio_lottery_payment_methods",
  ADMIN_AUTH: "ethio_lottery_admin_session"
};

/**
 * Initialize or retrieve lottery categories and header data
 */
async function getLotteryData() {
  if (isSupabaseConfigured && supabaseClient) {
    try {
      // 1. Fetch header image
      const { data: headerData, error: headerErr } = await supabaseClient
        .from("lottery_images")
        .select("image_url")
        .eq("placement_key", "header_main")
        .single();

      // 2. Fetch categories & images
      const { data: catData, error: catErr } = await supabaseClient
        .from("lottery_categories")
        .select(`
          id,
          category_id,
          name,
          preview_image_1,
          preview_image_2,
          lottery_sections (
            id,
            section_number,
            title,
            price,
            tickets_total,
            tickets_remaining,
            description,
            image_1,
            image_2
          )
        `);

      if (!catErr && catData && catData.length > 0) {
        // Map Supabase rows to app data structure
        const formattedCategories = catData.map(cat => ({
          id: cat.category_id,
          key: `cat_${cat.category_id}`,
          name: cat.name,
          previewImages: [cat.preview_image_1, cat.preview_image_2].filter(Boolean),
          sections: (cat.lottery_sections || []).sort((a, b) => a.section_number - b.section_number).map(sec => ({
            id: sec.section_number,
            title: sec.title,
            price: sec.price,
            ticketsTotal: sec.tickets_total || 5000,
            ticketsRemaining: sec.tickets_remaining || 3000,
            description: sec.description,
            images: [sec.image_1, sec.image_2].filter(Boolean)
          }))
        }));

        const result = {
          headerImage: headerData ? headerData.image_url : DEFAULT_LOTTERY_DATA.headerImage,
          categories: formattedCategories.length > 0 ? formattedCategories : DEFAULT_LOTTERY_DATA.categories,
          paymentMethods: await getPaymentMethods()
        };

        // Cache locally for offline resilience
        localStorage.setItem(STORAGE_KEYS.LOTTERY_DATA, JSON.stringify(result));
        return result;
      }
    } catch (e) {
      console.warn("Supabase fetch failed, falling back to local storage:", e);
    }
  }

  // Fallback / Offline / Local state
  const saved = localStorage.getItem(STORAGE_KEYS.LOTTERY_DATA);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
  }

  localStorage.setItem(STORAGE_KEYS.LOTTERY_DATA, JSON.stringify(DEFAULT_LOTTERY_DATA));
  return DEFAULT_LOTTERY_DATA;
}

/**
 * Save updated lottery state locally & to Supabase if configured
 */
async function saveLotteryData(data) {
  localStorage.setItem(STORAGE_KEYS.LOTTERY_DATA, JSON.stringify(data));

  if (isSupabaseConfigured && supabaseClient) {
    try {
      // Upsert header image
      if (data.headerImage) {
        await supabaseClient.from("lottery_images").upsert({
          placement_key: "header_main",
          image_url: data.headerImage,
          updated_at: new Date().toISOString()
        }, { onConflict: "placement_key" });
      }

      // Upsert categories & sections
      for (const cat of data.categories) {
        const { data: upsertedCat } = await supabaseClient.from("lottery_categories").upsert({
          category_id: cat.id,
          name: cat.name,
          preview_image_1: cat.previewImages[0] || "",
          preview_image_2: cat.previewImages[1] || "",
          updated_at: new Date().toISOString()
        }, { onConflict: "category_id" }).select("id").single();

        if (upsertedCat && cat.sections) {
          for (const sec of cat.sections) {
            await supabaseClient.from("lottery_sections").upsert({
              category_fk: upsertedCat.id,
              category_id: cat.id,
              section_number: sec.id,
              title: sec.title,
              price: sec.price,
              tickets_total: sec.ticketsTotal,
              tickets_remaining: sec.ticketsRemaining,
              description: sec.description,
              image_1: sec.images[0] || "",
              image_2: sec.images[1] || "",
              updated_at: new Date().toISOString()
            }, { onConflict: "category_id,section_number" });
          }
        }
      }
    } catch (e) {
      console.error("Error saving to Supabase:", e);
    }
  }

  return true;
}

/**
 * Update Header Image
 */
async function updateHeaderImage(imageUrl) {
  const data = await getLotteryData();
  data.headerImage = imageUrl;
  await saveLotteryData(data);
  return true;
}

/**
 * Update Category Preview Images
 */
async function updateCategoryPreviewImage(categoryId, slotIndex, imageUrl) {
  const data = await getLotteryData();
  const cat = data.categories.find(c => c.id === categoryId);
  if (cat) {
    if (!cat.previewImages) cat.previewImages = ["", ""];
    cat.previewImages[slotIndex] = imageUrl;
    await saveLotteryData(data);
    return true;
  }
  return false;
}

/**
 * Update Section Image & Description
 */
async function updateSectionData(categoryId, sectionNumber, slotIndex, imageUrl, description) {
  const data = await getLotteryData();
  const cat = data.categories.find(c => c.id === categoryId);
  if (cat) {
    const sec = cat.sections.find(s => s.id === Number(sectionNumber));
    if (sec) {
      if (imageUrl !== null && imageUrl !== undefined) {
        if (!sec.images) sec.images = ["", ""];
        sec.images[slotIndex] = imageUrl;
      }
      if (description !== null && description !== undefined) {
        sec.description = description;
      }
      await saveLotteryData(data);
      return true;
    }
  }
  return false;
}

/**
 * Upload Image to Supabase Storage (or base64 offline data url)
 * @param {File} file - Selected browser File object
 * @param {string} folder - Destination subfolder (e.g. 'headers', 'categories', 'proofs')
 * @returns {Promise<string>} Public URL of uploaded image
 */
async function uploadImageToStorage(file, folder = "uploads") {
  if (!file) throw new Error("No file provided");

  const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/jpg"];
  if (!validTypes.includes(file.type)) {
    throw new Error("Invalid file type. Please upload a JPG, PNG, or WebP image.");
  }

  // Max 10MB limit check
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("File size exceeds 10MB limit.");
  }

  const timestamp = Date.now();
  const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
  const fileName = `${folder}/${timestamp}_${cleanName}`;

  if (isSupabaseConfigured && supabaseClient) {
    try {
      const { data, error } = await supabaseClient.storage
        .from(STORAGE_BUCKET)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true
        });

      if (error) {
        console.error("Supabase storage upload error:", error);
        throw error;
      }

      // Get public URL
      const { data: publicData } = supabaseClient.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(fileName);

      return publicData.publicUrl;
    } catch (e) {
      console.warn("Storage upload failed on Supabase, falling back to local object storage:", e);
    }
  }

  // Reliable Fallback / Demo Base64 Data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

/**
 * Ticket Purchases Management
 */
async function submitTicketPurchase(purchaseInfo) {
  const newPurchase = {
    id: "TKT-" + Math.floor(100000 + Math.random() * 900000),
    phone: purchaseInfo.phone,
    categoryId: purchaseInfo.categoryId,
    categoryName: purchaseInfo.categoryName,
    sectionId: purchaseInfo.sectionId,
    sectionTitle: purchaseInfo.sectionTitle,
    ticketPrice: purchaseInfo.ticketPrice,
    paymentMethod: purchaseInfo.paymentMethod,
    screenshotUrl: purchaseInfo.screenshotUrl,
    createdAt: new Date().toISOString(),
    status: "Pending"
  };

  if (isSupabaseConfigured && supabaseClient) {
    try {
      const { data, error } = await supabaseClient.from("ticket_purchases").insert([{
        ticket_id: newPurchase.id,
        phone_number: newPurchase.phone,
        category_id: newPurchase.categoryId,
        category_name: newPurchase.categoryName,
        section_number: newPurchase.sectionId,
        section_title: newPurchase.sectionTitle,
        ticket_price: newPurchase.ticketPrice,
        payment_method: newPurchase.paymentMethod,
        screenshot_url: newPurchase.screenshotUrl,
        status: newPurchase.status,
        created_at: newPurchase.createdAt
      }]).select().single();

      if (error) throw error;
    } catch (e) {
      console.error("Supabase ticket insertion error:", e);
    }
  }

  // Always save locally as well
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.PURCHASES) || "[]");
  existing.unshift(newPurchase);
  localStorage.setItem(STORAGE_KEYS.PURCHASES, JSON.stringify(existing));

  return newPurchase;
}

async function getTicketPurchases() {
  if (isSupabaseConfigured && supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from("ticket_purchases")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data.map(row => ({
          id: row.ticket_id || row.id,
          phone: row.phone_number,
          categoryId: row.category_id,
          categoryName: row.category_name,
          sectionId: row.section_number,
          sectionTitle: row.section_title,
          ticketPrice: row.ticket_price,
          paymentMethod: row.payment_method,
          screenshotUrl: row.screenshot_url,
          createdAt: row.created_at,
          status: row.status || "Pending"
        }));
      }
    } catch (e) {
      console.warn("Error loading ticket purchases from Supabase:", e);
    }
  }

  const existing = localStorage.getItem(STORAGE_KEYS.PURCHASES);
  if (existing) {
    try {
      return JSON.parse(existing);
    } catch (e) {}
  }
  return [];
}

async function deleteTicketPurchase(id) {
  if (isSupabaseConfigured && supabaseClient) {
    try {
      await supabaseClient.from("ticket_purchases").delete().or(`ticket_id.eq.${id},id.eq.${id}`);
    } catch (e) {
      console.error("Error deleting purchase in Supabase:", e);
    }
  }

  const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.PURCHASES) || "[]");
  const filtered = existing.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.PURCHASES, JSON.stringify(filtered));
  return true;
}

/**
 * Payment Methods Management
 */
async function getPaymentMethods() {
  if (isSupabaseConfigured && supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from("payment_methods")
        .select("*")
        .order("display_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map(m => ({
          id: m.id || m.method_id,
          name: m.name,
          englishName: m.english_name,
          accountNumber: m.account_number,
          accountHolder: m.account_holder,
          icon: m.icon,
          order: m.display_order
        }));
      }
    } catch (e) {
      console.warn("Error loading payment methods from Supabase:", e);
    }
  }

  const saved = localStorage.getItem(STORAGE_KEYS.PAYMENT_METHODS);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {}
  }

  localStorage.setItem(STORAGE_KEYS.PAYMENT_METHODS, JSON.stringify(DEFAULT_LOTTERY_DATA.paymentMethods));
  return DEFAULT_LOTTERY_DATA.paymentMethods;
}

async function savePaymentMethod(method) {
  const methods = await getPaymentMethods();
  const existingIdx = methods.findIndex(m => m.id === method.id);

  if (existingIdx >= 0) {
    methods[existingIdx] = { ...methods[existingIdx], ...method };
  } else {
    method.id = method.id || "pay_" + Date.now();
    method.order = methods.length + 1;
    methods.push(method);
  }

  localStorage.setItem(STORAGE_KEYS.PAYMENT_METHODS, JSON.stringify(methods));

  if (isSupabaseConfigured && supabaseClient) {
    try {
      await supabaseClient.from("payment_methods").upsert({
        method_id: method.id,
        name: method.name,
        english_name: method.englishName || method.name,
        account_number: method.accountNumber,
        account_holder: method.accountHolder,
        icon: method.icon || "bank-icon",
        display_order: method.order || 1,
        updated_at: new Date().toISOString()
      }, { onConflict: "method_id" });
    } catch (e) {
      console.error("Error upserting payment method to Supabase:", e);
    }
  }

  return methods;
}

async function deletePaymentMethod(methodId) {
  const methods = await getPaymentMethods();
  const filtered = methods.filter(m => m.id !== methodId);
  localStorage.setItem(STORAGE_KEYS.PAYMENT_METHODS, JSON.stringify(filtered));

  if (isSupabaseConfigured && supabaseClient) {
    try {
      await supabaseClient.from("payment_methods").delete().or(`method_id.eq.${methodId},id.eq.${methodId}`);
    } catch (e) {
      console.error("Error deleting payment method from Supabase:", e);
    }
  }

  return filtered;
}

/**
 * Admin Authentication Handling
 */
async function adminLogin(email, password) {
  if (isSupabaseConfigured && supabaseClient) {
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });
      if (!error && data.user) {
        sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, JSON.stringify({
          email: data.user.email,
          id: data.user.id,
          token: data.session.access_token
        }));
        return { success: true, user: data.user };
      }
    } catch (e) {
      console.warn("Supabase Auth sign-in failed, trying demo check:", e);
    }
  }

  // Demo / Offline Admin Credentials
  // Email: admin@lottery.et (or admin@gmail.com)
  // Password: admin or Admin@2025
async function adminLogin(email, password) {
  if (isSupabaseConfigured && supabaseClient) {
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (!error && data.user) {
        sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, JSON.stringify({
          email: data.user.email,
          id: data.user.id,
          token: data.session.access_token
        }));
        return { success: true, user: data.user };
      }
      return { success: false, message: "የተሳሳተ ኢሜል ወይም የይለፍ ቃል! (Invalid Email or Password)" };
    } catch (e) {
      console.error("Admin login error:", e);
      return { success: false, message: "የተሳሳተ ኢሜል ወይም የይለፍ ቃል! (Invalid Email or Password)" };
    }
  }
  return { success: false, message: "Authentication service unavailable." };
}
  return {
    success: false,
    message: "የተሳሳተ ኢሜል ወይም የይለፍ ቃል! (Invalid Email or Password)"
  };
}

function getAdminSession() {
  const session = sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
  if (session) {
    try {
      return JSON.parse(session);
    } catch (e) {}
  }
  return null;
}

async function adminLogout() {
  if (isSupabaseConfigured && supabaseClient) {
    try {
      await supabaseClient.auth.signOut();
    } catch (e) {}
  }
  sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  return true;
}

// Attach all functions to window object
window.LotteryDB = {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  STORAGE_BUCKET,
  isConfigured: () => isSupabaseConfigured,
  getLotteryData,
  saveLotteryData,
  updateHeaderImage,
  updateCategoryPreviewImage,
  updateSectionData,
  uploadImageToStorage,
  submitTicketPurchase,
  getTicketPurchases,
  deleteTicketPurchase,
  getPaymentMethods,
  savePaymentMethod,
  deletePaymentMethod,
  adminLogin,
  getAdminSession,
  adminLogout
};
