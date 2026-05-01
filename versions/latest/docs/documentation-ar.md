# bClass-theme-js

`bClass-theme-js` هي مكتبة JavaScript تقوم بتوليد أنماط CSS ديناميكيًا بناءً على أسماء فئات HTML (class names). توفر للمطورين القدرة على كتابة CSS باستخدام فئات مساعدة مشابهة لـ Tailwind CSS، ولكنها تقدم أيضًا ميزات إضافية للمحتوى الديناميكي والتصميم المتجاوب.

## المميزات

- **توليد CSS ديناميكي**: إنشاء قواعد CSS تلقائيًا من الفئات الموجودة في HTML.
- **دعم الفئات المساعدة (Helper Classes)**: دعم واسع للفئات المتعلقة بالعرض، الارتفاع، الهوامش (margin)، الحشو (padding)، الألوان، إلخ.
- **التصميم المتجاوب**: يدعم البادئات (prefixes) مثل `hover` و `focus` و `before` و `after` للعناصر الوهمية (pseudo-elements) والحالات المختلفة.
- **تنسيق أرقام الهواتف**: تنسيق أرقام الهواتف تلقائيًا في حقول الإدخال (input fields).
- **سلوك التمرير**: إضافة تمرير أفقي للقوائم باستخدام أحداث عجلة الماوس.
- **تحديث المحتوى الديناميكي**: تحديث السنة الحالية تلقائيًا.

## الاستخدام

### الاستخدام الأساسي

أضف الفئات المساعدة إلى عناصر HTML الخاصة بك:

```html
<div class="w-32 h-32 bg-red-500 rounded-lg"></div>
<p class="text-blue-600 font-size-16">Hello World</p>
```

### الفئات المساعدة )

توفر المكتبة دعمًا واسعًا للفئات التالية:

#### مراجع الفئات

- **العرض والارتفاع**: `w-[size]`, `h-[size]`
- **الهوامش (Margin)**: `m-[size]`, `mt-[size]`, `mb-[size]`, `ml-[size]`, `mr-[size]`
- **الحشو (Padding)**: `p-[size]`, `pt-[size]`, `pb-[size]`, `pl-[size]`, `pr-[size]`
- **تحديد المواقع**: `top-[size]`, `bottom-[size]`, `left-[size]`, `right-[size]`
- **الألوان**: `bg-[color]`, `color-[color]`
- **الخطوط (Typography)**: `font-size-[size]`, `text-[color]`
- **التحويلات (Transforms)**: `transform-[value]`
- **نصف قطر الحدود (Border Radius)**: `.rounded-[size]`, `.rounded-tl-[size]`, `.rounded-tr-[size]`, `.rounded-bl-[size]`, `.rounded-br-[size]`
- **الفجوة (Gap)**: `gap-[size]`

#### الحالات والفئات الوهمية

- **التحويم (Hover)**: `.hover:w-[size]`
- **التركيز (Focus)**: `.focus:w[size]`
- **قبل (Before)**: `.before:w-[size]`
- **بعد (After)**: `.after:w-[size]`
- **أول عنصر من نوعه**: `.first-of-type:w-[size]`
- **آخر عنصر من نوعه**: `.last-of-type:w-[size]`
- **نشط (Active)**: `.active:w-[size]`
- **مُحدد (Checked)**: `.checked:w-[size]`
- **معطل (Disabled)**: `.disabled:w-[size]`
- **مُفعل (Enabled)**: `.enabled:w-[size]`
- **المحتوى (Content)**: `.content-[text]` أو وظائف ديناميكية:
  - `.content-[attr(data)]`
  - `.content-[var(--variable)]`
  - `.do.content-[url(link)]`
  - `.content-[counter(name)]`
  - `.content-[counters(name)]`
- **الفلتر (Filter)**: `.filter-[value]` (مثل: blur, grayscale, invert، إلخ)

#### أمثلة

[codepen](https://codepen.io/Endwall/pen/xxePaxK)

```html
<!-- العرض والوحدات (px, rem, %) -->
<div class="bg-[red] w-[10px]">example</div>
<div class="bg-[red] w-[10rem]">example</div>
<div class="bg-[red] w-[10%]">example</div>

<!-- الألوان (الاسم، Hex، RGB، إلخ) -->
<div class="bg-[white] color-[rgb(255,0,247)]">example</div>

<!-- الحالات (Hover، إلخ) والفئات التفاعلية -->
<div class="bg-[white] w-[30rem] hover:w-[20rem]">example</div>

<!-- إضافات المحتوى -->
<div class="after:content-[example] w-[50px]">example</div>

<!-- استخدام مرن للمكتبة: فئات مخصصة -->
<div class="[color:red]">example</div>
<div class="hover:[color:red]">example</div>

<!-- الاستخدام الأساسي -->
<div class="w-[200px] bg-[red] rounded-[10px] p-[15px]">Box</div>

<!-- استخدام Hover و Transform -->
<div class="hover:bg-[blue] hover:transform-[scale(1.1)]">hover</div>

<!-- استخدام المحتوى الديناميكي (Attr) -->
<div
  class="before:content-[attr(data-content)] before:color-[red]"
  data-content="[demodemo] "
>
  message
</div>

<!-- استخدام المتغيرات (Var) والمحتوى النصي العادي -->
<div class="after:content-[var(--warning-text)]">Successful</div>
<div class="before:content-[✓_]">Confirm</div>

<!-- استخدام الفلتر -->
<img
  src="images.jpg"
  class="filter-[grayscale(100%)] hover:filter-[blur(5px)]"
  alt="example"
/>
```

### تنسيق أرقام الهواتف

يتم تنسيق أرقام الهواتف تلقائيًا في حقول من النوع `type="tel"`.
مثال: (1111) 1111 1111 1111

```html
<div>
  <label for="phone">الهاتف:</label>
  <input type="tel" v-model="phone" id="phone" maxlength="21" required />
</div>
```

### التمرير الأفقي

القوائم التي تدعم التمرير الأفقي:

- `.ul-li-x-scroll`
- `.ul-li-x-scroll-hidden`

```html
<ul class="ul-li-x-scroll">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

# السنة الحالية

إدراج السنة الحالية.

### مثال

```html
<h6 class="current-year">2020-</h6>
```

## كيف يعمل

1. يقوم السكربت بمراقبة حالة جاهزية المستند (document's ready state).
2. يقوم بمسح جميع العناصر في الـ DOM بحثًا عن فئات CSS المساعدة.
3. لكل فئة يتم العثور عليها، يتم إنشاء قواعد CSS المقابلة لها.
4. العناصر الديناميكية المضافة حديثًا يتم معالجتها تلقائيًا أيضًا.
5. يتم تطبيق تنسيق أرقام الهواتف على حقول الإدخال من نوع `tel`.
6. يتم إضافة سلوك التمرير الأفقي للقوائم المحددة.

## التثبيت

أضف السكربت إلى ملف HTML الخاص بك:

```html
<script src="./bClass-theme-js.js"></script>
```

## الترخيص

هذا المشروع مرخص بموجب رخصة Bik Public License 2.0 - راجع ملف [LICENSE] لمزيد من التفاصيل.
