# Syamsul Fuadi — Personal Portfolio

Website personal satu halaman yang dibuat dengan **HTML, CSS, dan JavaScript murni**. Tidak memerlukan framework, proses build, atau instalasi package.

## Isi website

- Hero / perkenalan
- Tentang diri
- Keahlian
- Pendidikan dan fokus belajar
- Proyek pilihan
- Kontak dan tautan GitHub
- Tema gelap/terang
- Tampilan responsif untuk HP, tablet, dan desktop
- Animasi ringan dengan dukungan `prefers-reduced-motion`

## Struktur file

```text
syamsul-about-me/
├── index.html
├── styles.css
├── script.js
├── profile-data.js
├── assets/
│   └── favicon.svg
└── README.md
```

## Mengubah informasi pribadi

Sebagian besar data yang sering diganti ada di:

```text
profile-data.js
```

Di sana tersedia:

- daftar peran pada efek mengetik;
- daftar keahlian;
- daftar proyek;
- deskripsi dan tautan proyek.

Informasi utama seperti nama, lokasi, deskripsi, pendidikan, dan tautan GitHub berada di `index.html`.

## Mengganti foto profil

Cari alamat berikut di `index.html`:

```html
https://avatars.githubusercontent.com/u/83098308?v=4
```

Ganti dengan URL foto lain, atau simpan foto ke folder `assets` lalu gunakan:

```html
<img src="assets/foto-saya.jpg" alt="Foto profil Syamsul Fuadi">
```

## Menjalankan secara lokal

Cukup buka `index.html` melalui browser. Untuk hasil terbaik, gunakan server lokal:

```bash
python -m http.server 8000
```

Kemudian buka:

```text
http://localhost:8000
```

## Mengunggah ke GitHub Pages

### Pilihan A — Website utama akun

Buat repositori bernama:

```text
REITZG1.github.io
```

Unggah seluruh isi folder ini ke branch `main`.

### Pilihan B — Menggunakan repositori yang sudah ada

Unggah file ke repositori seperti `aboutme.github.io`, kemudian aktifkan GitHub Pages untuk branch `main` dan folder root.

## Catatan sebelum dipublikasikan

Periksa kembali:

- nama kampus apabila ingin ditampilkan;
- tautan proyek yang belum memiliki repositori;
- foto profil;
- informasi kontak publik;
- deskripsi singkat diri.

---

Dibuat untuk **Syamsul Fuadi / @REITZG1**.
