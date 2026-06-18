/*
  Semua informasi yang sering diubah disimpan di sini.
  Edit nama keahlian, proyek, deskripsi, dan tautannya tanpa perlu
  menyentuh struktur utama index.html.
*/

window.PORTFOLIO_DATA = {
  roles: [
    "Mahasiswa Teknik Elektro",
    "Embedded Systems Enthusiast",
    "Audio DSP Explorer",
    "Linux & Android Tinkerer"
  ],

  skills: [
    {
      icon: "</>",
      title: "Pemrograman",
      items: ["C++", "C", "Arduino", "HTML", "CSS", "JavaScript dasar", "Algoritma"]
    },
    {
      icon: "MCU",
      title: "Embedded & IoT",
      items: ["ESP32", "ESP32-P4", "Arduino", "I²S", "ADC/DAC", "Sensor", "Real-time processing"]
    },
    {
      icon: "DSP",
      title: "Elektronika & Audio",
      items: ["Audio DSP", "Equalizer", "Compressor", "Filter digital", "Rangkaian analog", "Proteus"]
    },
    {
      icon: "OS",
      title: "Sistem & Tools",
      items: ["Linux", "Arch Linux ARM", "Android", "Git", "GitHub", "PlatformIO", "Arduino IDE"]
    }
  ],

  projects: [
    {
      title: "ESP32 Multiband Digital Audio Processor",
      description: "Prosesor audio digital real-time berbasis ESP32 dengan equalizer multiband, compressor, filter, pengaturan level, dan antarmuka kontrol.",
      technologies: ["ESP32", "C++", "DSP", "I²S", "PlatformIO"],
      url: "https://github.com/REITZG1/esp32-multiband-digital-audio-processor"
    },
    {
      title: "ESP32-P4 Audio DSP Mixer",
      description: "Eksperimen mixer audio stereo 48 kHz yang menggabungkan pemrosesan multiband, echo, limiter, SPIFFS, serta kontrol serial.",
      technologies: ["ESP32-P4", "FreeRTOS", "C++", "Audio DSP"],
      url: "https://github.com/REITZG1/audio-dsp"
    },
    {
      title: "VA Meter Berbasis Arduino",
      description: "Sistem pengukuran tegangan dan arus menggunakan sensor ZMPT101B dan ACS, dilengkapi LCD I²C serta alarm batas arus.",
      technologies: ["Arduino", "ZMPT101B", "ACS712", "LCD I²C"],
      url: ""
    },
    {
      title: "Sky Hopper Console Game",
      description: "Game konsol C++ dengan mekanisme skor, tingkat kesulitan, nyawa, riwayat permainan, penyimpanan file, dan tampilan anti-flicker.",
      technologies: ["C++", "File I/O", "Game Loop", "Windows Console"],
      url: ""
    }
  ]
};
