---
title: 'Memperbaiki Jam Yang Tidak Akur Jika Dual Boot'
date: 2023-01-29T20:09:26+07:00
description: 'Cara Memperbaiki Jam di Linux dan Windows'
tags: ['linux', 'windows']
canonical: "https://wiki.archlinux.org/title/System_time"
draft: false
---

## Permasalahan

Jika kita melakukan dual booting Windows dan Linux akan terjadinya perbedaan waktu di kedua sistem operasi tersebut.Walaupun kita telah mengatur jam dan _timezone_ dengan tepat akan kembali _error_ jika melakukan _reboot_ pada sistem. Ada 2 cara memperbaikinya yaitu buat linux menjadi Local Time atau buat Windows menjadi UTC Time. Saya pribadi menggunakan cara yang pertama yaitu linux yang mengikuti jam bios.

Jika kita melakukan dual booting Windows dan Linux akan terjadinya perbedaan waktu di kedua sistem operasi tersebut.Walaupun kita telah mengatur jam dan _timezone_ dengan tepat akan kembali _error_ jika melakukan _reboot_ pada sistem. Ada 2 cara memperbaikinya yaitu buat linux menjadi Local Time atau buat Windows menjadi UTC Time. Saya pribadi menggunakan cara yang pertama yaitu linux yang mengikuti jam bios.

## Systemd

Cara ini hanya berlaku untuk init sistem **systemd** jika menggunakan **runit** beda lagi.

```
$ timedatectl set-local-rtc 1 --adjust-system-clock
```

Jika perintah diatas sudah dijalankan lakukan sinkronisasi jam di kedua sistem operasi.

## Runit

Edit file yang berada pada `/etc/rc/rc.conf` dan uncomment atau tambahkan line dibawah ini

```
HARDWARECLOCK='localtime'
```

Lalu atur jam dengan menggunakan user root atau menggunakan command sudo

```
$ sudo date 012308582023
```

Angka pada command diatas merepresentasikan _MMDDhhmmYYYY_

- MM = Mount
- DD = Day
- hh = hour
- mm = minute
- YYYY = Year

Sekarang Waktu di Linux maupun Windows sudah sama persis. Sekian tutorial kali ini, Terimakasih.
