# bClass-theme-js

`bClass-theme-js` ist eine JavaScript-Bibliothek, die CSS-Styles dynamisch basierend auf HTML-Klassennamen generiert. Sie bietet Entwicklern die Möglichkeit, CSS mit Hilfsklassen (ähnlich wie Tailwind CSS) zu schreiben, bietet aber zusätzlich Funktionen für dynamische Inhalte und responsives Design.

## Funktionen

- **Dynamische CSS-Generierung**: Erstellt automatisch CSS-Regeln aus den Klassen in HTML.
- **Unterstützung von Hilfsklassen**: Umfangreiche Unterstützung für Breiten, Höhen, Margins (Außenabstände), Paddings (Innenabstände), Farben usw.
- **Responsives Design**: Unterstützt Präfixe wie `hover`, `focus`, `before`, `after` für Pseudo-Elemente und Zustände.
- **Telefonnummer-Formatierung**: Formatiert Telefonnummern in Input-Feldern automatisch.
- **Scroll-Verhalten**: Fügt Listen mithilfe von Mausrad-Events eine horizontale Scroll-Funktion hinzu.
- **Dynamische Inhaltsaktualisierung**: Aktualisiert automatisch das aktuelle Jahr.

## Nutzung

### Grundlegende Nutzung

Fügen Sie Hilfsklassen zu Ihren HTML-Elementen hinzu:

```html
<div class="w-32 h-32 bg-red-500 rounded-lg"></div>
<p class="text-blue-600 font-size-16">Hello World</p>
```

### Hilfsklassen

Die Bibliothek bietet umfassende Unterstützung für verschiedene Klassen:

#### Klassenreferenzen

- **Breite & Höhe**: `w-[size]`, `h-[size]`
- **Margin (Außenabstand)**: `m-[size]  mt-[size]`, `mb-[size]`, `ml-[size]`, `mr-[size]`
- **Padding (Innenabstand)**: `p-[size]`, `pt-[size]`, `pb-[size]`, `pl-[size]`, `pr-[size]`
- **Positionierung**: `top-[size]`, `bottom-[size]`, `left-[size]`, `right-[size]`
- **Farben**: `bg-[color]`, `color-[color]`
- **Typografie**: `font-size-[size]`, `text-[color]`
- **Transformationen**: `transform-[value]`
- **Border Radius (Eckenradius)**: `.rounded-[size]`, `.rounded-tl-[size]`, `.rounded-tr-[size]`, `.rounded-bl-[size]`, `.rounded-br-[size]`
- **Gap (Abstand)**: `gap-[size]`

#### Zustände und Pseudo-Klassen

- **Hover (Schwebemodus)**: `.hover:w-[size]`
- **Focus (Fokus)**: `.focus:w-[size]`
- **Before (Vorher)**: `.before:w-[size]`
- **After (Nachher)**: `.after:w-[size]`
- **First of type (Erstes Element des Typs)**: `.first-of-type:w-[size]`
- **Last of type (Letztes Element des Typs)**: `.last-of-type:w-[size]`
- **Active (Aktiv)**: `.active:w-[size]`
- **Checked (Ausgewählt)**: `.checked:w-[size]`
- **Disabled (Deaktiviert)**: `.disabled:w-[size]`
- **Enabled (Aktiviert)**: `.enabled:w-[size]`
- **Content (Inhalt)**: `.content-[text]` oder dynamische Funktionen:
  - `.content-[attr(data)]`
  * `.content-[var(--variable)]`
  * `.content-[url(link)]`
  * `.content-[counter(name)]`
  * `.content-[counters(name)]`
- **Filter**: `.filter-[value]` (z. B. blur, grayscale, invert usw.)

#### Beispiele

[codepen](https://codepen.io/Endwall/pen/xxePaxK)

```html
<!-- Breite und Einheiten (px, rem, %) -->
<div class="bg-[red] w-[10px]">example</div>
<div class="bg-[red] w-[10rem]">example</div>
<div class="bg-[red] w-[10%]">example</div>

<!-- Farben (Name, Hex, RGB usw.) -->
<div class="bg-[white] color-[rgb(255,0,247)]">example</div>

<!-- Zustände (Hover usw.) und reaktive Klassen -->
<div class="bg-[white] w-[30rem] hover:w-[20rem]">example</div>

<!-- Content-Erweiterungen -->
<div class="after:content-[example] w-[50px]">example</div>

<!-- Flexible Bibliotheksnutzung: Benutzerdefinierte Klassen -->
<div class="[color:red]">example</div>
<div class="hover:[color:red]">example</div>

<!-- Grundlegende Nutzung -->
<div class="w-[200px] bg-[red] rounded-[10px] p-[15px]">Box</div>

<!-- Hover und Transform Nutzung -->
<div class="hover:bg-[blue] hover:transform-[scale(1.1)]">hover</div>

<!-- Dynamischer Content (Attr) Nutzung -->
<div
  class="before:content-[attr(data-content)] before:color-[red]"
  data-content="[demodemo] "
>
  message
</div>

<!-- Variable (Var) und normaler Text-Content Nutzung -->
<div class="after:content-[var(--warning-text)]">Successful</div>
<div class="before:content-[✓_]">Confirm</hin}

<!-- Filter Nutzung -->
<img
  src="images.jpg"
  class="filter-[grayscale(100%)] hover:filter-[blur(5px)]"
  alt="example"
/>
```

### Telefonnummer-Formatierung

Telefonnummern werden in Feldern vom Typ `tel` automatisch formatiert.
Beispiel: (1111) 1111 1111 1111

```html
<div>
  <label for="phone">Telefon:</label>
  <input type="tel" v-model="phone" id="phone" maxlength="21" required />
</div>
```

### Horizontales Scrollen

Listen mit Unterstützung für horizontales Scrollen:

- `.ul-li-x-scroll`
- `.ul-li-x-scroll-hidden`

```html
<ul class="ul-li-x-scroll">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

# Aktuelles Jahr

Fügt das aktuelle Jahr ein.

### Beispiel

```html
<h6 class="current-year">2020-</h6>
```

## Funktionsweise

1. Das Skript wartet auf den `ready`-Status des Dokuments.
2. Es scannt alle Elemente im DOM nach CSS-Hilfsklassen.
3. Für jede gefundene Klasse werden entsprechende CSS-Regeln generiert.
4. Neu hinzugefügte dynamische Elemente werden automatisch verarbeitet.
5. Die Telefonnummer-Formatierung wird auf `tel`-Input-Felder angewendet.
6. Das horizontale Scroll-Verhalten wird für die angegebenen Listen hinzugefügt.

## Installation

Fügen Sie das Skript zu Ihrer HTML-Datei hinzu:

```html
<script src="./bClass-theme-js.js"></script>
```

## Lizenz

Dieses Projekt ist unter der Bik Public License 2.0 lizenziert – Details finden Sie in der [LICENSE]-Datei.
