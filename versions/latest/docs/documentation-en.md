# bClass-theme-js

`bClass-theme-js` is a JavaScript library that dynamically generates CSS styles based on HTML class names. It provides developers with the ability to write CSS using helper classes similar to Tailwind CSS, but also offers additional features for dynamic content and responsive design.

## Features

- **Dynamic CSS Generation**: Automatically generates CSS rules from class names in HTML.
- **Helper Class Support**: Wide-ranging class support for width, height, margin, padding, colors, etc.
- **Responsive Design**: Supports prefixes like hover, focus, before, after for pseudo-elements and states.
- **Phone Number Formatting**: Automatically formats phone numbers in input fields.
- **Scroll Behavior**: Adds horizontal scrolling to lists using mouse wheel events.
- **Dynamic Content Updates**: Automatically updates the current year.

## Usage

### Basic Usage

Add helper classes to your HTML elements:

```html
<div class="w-32 h-32 bg-red-500 rounded-lg"></div>
<p class="text-blue-600 font-size-16">Hello World</p>
```

### Helper Classes

The library provides extensive helper class support:

#### Class References

- **Width & Height**: `w-[size]`, `h-[size]`
- **Margin**: `m-[size]`, `mt-[size]`, `mb-[size]`, `ml-[size]`, `mr-[size]`
- **Padding**: `p-[size]`, `pt-[size]`, `pb-[size]`, `pl-[size]`, `pr-[size]`
- **Positioning**: `top-[size]`, `bottom-[size]`, `left-[size]`, `right-[size]`
- **Colors**: `bg-[color]`, `color-[color]`
- **Typography**: `font-size-[size]`, `text-[color]`
- **Transforms**: `transform-[value]`
- **Border Radius**: `.rounded-[size]`, `.rounded-tl-[size]`, `.rounded-tr-[]`, `.rounded-bl-[]`, `.rounded-br-[]`
- **Gap**: `gap-[size]`

#### States and Pseudo Classes

- **Hover**: `.hover:w-[size]`
- **Focus**: `.focus:w-[size]`
- **Before**: `.before:w-[size]`
- **After**: `.after:w-[size]`
- **First of type**: `.first-of-type:w-[size]`
- **Last of type**: `.last-of-type:w-[size]`
- **Active**: `.active:w-[size]`
- **Checked**: `.checked:w-[size]`
- **Disabled**: `.disabled:w-[size]`
- **Enabled**: `.enabled:w-[size]`
- **Content**: `.content-[text]` or dynamic functions:
  - `.content-[attr(data)]`
  - `.content-[var(--variable)]`
  - `.content-[url(link)]`
  - `.content-[counter(name)]`
  - `.content-[counters(name)]`
- **Filter**: `.filter-[value]` (e.g., blur, grayscale, invert, etc.)

#### Examples

[codepen](https://codepen.io/Endwall/pen/xxePaxK)

```html
<!-- Width and Units (px, rem, %) -->
<div class="bg-[red] w-[10px]">example</div>
<div class="bg-[red] w-[10rem]">example</div>
<div class="bg-[red] w-[10%]">example</div>

<!-- Colors (Name, Hex, RGB etc.) -->
<div class="bg-[white] color-[rgb(255,0,247)]">example</div>

<!-- States (Hover etc.) and Reactive Classes -->
<div class="bg-[white] w-[30rem] hover:w-[20rem]">example</div>

<!-- Content Additions -->
<div class="after:content-[example] w-[50px]">example</div>

<!-- Flexible Library Usage: Custom Classes -->
<div class="[color:red]">example</div>
<div class="hover:[color:red]">example</div>

<!-- Basic Usage -->
<div class="w-[200px] bg-[red] rounded-[10px] p-[15px]">Box</div>

<!-- Hover and Transform Usage -->
<div class="hover:bg-[blue] hover:transform-[scale(1.1)]">hover</div>

<!-- Dynamic Content (Attr) Usage -->
<div
  class="before:content-[attr(data-content)] before:color-[red]"
  data-content="[demodemo] "
>
  message
</div>

<!-- Variable (Var) and Normal Text Content Usage -->
<div class="after:content-[var(--warning-text)]">Successful</div>
<div class="before:content-[✓_]">Confirm</div>

<!-- Filter Usage -->
<img
  src="images.jpg"
  class="filter-[grayscale(100%)] hover:filter-[blur(5px)]"
  alt="example"
/>
```

### Phone Number Formatting

Phone numbers are automatically formatted in "type tel" fields:
Example: (1111) 1111 1111 1111

```html
<div>
  <label for="phone">Phone:</label>
  <input type="tel" v-model="phone" id="phone" maxlength="21" required />
</div>
```

### Horizontal Scrolling

Lists with horizontal scrolling support:

- `.ul-li-x-scroll`
- `.ul-li-x-scroll-hidden`

```html
<ul class="ul-li-x-scroll">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

# Current Year

Insert the current year.

### Example

```html
<h6 class="current-year">2020-</h6>
```

## How It Works

1. The script listens for the document's ready state.
2. It scans all elements in the DOM for CSS helper classes.
3. For each found class, it generates corresponding CSS rules.
4. Newly added dynamic elements are also processed automatically.
5. Phone number formatting is applied to tel input fields.
6. Horizontal scrolling behavior is added to specified lists.

## Installation

Add the script to your HTML file:

```html
<script src="./bClass-theme-js.js"></script>
```

## License

This project is licensed under the Bik Public License 2.0 - see the [LICENSE](LICENSE) file for details.
