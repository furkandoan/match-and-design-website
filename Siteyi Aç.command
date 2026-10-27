#!/bin/zsh
cd -- "${0:A:h}" || exit 1
if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  print 'Node.js ve npm bulunamadı. README dosyasındaki kurulum notunu okuyun.'
  read -r '?Kapatmak için Enter tuşuna basın.'
  exit 1
fi
if [[ ! -d node_modules ]]; then
  print 'Önce bu klasörde npm ci komutuyla bağımlılıkları yükleyin.'
  read -r '?Kapatmak için Enter tuşuna basın.'
  exit 1
fi
print 'Match & Design yerel web sitesi başlıyor.'
print 'Tarayıcı adresi: http://localhost:4322 (kesin adres aşağıdaki sunucu çıktısındadır)'
print 'Durdurmak için proje klasöründe npx astro dev stop komutunu kullanın.'
npm run dev
