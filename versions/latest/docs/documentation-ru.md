# bClass-theme-js

`bClass-theme-js` — это JavaScript-библиотека, которая динамически генерирует CSS-стили на основе HTML-классов. Она предоставляет разработчикам возможность писать CSS, используя вспомогательные классы, подобные Tailwind CSS, но также предлагает дополнительные функции для динамического контента и адаптивного дизайна.

## Особенности

- **Динамическая генерация CSS**: Автоматически создает CSS-правила на основе классов в HTML.
- **Поддержка вспомогательных классов**: Широкий спектр классов для ширины, высоты, отступов (margin/padding), цветов и т. д.
- **Адаптивный дизайн**: Поддерживает префиксы, такие как `hover`, `focus`, `before`, `after` для псевдоэлементов и состояний.
- **Форматирование номеров телефонов**: Автоматически форматирует номера телефонов в полях ввода (input).
- **Поведение прокрутки**: Добавляет горизонтальную прокрутку для списков с использованием событий колесика мыши.
- **Обновление динамического контента**: Автоматически обновляет текущий год.

## Использование

### Базовое использование

Добавляйте вспомогательные классы к вашим HTML-элементам:

```html
<div class="w-32 h-32 bg-red-500 rounded-lg"></div>
<p class="text-blue-600 font-size-16">Hello World</p>
```

### Вспомогательные классы (Helper Classes)

Библиотека предоставляет обширную поддержку классов:

#### Справочник классов

- **Ширина и Высота**: `w-[size]`, `h-[int]`
- **Отступы (Margin)**: `m-[size]`, `mt-[size]`, `mb-[size]`, `ml-[size]`, `mr-[size]`
- **Внутренние отступы (Padding)**: `p-[size]`, `pt-[size]`, `pb-[size]`, `pl-[size]`, `pr-[size]`
- **Позиционирование**: `top-[size]`, `bottom-[size]`, `left-[size]`, `right-[size]`
- **Цвета**: `bg-[color]`, `color-[color]`
- **Типографика**: `font-size-[size]`, `text-[color]`
- **Трансформации**: `transform-[value]`
- **Радиус границы (Border Radius)**: `.rounded-[size]`, `.rounded-tl-[size]`, `.rounded-tr-[size]`, `.rounded-bl-[size]`, `.rounded-br-[size]`
- **Интервал (Gap)**: `gap-[size]`

#### Состояния и Псевдоклассы

- **Hover (Наведение)**: `.hover:w-[size]`
- **Focus (Фокус)**: `.focus:w-[size]`
- **Before (До)**: `.before:w-[size]`
- **After (После)**: `.after:w-[size]`
- **First of type (Первый в типе)**: `.first-of-type:w-[size]`
- **Last of type (Последний в типе)**: `.last-of-type:w-[size]`
- **Active (Активный)**: `.active:w-[size]`
- **Checked (Отмечен)**: `.checked:w-[size]`
- **Disabled (Отключен)**: `.disabled:w-[size]`
- **Enabled (Включен)**: `.enabled:w-[int]`
- **Контент**: `.content-[text]` или динамические функции:
  - `.content-[attr(data)]`
  - `.content-[var(--variable)]`
  - `.content-[url(link)]`
  - `.content-[counter(name)]`
  - `.content-[counters(name)]`
- **Фильтр**: `.filter-[value]` (например, blur, grayscale, invert и т. д.)

#### Примеры

[codepen](https://codepen.io/Endwall/pen/xxePaxK)

```html
<!-- Ширина и единицы измерения (px, rem, %) -->
<div class="bg-[red] w-[10px]">example</div>
<div class="bg-[red] w-[10rem]">example</div>
<div class="bg-[red] w-[10%]">example</div>

<!-- Цвета (Название, Hex, RGB и т. д.) -->
<div class="bg-[white] color-[rgb(255,0,247)]">example</div>

<!-- Состояния (Hover и т. д.) и реактивные классы -->
<div class="bg-[white] w-[30rem] hover:w-[20rem]">example</div>

<!-- Добавление контента -->
<div class="after:content-[example] w-[50px]">example</div>

<!-- Гибкое использование библиотеки: Пользовательские классы -->
<div class="[color:red]">example</div>
<div class="hover:[color:red]">example</div>

<!-- Базовое использование -->
<div class="w-[200px] bg-[red] rounded-[10px] p-[15px]">Box</div>

<!-- Использование Hover и Transform -->
<div class="hover:bg-[blue] hover:transform-[scale(1.1)]">hover</div>

<!-- Динамический контент (Attr) -->
<div
  class="before:content-[attr(data-content)] before:color-[red]"
  data-content="[demodemo] "
>
  message
</div>

<!-- Использование переменной (Var) и обычного текстового контента -->
<div class="after:content-[var(--warning-text)]">Successful</div>
<div class="before:content-[✓_]">Confirm</div>

<!-- Использование фильтров -->
<img
  src="images.jpg"
  class="filter-[grayscale(100%)] hover:filter-[blur(5px)]"
  alt="example"
/>
```

### Форматирование номеров телефонов

Номера телефонов автоматически форматируются в полях `type="tel"`.
Пример: (1111) 1111 1111 1111

```html
<div>
  <label for="phone">Телефон:</label>
  <input type="tel" v-model="phone" id="phone" maxlength="21" required />
</div>
```

### Горизонтальная прокрутка

Списки с поддержкой горизонтальной прокрутки:

- `.ul-li-x-scroll`
- `.ul-li-x-scroll-hidden`

```html
<ul class="ul-li-x-scroll">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

# Текущий год

Вставьте текущий год.

### Пример

```html
<h6 class="current-year">2020-</h6>
```

## Как это работает

1. Скрипт отслеживает состояние готовности документа (`ready state`).
2. Он сканирует все элементы в DOM на наличие CSS-вспомогательных классов.
3. Для каждого найденного класса генерируются соответствующие CSS-правила.
4. Новые динамически добавленные элементы также обрабатываются автоматически.
5. Форматирование номеров телефонов применяется к полям ввода `type="tel"`.
6. Поведение горизонтальной прокрутки добавляется к указанным спискам.

## Установка

Добавьте скрипт в ваш HTML-файл:

```html
<script src="./bClass-template-js.js"></script>
```

## Лицензия

Этот проект распространяется под лицензией Bik Public License 2.0 — подробности см. в файле [LICENSE].
