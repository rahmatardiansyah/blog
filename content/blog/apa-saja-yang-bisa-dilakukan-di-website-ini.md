---
title: 'Apa Saja yang Bisa Dilakukan di Website Ini'
description: 'Beberapa hal apa saja yang bisa dilakukan pada website ini'
date: 2023-02-01T10:02:26+07:00
tags: ['blog', 'hugo']
math: true
outdated: true
draft: true
---

## Menggunakan Markdown Syntax

Artikel ini mengandung syntax markdown dasar yang digunakan untuk menulis postingan pada blog ini. Dan juga bisa menggunakan elements HTML didalamnya yang bisa dihias menggunakan CSS

### Headings

Dengan mengikuti tag HTML `<h2>`—`<h6>` merepresentasikan 5 bagian judul, `<h2>` adalah judul yang paling besar sedangkan `<h6>` adalah judul yang paling kecil.

{{< code-path type="Markdown" >}}
```md {linenos=table, hl_lines=[2,"4-5"], linenostart=1}
## H2
### H3
#### H4
##### H5
###### H6
```

### Code Block

Dapat juga menggunakan blok kode untuk menampilkan perintah ataupun isifile contohnya:

{{< code-path type="Shell Script" src="~/.bin/.">}}

```bash
#!/usr/bin/env bash

# This script is called on startup to remap keys.
# Decrease key repeat delay to 300ms and increase key repeat rate to 50 per second.
xset r rate 300 50
# Map the caps lock key to super, and map the menu key to right super.
setxkbmap -option caps:escape,shift:both_capslock
# When caps lock is pressed only once, treat it as escape.
killall xcape 2>/dev/null ; xcape -e 'Super_L=Escape'
# Turn off caps lock if on since there is no longer a key for it.
xset -q | grep "Caps Lock:\s*on" && xdotool key Caps_Lock
```

### Paragraph

Membuat Paragraf biasa contohnya seperti ini. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

### Blockquotes

Blocquotes adalah emelemen yang merepresentasikan konten yang didalamnya terdapat kutipan dari sumber lain dan sumbernya bisa diletakkan pada `footer` atau `footnote`

#### Blockquote tanpa attribut

> Tiam, ad mint andaepu dandae nostion secatur sequo quae.
> **Note** that you can use _Markdown syntax_ within a blockquote.

#### Blockquote dengan attribut

> Don't communicate by sharing memory, share memory by communicating.<br>
> — <cite>Rob Pike[^1]</cite>

[^1]: The above quote is excerpted from Rob Pike's [talk](https://www.youtube.com/watch?v=PAAkCSZUG1c) during Gopherfest, November 18, 2015.

##### Coba H5

###### Coba H6
ini text biasa

## Tables

Di website ini juga support untuk membuat tabel. contohnya seperti ini

### Inline Markdown within tables

<br>

| Italics   | Bold     | Code   |
| --------- | -------- | ------ |
| _italics_ | **bold** | `code` |

## Element Lainnya — abbr, sub, sup, kbd, mark

<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Press <kbd><kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>Delete</kbd></kbd> to end the session.

Most <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and other small creatures.

## Mendukung Penggunaan Emoji

<p><span class="nowrap"><span class="emojify">🙈</span> <code>:see_no_evil:</code></span>  <span class="nowrap"><span class="emojify">🙉</span> <code>:hear_no_evil:</code></span>  <span class="nowrap"><span class="emojify">🙊</span> <code>:speak_no_evil:</code></span></p>

[Emoji cheat sheet](http://www.emoji-cheat-sheet.com/)

**N.B.** Penggunaan emoji tergantung browser dan platform jika font sudah terinstall maka akan tampil.

{{< code-path type="CSS" >}}
```css
.emoji {
font-family: Apple Color Emoji, Segoe UI Emoji, NotoColorEmoji, Segoe UI Symbol, Android Emoji, EmojiSymbols;
}
```

## Menulis Notasi Matematika

Di hugo untuk menulis notasi matematika harus menggunakan pihak ketiga yaitu [KaTeX](https://katex.org/)

### Contoh

$$
 \varphi = 1+\frac{1} {1+\frac{1} {1+\frac{1} {1+\cdots} } }
$$

## Image

Add captions to your inline images like this:

```md
![Alt text](image-url.jpg)
```

![teks alternatif](/images/programmer-work.jpg)

## YouTube Shortcode


{{< youtube ZJthWmvUzzc >}}

## Twitter Shortcode

{{< tweet user="SanDiegoZoo" id="1453110110599868418" >}}
