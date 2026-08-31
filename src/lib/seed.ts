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
  category: "cover" | "booklet" | "profile" | "book";
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
    id: "srv-booklet",
    title_ar: "تنضيد الملازم",
    description: "الملزمة كاملة من ملف Word فوضوي إلى ملف جاهز للمطبعة",
    icon: "📚",
    price_from: 1800,
    features: [
      "معادلات وجداول مضبوطة",
      "فهرس أوتوماتيك",
      "ترقيم وترويسات متسقة",
      "صناديق ملاحظات",
    ],
    sort_order: 1,
    active: true,
  },
  {
    id: "srv-covers",
    title_ar: "أغلفة وسلاسل",
    description: "مش غلاف واحد — هوية بصرية للسلسلة كلها",
    icon: "📕",
    price_from: 450,
    features: [
      "اسم سلسلة وشعار",
      "3 أنماط تختار منها",
      "وش وظهر وكعب",
      "تدرّج لوني حسب الصف",
    ],
    sort_order: 2,
    active: true,
  },
  {
    id: "srv-profile",
    title_ar: "بروفايلات الشركات",
    description: "ملف تقدر تدخل بيه مناقصة وأنت مطمن",
    icon: "🏢",
    price_from: 3500,
    features: [
      "كتابة المحتوى (اختياري)",
      "نسخة كاملة ومختصرة",
      "عربي أو ثنائي اللغة",
      "PDF تفاعلي",
    ],
    sort_order: 3,
    active: true,
  },
  {
    id: "srv-books",
    title_ar: "إخراج الكتب",
    description: "للمؤلفين ودور النشر والباحثين",
    icon: "📖",
    price_from: 25,
    features: [
      "فهرس وحواشي أوتوماتيك",
      "ترويسات وترقيم",
      "تنسيق رسائل علمية",
      "تجهيز ملف الطباعة",
    ],
    sort_order: 4,
    active: true,
  },
];

export const seedPackages: SeedPackage[] = [
  {
    id: "pkg-start",
    name_ar: "البداية",
    description: "لمراجعة أو ملزمة صغيرة",
    price: 1800,
    old_price: null,
    features: [
      "ملزمة حتى 60 صفحة",
      "تنضيد كامل",
      "فهرس أوتوماتيك",
      "ملف مطبعة + PDF",
    ],
    is_featured: false,
    sort_order: 1,
    active: true,
  },
  {
    id: "pkg-season",
    name_ar: "الموسم",
    description: "لمادة كاملة في ترم",
    price: 3900,
    old_price: null,
    features: [
      "ملزمة حتى 120 صفحة",
      "غلاف مصمم بهوية",
      "قالب نتائج الطلبة",
      "ملف مطبعة + PDF",
      "أولوية في التنفيذ",
    ],
    is_featured: true,
    sort_order: 2,
    active: true,
  },
  {
    id: "pkg-full",
    name_ar: "المتكامل",
    description: "للموسم الدراسي كله",
    price: 7500,
    old_price: 9900,
    features: [
      "ملزمتين (ترم أول وثاني)",
      "غلاف مميز لكل ملزمة",
      "لوجو للمدرس أو السنتر",
      "قالب نتائج + امتحان",
      "تحديثات مجانية",
    ],
    is_featured: false,
    sort_order: 3,
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
