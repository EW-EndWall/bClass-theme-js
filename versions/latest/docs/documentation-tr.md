# bClass-theme-js

`bClass-theme-js`, HTML sınıf adlarına göre dinamik CSS stilleri oluşturan bir JavaScript kütüphanesidir. Geliştiricilere Tailwind CSS benzeri yardımcı sınıf kullanarak CSS yazma imkanı tanır, ancak dinamik içerik ve responsive tasarım için ek özellikler sunar.

## Özellikler

- **Dinamik CSS Oluşturma**: HTML içindeki sınıf adlarından CSS kuralları otomatik olarak oluşturur
- **Yardımcı Sınıf Desteği**: Geniş sınıf desteği ile genişlik, yükseklik, margin, padding, renkler vb. için
- **Responsive Tasarım**: Pseudo-element ve durumlar için hover, focus, before, after gibi ön ekleri destekler
- **Telefon Numarası Biçimlendirme**: Giriş alanlarında telefon numaralarını otomatik biçimlendirir
- **Kaydırma Davranışı**: Fare tekerleği olayları ile listelerde yatay kaydırma ekler
- **Dinamik İçerik Güncellemesi**: Geçerli yılı otomatik olarak günceller

## Kullanım

### Temel Kullanım

HTML elementlerinize yardımcı sınıflar ekleyin:

```html
<div class="w-32 h-32 bg-red-500 rounded-lg"></div>
<p class="text-blue-600 font-size-16">Merhaba Dünya</p>
```

### Yardımcı Sınıflar

Kütüphane geniş bir yardımcı sınıf desteğine sahiptir:

#### Sınıf Referansları

- **Genişlik & Yükseklik**: `w-[boyut]`, `h-[boyut]`
- **Margin**: `m-[boyut]`, `mt-[boyut]`, `mb-[boyut]`, `ml-[boyut]`, `mr-[boyut]`
- **Padding**: `p-[boyut]`, `pt-[boyut]`, `pb-[boyut]`, `pl-[boyut]`, `pr-[boyut]`
- **Konumlandırma**: `top-[boyut]`, `bottom-[boyut]`, `left-[boyut]`, `right-[boyut]`
- **Renkler**: `bg-[renk]`, `color-[renk]`
- **Tipografi**: `font-size-[boyut]`, `text-[renk]`
- **Dönüşümler**: `transform-[değer]`
- **Kenar Yarıçapı**: `.rounded-[boyut]`, `.rounded-tl-[boyut]`, `.rounded-tr-[]`, `.rounded-bl-[]`, `.rounded-br-[]`
- **Boşluk**: `gap-[boyut]`

#### Durumlar ve Sözde Sınıflar

- **Hover**: `.hover:w-[boyut]`
- **Focus**: `.focus:w-[boyut]`
- **Before**: `.before:w-[boyut]`
- **After**: `.after:w-[boyut]`
- **First of type**: `.first-of-type:w-[boyut]`
- **Last of type**: `.last-of-type:w-[boyut]`
- **Active**: `.active:w-[boyut]`
- **Checked**: `.checked:w-[boyut]`
- **Disabled**: `.disabled:w-[boyut]`
- **Enabled**: `.enabled:w-[boyut]`
- **İçerik (Content)**: `.content-[metin]` veya dinamik fonksiyonlar:
  - `.content-[attr(veri)]`
  - `.content-[var(--değişken)]`
  - `.content-[url(bağlantı)]`
  - `.content-[counter(isim)]`
  - `.content-[counters(isim)]`
- **Filter**: `.filter-[değer]` (Örn: blur, grayscale, invert vb.)

#### örnek

[codepen](https://codepen.io/Endwall/pen/xxePaxK)

```html
<!-- Genişlik ve Ölçü Birimleri (px, rem, %) -->
<div class="bg-[red] w-[10px]">example</div>
<div class="bg-[red] w-[10rem]">example</div>
<div class="bg-[red] w-[10%]">example</div>

<!-- Renkler (İsim, Hex, RGB vb.) -->
<div class="bg-[white] color-[rgb(255,0,247)]">example</div>

<!-- Durumlar (Hover vb.) ve Tepkisel Sınıflar -->
<div class="bg-[white] w-[30rem] hover:w-[20rem]">example</div>

<!-- İçerik (Content) Eklemeleri -->
<div class="after:content-[example] w-[50px]">example</div>

<!-- Kütüphanenin Esnek Kullanımı: Özel Sınıflar (Custom Classes) -->
<div class="[color:red]">example</div>
<div class="hover:[color:red]">example</div>

<!-- Temel Kullanım -->
<div class="w-[200px] bg-[red] rounded-[10px] p-[15px]">Kutu</div>

<!-- Hover ve Transform Kullanımı -->
<div class="hover:bg-[blue] hover:transform-[scale(1.1)]">hover</div>

<!-- Dinamik İçerik (Attr) Kullanımı -->
<div
  class="before:content-[attr(data-content)] before:color-[red]"
  data-content="[demodemo] "
>
  message
</div>

<!-- Değişken (Var) ve Normal Metin İçerik Kullanımı -->
<div class="after:content-[var(--uyari-metni)]">Successful</div>
<div class="before:content-[✓_]">Confirm</div>

<!-- Filtre (Filter) Kullanımı -->
<img
  src="images.jpg"
  class="filter-[grayscale(100%)] hover:filter-[blur(5px)]"
  alt="example"
/>
```

### Telefon Numarası Biçimlendirme

"type tel" alanları için telefon numaraları otomatik biçimlendirilir:
Örnek : (1111) 1111 1111 1111

```html
<div>
  <label for="phone">Phone:</label>
  <input type="tel" v-model="phone" id="phone" maxlength="21" required />
</div>
```

### Yatay Kaydırma

Yatay kaydırma desteği ile listeler:

- `.ul-li-x-scroll`
- `.ul-li-x-scroll-hidden`

```html
<ul class="ul-li-x-scroll">
  <li>Öğe 1</li>
  <li>Öğe 2</li>
</ul>
```

# Mevcut yıl

Geçerli yılı ekleyin.

### Örnek

```html
<h6 class="current-year">2020-</h6>
```

## Nasıl Çalışır

1. Script, belge hazır durumunu dinler
2. DOM'daki tüm elementleri CSS yardımcı sınıfları için tarar
3. Bulunan her sınıf için karşılık gelen CSS kurallarını oluşturur
4. Dinamik olarak eklenen yeni elementler de otomatik olarak işlenir
5. Telefon numarası biçimlendirme tel girişlerine uygulanır
6. Belirtilen listeler için yatay kaydırma davranışı eklenir

## Kurulum

Scripti HTML dosyanıza ekleyin

```html
<script src="./bClass-theme-js.js"></script>
```

## Lisans

Bu proje Bik Public License 2.0 altında lisanslanmıştır - ayrıntılar için [LICENSE](LICENSE) dosyasına bakınız.
