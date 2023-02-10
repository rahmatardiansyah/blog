---
title: 'Mengaktifkan Noice Reduction di Linux Fedora 37'
date: 2023-02-01T22:06:49+07:00
draft: true
---

## program yang harus diinstall

```console
$ sudo dnf copr enable ycollet/audinux
$ sudo dnf install noise-suppression-for-voice
$ mkdir -p ~/.config/pipewire
$ nvim ~/.config/pipewire/input-filter-chain.conf
```
