---
title: 'Post Install Fedora 37 XFCE'
date: 2023-01-29T19:58:04+07:00
description: 'Yang dilakukan setelah install Linux Fedora'
tags: ['fedora', 'linux']
draft: false
---

## Pendahuluan

Jika kita baru menginstal sistem operasi ada beberapa hal yang harus dilakukan.Misalnya install aplikasi yang dibutuhkan dan mengubah konfigurasi bawaan dari sistem operasi tersebut agar sesuai dengan kebutuh pengguna. Berikut adalah beberapa hal yang saya lakukan setelah install [Linux Fedora 37 XFCE](https://spins.fedoraproject.org/xfce/download/index.html).

## Memperbaiki jam di Linux dan Windows

Jika kita menginstall Linux dan Windows dalam satu perangkat biasanya jam dikedua sistem operasi tersebut mengalami error atau tidak lagi akurat karena sistem operasi nya bingung untuk mengikuti jam di bios atau RTC (_Real Time Clock_). Solusinya sudah saya tulis [disini]({{< ref "/blog/2-memperbaiki-jam-yang-tidak-akur-jika-dual-boot" >}}).

## Mengubah Konfigurasi DNF Package Manager

Sekilas tentang DNF, DNF adalah package manager yang digunakan distribusi Linux berbasis RPM (RedHat Package Manager) termasuk Linux Fedora. Karena DNF adalah package manager yang termasuk lambat dalam penginstallan aplikasi, kita butuh sedikit mengubah konfigurasinya yang berada pada `/etc/dnf/dnf.conf`. Untuk tutorialnya silahkan kehalaman [ini]().

### Update System

Setelah kita mengubah file konfigurasi dnf selanjutnya update system, dengan cara menjalankan command dibawah ini

```console
$ sudo dnf up
```

## Mengaktifkan RPMFusion

Selanjutnya adalah Mengaktifkan RPMFusion. RPMFusion adalah repository tambahan yang bisa digunakan oleh turunan distribusi RedHat. Karena Fedora hanya menyediakan software open source saja maka secara default repositori ini tidak aktif. Untuk mengaktifkannya hanya perlu menjalankan perintah dibawah ini.

```console
$ sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
```

## Mengaktifkan Flatpak

Secara default Flatpak sudah terinstall di Linux Fedora 37 tapi belum mengaktifkan repository dari flathub. Cara mengaktifkannya dengan menjalankan command berikut ini

```console
$ flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

## Remaps CapsLock menjadi Escape

Saya menggunakan aplikasi neovim sebagai text editor sehari-hari. Untuk alasan kenyamanan tombol CapsLock di keyboard saya ganti dengan Escape agar lebih mudah masuk ke mode normal pada neovim. Untuk _Meremaps_-nya ada package yang harus diinstall yaitu `xcape`.Tapi `xcape` tidak ada di repository bawaan Fedora 37, maka dari itu harus ditambahkan terlebih dahulu menggunakan [copr](https://copr.fedorainfracloud.org/). Berikut cara menginstall dan menggunakannya

```console
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

Saya menyimpan file tersebut di folder `~/.bin/` dan jangan lupa memberikan perizinan eksekusi dengan perintah `chmod +x ~/.bin/remaps.sh`. Setelah itu jalankan perintah `~/.bin/remaps.sh` maka tombol pada CapsLock sudah berubah menjadi Escape. Jika ingin di remaps secara otomatis daftarkan ke autostart dengan cara buka pengaturan `Session and Startup` lalu tekan tanda `+` dan pilih file `remaps.sh` tadi. Untuk mengaktifkan CapsLock bisa menggunakan tombol `LShift+RShift`.

## Install Font

Saya menggunakan font dari _NerdFont_ yang bisa didownload [disini](https://www.nerdfonts.com/font-downloads). Setelah didownload extrak file tersebut lalu copy foldernya ke `/usr/share/fonts/`.

## Install Icons

Saya menggunakan Icons dari [Papirus](https://www.gnome-look.org/p/1166289/). Sama seperti font. Extract file tersebut lalu copy semua folder ke `/usr/share/icons`. Setelah di copy kita harus menjalankan perintah di bawah ini

```console
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
Saya menggunakan Firefox dan Brave sebagai browser utama, secara default Firefox sudah terinstal pada Linux Fedora. Tapi tidak dengan Brave, kita harus menambahkan repository baru. Berikut caranya

```console
$ sudo dnf install dnf-plugins-core
$ sudo dnf config-manager --add-repo https://brave-browser-rpm-release.s3.brave.com/x86_64/
$ sudo rpm --import https://brave-browser-rpm-release.s3.brave.com/brave-core.asc
$ sudo dnf install brave-browser
```

Setelah menginstal browser ada beberapa step yang saya lakukan, misalnya menambahkan flag `--password-store=basic` pada saat Brave dijalankan. Hal ini dilakukan karena saya menggunakan Desktop Environment dan Window Manager(dwm) secara bersamaan. Karena jika tidak melalukan hal ini browser akan bingung akan menyimpan password di `keyring` atau lainnya ketika kita mengganti session Desktop Environment ke Window Manager atau sebaliknya. Berikut caranya

```console
$ cp /usr/share/applications/brave-browser.desktop ~/.local/share/applications/brave-browser.desktop
$ vim ~/.local/share/applications/brave-browser.desktop
```

Buat folder **applications** jika tidak ada dan paste pada bagian :

```text
...
Comment[zh_TW]=連線到網際網路
Exec=/usr/bin/brave-browser-stable %U --password-store=basic
StartupNotify=true
...
Exec=/usr/bin/brave-browser-stable --password-store=basic
...
```
Terakhir instal plugin yang dibutuhkan dan set default homepage
* plugins : [new tab redirect](https://chrome.google.com/webstore/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna/related?hl=id), [json viewer](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh)
* Set [startpage](https://github.com/Nainish-Rai/Aesthetic-Startpage)

## Text/Code Editor
Saya menggunakan [VSCode](https://code.visualstudio.com/docs/setup/linux#_rhel-fedora-and-centos-based-distributions) sebagai Code Editor cadangan dan [Sublime Text](https://www.sublimetext.com/docs/linux_repositories.html#dnf) sebagai notepad. Kedua aplikasi tersebut tidak ada di repository bawaan Fedora jadi kita harus menambahkannya.

```console
$ sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
$ sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'
$ dnf check-update
$ sudo dnf in code
$ sudo rpm -v --import https://download.sublimetext.com/sublimehq-rpm-pub.gpg
$ sudo dnf config-manager --add-repo https://download.sublimetext.com/rpm/stable/x86_64/sublime-text.repo
$ sudo dnf install sublime-text
```

Setelah install atur config dan install plugin yang dibutuhkan.

## Terminal
Untuk terminal saya menggunakan [alacritty](https://github.com/alacritty/alacritty) dan [kitty](https://sw.kovidgoyal.net/kitty/binary/) sebagai terminal utama.

```console
$ sudo dnf in alacritty
$ sudo dnf in kitty
```

## Shell
Saya hanya menggunakan bash sebagai default shell, untuk itu harus mengkonfigurasi beberapa hal. Yaitu mulai dari dari **path**, **alias** dan **variable**. Untuk **path** dan **variable** bisa set pada file `~/.bash_profile` dan untuk alias bisa set pada file `~/.bashrc`.

```text
# ~/.bash_profile
# User specific environment and startup programs
export EDITOR="nvim"
export LESSHISTFILE="-"
export TERMINAL="alacritty"

if [ -d "$HOME/.bin" ] ;
  then PATH="$HOME/.bin:$PATH"
fi

if [ -d "$HOME/.local/bin" ] ;
  then PATH="$HOME/.local/bin:$PATH"
fi
```

```text
# ~/.bashrc
PS1='\[\e[0;31m\]\u \[\e[0m\]at \[\e[0;32m\]\H \[\e[0m\]in \[\e[0;96m\]\W \[\e[0m\]$ \[\e[0m\]'

HISTCONTROL=ignoreboth:erasedups
HISTSIZE=1000000
SAVEHIST=1000000

# source alias file
if [ -f ~/.aliases ]; then
. ~/.aliases
fi
```

untuk alias saya buat file terpisah agar mudah ditambahkan yaitu pada file `~/.aliases`.

## Screen Mirroring scrcpy
Screen Mirroring adalah fitur yang memungkinkan kita menduplikat layar ponsel ke komputer. Saya menggunakan [scrcpy](https://github.com/Genymobile/scrcpy) karena sangat mudah dan ringan menggunakannya.

```console
$ sudo dnf copr enable zeno/scrcpy
$ sudo dnf in scrcpy
```

Enable kan **Usb Debugging** dan connect kan hp via Usb lalu jalankan perintah `scrcpy` di terminal.

{{< show-gif src="/images/demo-scrcpy.gif" alt="Demo penggunaan aplikasi scrcpy" class="no-border" >}}

## Video Player mpv
Video player yang saya gunakan adalah [mpv](https://mpv.io/) karena ringan dan mengoperasikannya menggunakan keybind.

```console
$ sudo dnf in mpv
$ mkdir ~/.config/mpv
$ cp /usr/share/doc/mpv/mpv.conf ~/.config/mpv
$ vim ~/.config/mpv
```

```text
# ~/.config/mpv/mpv.conf
save-position-on-quit
autofit-larger=60%x60%
```

## System Monitor
System Monitor merupakan sebuah tool untuk melakukan monitoring atau pengawasan aplikasi yang berjalan pada komputer. Saya menggunakan `htop` dan `btop` sebagai System Monitor utama.
```console
$ sudo dnf in btop htop
```

## screenkey
Aplikasi [screenkey](https://gitlab.com/screenkey/screenkey) ini berguna untuk manampilkan log/history dari keyboard maupun mouse. Biasanya digunakan untuk membuat video presentasi agar memudahkan penontonnya mengetahui apa yang di-click maupun yang ditekan pada keyboard.

```console
$ sudo dnf in screenkey
```

{{< show-gif src="/images/demo-screenkey.gif" alt="Demo penggunaan aplikasi screenkey" class="no-border" >}}

## Color Picker
Color Picker adalah tools yang digunakan untuk mengidentifikasi warna. Saya menggunakan [gpick](http://www.gpick.org/) karena memiliki fitur yang sangat lengkap tapi juga sangan ringan.

```console
$ sudo dnf in gpick
```

## tmux
Tmux adalah terminal multiplexer yang artinya kita bisa menambahkan jendela(pane) baru dalam 1 terminal. Tools ini sangat berguna jika ingin memiliki banyak terminal yang digunakan dalam satu waktu.
```console
$ sudo dnf in tmux
```
ini adalah config tmux yang saya gunakan yang berada pada `~/.tmux.conf`.


<details>
  <summary>Click me</summary>

  ```text
  # change default prefix to Ctrl+a
  set -g prefix C-a
  set -g base-index 1
  setw -g pane-base-index 1
  # set -g default-shell /usr/bin/fish
  set -g mouse on
  
  # set -g default-terminal "tmux-256color"
  set -g default-terminal "xterm-256color"
  set -ag terminal-overrides ",xterm-256color:RGB"
  set -s escape-time 0
  
  # Pane
  unbind '%'
  bind '\' split-window -h
  unbind '"'
  bind - split-window -v
  
  bind -r C-h resize-pane -L 2
  bind -r C-j resize-pane -D 2
  bind -r C-k resize-pane -U 2
  bind -r C-l resize-pane -R 2
  
  # smart pane switching with awareness of vim splits
  bind h select-pane -L
  bind j select-pane -D
  bind k select-pane -U
  bind l select-pane -R
  
  # reload config file (change file location to your the tmux.conf you want to use)
  bind r source-file ~/.tmux.conf
  bind p switch-client -p # swith to prev session
  bind n switch-client -n # swith to to next session
  
  # Theme
  set -g status-style 'bg=default,fg=white' # transparent status bar
  set -g status-position bottom 
  set -g pane-active-border-style "fg=1,bg=default"
  set -g pane-border-style "fg=7,bg=default"
  set -g window-status-current-format "#[fg=4,bold,bg=default](#[fg=1,bold,bg=default]#I #F #W#[fg=4,bold,bg=default])"
  set -g window-status-format "#[fg=7,nobold,bg=default](#[fg=7,nobold,bg=default]#I #W#[fg=7,nobold,bg=default])"
  
  set -g status-left-length 50
  set -g status-left "#[fg=3,bold,bg=default]#S " # session name
  set -ga status-left '#[fg=5,nobold,bg=default]['
  set -ga status-left '#[fg=2,nobold,bg=default]#{window_panes}:#{pane_index}'
  set -ga status-left '#[fg=5,nobold,bg=default]] '
  
  set -g status-right-length 10
  set -g status-right '' # disable working directory at right
  ```
</details>

## Pavucontrol
Pavucontrol adalah aplikasi untuk mengatur Volume,Mixer Audio,sensitivitas mic, dan lainnya.

```console
$ sudo dnf in pavucontrol
```

## Helvum
Helvum is a graphical patchbay for PipeWire.

```console
$ sudo dnf in helvum
```

## Image Viewer
Aplikasi untuk melihat gambar yang saya gunakan adalah [sxiv](https://github.com/xyb3rt/sxiv).

```console
$ sudo dnf in sxiv exiv2 mediainfo
```

## RSS Feed
RSS singkatan dari Really Simple Syndication atau Rich Site Summary. RSS Feed berguna untuk menampilakan postingan terbaru dari blog yang kita ikuti. Saya menggunakan [newsboat](https://newsboat.org/) karena aplikasi tersebut terminal based.

```console
$ sudo dnf in newsboat
```

## Compare files tool
Aplikasi ini berguna untuk memudahkan kita dalam membandingkan file atau folder. Biasanya untuk mengetahui perubahan pada file. [meld](https://meldmerge.org/) adalah salah satu aplikasi **compare** yang powerfull.

```console
$ sudo dnf in meld
```

## Calculator
Secara default Linux Fedora sudah terinstall kalkulator yang bernama `galculator`. Tapi saya kurang suka karena tidak menampilkan history/riwayat angka. Oleh karena itu saya menggunakan kalkulator bawaan `gnome`.

```console
$ sudo dnf in gnome-calculator
```

## PDF Viewer
Saya menginstall PDF Viewer dari `gnome` untuk cadangan jika terjadi error pada PDF Viewer bawaan Linux Fedora yang bernama `Atril`.

```console
$ sudo dnf in evince
```

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
