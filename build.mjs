// Generates every page of flashoneg.com (Arabic + English) from the data below.
// Run:  node build.mjs      Output is committed; the host serves the files as-is.
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname } from "node:path";

const ORIGIN = "https://flashoneg.com";
const WA = "201157070087", TEL = "+201157070087", TEL_SHOW = "01157070087", EMAIL = "info@flashoneg.com";
const MAP = "https://maps.app.goo.gl/vbUYCvFpYyoybS6L6";
const TODAY = new Date().toISOString().slice(0, 10);
const ver = (f) => createHash("md5").update(readFileSync(f)).digest("hex").slice(0, 8);
const CSS_V = ver("assets/site.css"), JS_V = ver("assets/site.js");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

/* ---------- content ---------- */
const S = {
  ar: {
    lang: "ar", dir: "rtl", home: "/", other: "/en/", otherLabel: "English", locale: "ar_EG",
    brand: "فلاش أون", tagline: "شركة مصرية لتصنيع الأدوات الكهربائية",
    title: "فلاش أون | مصنع مصري لمستلزمات التأسيس الكهربائي",
    desc: "فلاش أون مصنع مصري منذ 2013: خراطيم كهربائية، خرطوم مقاوم للحريق، سوستة فلكسبل، مواسير وإكسسوارات PVC، علب ماجيك وكابلات. خراطيم مختبَرة وفق المواصفة المصرية ES 1283-2008.",
    skip: "تخطَّ إلى المحتوى", menu: "القائمة",
    nav: { products: "المنتجات", quality: "الجودة", about: "عن الشركة", contact: "تواصل معنا" },
    quote: "اطلب عرض سعر", factory: "موقع المصنع",
    h1: "كل تأسيس كهربائي يبدأ من فلاش أون",
    sub: "مصنع مصري لمستلزمات التأسيس الكهربائي منذ 2013: خراطيم، مواسير PVC، علب ماجيك وكابلات.",
    heroCap: "خراطيم كهربائية من إنتاج فلاش أون",
    heroAlt: "لفات خراطيم كهربائية من فلاش أون باللونين الأزرق والأحمر",
    facts: [["2013", "بدأنا التصنيع"], ["27 محافظة", "نورّد إليها"], ["ES 1283-2008", "المواصفة المصرية التي اختُبرت عليها خراطيمنا"]],
    prodH: "المنتجات",
    prodLead: "سبعة أصناف نصنّعها لمرحلة التأسيس الكهربائي، من الخرطوم إلى الكابل. الخراطيم متوفرة بالأزرق والأحمر وبجميع الألوان.",
    askWa: "المقاسات والأسعار",
    qaH: "تقارير اختبار مختومة من جهتين حكوميتين",
    qaLead: "اختُبرت خراطيم فلاش أون في مايو 2025 في مركز بحوث الطاقة بكلية الهندسة – جامعة القاهرة، وفي المركز القومي لبحوث الإسكان والبناء. وخلاصة تقرير مركز بحوث الطاقة: العيّنة مطابقة فنياً للمواصفة القياسية المصرية 1283/2008.",
    resCap: "نتائج مركز بحوث الطاقة – خرطوم مقاوم للحريق، 20 مم و25 مم",
    res: [
      ["المقاسات", "20 مم: قطر خارجي 20.2 مم وداخلي 16.1 مم. 25 مم: خارجي 25.1 مم وداخلي 20.5 مم."],
      ["الانضغاط", "لم تظهر تشققات أو نتوءات."],
      ["الصدم", "12 عيّنة، لم يظهر تفتّت في أي منها."],
      ["الثني والحرارة", "مطابق في الاختبارين."],
      ["المتانة الكهربية", "2000 فولت، 50 هرتز، 5 دقائق: لم يحدث انهيار كهربي للعزل."],
      ["العزل الكهربي", "مقاومة أكبر من 1 جيجا أوم لجميع العيّنات."],
      ["مقاومة الاحتراق", "إطفاء ذاتي خلال أقل من 10 ثوانٍ."],
      ["الخلاصة", "مطابقة فنياً للمواصفة القياسية المصرية 1283/2008."],
    ],
    hbrc: "تقرير المركز القومي لبحوث الإسكان والبناء: عيّنات خرطوم برتقالي بقطر داخلي 16 مم و23 مم، اختُبرت طبقاً للمواصفتين ES 1283-2008 و IEC 614-1.",
    repsH: "صفحات من التقارير",
    repCap: { erc: "مركز بحوث الطاقة – جامعة القاهرة", hbrc: "المركز القومي لبحوث الإسكان والبناء" },
    close: "إغلاق", prev: "السابق", next: "التالي", viewer: "عرض التقرير",
    abH: "مصنع مصري تتعامل معه مباشرة",
    abLead: "فلاش أون شركة مصرية متخصصة في تصنيع الأدوات الكهربائية. نؤمن بأن التعامل الواضح أساس كل شراكة ناجحة.",
    serve: ["نخدم", "المقاولين، وأصحاب مواقع التنفيذ، وتجار الكهرباء."],
    com: [
      ["تصنيع محلي", "منتجات تُصنَّع في مصر وتحمل اسم فلاش أون."],
      ["من المصنع مباشرة", "تتعامل مع جهة التصنيع بلا وسطاء، وبأسعار المصنع."],
      ["تقارير اختبار مختومة", "خراطيمنا مختبَرة في معامل جهتين حكوميتين، والتقارير منشورة في هذا الموقع."],
      ["عرض سعر مكتوب وإذن تسليم", "مع كل شحنة، لوضوح تام قبل الاتفاق وعند الاستلام."],
    ],
    ctH: "اطلب عرض سعر",
    ctLead: "اكتب الأصناف والمقاسات والكميات، وسنرسل إليك عرض سعر مكتوباً.",
    f: { items: "الأصناف المطلوبة", prod: "الصنف", size: "المقاس", sizePh: "مثال: 20 مم", qty: "الكمية", unit: "الوحدة", remove: "احذف الصنف", add: "أضف صنفاً آخر",
      name: "الاسم أو اسم الشركة", gov: "المحافظة", notes: "ملاحظات (اختياري)", send: "أرسل الطلب عبر واتساب", hint: "يفتح الطلب في واتساب جاهزاً للإرسال." },
    units: ["لفة", "متر", "قطعة", "كرتونة"],
    ways: { call: "اتصل بنا", wa: "واتساب", waGo: "ابدأ محادثة", mail: "البريد الإلكتروني", addr: "المصنع", map: "افتح الموقع على خرائط جوجل" },
    address: "أمام محطة المياه، باسوس، القناطر الخيرية، القليوبية",
    footP: "شركة مصرية لتصنيع الأدوات الكهربائية.", footCo: "الشركة", rights: "جميع الحقوق محفوظة.", made: "صناعة مصرية",
    waAria: "راسلنا على واتساب",
    crumbHome: "الرئيسية", testsH: "نتائج الاختبار", moreH: "منتجات أخرى",
    bandH: "تحتاج مقاسات أو كميات محددة؟", bandP: "أرسل طلبك وسنرد بعرض سعر مكتوب.",
    quoteThis: "اطلب عرض سعر لهذا الصنف", askThis: "اسأل عبر واتساب",
    t: { hello: "السلام عليكم، أرغب في الحصول على عرض سعر من فلاش أون.", ask: "السلام عليكم، أرغب في الاستفسار عن {p} من فلاش أون.",
      qHead: "السلام عليكم، أرغب في عرض سعر من فلاش أون:", size: "المقاس", qty: "الكمية", name: "الاسم", gov: "المحافظة", notes: "ملاحظات" },
  },
  en: {
    lang: "en", dir: "ltr", home: "/en/", other: "/", otherLabel: "العربية", locale: "en_US",
    brand: "Flash On", tagline: "Egyptian manufacturer of electrical installation supplies",
    title: "Flash On | Egyptian manufacturer of electrical conduit, PVC pipes and cables",
    desc: "Flash On has manufactured electrical installation supplies in Egypt since 2013: conduit hoses, fire-resistant conduit, flexible conduit, PVC pipes and fittings, switch boxes and cables. Conduit tested to Egyptian Standard ES 1283-2008.",
    skip: "Skip to content", menu: "Menu",
    nav: { products: "Products", quality: "Quality", about: "About", contact: "Contact" },
    quote: "Request a quote", factory: "Factory location",
    h1: "Every electrical installation starts with Flash On",
    sub: "An Egyptian factory making electrical installation supplies since 2013: conduit, PVC pipes, switch boxes and cables.",
    heroCap: "Electrical conduit hoses made by Flash On",
    heroAlt: "Coils of blue and red Flash On electrical conduit hose",
    facts: [["2013", "Manufacturing since"], ["27 governorates", "We deliver to all of Egypt"], ["ES 1283-2008", "The Egyptian standard our conduit was tested to"]],
    prodH: "Products",
    prodLead: "Seven product lines for the electrical first-fix stage, from conduit to cable. Conduit hoses come in blue, red and any other colour.",
    askWa: "Sizes and prices",
    qaH: "Stamped test reports from two government laboratories",
    qaLead: "Flash On conduit was tested in May 2025 at the Energy Research Center, Faculty of Engineering, Cairo University, and at the Housing and Building National Research Center. The Energy Research Center report concludes that the sample technically conforms to Egyptian Standard 1283/2008.",
    resCap: "Energy Research Center results – fire-resistant conduit, 20 mm and 25 mm",
    res: [
      ["Dimensions", "20 mm: outer diameter 20.2 mm, inner 16.1 mm. 25 mm: outer 25.1 mm, inner 20.5 mm."],
      ["Compression", "No cracks or deformation."],
      ["Impact", "12 samples, none shattered."],
      ["Bending and heat", "Conforms in both tests."],
      ["Dielectric strength", "2000 V, 50 Hz, 5 minutes: no insulation breakdown."],
      ["Insulation resistance", "Above 1 GΩ for all samples."],
      ["Flame resistance", "Self-extinguishing in under 10 seconds."],
      ["Conclusion", "Technically conforms to Egyptian Standard 1283/2008."],
    ],
    hbrc: "Housing and Building National Research Center report: orange conduit samples with 16 mm and 23 mm inner diameter, tested to ES 1283-2008 and IEC 614-1.",
    repsH: "Pages from the reports (in Arabic)",
    repCap: { erc: "Energy Research Center – Cairo University", hbrc: "Housing and Building National Research Center" },
    close: "Close", prev: "Previous", next: "Next", viewer: "Report viewer",
    abH: "An Egyptian factory you deal with directly",
    abLead: "Flash On is an Egyptian company specialised in manufacturing electrical installation supplies. We believe clear dealing is the basis of every lasting partnership.",
    serve: ["We supply", "contractors, site owners and electrical wholesalers."],
    com: [
      ["Made in Egypt", "Products manufactured in Egypt under the Flash On name."],
      ["Direct from the factory", "You deal with the manufacturer, with no middlemen, at factory prices."],
      ["Stamped test reports", "Our conduit is tested in two government laboratories, and the reports are published on this site."],
      ["Written quote and delivery note", "With every shipment, so everything is clear before you agree and when you receive."],
    ],
    ctH: "Request a quote",
    ctLead: "List the products, sizes and quantities you need and we will send you a written quote.",
    f: { items: "Items", prod: "Product", size: "Size", sizePh: "e.g. 20 mm", qty: "Quantity", unit: "Unit", remove: "Remove item", add: "Add another item",
      name: "Your name or company", gov: "Governorate / city", notes: "Notes (optional)", send: "Send request on WhatsApp", hint: "Your request opens in WhatsApp, ready to send." },
    units: ["Roll", "Metre", "Piece", "Carton"],
    ways: { call: "Call us", wa: "WhatsApp", waGo: "Start a chat", mail: "Email", addr: "Factory", map: "Open in Google Maps" },
    address: "Opposite the water station, Basous, Al Qanater Al Khayreyah, Qalyubia, Egypt",
    footP: "Egyptian manufacturer of electrical installation supplies.", footCo: "Company", rights: "All rights reserved.", made: "Made in Egypt",
    waAria: "Message us on WhatsApp",
    crumbHome: "Home", testsH: "Test results", moreH: "Other products",
    bandH: "Need specific sizes or quantities?", bandP: "Send your request and we will reply with a written quote.",
    quoteThis: "Request a quote for this product", askThis: "Ask on WhatsApp",
    t: { hello: "Hello, I would like a quote from Flash On.", ask: "Hello, I would like to ask about {p} from Flash On.",
      qHead: "Hello, I would like a quote from Flash On:", size: "Size", qty: "Qty", name: "Name", gov: "Location", notes: "Notes" },
  },
};

const P = [
  { slug: "hose", img: "hose",
    ar: { name: "خراطيم كهربائية", short: "خراطيم ملساء مرنة تحمي الأسلاك وتسهّل تمريرها داخل الحوائط والأسقف.", tag: "بجميع الألوان", alt: "لفة خرطوم كهربائي أملس باللون البرتقالي",
      pts: ["سطح أملس يسهّل سحب الأسلاك.", "خامة قوية ومرونة عالية.", "متوفرة بالأزرق والأحمر وبجميع الألوان."] },
    en: { name: "Electrical conduit hoses", short: "Smooth, flexible conduit that protects wiring and makes it easy to pull through walls and ceilings.", tag: "Any colour", alt: "Coil of smooth orange electrical conduit hose",
      pts: ["Smooth surface for easy cable pulling.", "Strong material with high flexibility.", "Available in blue, red and any other colour."] },
    tests: "hbrc" },
  { slug: "firehose", img: "firehose",
    ar: { name: "خرطوم مقاوم للحريق", short: "خرطوم كهربائي ذاتي الإطفاء ومقاوم للحريق، لحماية التمديدات الكهربائية في المباني.", tag: "ES 1283-2008", alt: "لفة خرطوم كهربائي مقاوم للحريق باللون الأبيض",
      pts: ["ذاتي الإطفاء: ينطفئ خلال أقل من 10 ثوانٍ بحسب تقرير الاختبار.", "مختبَر بمقاسي 20 مم و25 مم (قطر خارجي).", "مطابق فنياً للمواصفة القياسية المصرية 1283/2008."] },
    en: { name: "Fire-resistant conduit", short: "Self-extinguishing, fire-resistant electrical conduit that protects wiring runs inside buildings.", tag: "ES 1283-2008", alt: "Coil of white fire-resistant electrical conduit",
      pts: ["Self-extinguishing in under 10 seconds, per the test report.", "Tested in 20 mm and 25 mm outer diameter.", "Technically conforms to Egyptian Standard 1283/2008."] },
    tests: "erc" },
  { slug: "flex", img: "flex",
    ar: { name: "سوستة فلكسبل", short: "سوستة فلكسبل مرنة لحماية الأسلاك وتمريرها بسهولة.", alt: "سوستة فلكسبل: لفة ووصلات مموّجة",
      pts: ["جدار مموّج يلتف حول الزوايا بسهولة.", "تحمي الأسلاك في الوصلات والمسارات المتحركة."] },
    en: { name: "Flexible corrugated conduit", short: "Flexible corrugated conduit that protects wiring and routes it with ease.", alt: "Flexible corrugated conduit: a coil and corrugated lengths",
      pts: ["Corrugated wall bends easily around corners.", "Protects wiring at joints and on moving runs."] } },
  { slug: "pvc", img: "pvc",
    ar: { name: "مواسير PVC", short: "مواسير PVC صلبة بأطوال مستقيمة، بألوان تساعد على التمييز بين خطوط التأسيس.", alt: "مواسير PVC مستقيمة باللونين الأبيض والرمادي",
      pts: ["أطوال مستقيمة صلبة.", "تُوصَل بالأكواع والجُلَب.", "ألوان تميّز بين خطوط التأسيس."] },
    en: { name: "PVC conduit pipes", short: "Rigid PVC pipes in straight lengths, in colours that help tell installation lines apart.", alt: "Straight PVC pipes in white and grey",
      pts: ["Rigid straight lengths.", "Joined with elbows and couplings.", "Colours that distinguish installation lines."] } },
  { slug: "pvc-acc", img: "pvcacc",
    ar: { name: "إكسسوارات PVC", short: "علب توزيع، وأكواع، وجُلَب، ووصلات، لإتمام خطوط التأسيس بإحكام.", alt: "إكسسوارات PVC بيضاء: علب توزيع وكوع وجلبة ووصلة",
      pts: ["علب توزيع.", "أكواع وجُلَب.", "وصلات لإحكام خطوط المواسير."] },
    en: { name: "PVC fittings", short: "Junction boxes, elbows, couplings and connectors to finish conduit lines securely.", alt: "White PVC fittings: junction boxes, an elbow, a coupling and a connector",
      pts: ["Junction boxes.", "Elbows and couplings.", "Connectors for tight pipe runs."] } },
  { slug: "magic", img: "magic", vars: [["magic", { ar: "مفرد", en: "Single" }], ["magich", { ar: "مجوّز أفقي", en: "Double, horizontal" }], ["magicv", { ar: "مجوّز رأسي", en: "Double, vertical" }]],
    ar: { name: "علب ماجيك", short: "علب للمفاتيح والبرايز بمسامير تثبيت معدنية، تُركَّب منفردة أو متجاورة أو فوق بعضها.", alt: "علبة ماجيك صفراء",
      pts: ["مسامير تثبيت معدنية.", "ثلاثة أنواع: مفرد، مجوّز أفقي، مجوّز رأسي.", "تُركَّب منفردة أو متجاورة أو فوق بعضها."] },
    en: { name: "Magic boxes", short: "Switch and socket boxes with metal fixing screws, installed singly, side by side or stacked.", alt: "Yellow switch box",
      pts: ["Metal fixing screws.", "Three types: single, horizontal double, vertical double.", "Install singly, side by side or stacked."] } },
  { slug: "cable", img: "cable-spool", vars: [["cable-spool", { ar: "البكرة", en: "Spool" }], ["cable-label", { ar: "الملصق", en: "Label" }]],
    ar: { name: "الكابلات الكهربائية", short: "أسلاك نحاس معزولة CU/PVC بجهد 450/750 فولت، بمقاسات من 1 إلى 6 مم².", tag: "1 – 6 مم²", alt: "بكرة سلك فلاش أون للكابلات، مقاس 3 مم² وطول 100 متر",
      pts: ["نحاس بنقاوة 99.9%.", "عزل PVC، جهد 450/750 فولت.", "مقاسات من 1 مم² إلى 6 مم².", "بكرة 100 متر."] },
    en: { name: "Electrical cables", short: "Insulated copper wire, CU/PVC rated 450/750 V, in sizes from 1 to 6 mm².", tag: "1 – 6 mm²", alt: "Flash On cable spool, 3 mm², 100 metres",
      pts: ["99.9% pure copper.", "PVC insulation, rated 450/750 V.", "Sizes from 1 mm² to 6 mm².", "100-metre spool."] } },
];
const REPORTS = [["p12", "erc"], ["p13", "erc"], ["p2", "hbrc"], ["p6", "hbrc"]];

/* ---------- shared parts ---------- */
const ICON = {
  wa: `<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#icWa"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
};
const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<symbol id="icWa" viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.5-.3z"/></symbol>
<symbol id="logo" viewBox="90 130 1042 840"><circle cx="717" cy="550" r="330" fill="none" stroke="#D7220A" stroke-width="148"/><circle cx="717" cy="551" r="83" fill="#D7220A"/><path d="M105 158H492V297H264V477H595V621H264V940H105Z" fill="#14171C"/></symbol>
</defs></svg>`;
const LOGO = `<svg viewBox="0 0 1042 840" aria-hidden="true"><use href="#logo" width="1042" height="840"/></svg>`;
const purl = (s, p) => `${s.home}products/${p.slug}/`;
const pimg = (p, s, sizes, eager) => `<img src="/assets/products/${p.img}-720.webp" srcset="/assets/products/${p.img}-720.webp 720w, /assets/products/${p.img}.webp 1200w" sizes="${sizes}" width="720" height="540" alt="${esc(p[s.lang].alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;

function head(s, { title, desc, path, altPath, ld, image }) {
  const fonts = s.lang === "ar" ? ["cairo-ar-400", "cairo-ar-700"] : ["cairo-la-400", "cairo-la-700"];
  const arUrl = ORIGIN + (s.lang === "ar" ? path : altPath), enUrl = ORIGIN + (s.lang === "en" ? path : altPath);
  return `<!doctype html>
<html lang="${s.lang}" dir="${s.dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#F7F6F3">
<meta name="format-detection" content="telephone=no">
<link rel="canonical" href="${ORIGIN}${path}">
<link rel="alternate" hreflang="ar" href="${arUrl}">
<link rel="alternate" hreflang="en" href="${enUrl}">
<link rel="alternate" hreflang="x-default" href="${arUrl}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(s.brand)}">
<meta property="og:locale" content="${s.locale}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${ORIGIN}${path}">
<meta property="og:image" content="${ORIGIN}${image || "/assets/og.jpg?v=3"}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png">
<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
${fonts.map((f) => `<link rel="preload" href="/assets/fonts/${f}.woff2" as="font" type="font/woff2" crossorigin>`).join("\n")}
<link rel="stylesheet" href="/assets/fonts/fonts.css?v=8">
<link rel="stylesheet" href="/assets/site.css?v=${CSS_V}">
${ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n")}
</head>
<body>
<a class="skip" href="#main">${s.skip}</a>
${SPRITE}`;
}

function header(s, altPath) {
  const h = s.home;
  return `<header class="hdr"><div class="frame hdr-in">
<a class="brand" href="${h}">${LOGO}<span>${s.brand}</span></a>
<nav class="nav" id="nav" aria-label="${s.menu}">
<a href="${h}#products">${s.nav.products}</a>
<a href="${h}#quality">${s.nav.quality}</a>
<a href="${h}#about">${s.nav.about}</a>
<a href="${h}#contact">${s.nav.contact}</a>
<a class="btn btn-y nav-cta" href="${h}#contact">${s.quote}</a>
</nav>
<div class="hdr-act">
<a class="lang" href="${altPath}" lang="${s.lang === "ar" ? "en" : "ar"}" hreflang="${s.lang === "ar" ? "en" : "ar"}">${s.otherLabel}</a>
<a class="btn btn-y btn-s" href="${h}#contact">${s.quote}</a>
<button class="burger" type="button" aria-expanded="false" aria-controls="nav" aria-label="${s.menu}"><span></span></button>
</div>
</div></header>`;
}

function footer(s) {
  return `<footer class="foot"><div class="frame">
<div class="foot-g">
<div>
<a class="brand" href="${s.home}"><span class="plate">${LOGO}</span><span>${s.brand}</span></a>
<p>${s.footP}</p>
<p>${s.address}</p>
</div>
<div><h2>${s.nav.products}</h2><ul>${P.map((p) => `<li><a href="${purl(s, p)}">${p[s.lang].name}</a></li>`).join("")}</ul></div>
<div><h2>${s.footCo}</h2><ul>
<li><a href="${s.home}#quality">${s.nav.quality}</a></li>
<li><a href="${s.home}#about">${s.nav.about}</a></li>
<li><a href="${s.home}#contact">${s.quote}</a></li>
<li><a href="tel:${TEL}"><span class="ltr">${TEL_SHOW}</span></a></li>
<li><a href="mailto:${EMAIL}"><span class="ltr">${EMAIL}</span></a></li>
<li><a href="https://wa.me/${WA}" data-wa target="_blank" rel="noopener">${s.ways.wa}</a></li>
<li><a href="${MAP}" target="_blank" rel="noopener">${s.factory}</a></li>
</ul></div>
</div>
<div class="copy"><span>© <span id="yr">${TODAY.slice(0, 4)}</span> ${s.brand}. ${s.rights}</span><span>${s.made}</span></div>
</div></footer>
<a class="fab" href="https://wa.me/${WA}" data-wa target="_blank" rel="noopener" aria-label="${s.waAria}">${ICON.wa}</a>
<script>window.FO=${JSON.stringify({ wa: WA, t: s.t })}</script>
<script src="/assets/site.js?v=${JS_V}" defer></script>
</body>
</html>
`;
}

const lightbox = (s) => `<div class="lb" id="lb" role="dialog" aria-modal="true" aria-label="${s.viewer}"><button class="lb-x" type="button" aria-label="${s.close}">×</button><button class="lb-p" type="button" aria-label="${s.prev}">‹</button><button class="lb-n" type="button" aria-label="${s.next}">›</button><img alt=""><span class="lb-c" aria-live="polite"></span></div>`;
const reports = (s, only) => `<ul>${REPORTS.filter((r) => !only || r[1] === only).map(([id, lab]) => `<li><button class="rep" type="button" data-full="/assets/certs/cert-${id}-full.webp" data-cap="${esc(s.repCap[lab])}"><img src="/assets/certs/cert-${id}-thumb.webp" width="420" height="593" loading="lazy" decoding="async" alt="${esc(s.repCap[lab])}"><span>${s.repCap[lab]}</span></button></li>`).join("")}</ul>`;
const resTable = (s) => `<table class="res"><caption>${s.resCap}</caption><tbody>${s.res.map(([a, b], i) => `<tr><th scope="row">${a}</th><td${i === s.res.length - 1 ? ' class="ok"' : ""}>${b}</td></tr>`).join("")}</tbody></table>`;

const ORG = (s) => ({
  "@context": "https://schema.org", "@type": ["Organization", "LocalBusiness"], "@id": ORIGIN + "/#org",
  name: "فلاش أون", alternateName: "Flash On", url: ORIGIN + "/", logo: ORIGIN + "/assets/icon-512.png", image: ORIGIN + "/assets/og.jpg",
  telephone: TEL, email: EMAIL, foundingDate: "2013", description: s.tagline, hasMap: MAP, areaServed: "EG",
  address: { "@type": "PostalAddress", streetAddress: "أمام محطة المياه، باسوس", addressLocality: "القناطر الخيرية", addressRegion: "القليوبية", addressCountry: "EG" },
  contactPoint: { "@type": "ContactPoint", telephone: TEL, email: EMAIL, contactType: "sales", availableLanguage: ["ar", "en"] },
});

/* ---------- pages ---------- */
function home(s) {
  const L = s.lang;
  const body = `<main id="main">
<section class="hero run"><div class="frame">
<div class="hero-g">
<div>
<h1>${s.h1}</h1>
<p class="sub">${s.sub}</p>
<div class="ctas"><a class="btn btn-y" href="#contact">${s.quote}</a><a class="btn btn-line" href="#products">${s.nav.products}</a></div>
</div>
<figure class="hero-p"><img src="/assets/hoses.webp" srcset="/assets/hoses-640.webp 640w, /assets/hoses.webp 1000w" sizes="(max-width:900px) 92vw, 560px" width="1000" height="625" fetchpriority="high" alt="${esc(s.heroAlt)}"><figcaption>${s.heroCap}</figcaption></figure>
</div>
<dl class="facts">${s.facts.map(([a, b]) => `<div><dt><bdi>${a}</bdi></dt><dd>${b}</dd></div>`).join("")}</dl>
</div></section>

<section class="sec run" id="products"><div class="frame">
<div class="head"><h2>${s.prodH}</h2><p class="lead">${s.prodLead}</p></div>
<div class="cat">
${P.map((p, i) => `<article class="pt" id="${p.slug}"><a class="pt-img" href="${purl(s, p)}" tabindex="-1" aria-hidden="true">${pimg(p, s, i < 3 ? "(max-width:1000px) 46vw, 380px" : "(max-width:1000px) 46vw, 280px")}</a><h3><a href="${purl(s, p)}">${p[L].name}</a></h3><p>${p[L].short}</p>${p[L].tag ? `<span class="pt-tag">${p[L].tag}</span>` : ""}<a class="pt-ask" href="https://wa.me/${WA}" data-ask="${esc(p.ar.name)}" target="_blank" rel="noopener">${ICON.wa}${s.askWa}</a></article>`).join("\n")}
</div>
</div></section>

<section class="sec sec-ink run" id="quality"><div class="frame">
<div class="head"><h2>${s.qaH}</h2><p class="lead">${s.qaLead}</p></div>
<div class="qa-g">
<div>${resTable(s)}<p class="note">${s.hbrc}</p></div>
<div class="reps"><h3>${s.repsH}</h3>${reports(s)}</div>
</div>
</div></section>

<section class="sec sec-plaster run" id="about"><div class="frame ab-g">
<div><h2>${s.abH}</h2><p class="lead">${s.abLead}</p><p class="serve"><b>${s.serve[0]}</b> ${s.serve[1]}</p></div>
<dl class="com" id="why">${s.com.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join("")}</dl>
</div></section>

<section class="sec sec-ink run run-end" id="contact"><div class="frame">
<div class="head"><h2>${s.ctH}</h2><p class="lead">${s.ctLead}</p></div>
<div class="ct-g">
<form class="qf" id="qf">
<fieldset><legend>${s.f.items}</legend>
<div id="qItems"><div class="qi">
<label>${s.f.prod}<select class="q-prod">${P.map((p) => `<option data-slug="${p.slug}" value="${esc(L === "ar" ? p.ar.name : `${p.en.name} (${p.ar.name})`)}">${p[L].name}</option>`).join("")}</select></label>
<label>${s.f.size}<input class="q-size" placeholder="${s.f.sizePh}"></label>
<label>${s.f.qty}<input class="q-qty" inputmode="numeric" placeholder="50"></label>
<label>${s.f.unit}<select class="q-unit">${s.units.map((u) => `<option>${u}</option>`).join("")}</select></label>
<button class="qi-x" type="button" aria-label="${s.f.remove}">×</button>
</div></div>
<button class="qi-add" id="qAdd" type="button">+ ${s.f.add}</button>
</fieldset>
<div class="qf-2">
<label>${s.f.name}<input id="qName" autocomplete="name" required></label>
<label>${s.f.gov}<input id="qGov" autocomplete="address-level1"></label>
</div>
<label>${s.f.notes}<textarea id="qNotes" rows="2"></textarea></label>
<button class="btn btn-wa" type="submit">${ICON.wa}${s.f.send}</button>
<p class="qf-hint">${s.f.hint}</p>
</form>
<ul class="ways">
<li><span>${s.ways.call}</span><a href="tel:${TEL}"><span class="ltr">${TEL_SHOW}</span></a></li>
<li><span>${s.ways.wa}</span><a href="https://wa.me/${WA}" data-wa target="_blank" rel="noopener">${s.ways.waGo}</a></li>
<li><span>${s.ways.mail}</span><a href="mailto:${EMAIL}"><span class="ltr">${EMAIL}</span></a></li>
<li><span>${s.ways.addr}</span><b>${s.address}</b><br><a class="sm" href="${MAP}" target="_blank" rel="noopener">${s.ways.map}</a></li>
</ul>
</div>
</div></section>
</main>
${lightbox(s)}`;
  const alt = s.other;
  return head(s, { title: s.title, desc: s.desc, path: s.home, altPath: alt, ld: [ORG(s)] }) + header(s, alt) + body + footer(s);
}

function product(s, p) {
  const L = s.lang, d = p[L], path = purl(s, p), alt = purl(S[L === "ar" ? "en" : "ar"], p);
  const imgs = p.vars
    ? p.vars.map(([f, n], i) => `<img src="/assets/products/${f}-720.webp" srcset="/assets/products/${f}-720.webp 720w, /assets/products/${f}.webp 1200w" sizes="(max-width:900px) 92vw, 600px" width="720" height="540" alt="${esc(d.name + " – " + n[L])}"${i ? " hidden" : ' fetchpriority="high"'}>`).join("")
    : pimg(p, s, "(max-width:900px) 92vw, 600px", true);
  const tests = p.tests === "erc"
    ? `<section class="sec sec-plaster run"><div class="frame"><div class="head"><h2>${s.testsH}</h2><p class="lead">${s.qaLead}</p></div><div class="qa-g"><div>${resTable(s)}</div><div class="reps"><h3>${s.repsH}</h3>${reports(s, "erc")}</div></div></div></section>`
    : p.tests === "hbrc"
    ? `<section class="sec sec-plaster run"><div class="frame"><div class="head"><h2>${s.testsH}</h2><p class="lead">${s.hbrc}</p></div><div class="reps" style="max-width:420px"><h3>${s.repsH}</h3>${reports(s, "hbrc")}</div></div></section>`
    : "";
  const body = `<main id="main">
<section class="pp run"><div class="frame">
<p class="crumb"><a href="${s.home}">${s.crumbHome}</a> / <a href="${s.home}#products">${s.nav.products}</a> / ${d.name}</p>
<div class="pp-g">
<div><div class="pp-img" id="ppImg">${imgs}</div>${p.vars ? `<div class="vars" data-for="ppImg" role="group" aria-label="${esc(d.name)}">${p.vars.map(([, n], i) => `<button type="button" aria-pressed="${i === 0}">${n[L]}</button>`).join("")}</div>` : ""}</div>
<div>
<h1>${d.name}</h1>
<p class="lead">${d.short}</p>
<ul class="pts">${d.pts.map((x) => `<li>${x}</li>`).join("")}</ul>
<div class="ctas"><a class="btn btn-y" href="${s.home}?p=${p.slug}#contact">${s.quoteThis}</a><a class="btn btn-ink" href="https://wa.me/${WA}" data-ask="${esc(p.ar.name)}" target="_blank" rel="noopener">${ICON.wa}${s.askThis}</a></div>
</div>
</div>
</div></section>
${tests}
<section class="sec run"><div class="frame">
<div class="head"><h2>${s.moreH}</h2></div>
<div class="more">${P.filter((x) => x !== p).map((x) => `<a href="${purl(s, x)}"><img src="/assets/products/${x.img}-720.webp" width="720" height="540" loading="lazy" decoding="async" alt="">${x[L].name}</a>`).join("")}</div>
</div></section>
<section class="sec sec-ink run run-end"><div class="frame band">
<div><h2>${s.bandH}</h2><p class="lead">${s.bandP}</p></div>
<a class="btn btn-y" href="${s.home}?p=${p.slug}#contact">${s.quote}</a>
</div></section>
</main>
${p.tests ? lightbox(s) : ""}`;
  const ld = [
    { "@context": "https://schema.org", "@type": "Product", name: d.name, description: d.short, image: `${ORIGIN}/assets/products/${p.img}.webp`, url: ORIGIN + path,
      brand: { "@type": "Brand", name: "Flash On" }, manufacturer: { "@id": ORIGIN + "/#org" }, countryOfOrigin: "EG" },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: s.crumbHome, item: ORIGIN + s.home },
      { "@type": "ListItem", position: 2, name: d.name, item: ORIGIN + path }] },
  ];
  return head(s, { title: `${d.name} | ${s.brand}`, desc: d.short, path, altPath: alt, ld, image: `/assets/products/${p.img}.webp` }) + header(s, alt) + body + footer(s);
}

/* ---------- write ---------- */
const out = (path, html) => { const f = (path.endsWith("/") ? path + "index.html" : path).replace(/^\//, ""); mkdirSync(dirname(f) || ".", { recursive: true }); writeFileSync(f, html); return path; };
const urls = [];
for (const s of Object.values(S)) {
  urls.push(out(s.home, home(s)));
  for (const p of P) urls.push(out(purl(s, p), product(s, p)));
}
writeFileSync("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `<url><loc>${ORIGIN}${u}</loc><lastmod>${TODAY}</lastmod></url>`).join("\n")}
</urlset>
`);
console.log("built", urls.length, "pages");
