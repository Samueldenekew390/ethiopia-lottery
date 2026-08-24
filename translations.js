/**
 * Translations Dictionary for Ethiopian Online Lottery (የኢትዮጲያ ሎተሪ እጣ)
 * Supports 8 Languages:
 * 1. Amharic (am) - Default
 * 2. English (en)
 * 3. Afaan Oromo (om)
 * 4. Tigrinya (ti)
 * 5. Arabic (ar) - with RTL
 * 6. Sidamo (sid)
 * 7. Somali (so)
 * 8. Wolayta (wal)
 */

const TRANSLATIONS = {
  am: {
    // Branding & Header
    selectLanguage: "ቋንቋ ይምረጡ",
    appTitle: "የኢትዮጲያ ሎተሪ እጣ",
    appSubtitle: "ኦፊሴላዊ የዲጂታል ሎተሪ መቁረጫ እና የእጣ ማውጫ መድረክ",
    heroPromo: "በአዲስ አመት የቤት ወይንም የመኪና ወይንም ደግሞ የዘመናዊ ስልክ ቀፎና ሌሎችም ሽልማቶች አሸናፊ ይሁኑ!",
    heroBadge: "የአዲስ አመት ልዩ እጣ 2018",
    drawCountdownTitle: "እጣው የሚወጣበት ቀን ቀሪ ጊዜ:",
    drawDateText: "የእጣ ቀን፡ መስከረም 17",
    days: "ቀናት",
    hours: "ሰዓታት",
    minutes: "ደቂቃዎች",
    seconds: "ሰከንዶች",

    // Categories
    categoriesTitle: "የሽልማት አይነቶች",
    categoriesSubtitle: "የሚፈልጉትን የሽልማት አይነት በመምረጥ የሎተሪ ቲኬትዎን ይቁረጡ",
    cat_car: "መኪና",
    cat_car_desc: "ዘመናዊ ቪ-ኤይት (V8)፣ ክሮስኦቨር እና የከተማ መኪናዎች",
    cat_condo: "ኮንደሚኒዬም",
    cat_condo_desc: "ባለ 3 እና ባለ 2 መኝታ ዘመናዊ አፓርትመንቶች እና ቪላዎች",
    cat_phones: "ዘመናዊ ስልኮች",
    cat_phones_desc: "የቅርብ ጊዜ አይፎን 16 ፕሮ ማክስ እና ሳምሰንግ ጋላክሲ S25",
    cat_cash: "ገንዘብ",
    cat_cash_desc: "እስከ 5,000,000 የኢትዮጵያ ብር የጥሬ ገንዘብ ሽልማት",
    cat_laptop: "ላፕቶፕ",
    cat_laptop_desc: "አፕል ማክቡክ ፕሮ እና ሃይ-ፐርፎርማንስ የጌሚንግ ላፕቶፖች",
    cat_tv: "ቴሌቪዥን",
    cat_tv_desc: "75 ኢንች 4K ስማርት OLED እና QLED ቴሌቪዥኖች",
    cat_sheep: "በግ",
    cat_sheep_desc: "ለበዓል የሚሆኑ ምርጥና የሰቡ የበዓል ሰንጋ በጎች",

    // Actions & Sections
    viewPrizes: "ሽልማቶችን ይመልከቱ",
    cutTicket: "ቁረጥ",
    section1: "ክፍል 1",
    section2: "ክፍል 2",
    section1Title: "ዋናው ፕሪሚየም ሽልማት (ክፍል 1)",
    section2Title: "ልዩ የሁለተኛ ደረጃ ሽልማት (ክፍል 2)",
    ticketPriceLabel: "የቲኬት ዋጋ:",
    currency: "ብር",
    availableTickets: "ያሉ ቲኬቶች",
    closeModal: "ዝጋ",

    // Payment Page
    paymentTitle: "የሎተሪ ቲኬት መቁረጫ",
    paymentSubtitle: "የመረጡትን የሽልማት አይነት ቲኬት ለመቁረጥ ክፍያ ፈጽመው ደረሰኝ ያስገቡ",
    selectedPrizeSummary: "የተመረጠው ሽልማት",
    paymentMethodsTitle: "የክፍያ አማራጮች",
    paymentMethodsSubtitle: "ከታች ከተዘረዘሩት የባንክ ወይም የቴሌብር ሂሳቦች በአንዱ ክፍያ ይፈጽሙ",
    accountNumber: "የሂሳብ ቁጥር",
    phoneNumber: "ስልክ ቁጥር",
    accountHolder: "የሂሳብ ባለቤት",
    copySuccess: "ቁጥሩ ተቀድቷል!",
    clickToCopy: "ለመቅዳት ይጫኑ",
    customerFormTitle: "የተጠቃሚ መረጃ እና የክፍያ ማረጋገጫ",
    phoneInputLabel: "ስልክ ቁጥር (ያስገቡ)",
    phonePlaceholder: "ምሳሌ፡ 0911223344 ወይም 0711223344",
    phoneHelp: "አሸናፊ ከሆኑ በዚህ ስልክ ቁጥር እንደውላለን",
    uploadProofLabel: "የክፍያ ምስል አስገባ (Screenshot)",
    uploadProofPlaceholder: "የክፍያ ደረሰኝ ምስል እዚህ ይጎትቱ ወይም ፋይል ይምረጡ",
    uploadProofHelp: "የባንክ ወይም የቴሌብር የክፍያ ማረጋገጫ ምስል (JPG, PNG, WebP)",
    fileSelected: "ፋይል ተመርጧል:",
    changeFile: "ፋይል ቀይር",
    submitButton: "አስገባ",
    submitting: "በማስገባት ላይ...",

    // Success Modal
    successHeadline: "እንኳን ደስ አሎት! ቲኬትዎ በተሳካ ሁኔታ ተመዝግቧል",
    successMainMessage: "በአዲስ አመት መስከረም 17 አሸናፊ ከሆኑ በስልኮ መልዕክት ይደርሶታል!",
    ticketNumberLabel: "የቲኬት መለያ ቁጥር:",
    dateLabel: "የተቆረጠበት ቀን:",
    downloadReceipt: "ደረሰኝ አውርድ",
    backToHome: "ወደ ዋናው ገጽ ተመለስ",

    // Bottom Trust Banner & Footer
    bottomTrustText: "በኢትዮጲያ ሎተሪ እጣ ድረ-ገፅ እና አፕልኬሽን ሎተሪ በመቁረጥ እድሎን ይሞክሩ እራስዎን ከአጭበርባሪዎች ይታደጉ!",
    officialNotice: "በኢትዮጵያ ሎተሪ አስተዳደር ህግና ደንብ መሰረት የተረጋገጠና ፍቃድ የተሰጠው ኦፊሴላዊ መድረክ።",
    quickLinks: "ፈጣን ማስፈንጠሪያዎች",
    howItWorks: "እንዴት ይሰራል?",
    termsAndConditions: "ውሎችና ደንቦች",
    privacyPolicy: "የግላዊነት ፖሊሲ",
    contactUs: "ያግኙን",
    customerService: "የደንበኞች አገልግሎት መስመር: 994 / 011-551-0000",
    copyright: "© 2026 የኢትዮጲያ ሎተሪ እጣ። መብቱ በህግ የተጠበቀ ነው።",

    // Errors & Validation
    errorInvalidPhone: "እባክዎ ትክክለኛ የኢትዮጵያ ስልክ ቁጥር ያስገቡ (09... ወይም 07...)",
    errorNoProof: "እባክዎ የክፍያ ማረጋገጫ ምስል (Screenshot) ያስገቡ",
    errorUploadFailed: "ምስሉን ማስገባት አልተቻለም፣ እባክዎ በድጋሚ ይሞክሩ",
    errorGeneral: "ስህተት ተፈጥሯል፣ እባክዎ ከትንሽ ቆይታ በኋላ ይሞክሩ"
  },

  en: {
    selectLanguage: "Select Language",
    appTitle: "Ethiopian National Lottery",
    appSubtitle: "Official Digital Lottery & Prize Draw Portal",
    heroPromo: "Win modern houses, luxury cars, latest smartphones, and huge cash prizes for the New Year!",
    heroBadge: "Special New Year Draw 2018 E.C.",
    drawCountdownTitle: "Countdown to Grand Draw:",
    drawDateText: "Draw Date: Meskerem 17 (September 27)",
    days: "Days",
    hours: "Hours",
    minutes: "Mins",
    seconds: "Secs",

    categoriesTitle: "Prize Categories",
    categoriesSubtitle: "Select your desired prize category and buy your official ticket",
    cat_car: "Automobiles",
    cat_car_desc: "Luxury V8 SUVs, Crossovers, and Modern City Sedans",
    cat_condo: "Condominiums",
    cat_condo_desc: "Modern 2 & 3 Bedroom Luxury Apartments and Villas",
    cat_phones: "Smartphones",
    cat_phones_desc: "Latest iPhone 16 Pro Max and Samsung Galaxy S25 Ultra",
    cat_cash: "Cash Prizes",
    cat_cash_desc: "Up to 5,000,000 Ethiopian Birr direct bank payout",
    cat_laptop: "Laptops",
    cat_laptop_desc: "Apple MacBook Pro & High-performance Gaming Laptops",
    cat_tv: "Smart TVs",
    cat_tv_desc: "75-inch 4K UHD Smart OLED & QLED Screens",
    cat_sheep: "Holiday Sheep",
    cat_sheep_desc: "Prime fattened holiday livestock sheep",

    viewPrizes: "View Prizes",
    cutTicket: "Buy Ticket",
    section1: "Section 1",
    section2: "Section 2",
    section1Title: "Grand Premium Prize (Section 1)",
    section2Title: "Special Second Tier Prize (Section 2)",
    ticketPriceLabel: "Ticket Price:",
    currency: "ETB",
    availableTickets: "Available Tickets",
    closeModal: "Close",

    paymentTitle: "Ticket Purchase & Payment",
    paymentSubtitle: "Transfer payment to any of our official accounts and upload your receipt screenshot",
    selectedPrizeSummary: "Selected Prize",
    paymentMethodsTitle: "Official Payment Accounts",
    paymentMethodsSubtitle: "Make payment via Commercial Bank of Ethiopia, Telebirr, or Bank of Abyssinia",
    accountNumber: "Account Number",
    phoneNumber: "Phone / Account",
    accountHolder: "Account Name",
    copySuccess: "Number Copied!",
    clickToCopy: "Click to copy",
    customerFormTitle: "Customer Info & Payment Verification",
    phoneInputLabel: "Your Phone Number",
    phonePlaceholder: "e.g., 0911223344 or 0711223344",
    phoneHelp: "Winners will be directly notified via SMS and phone call",
    uploadProofLabel: "Upload Payment Screenshot",
    uploadProofPlaceholder: "Drag & drop payment receipt screenshot or click to browse",
    uploadProofHelp: "Bank slip or Telebirr SMS/screenshot (JPG, PNG, WebP)",
    fileSelected: "File Selected:",
    changeFile: "Change File",
    submitButton: "Submit Ticket",
    submitting: "Submitting...",

    successHeadline: "Congratulations! Your Ticket Has Been Registered",
    successMainMessage: "በአዲስ አመት መስከረም 17 አሸናፊ ከሆኑ በስልኮ መልዕክት ይደርሶታል!",
    ticketNumberLabel: "Ticket Reference ID:",
    dateLabel: "Submission Date:",
    downloadReceipt: "Download Voucher",
    backToHome: "Return to Homepage",

    bottomTrustText: "በኢትዮጲያ ሎተሪ እጣ ድረ-ገፅ እና አፕልኬሽን ሎተሪ በመቁረጥ እድሎን ይሞክሩ እራስዎን ከአጭበርባሪዎች ይታደጉ!",
    officialNotice: "Official online lottery system fully regulated and licensed by the Ethiopian National Lottery Administration.",
    quickLinks: "Quick Links",
    howItWorks: "How It Works",
    termsAndConditions: "Terms & Conditions",
    privacyPolicy: "Privacy Policy",
    contactUs: "Contact Us",
    customerService: "Customer Helpline: 994 / 011-551-0000",
    copyright: "© 2026 Ethiopian National Lottery Prize Draw. All Rights Reserved.",

    errorInvalidPhone: "Please enter a valid Ethiopian phone number (09... or 07...)",
    errorNoProof: "Please upload your payment proof screenshot",
    errorUploadFailed: "Failed to upload image. Please try again.",
    errorGeneral: "An error occurred. Please try again shortly."
  },

  om: {
    selectLanguage: "Afaan Filadhaa",
    appTitle: "Carraa Lootarii Itoophiyaa",
    appSubtitle: "Waltaa Lootarii Dijitaalaa fi Carraa Baasuu Mootummaa",
    heroPromo: "Baga Ayyaana Waggaa Haaraatiin Isin Gahe! Mana, Konkolaataa, Bilbila fi Badhaasa Maallaqaa Mo'adhaa!",
    heroBadge: "Carraa Addaa Waggaa Haaraa 2018",
    drawCountdownTitle: "Yeroo Carraan Ba'uuf Hafe:",
    drawDateText: "Guyyaa Carraan Ba'u: Masqala 17",
    days: "Guyyaa",
    hours: "Sa'aatii",
    minutes: "Daqiiqaa",
    seconds: "Sekondii",

    categoriesTitle: "Gosa Badhaasotaa",
    categoriesSubtitle: "Gosa badhaasaa barbaaddan filachuun carraa keessan muraa",
    cat_car: "Konkolaataa",
    cat_car_desc: "Konkolaattota V8, Kiroos-ooverii fi Taaksii ammayyaa",
    cat_condo: "Kondominiyeemii",
    cat_condo_desc: "Manoomman jireenyaa fi viillaa kutaa 2 fi 3 qaban",
    cat_phones: "Bilbila Ammayyaa",
    cat_phones_desc: "iPhone 16 Pro Max fi Samsung Galaxy S25 haaraa",
    cat_cash: "Maallaqa",
    cat_cash_desc: "Hamma Qarshii 5,000,000 badhaasa maallaqa callaa",
    cat_laptop: "Laaptooppii",
    cat_laptop_desc: "Apple MacBook Pro fi Laaptooppii Geemiingii ammayyaa",
    cat_tv: "Teeleviziyoinii",
    cat_tv_desc: "Teeleviziyoinii Ismaartii 75 Inchi 4K OLED",
    cat_sheep: "Hoolaa Ayyaanaa",
    cat_sheep_desc: "Hoolota foonii gabbatan ayyaanaaf ta'an",

    viewPrizes: "Badhaasota Ilaalaa",
    cutTicket: "Muraa",
    section1: "Kutaa 1",
    section2: "Kutaa 2",
    section1Title: "Badhaasa Guddaa (Kutaa 1)",
    section2Title: "Badhaasa Sadarkaa 2ffaa (Kutaa 2)",
    ticketPriceLabel: "Gatii Tiikeetii:",
    currency: "Qarshii",
    availableTickets: "Tiikeetota Jiran",
    closeModal: "Cufaa",

    paymentTitle: "Kaffaltii fi Tiikeetii Muruu",
    paymentSubtitle: "Herreegawwan kaffaltii armaan gadiitti kaffaluun ragaa ergaa",
    selectedPrizeSummary: "Badhaasa Filatame",
    paymentMethodsTitle: "Filannoowwan Kaffaltii",
    paymentMethodsSubtitle: "Baankii Daldala Itoophiyaa, Telebirr, yookiin Baankii Abisiiniyaatiin kaffalaa",
    accountNumber: "Lakkoofsa Herreegaa",
    phoneNumber: "Lakkoofsa Bilbilaa",
    accountHolder: "Maqaa Abbaa Herreegaa",
    copySuccess: "Lakkoofsi garagalfameera!",
    clickToCopy: "Garagalchuuf tuqaa",
    customerFormTitle: "Oodeeffannoo Maamilaa fi Ragaa Kaffaltii",
    phoneInputLabel: "Lakkoofsa Bilbila Keessanii",
    phonePlaceholder: "Fkn: 0911223344 yookiin 0711223344",
    phoneHelp: "Yoo mo'attan bilbila kanaan isiniif bilbilla",
    uploadProofLabel: "Suuraa Kaffaltii Galchaa (Screenshot)",
    uploadProofPlaceholder: "Suuraa nagahee kaffaltii asitti naqaa",
    uploadProofHelp: "Suuraa ragaa kaffaltii Baankii yookiin Telebirr",
    fileSelected: "Faayilli filatameera:",
    changeFile: "Faayila jijjiiraa",
    submitButton: "Galchaa",
    submitting: "Galchaa jira...",

    successHeadline: "Baga Gammaddan! Tiikeetiin Keessan Galmaa'eera",
    successMainMessage: "በአዲስ አመት መስከረም 17 አሸናፊ ከሆኑ በስልኮ መልዕክት ይደርሶታል!",
    ticketNumberLabel: "Lakkoofsa Tiikeetii:",
    dateLabel: "Guyyaa Galmaa'e:",
    downloadReceipt: "Nagahee Buufadhaa",
    backToHome: "Fuula Duraatti Deebi'aa",

    bottomTrustText: "በኢትዮጲያ ሎተሪ እጣ ድረ-ገፅ እና አፕልኬሽን ሎተሪ በመቁረጥ እድሎን ይሞክሩ እራስዎን ከአጭበርባሪዎች ይታደጉ!",
    officialNotice: "Baqqaana Lootarii Biyyoolessaa Itoophiyaatiin kan beekamee fi heeyyame.",
    quickLinks: "Liinkiiwwan",
    howItWorks: "Akkamitti Hojjeta?",
    termsAndConditions: "Waliigaltee fi Seera",
    privacyPolicy: "Imaammata Dhuunfaa",
    contactUs: "Nu Qunnamaa",
    customerService: "Tajaajila Maamiltootaa: 994 / 011-551-0000",
    copyright: "© 2026 Carraa Lootarii Itoophiyaa. Mirgi Hundi Seeraan Eegamaadha.",

    errorInvalidPhone: "Maaloo lakkoofsa bilbilaa sirrii galchaa (09... ykn 07...)",
    errorNoProof: "Maaloo suuraa nagahee kaffaltii galchaa",
    errorUploadFailed: "Suuraa fe'uu hin dandeenye, irra deebi'aa yaalaa",
    errorGeneral: "Dogoggorri uumameera, xiqqoo booda yaalaa"
  },

  ti: {
    selectLanguage: "ቋንቋ ምረጹ",
    appTitle: "ናይ ኢትዮጵያ ሎተሪ ዕጫ",
    appSubtitle: "ወግዓዊ ዲጂታል ሎተሪ ምቑራጽን ዕጫ መውጽእን መድረኽ",
    heroPromo: "ብሓድሽ ዓመት ናይ ገዛ ወይ መኪና ወይ ዘመናዊ ሞባይልን ካልኦት ዓበይቲ ሽልማታትን ተዓዋቲ ኩኑ!",
    heroBadge: "ናይ ሓድሽ ዓመት ፍሉይ ዕጫ 2018",
    drawCountdownTitle: "ዕጫ ንምውጻእ ዝተረፈ ግዜ:",
    drawDateText: "መዓልቲ ዕጫ፡ መስከረም 17",
    days: "መዓልትታት",
    hours: "ሰዓታት",
    minutes: "ደቓይቕ",
    seconds: "ሰከንድታት",

    categoriesTitle: "ዓይነታት ሽልማት",
    categoriesSubtitle: "ዝደለይዎ ዓይነት ሽልማት ብምምራጽ ቲኬትኩም ቁረጹ",
    cat_car: "መኪና",
    cat_car_desc: "ዘመናዊ ቪ-8፣ ክሮስኦቨርን ናይ ከተማ መካይን",
    cat_condo: "ኮንዶሚኒየም",
    cat_condo_desc: "ናይ 2ን 3ን መደቀሲ ዘመናዊ ኣፓርታማታትን ቪላታትን",
    cat_phones: "ዘመናዊ ሞባይላት",
    cat_phones_desc: "ሓደሽቲ iPhone 16 Pro Maxን Samsung Galaxy S25ን",
    cat_cash: "ጥረ ገንዘብ",
    cat_cash_desc: "ክሳብ 5,000,000 ናይ ኢትዮጵያ ብር ጥረ ገንዘብ",
    cat_laptop: "ላፕቶፕ",
    cat_laptop_desc: "Apple MacBook Proን ሃይ-ፐርፎርማንስ ጌሚንግ ላፕቶፓትን",
    cat_tv: "ቴሌቪዥን",
    cat_tv_desc: "75 ኢንች 4K ስማርት OLEDን QLEDን ቴሌቪዥናት",
    cat_sheep: "በጊዕ",
    cat_sheep_desc: "ንበዓል ዝኾኑ ዝሰበሑ ብሉጻት ኣባጊዕ",

    viewPrizes: "ሽልማታት ርኣዩ",
    cutTicket: "ቁረጹ",
    section1: "ክፍሊ 1",
    section2: "ክፍሊ 2",
    section1Title: "ቀንዲ ፕሪሚየም ሽልማት (ክፍሊ 1)",
    section2Title: "ፍሉይ ካልኣይ ደረጃ ሽልማት (ክፍሊ 2)",
    ticketPriceLabel: "ዋጋ ቲኬት:",
    currency: "ብር",
    availableTickets: "ዘለዉ ቲኬታት",
    closeModal: "ዕጸው",

    paymentTitle: "ቲኬት ምቑራጽን ክፍሊትን",
    paymentSubtitle: "ኣብዞም ዝስዕቡ ሕሳባት ብምኽፋል ናይ ክፍሊት መረጋገጺ ስእሊ የእትዉ",
    selectedPrizeSummary: "ዝተመረጸ ሽልማት",
    paymentMethodsTitle: "ናይ ክፍሊት ኣማራጺታት",
    paymentMethodsSubtitle: "ንግዲ ባንኪ፣ ቴሌብር ወይ ኣቢሲንያ ባንኪ ተጠቐሙ",
    accountNumber: "ቁጽሪ ሕሳብ",
    phoneNumber: "ቁጽሪ ስልኪ",
    accountHolder: "ዋና ሕሳብ",
    copySuccess: "ቁጽሪ ተቐዲሑ!",
    clickToCopy: "ንምቕዳሕ ጠውቑ",
    customerFormTitle: "ሓበሬታ ዓሚልን መረጋገጺ ክፍሊትን",
    phoneInputLabel: "ቁጽሪ ስልክኹም",
    phonePlaceholder: "ንኣብነት፡ 0911223344 ወይ 0711223344",
    phoneHelp: "ተዓዋቲ ምስ እትኾኑ በዚ ቁጽሪ ክንድውለልኩም ኢና",
    uploadProofLabel: "ናይ ክፍሊት ስእሊ ኣእትዉ (Screenshot)",
    uploadProofPlaceholder: "ናይ ክፍሊት ደረሰኝ ስእሊ ኣብዚ ስሓቡ ወይ ምረጹ",
    uploadProofHelp: "ናይ ባንኪ ወይ ቴሌብር መረጋገጺ ስእሊ",
    fileSelected: "ፋይል ተመሪጹ:",
    changeFile: "ፋይል ቀይር",
    submitButton: "ኣእትው",
    submitting: "የእቱ ኣሎ...",

    successHeadline: "እንቋዕ ሓጎሰኩም! ቲኬትኩም ብትኽክል ተመዝጊቡ ኣሎ",
    successMainMessage: "በአዲስ አመት መስከረም 17 አሸናፊ ከሆኑ በስልኮ መልዕክት ይደርሶታል!",
    ticketNumberLabel: "መለለዪ ቁጽሪ ቲኬት:",
    dateLabel: "ዝተመዝገበሉ ዕለት:",
    downloadReceipt: "ደረሰኝ ኣውርድ",
    backToHome: "ናብ ዋና ገጽ ተመለስ",

    bottomTrustText: "በኢትዮጲያ ሎተሪ እጣ ድረ-ገፅ እና አፕልኬሽን ሎተሪ በመቁረጥ እድሎን ይሞክሩ እራስዎን ከአጭበርባሪዎች ይታደጉ!",
    officialNotice: "ብመንግስቲ ሎተሪ ምምሕዳር ኢትዮጵያ ሕጋዊ ፍቓድ ዝተውሃቦ ወግዓዊ መድረኽ።",
    quickLinks: "መላግቦታት",
    howItWorks: "ከመይ ይሰርሕ?",
    termsAndConditions: "ውዕላትን ደንብታትን",
    privacyPolicy: "ናይ ውልቀ ፖሊሲ",
    contactUs: "ርኸቡና",
    customerService: "ናይ ዓማዊል ኣገልግሎት: 994 / 011-551-0000",
    copyright: "© 2026 ናይ ኢትዮጵያ ሎተሪ ዕጫ። ኩሉ መሰል ብሕጊ ዝተሓለወ እዩ።",

    errorInvalidPhone: "በጃኹም ትክክለኛ ናይ ኢትዮጵያ ቁጽሪ ስልኪ የእትዉ",
    errorNoProof: "በጃኹም ናይ ክፍሊት መረጋገጺ ስእሊ የእትዉ",
    errorUploadFailed: "ስእሊ ምእታው ኣይተኻእለን፣ ደጊምኩም ፈትኑ",
    errorGeneral: "ስሕተት ተፈጢሩ ኣሎ፣ ድሕሪ ሒደት ግዜ ፈትኑ"
  },

  ar: {
    selectLanguage: "اختر اللغة",
    appTitle: "سحب اليانصيب الإثيوبي",
    appSubtitle: "البوابة الرسمية لشراء تذاكر اليانصيب الرقمية والسحوبات الكبرى",
    heroPromo: "بمناسبة رأس السنة، اربح منازل فاخرة، سيارات حديثة، أحدث الهواتف الذكية وجوائز نقدية ضخمة!",
    heroBadge: "سحب رأس السنة الاستثنائي 2018",
    drawCountdownTitle: "الوقت المتبقي حتى موعد السحب الكبير:",
    drawDateText: "تاريخ السحب: 17 مسكرم (سبتمبر)",
    days: "أيام",
    hours: "ساعات",
    minutes: "دقائق",
    seconds: "ثوانٍ",

    categoriesTitle: "فئات الجوائز",
    categoriesSubtitle: "اختر فئة الجائزة المطلوبة واشترِ تذكرتك الرسمية الآن",
    cat_car: "سيارات",
    cat_car_desc: "سيارات دفع رباعي فاخرة V8 وسيارات سيدان حديثة",
    cat_condo: "شقق وفيلات",
    cat_condo_desc: "شقق سكنية حديثة وفيلات راقية مؤثثة",
    cat_phones: "هواتف ذكية",
    cat_phones_desc: "أحدث أجهزة iPhone 16 Pro Max و Samsung S25 Ultra",
    cat_cash: "جوائز نقدية",
    cat_cash_desc: "ما يصل إلى 5,000,000 بر إثيوبي تحويل بنكي مباشر",
    cat_laptop: "أجهزة كمبيوتر",
    cat_laptop_desc: "Apple MacBook Pro وأجهزة حواسيب ألعاب فائقة القوة",
    cat_tv: "شاشات ذكية",
    cat_tv_desc: "شاشات ذكية مقاس 75 بوصة 4K OLED و QLED",
    cat_sheep: "أضاحي العيد",
    cat_sheep_desc: "أفضل الأغنام والأضاحي الممتازة للأعياد والمناسبات",

    viewPrizes: "عرض الجوائز",
    cutTicket: "شراء التذكرة",
    section1: "القسم 1",
    section2: "القسم 2",
    section1Title: "الجائزة الكبرى الممتازة (القسم 1)",
    section2Title: "الجائزة الخاصة من الدرجة الثانية (القسم 2)",
    ticketPriceLabel: "سعر التذكرة:",
    currency: "بر",
    availableTickets: "التذاكر المتوفرة",
    closeModal: "إغلاق",

    paymentTitle: "شراء التذكرة وإتمام الدفع",
    paymentSubtitle: "قم بتحويل المبلغ إلى أحد حساباتنا الرسمية وارفع إشعار التحويل",
    selectedPrizeSummary: "الجائزة المختارة",
    paymentMethodsTitle: "طرق الدفع الرسمية",
    paymentMethodsSubtitle: "الدفع متاح عبر البنك التجاري الإثيوبي، تيليبر، أو بنك الحبشة",
    accountNumber: "رقم الحساب",
    phoneNumber: "رقم الهاتف / الحساب",
    accountHolder: "اسم صاحب الحساب",
    copySuccess: "تم نسخ الرقم بنجاح!",
    clickToCopy: "انقر للنسخ",
    customerFormTitle: "بيانات العميل وإثبات الدفع",
    phoneInputLabel: "رقم هاتفك المحمول",
    phonePlaceholder: "مثال: 0911223344 أو 0711223344",
    phoneHelp: "سيتم الاتصال بالفائزين عبر هذا الرقم مباشرة",
    uploadProofLabel: "رفع صورة إيصال التحويل (Screenshot)",
    uploadProofPlaceholder: "اسحب صورة الإيصال إلى هنا أو اختر ملفاً",
    uploadProofHelp: "صورة إيصال التحويل البنكي أو رسالة تيليبر",
    fileSelected: "تم اختيار الملف:",
    changeFile: "تغيير الملف",
    submitButton: "إرسال وتأكيد التذكرة",
    submitting: "جاري الإرسال...",

    successHeadline: "تهانينا! تم تسجيل تذكرتك بنجاح",
    successMainMessage: "በአዲስ አመት መስከረም 17 አሸናፊ ከሆኑ በስልኮ መልዕክት ይደርሶታል!",
    ticketNumberLabel: "رقم مرجع التذكرة:",
    dateLabel: "تاريخ التسجيل:",
    downloadReceipt: "تحميل الإيصال",
    backToHome: "العودة للرئيسية",

    bottomTrustText: "በኢትዮጲያ ሎተሪ እጣ ድረ-ገፅ እና አፕልኬሽን ሎተሪ በመቁረጥ እድሎን ይሞክሩ እራስዎን ከአጭበርባሪዎች ይታደጉ!",
    officialNotice: "بوابة اليانصيب الرسمية المرخصة والمعتمدة من إدارة اليانصيب الوطني الإثيوبي.",
    quickLinks: "روابط سريعة",
    howItWorks: "كيف يعمل النظام؟",
    termsAndConditions: "الشروط والأحكام",
    privacyPolicy: "سياسة الخصوصية",
    contactUs: "اتصل بنا",
    customerService: "خدمة العملاء: 994 / 011-551-0000",
    copyright: "© 2026 سحب اليانصيب الإثيوبي. جميع الحقوق محفوظة.",

    errorInvalidPhone: "يرجى إدخال رقم هاتف إثيوبي صحيح (09... أو 07...)",
    errorNoProof: "يرجى إرفاق صورة إيصال الدفع",
    errorUploadFailed: "فشل رفع الصورة، يرجى المحاولة مجدداً",
    errorGeneral: "حدث خطأ ما، يرجى المحاولة بعد قليل"
  },

  sid: {
    selectLanguage: "Afoo Doorre",
    appTitle: "Itophiyu Lotereyi Qara",
    appSubtitle: "Umi Dijitaale Lotereye Dottootiinna Uynanna Platafoorme",
    heroPromo: "Haaro Diro Mini, Makaana, Haaro Silke woy Baate Maallaqa Qara Ikke!",
    heroBadge: "Haaro Diri Boco 2018",
    drawCountdownTitle: "Qara Ba'anno Yanna:",
    drawDateText: "Qara Fulle: Meskerem 17",
    days: "Barra",
    hours: "Sa'aate",
    minutes: "Daqiiqa",
    seconds: "Sekende",

    categoriesTitle: "Qaru Aynaate",
    categoriesSubtitle: "Hasidhoonnita qaru aynaate doodde lotereye murre",
    cat_car: "Makaana",
    cat_car_desc: "Haaro V8, Kiroos-ooverinna Katamu makaanna",
    cat_condo: "Kondominiyeeme",
    cat_condo_desc: "2 fi 3 kifile noosi haaro mineenna viilla",
    cat_phones: "Haaro Silke",
    cat_phones_desc: "iPhone 16 Pro Max fi Samsung Galaxy S25",
    cat_cash: "Woxe / Maallaqa",
    cat_cash_desc: "5,000,000 Birre geeshsha noo woxi qara",
    cat_laptop: "Laaptooppe",
    cat_laptop_desc: "Apple MacBook Pro fi Geemiingi laaptooppe",
    cat_tv: "Teelevizhiine",
    cat_tv_desc: "75 Inche 4K Ismaarte OLED Teelevizhiine",
    cat_sheep: "Geleto Gegeesho",
    cat_sheep_desc: "Ayyaanaho ikkanno buuxado gegeesho",

    viewPrizes: "Qara Lai",
    cutTicket: "Murre",
    section1: "Kifile 1",
    section2: "Kifile 2",
    section1Title: "Umi Qara (Kifile 1)",
    section2Title: "Layinki Qara (Kifile 2)",
    ticketPriceLabel: "Tiikeete Waga:",
    currency: "Birre",
    availableTickets: "Noo Tiikeete",
    closeModal: "Cufi",

    paymentTitle: "Tiikeete Muratenna Baatooshshe",
    paymentSubtitle: "Baatooshshe baatte kaffaltu nagahee eesi",
    selectedPrizeSummary: "Dooramino Qara",
    paymentMethodsTitle: "Baatooshshu Doogo",
    paymentMethodsSubtitle: "Itoophiyu Daldalu Baankenna Telebirri widoonni baati",
    accountNumber: "Hisabu Kiiro",
    phoneNumber: "Silku Kiiro",
    accountHolder: "Hisabu Anna",
    copySuccess: "Kiiro kooppe assinoonni!",
    clickToCopy: "Kooppe assate kikkisi",
    customerFormTitle: "Maamilu Mashakka fi Baatooshshu Tuma",
    phoneInputLabel: "Ki'ne Silku Kiiro",
    phonePlaceholder: "Lawa: 0911223344 woy 0711223344",
    phoneHelp: "Qeeltiniro kuneenni bilbilnseemmo",
    uploadProofLabel: "Baatooshshu Misile Eesi (Screenshot)",
    uploadProofPlaceholder: "Baatooshshu nagahe misile konniira eesi",
    uploadProofHelp: "Baankete woy Telebirri misile",
    fileSelected: "Faayile dooramino:",
    changeFile: "Faayile soorri",
    submitButton: "Eesi",
    submitting: "Eesanni no...",

    successHeadline: "Hagereera! Tiikeete'ne tunsinoonni",
    successMainMessage: "በአዲስ አመት መስከረም 17 አሸናፊ ከሆኑ በስልኮ መልዕክት ይደርሶታል!",
    ticketNumberLabel: "Tiikeetu Kiiro:",
    dateLabel: "Eesinsoonni Barra:",
    downloadReceipt: "Nagahe Buusi",
    backToHome: "Umi Fuulira Galagali",

    bottomTrustText: "በኢትዮጲያ ሎተሪ እጣ ድረ-ገፅ እና አፕልኬሽን ሎተሪ በመቁረጥ እድሎን ይሞክሩ እራስዎን ከአጭበርባሪዎች ይታደጉ!",
    officialNotice: "Itoophiyu Lotereyi Biddissu Heera Garinni Fajjinoonniha.",
    quickLinks: "Liinkoota",
    howItWorks: "Hiitto Loosanno?",
    termsAndConditions: "Seera fi Wodananna",
    privacyPolicy: "Umikki Mashakka",
    contactUs: "Ninke Xadhe",
    customerService: "Maamilu Kawa: 994 / 011-551-0000",
    copyright: "© 2026 Itophiyu Lotereyi Qara.",

    errorInvalidPhone: "Gari noota silku kiiro eesi",
    errorNoProof: "Baatooshshu misile eesi",
    errorUploadFailed: "Misile eesa didandiinsoonni",
    errorGeneral: "Sora kalaqantino"
  },

  so: {
    selectLanguage: "Dooro Luqadda",
    appTitle: "Bakhtiyaanasiibka Qaranka Itoobiya",
    appSubtitle: "Goobta Rasmiga ah ee Iibsashada Tikidhada Bakhtiyaanasiibka",
    heroPromo: "Sanadka Cusub ku guulayso guryo casri ah, baabuur, taleefannada ugu dambeeyay iyo lacag caddaan ah!",
    heroBadge: "Quraxda Gaarka ah ee Sanadka Cusub 2018",
    drawCountdownTitle: "Waqtiga ka dhiman Qori-tuurka Weyn:",
    drawDateText: "Taariikhda Qori-tuurka: 17 Meskerem",
    days: "Maalmood",
    hours: "Saacadood",
    minutes: "Daqiiqadood",
    seconds: "Ilbiriqsi",

    categoriesTitle: "Qaybaha Abaalmarinta",
    categoriesSubtitle: "Dooro qaybta aad rabto oo jar tikidhadaada hadda",
    cat_car: "Baabuur",
    cat_car_desc: "Baabuurta raaxada ee V8 iyo gawaadhida casriga ah",
    cat_condo: "Guryo / Dabaqyo",
    cat_condo_desc: "Dabaqyo casri ah iyo filooyin raaxo leh",
    cat_phones: "Taleefanno Casri ah",
    cat_phones_desc: "iPhone 16 Pro Max iyo Samsung Galaxy S25 cusub",
    cat_cash: "Lacag Caddaan ah",
    cat_cash_desc: "Ilaa 5,000,000 Birr oo toos lagugu wareejinayo",
    cat_laptop: "Kombiyuutarro",
    cat_laptop_desc: "Apple MacBook Pro iyo Laptobyada cayaaraha awoodda badan",
    cat_tv: "Telefishanno",
    cat_tv_desc: "75 Inji 4K Smart OLED & QLED Telefishanno",
    cat_sheep: "Ido Ciid",
    cat_sheep_desc: "Ido buuran oo loogu talagalay munaasabadaha ciidda",

    viewPrizes: "Eeg Abaalmarinnada",
    cutTicket: "Jar Tikidhka",
    section1: "Qaybta 1",
    section2: "Qaybta 2",
    section1Title: "Abaalmarinta Weyn ee 1aad",
    section2Title: "Abaalmarinta Gaarka ah ee 2aad",
    ticketPriceLabel: "Qiimaha Tikidhka:",
    currency: "Birr",
    availableTickets: "Tikidhada Yaalla",
    closeModal: "Xidh",

    paymentTitle: "Iibsashada Tikidhka & Lacag Bixinta",
    paymentSubtitle: "Lacagta ku shub akoonnada rasmiga ah oo soo geli sawirka rasiidka",
    selectedPrizeSummary: "Abaalmarinta La Doortay",
    paymentMethodsTitle: "Hababka Lacag Bixinta",
    paymentMethodsSubtitle: "Bixi adoo isticmaalaya Bankiga Ganacsiga, Telebirr, ama Abyssinia Bank",
    accountNumber: "Lambarka Koontada",
    phoneNumber: "Lambarka Taleefanka",
    accountHolder: "Magaca Koontada",
    copySuccess: "Waa la koobiyeeyay!",
    clickToCopy: "Guji si aad u koobiyeysato",
    customerFormTitle: "Xogta Macmiilka & Caddaynta Lacag Bixinta",
    phoneInputLabel: "Lambarkaaga Taleefanka",
    phonePlaceholder: "Tusaale: 0911223344 ama 0711223344",
    phoneHelp: "Haddii aad guulaysato lambarkan ayaan kugala soo xidhiidhi doonnaa",
    uploadProofLabel: "Soo geli Sawirka Lacag Bixinta (Screenshot)",
    uploadProofPlaceholder: "Soo jiid sawirka rasiidka halkan",
    uploadProofHelp: "Sawirka rasiidka bangiga ama Telebirr",
    fileSelected: "Faylka la doortay:",
    changeFile: "Beddel Faylka",
    submitButton: "Geli / Dir",
    submitting: "Waa la dirayaa...",

    successHeadline: "Hambalyo! Tikidhkaaga si guul leh ayaa loo diiwaangeliyay",
    successMainMessage: "በአዲስ አመት መስከረም 17 አሸናፊ ከሆኑ በስልኮ መልዕክት ይደርሶታል!",
    ticketNumberLabel: "Lambarka Tikidhka:",
    dateLabel: "Taariikhda:",
    downloadReceipt: "Degso Rasiidka",
    backToHome: "Ku Laabo Bogga Hore",

    bottomTrustText: "በኢትዮጲያ ሎተሪ እጣ ድረ-ገፅ እና አፕልኬሽን ሎተሪ በመቁረጥ እድሎን ይሞክሩ እራስዎን ከአጭበርባሪዎች ይታደጉ!",
    officialNotice: "Waxaa shati siisay Hay'adda Bakhtiyaanasiibka Qaranka Itoobiya.",
    quickLinks: "Xidhiidhada Degdegga ah",
    howItWorks: "Sidee u Shaqeysaa?",
    termsAndConditions: "Shuruudaha & Xeerarka",
    privacyPolicy: "Xeerka Qarsoodiga",
    contactUs: "Nala Soo Xidhiidh",
    customerService: "Adeegga Macmiilka: 994 / 011-551-0000",
    copyright: "© 2026 Bakhtiyaanasiibka Qaranka Itoobiya.",

    errorInvalidPhone: "Fadlan geli nambar taleefan oo sax ah",
    errorNoProof: "Fadlan soo geli sawirka rasiidka lacag bixinta",
    errorUploadFailed: "Faylka lama soo gelin karo, fadlan ku celi",
    errorGeneral: "Khalad ayaa dhacay, fadlan mar kale isku day"
  },

  wal: {
    selectLanguage: "Doonaa Dooreite",
    appTitle: "Itoophiyaa Lotore Loottuwaa",
    appSubtitle: "Woggaa Dijitaale Lotore Qanxxonnee Loottu Kessiyo Madarakkaa",
    heroPromo: "Ooratta Layttan Keettaa, Kaamiyaa, Ooratta Bilbiliyaa qassi Darro Miishshaa Anjjettiite!",
    heroBadge: "Ooratta Layttaa Dumma Loottuwaa 2018",
    drawCountdownTitle: "Loottuy Kessiyo Wodey Attiday:",
    drawDateText: "Loottu Gallassay: Maskarama 17",
    days: "Gallassata",
    hours: "Saatiyata",
    minutes: "Daqiiqata",
    seconds: "Sekondeta",

    categoriesTitle: "Loottuwaa Qommotata",
    categoriesSubtitle: "Koyiyo loottuwaa qommuwaa dooridi intte tikkeetiyaa qanxxiite",
    cat_car: "Kaamiyaa",
    cat_car_desc: "Ooratta V8, Kiroos-ooverenne Katamaa Kaamiyata",
    cat_condo: "Kondominiyeemiyaa",
    cat_condo_desc: "2nne 3 kifile de'iyo ooratta keettata",
    cat_phones: "Ooratta Bilbiliyaata",
    cat_phones_desc: "iPhone 16 Pro Maxnne Samsung Galaxy S25",
    cat_cash: "Miishshaa",
    cat_cash_desc: "Gakkanaawu 5,000,000 Birra kashshuwaa anjjettiyoobaa",
    cat_laptop: "Laaptooppiyaa",
    cat_laptop_desc: "Apple MacBook Pro geemiing laaptooppeta",
    cat_tv: "Teelevizhiiniyaa",
    cat_tv_desc: "75 Inche 4K Ismaarte OLED Teelevizhiineta",
    cat_sheep: "Baalaa Dorssaa",
    cat_sheep_desc: "Baalaassi gidiya modhdho dorssata",

    viewPrizes: "Loottuwaa Be'ite",
    cutTicket: "Qanxxiite",
    section1: "Shaahuwaa 1",
    section2: "Shaahuwaa 2",
    section1Title: "Waanna Loottuwaa (Shaahuwaa 1)",
    section2Title: "La'entho Loottuwaa (Shaahuwaa 2)",
    ticketPriceLabel: "Tikkeetiyaa Gatiyaa:",
    currency: "Birra",
    availableTickets: "De'iya Tikkeeteta",
    closeModal: "Gorddite",

    paymentTitle: "Tikkeetiyaa Qanxxonne Qanxxiyaa",
    paymentSubtitle: "Miishshaa kaffalidi nagahee misiliyaa yeddiite",
    selectedPrizeSummary: "Doorattida Loottuwaa",
    paymentMethodsTitle: "Kaffalanawu De'iya Ogeta",
    paymentMethodsSubtitle: "Itoophiyaa Daldalaa Baankiyan, Telebirran woy Abisiiniyaa Baankiyan kaffalite",
    accountNumber: "Hisaabiyaa Payduwaa",
    phoneNumber: "Bilbiliyaa Payduwaa",
    accountHolder: "Hisaabiyaa Godaa",
    copySuccess: "Payduy kooppe kettis!",
    clickToCopy: "Kooppe ootanawu bucciite",
    customerFormTitle: "Asaa Mashshatanne Kaffaluwaa Erissiyaabaa",
    phoneInputLabel: "Intte Bilbiliyaa Payduwaa",
    phonePlaceholder: "Leemiso: 0911223344 woy 0711223344",
    phoneHelp: "Anjettikko ha bilbiliyaan inttewu xeegeettees",
    uploadProofLabel: "Kaffalido Misiliyaa Gelissite (Screenshot)",
    uploadProofPlaceholder: "Kaffalido nagahe misiliyaa haani yeddiite",
    uploadProofHelp: "Baankiyaa woy Telebirriyaa misiliyaa",
    fileSelected: "Faayiley doorettiis:",
    changeFile: "Faayiliyaa Laammite",
    submitButton: "Yeddiite / Gelissite",
    submitting: "Gelissaydda de'ees...",

    successHeadline: "Ufayttite! Intte Tikkeetey Lo'on Sunttettiis",
    successMainMessage: "በአዲስ አመት መስከረም 17 አሸናፊ ከሆኑ በስልኮ መልዕክት ይደርሶታል!",
    ticketNumberLabel: "Tikkeetiyaa Payduwaa:",
    dateLabel: "Gelissido Gallassay:",
    downloadReceipt: "Nagahiyaa Wottiite",
    backToHome: "Waanna Sinttaayi Simmite",

    bottomTrustText: "በኢትዮጲያ ሎተሪ እጣ ድረ-ገፅ እና አፕልኬሽን ሎተሪ በመቁረጥ እድሎን ይሞክሩ እራስዎን ከአጭበርባሪዎች ይታደጉ!",
    officialNotice: "Itoophiyaa Lotore Kaalloto Kaalettan Wogaan Erettidaagaa.",
    quickLinks: "Eesuwaa Liinketa",
    howItWorks: "Woygidi Oottii?",
    termsAndConditions: "Wogaanne Higgeta",
    privacyPolicy: "Poliisiyaa",
    contactUs: "Nuuna Xeegeite",
    customerService: "Asaa Kaalluwaa: 994 / 011-551-0000",
    copyright: "© 2026 Itoophiyaa Lotore Loottuwaa.",

    errorInvalidPhone: "Eeqa bilbiliyaa payduwaa gelissite",
    errorNoProof: "Kaffalido misiliyaa gelissite",
    errorUploadFailed: "Misiliyaa gelissanawu danddayettibeenna",
    errorGeneral: "Bala'ey gakkiis, guutta gallassaappe guye paaccite"
  }
};

/**
 * Helper to get active language from localStorage or default to 'am'
 */
function getCurrentLanguage() {
  const saved = localStorage.getItem("ethio_lottery_lang");
  if (saved && TRANSLATIONS[saved]) {
    return saved;
  }
  return "am";
}

/**
 * Set active language, update document & HTML elements
 */
function setLanguage(langCode) {
  if (!TRANSLATIONS[langCode]) {
    langCode = "am";
  }
  localStorage.setItem("ethio_lottery_lang", langCode);

  // Set RTL for Arabic
  if (langCode === "ar") {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "ar");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.setAttribute("lang", langCode);
  }

  // Update all [data-i18n] text
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (TRANSLATIONS[langCode] && TRANSLATIONS[langCode][key]) {
      el.textContent = TRANSLATIONS[langCode][key];
    }
  });

  // Update all [data-i18n-placeholder] inputs
  const placeholderEls = document.querySelectorAll("[data-i18n-placeholder]");
  placeholderEls.forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (TRANSLATIONS[langCode] && TRANSLATIONS[langCode][key]) {
      el.setAttribute("placeholder", TRANSLATIONS[langCode][key]);
    }
  });

  // Highlight active language button in UI
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    if (btn.getAttribute("data-lang") === langCode) {
      btn.classList.add("active-lang");
    } else {
      btn.classList.remove("active-lang");
    }
  });

  // Dispatch event for components that need custom re-rendering
  window.dispatchEvent(new CustomEvent("languageChanged", { detail: { lang: langCode } }));
}

/**
 * Translate a single key with current or specified language
 */
function t(key, langCode) {
  const lang = langCode || getCurrentLanguage();
  if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
    return TRANSLATIONS[lang][key];
  }
  if (TRANSLATIONS.am && TRANSLATIONS.am[key]) {
    return TRANSLATIONS.am[key];
  }
  return key;
}

// Attach to window
window.TRANSLATIONS = TRANSLATIONS;
window.getCurrentLanguage = getCurrentLanguage;
window.setLanguage = setLanguage;
window.t = t;
