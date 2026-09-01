export interface SeedService {
  id: string;
  title_ar: string;
  description: string;
  icon: string;
  price_from: number;
  features: string[];
  sort_order: number;
  active: boolean;
}

export interface SeedPackage {
  id: string;
  name_ar: string;
  description: string;
  price: number;
  old_price: number | null;
  features: string[];
  is_featured: boolean;
  sort_order: number;
  active: boolean;
}

export interface SeedProject {
  id: string;
  slug: string;
  title_ar: string;
  title_en?: string;
  category:
    | "cover"
    | "booklet"
    | "profile"
    | "book"
    | "catalog"
    | "identity"
    | "print"
    | "digital";
  client?: string;
  year?: number;
  summary_ar?: string;
  cover_image: string;
  gallery: string[];
  deliverables: string[];
  behance_url?: string;
  featured: boolean;
  published: boolean;
  sort_order: number;
}

export const seedServices: SeedService[] = [
  {
    id: "srv-identity",
    title_ar: "الهوية البصرية واللوجو",
    description: "منظومة متكاملة تميّز علامتك — من اللوجو لحد دليل الاستخدام",
    icon: "sparkles",
    price_from: 4200,
    features: [
      "لوجو بكل الصيغ",
      "لوحة ألوان وخطوط",
      "كارت + ورق مراسلات",
      "دليل الهوية",
    ],
    sort_order: 1,
    active: true,
  },
  {
    id: "srv-profile",
    title_ar: "بروفايلات الشركات",
    description: "ملف يدخلك المناقصات والمعارض وأنت مطمئن",
    icon: "building",
    price_from: 2500,
    features: [
      "كتابة المحتوى (اختياري)",
      "نسخة كاملة ومختصرة A5",
      "عربي أو ثنائي اللغة",
      "PDF تفاعلي",
    ],
    sort_order: 2,
    active: true,
  },
  {
    id: "srv-catalog",
    title_ar: "الكتالوجات",
    description: "كتالوجات منتجات وخدمات بتصميم موحّد، وأنظمة تحديث تلقائي",
    icon: "layers",
    price_from: 2500,
    features: [
      "تصميم موحّد للمنتجات",
      "فهرس + جدول مواصفات",
      "كتالوج آلي (Data Merge)",
      "ثنائي اللغة للتصدير",
    ],
    sort_order: 3,
    active: true,
  },
  {
    id: "srv-covers",
    title_ar: "الأغلفة والسلاسل",
    description: "أغلفة كتب وملازم بحضور بصري يسجّل قبل ما تضربها",
    icon: "covers",
    price_from: 450,
    features: [
      "وش وظهر وكعب",
      "هوية سلسلة موحّدة",
      "معالجة الصور ودمجها",
      "ملف CMYK جاهز للمطبعة",
    ],
    sort_order: 4,
    active: true,
  },
  {
    id: "srv-books",
    title_ar: "إخراج الكتب والنشر",
    description: "للمؤلفين ودور النشر والباحثين — بمعايير محترفة",
    icon: "books",
    price_from: 1500,
    features: [
      "فهرس وحواشي أوتوماتيك",
      "ترويسات وترقيم مضبوطة",
      "تنسيق رسائل علمية",
      "تجهيز ملف الطباعة",
    ],
    sort_order: 5,
    active: true,
  },
  {
    id: "srv-print",
    title_ar: "المطبوعات الدعائية",
    description: "فلايرات وبروشورات وبوسترات ومنيوهات تبان محترمة",
    icon: "printer",
    price_from: 400,
    features: [
      "تصميم على المفرود الحقيقي",
      "مراعاة خطوط الطي والقص",
      "معالجة صور المنتجات",
      "ملف جاهز للطباعة",
    ],
    sort_order: 6,
    active: true,
  },
  {
    id: "srv-digital",
    title_ar: "التصميم الرقمي",
    description: "سوشيال ميديا وعروض تقديمية بهوية موحّدة",
    icon: "pen",
    price_from: 180,
    features: [
      "بوستات وكاروسيلات",
      "قوالب سوشيال قابلة لإعادة الاستخدام",
      "عروض تقديمية",
      "كوفر وبروفايل للمنصات",
    ],
    sort_order: 7,
    active: true,
  },
  {
    id: "srv-technical",
    title_ar: "الخدمات الفنية",
    description: "إنقاذ ملفات رفضتها المطبعة، وتحويل PDF، وتجهيز ملفات للطباعة",
    icon: "file",
    price_from: 300,
    features: [
      "إنقاذ ملف الطباعة الرفض",
      "تحويل PDF لملف قابل للتعديل",
      "تصحيح الأرقام والاتجاهات",
      "استشارة تصميمية",
    ],
    sort_order: 8,
    active: true,
  },
];

export const seedPackages: SeedPackage[] = [
  {
    id: "pkg-identity",
    name_ar: "هوية متكاملة",
    description: "لكل براند جديد محتاج يثبّت حضوره باحترافية",
    price: 4200,
    old_price: 6000,
    features: [
      "لوجو (3 مقترحات)",
      "كل الصيغ المطلوبة",
      "لوحة ألوان وخطوط",
      "كارت شخصي + ورق مراسلات",
      "دليل الهوية",
    ],
    is_featured: true,
    sort_order: 1,
    active: true,
  },
  {
    id: "pkg-profile",
    name_ar: "بروفايل مناقصات",
    description: "لشركة محتاجة تدخل المناقصات وتفرض وجودها",
    price: 5000,
    old_price: null,
    features: [
      "بروفايل حتى 12 صفحة",
      "كتابة المحتوى",
      "نسخة مختصرة A5",
      "PDF تفاعلي",
      "أولوية في التنفيذ",
    ],
    is_featured: false,
    sort_order: 2,
    active: true,
  },
  {
    id: "pkg-book",
    name_ar: "إخراج كتاب كامل",
    description: "للكتاب أو الرسالة من المخطوطة للملف النهائي",
    price: 3200,
    old_price: null,
    features: [
      "تنضيد داخلي كامل",
      "فهرس وحواشي أوتوماتيك",
      "غلاف + كعب",
      "تصميم السلسلة (اختياري)",
      "تجهيز ملف الطباعة",
    ],
    is_featured: false,
    sort_order: 3,
    active: true,
  },
  {
    id: "pkg-print-kit",
    name_ar: "طقم الطباعة",
    description: "كل اللي محتاجه لأي فعالية أو إطلاق في يومين",
    price: 1800,
    old_price: 2400,
    features: [
      "فلاير + بوستر",
      "بانر فينيل",
      "رول أب أو فولدر",
      "ملفات جاهزة للطباعة",
      "معالجة الصور مجانًا",
    ],
    is_featured: false,
    sort_order: 4,
    active: true,
  },
];

export const seedProjects: SeedProject[] = [
  {
    id: "1",
    slug: "al-qanoon-physics",
    title_ar: "سلسلة القانون — الفيزياء",
    title_en: "The Law — Physics Series",
    category: "cover",
    client: "أ / أحمد عبدالرحمن",
    year: 2026,
    summary_ar:
      "هوية كاملة لغلاف سلسلة مراجعة في الفيزياء لطلاب الثانوية. الفكرة كانت إن الطالب يمسك الملزمة ويحس إنها بتاعة مدرس كبير — قبل ما يفتح صفحة واحدة. الوش والظهر مربوطين بنفس الهوية، والغلاف الخلفي فيه QR للسوشيال، فكل نسخة مطبوعة بقت قناة توزيع.",
    cover_image: "/images/tony.png",
    gallery: ["/images/tony.png"],
    deliverables: [
      "غلاف أمامي",
      "غلاف خلفي",
      "ملف جاهز للمطبعة",
      "معاينة للسوشيال",
    ],
    featured: true,
    published: true,
    sort_order: 1,
  },
];
