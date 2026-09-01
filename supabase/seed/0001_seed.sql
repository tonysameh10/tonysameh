-- Tony Sameh Portfolio — Seed Data (بيانات متكاملة لكل مجالات التصميم)
-- Run AFTER 0001_schema.sql and 0002_settings_show_prices.sql
-- Replace placeholder cover_image URL with a real uploaded image
-- (your cover can be uploaded to the 'projects' bucket via the admin dashboard).

-- ============================================================
-- SERVICES — 8 خدمات تغطي كل مجالات العمل
-- idempotent: يعتمد على title_ar حتى لو تشغّل أكثر من مرة ما يتكررش
-- ============================================================
insert into public.services (id, title_ar, description, icon, price_from, features, sort_order, active) values
  (gen_random_uuid(), 'الهوية البصرية واللوجو', 'منظومة متكاملة تميّز علامتك — من اللوجو لحد دليل الاستخدام', 'sparkles', 4200,
   array['لوجو بكل الصيغ','لوحة ألوان وخطوط','كارت + ورق مراسلات','دليل الهوية'], 1, true),
  (gen_random_uuid(), 'بروفايلات الشركات', 'ملف يدخلك المناقصات والمعارض وأنت مطمئن', 'building', 2500,
   array['كتابة المحتوى (اختياري)','نسخة كاملة ومختصرة A5','عربي أو ثنائي اللغة','PDF تفاعلي'], 2, true),
  (gen_random_uuid(), 'الكتالوجات', 'كتالوجات منتجات وخدمات بتصميم موحّد، وأنظمة تحديث تلقائي', 'layers', 2500,
   array['تصميم موحّد للمنتجات','فهرس + جدول مواصفات','كتالوج آلي (Data Merge)','ثنائي اللغة للتصدير'], 3, true),
  (gen_random_uuid(), 'الأغلفة والسلاسل', 'أغلفة كتب وملازم بحضور بصري يسجّل قبل ما تضربها', 'covers', 450,
   array['وش وظهر وكعب','هوية سلسلة موحّدة','معالجة الصور ودمجها','ملف CMYK جاهز للمطبعة'], 4, true),
  (gen_random_uuid(), 'إخراج الكتب والنشر', 'للمؤلفين ودور النشر والباحثين — بمعايير محترفة', 'books', 1500,
   array['فهرس وحواشي أوتوماتيك','ترويسات وترقيم مضبوطة','تنسيق رسائل علمية','تجهيز ملف الطباعة'], 5, true),
  (gen_random_uuid(), 'المطبوعات الدعائية', 'فلايرات وبروشورات وبوسترات ومنيوهات تبان محترمة', 'printer', 400,
   array['تصميم على المفرود الحقيقي','مراعاة خطوط الطي والقص','معالجة صور المنتجات','ملف جاهز للطباعة'], 6, true),
  (gen_random_uuid(), 'التصميم الرقمي', 'سوشيال ميديا وعروض تقديمية بهوية موحّدة', 'pen', 180,
   array['بوستات وكاروسيلات','قوالب سوشيال قابلة لإعادة الاستخدام','عروض تقديمية','كوفر وبروفايل للمنصات'], 7, true),
  (gen_random_uuid(), 'الخدمات الفنية', 'إنقاذ ملفات رفضتها المطبعة، وتحويل PDF، وتجهيز ملفات للطباعة', 'file', 300,
   array['إنقاذ ملف الطباعة الرفض','تحويل PDF لملف قابل للتعديل','تصحيح الأرقام والاتجاهات','استشارة تصميمية'], 8, true)
on conflict (title_ar) do nothing;

-- ============================================================
-- PACKAGES — 4 باقات تغطي المجالات الأساسية
-- idempotent: يعتمد على name_ar
-- ============================================================
insert into public.packages (id, name_ar, description, price, old_price, features, is_featured, sort_order, active) values
  (gen_random_uuid(), 'هوية متكاملة', 'لكل براند جديد محتاج يثبّت حضوره باحترافية', 4200, 6000,
   array['لوجو (3 مقترحات)','كل الصيغ المطلوبة','لوحة ألوان وخطوط','كارت شخصي + ورق مراسلات','دليل الهوية'], true, 1, true),
  (gen_random_uuid(), 'بروفايل مناقصات', 'لشركة محتاجة تدخل المناقصات وتفرض وجودها', 5000, null,
   array['بروفايل حتى 12 صفحة','كتابة المحتوى','نسخة مختصرة A5','PDF تفاعلي','أولوية في التنفيذ'], false, 2, true),
  (gen_random_uuid(), 'إخراج كتاب كامل', 'للكتاب أو الرسالة من المخطوطة للملف النهائي', 3200, null,
   array['تنضيد داخلي كامل','فهرس وحواشي أوتوماتيك','غلاف + كعب','تصميم السلسلة (اختياري)','تجهيز ملف الطباعة'], false, 3, true),
  (gen_random_uuid(), 'طقم الطباعة', 'كل اللي محتاجه لأي فعالية أو إطلاق في يومين', 1800, 2400,
   array['فلاير + بوستر','بانر فينيل','رول أب أو فولدر','ملفات جاهزة للطباعة','معالجة الصور مجانًا'], false, 4, true)
on conflict (name_ar) do nothing;

-- ============================================================
-- SITE SETTINGS (single row, id = 1) — include show_prices
-- ============================================================
insert into public.site_settings (id, whatsapp, email, hero_title_ar, hero_lead_ar, is_available, show_prices)
values (
  1,
  '+201016042072',
  null,
  'هويتك البصرية شكلها أقل من مستواك.',
  'بصمّم وأُخرج الهوية البصرية والبروفايلات والكتالوجات والمطبوعات — بحيث الملف يطلع جاهز للمطبعة من أول مرة.',
  true,
  false
)
on conflict (id) do update set
  whatsapp = excluded.whatsapp,
  email = excluded.email,
  hero_title_ar = excluded.hero_title_ar,
  hero_lead_ar = excluded.hero_lead_ar,
  is_available = excluded.is_available,
  show_prices = excluded.show_prices;

-- ============================================================
-- SAMPLE PROJECT
-- cover_image يشاور على صورة محلية داخل مجلد /public في المشروع،
-- بتشتغل تلقائيًا من غير ما تحتاج ترفع صورة ولا تعدّل أي رابط.
-- (لو حبيت صورة حقيقية من البكيت، ارفعها وحدّث الرابط هنا.)
-- ============================================================
insert into public.projects (id, slug, title_ar, title_en, category, client, year, summary_ar, cover_image, gallery, deliverables, behance_url, featured, published, sort_order)
values (
  gen_random_uuid(),
  'al-qanoon-physics',
  'سلسلة القانون — الفيزياء',
  'The Law — Physics Series',
  'cover',
  'أ / أحمد عبدالرحمن',
  2026,
  'هوية كاملة لغلاف سلسلة مراجعة في الفيزياء لطلاب الثانوية. الفكرة كانت إن الطالب يمسك الملزمة ويحس إنها بتاعة مدرس كبير — قبل ما يفتح صفحة واحدة. الوش والظهر مربوطين بنفس الهوية، والغلاف الخلفي فيه QR للسوشيال، فكل نسخة مطبوعة بقت قناة توزيع.',
  '/images/tony.png',
  array['/images/tony.png'],
  array['غلاف أمامي','غلاف خلفي','ملف جاهز للمطبعة','معاينة للسوشيال'],
  null,
  true,
  true,
  1
)
on conflict (slug) do nothing;

-- لو الصف متضاف قبل كده بالـ placeholder، حدّثه هنا عشان الصورة تظهر فورًا:
update public.projects
set cover_image = '/images/tony.png',
    gallery = array['/images/tony.png']
where slug = 'al-qanoon-physics'
  and (cover_image = 'REPLACE_WITH_PUBLIC_COVER_URL' or cover_image like 'REPLACE_WITH%');
