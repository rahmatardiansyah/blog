---
title: 'Post Install Fedora 37 XFCE'
date: 2023-01-29T19:58:04+07:00
description: 'Yang dilakukan setelah install Linux Fedora'
tags: ['fedora', 'linux']
draft: false
---

## Pendahuluan

Jika kita baru menginstal sistem operasi ada beberapa hal yang harus dilakukan.Misalnya install aplikasi yang dibutuhkan dan mengubah konfigurasi bawaan dari sistem operasi tersebut agar sesuai dengan kebutuh pengguna. Berikut adalah beberapa hal yang saya lakukan setelah install [Linux Fedora 37 XFCE](https://spins.fedoraproject.org/xfce/download/index.html 'Linux Fedora 37 XFCE').

## Memperbaiki jam di Linux dan Windows

Jika kita menginstall Linux dan Windows dalam satu perangkat biasanya jam dikedua sistem operasi tersebut mengalami error atau tidak lagi akurat karena sistem operasi nya bingung untuk mengikuti jam di bios atau RTC (_Real Time Clock_). Solusinya sudah saya tulis [disini](https://rahmatardiansyah.art/blog/memperbaiki-jam-yang-tidak-akur-jika-dual-boot 'disini').

## Mengubah Konfigurasi DNF Package Manager

Sekilas tentang DNF, DNF adalah package manager yang digunakan distribusi Linux berbasis RPM (RedHat Package Manager) termasuk Linux Fedora. Karena DNF adalah package manager yang termasuk lambat dalam penginstallan aplikasi, kita butuh sedikit mengubah konfigurasinya yang berada pada `/etc/dnf/dnf.conf`. Untuk tutorialnya silahkan kehalaman [ini](https://rahmatardiansyah.art/blog/mempercepat-download-dnf-package-manager 'ini').

### Update System

Setelah kita mengubah file konfigurasi dnf selanjutnya update system, dengan cara menjalankan command dibawah ini

```sh
$ sudo dnf up
```

## Mengaktifkan RPMFusion

Selanjutnya adalah Mengaktifkan RPMFusion. RPMFusion adalah repository tambahan yang bisa digunakan oleh turunan distribusi RedHat. Karena Fedora hanya menyediakan software open source saja maka secara default repositori ini tidak aktif. Untuk mengaktifkannya hanya perlu menjalankan perintah dibawah ini.

```shell
$ sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
```

## Mengaktifkan Flatpak

Secara default Flatpak sudah terinstall di Linux Fedora 37 tapi belum mengaktifkan repository dari flathub. Cara mengaktifkannya dengan menjalankan command berikut ini

```shell
$ flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

## Remaps CapsLock menjadi Escape

Saya menggunakan aplikasi neovim sebagai text editor sehari-hari. Untuk alasan kenyamanan tombol CapsLock di keyboard saya ganti dengan Escape agar lebih mudah masuk ke mode normal pada neovim. Untuk _Meremaps_-nya ada package yang harus diinstall yaitu `xcape`.Tapi `xcape` tidak ada di repository bawaan Fedora 37, maka dari itu harus ditambahkan terlebih dahulu menggunakan [copr](https://copr.fedorainfracloud.org/). Berikut cara menginstall dan menggunakannya

```shell
$ sudo dnf copr enable dawid/xcape
$ sudo dnf in xcape
```

Lalu buat file **shell script** namanya `remaps.sh` yang isinya :

```shell
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

Saya menyimpan file tersebut di folder `~/.bin/` dan jangan lupa memberikan perizinan eksekusi dengan perintah `chmod +x ~/.bin/remaps.sh`. Setelah itu jalankan perintah `~/.bin/remaps.sh` maka tombol pada CapsLock sudah berubah menjadi Escape. Jika ingin di remaps secara otomatis daftarkan ke autostart dengan cara buka pengaturan `Session and Startup` lalu tekan tanda `+` dan pilih file `remaps.sh` tadi. Untuk mengaktifkan CapsLock bisa menggunakan tombol `LSfhit+RShift`.

## Install Font

Saya menggunakan font dari _NerdFont_ yang bisa didownload [disini](https://www.nerdfonts.com/font-downloads). Setelah didownload extrak file tersebut lalu copy foldernya ke `/usr/share/fonts/`.

## Install Icons

Saya menggunakan Icons dari [Papirus](https://www.gnome-look.org/p/1166289/). Sama seperti font. Extract file tersebut lalu copy semua folder ke `/usr/share/icons`. Setelah di copy kita harus menjalankan perintah di bawah ini

```shell
$ sudo gtk-update-icon-cache /usr/share/icons/Papirus
$ sudo gtk-update-icon-cache /usr/share/icons/Papirus-Dark
$ sudo gtk-update-icon-cache /usr/share/icons/Papirus-Light
$ sudo gtk-update-icon-cache /usr/share/icons/ePapirus-Dark
$ sudo gtk-update-icon-cache /usr/share/icons/ePapirus
```

## Install Cursor
* [Big Sur](https://www.gnome-look.org/p/1616779)
* [Future Cursors](https://www.gnome-look.org/p/1457141)

Ekstrak dan copy folder tersebut di `/usr/share/icons`

## Browser

## Text/Code Editor

## Terminal

## Shell

## Screen Mirroring scrcpy

## Video Player mpv

## System Monitor

## Screencast Tools

## Color Picker

## tmux

## pavucontrol

## Halvum

## Image Viewer

## RSS Feed

## Compare files tool

## Calculator

## PDF Viewer

## rclone

## Gucharmap

## Kalender

## Typing Test

## Figlet

## Docker

## Flameshot

## Qt theme

## Lightdm Settings

## NetworkManager-tui

## Rofi

## Compress Image

## Taking Note (Joplin)

## Password Manager keepassxc

## Telegram

## Discord

## Spotify

## Zoom

## Obs Studio

## Anydesk

## Gimp

## Emulator PS2(Pcsxs2)

## Emulator PSP(PPSSPP)

## Minecraft Launcher(Prism Launcher)

## Fritzing

## Arduino

## Screen Anotation

## Enable noise reduction

## Virtualbox

## Printer
