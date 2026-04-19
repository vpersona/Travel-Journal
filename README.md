# ✈️ Travel Journal (PWA)

Mobilna aplikacja do dokumentowania swoich podróży z wykorzystaniem zdjęć i geolokalizacji GPS.

##  Zrzut ekranu aplikacji



---

##  Opis aplikacji

**Travel Journal** to Progressive Web Application (PWA) pozwalająca użytkownikom:

✅ **Robić zdjęcia** - Wykorzystanie kamery urządzenia  
✅ **Lokalizować się** - Automatyczne pobieranie współrzędnych GPS  
✅ **Wyświetlać na mapie** - Interaktywna mapa 
✅ **Udostępniać** - Web Share API do wysyłania zdjęć przez WhatsApp, Gmail, itp.  
✅ **Pracować offline** - Service Worker umożliwia działanie bez internetu  

### Technologie:

- **Frontend:** HTML5, CSS3, Bootstrap 4
- **JavaScript:** Vanilla JS 
- **Mapy:** Leaflet.js + OpenStreetMap
- **PWA:** Service Worker, manifest.json
- **Storage:** localStorage
- **APIs:** Geolocation API, Web Share API, Camera API

---

##  Jak uruchomić

### Opcja 1: GitHub Pages (online)
Aplikacja jest dostępna na: **https://vpersona.github.io/Travel-Journal/**

### Opcja 2: Lokalnie

1. **Sklonuj repozytorium:**
```bash
git clone https://github.com/vpersona/Travel-Journal.git
cd Travel-Journal
```

2. **Uruchom lokalny serwer:**
```
Zainstaluj rozszerzenie Live Server, kliknij prawym przyciskiem na index.html i naciśnij "Open with Live Server"
```

3. **Otwórz w przeglądarce:**

---

##  Instalacja na urządzeniu

### Android (Chrome/Edge):
1. Otwórz aplikację
2. Kliknij menu (⋯) -> "Zainstaluj aplikację"
3. Potwierdź instalację

### iOS (Safari):
1. Otwórz aplikację
2. Kliknij Share (strzałka) -> "Add to Home Screen"
3. Potwierdź dodanie

---

##  Struktura projektu

```
Travel-Journal/
├── index.html              
├── newpost.html           
├── map.html               
├── service-worker.js      
├── manifest.json          
├── styles/
│   ├── style.css
│   ├── map.css
│   └── newpost.css
├── scripts/
│   ├── main-script.js     
│   ├── map.js             
│   ├── newpost.js         
│   └── share.js          
├── images/
│   └── airplane.png      
|   └── plus.png    
└── README.md              
```

---

##  Dane zespołu

| Imię i Nazwisko | Nr Albumu | Grupa Dziekańska |
|-----------------|-----------|------------------|
| Anna Ścibiór | 233792 | ZIISN1-3611IO | 
| Karolina Burdzik | 233664 | ZIISN1-3611IO | 

