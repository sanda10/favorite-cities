 favorite-cities

 Favorite Cities este o aplicație web creată cu Next.js și Chakra UI, care permite utilizatorilor să exploreze orașe din întreaga lume, să le salveze în lista de favorite, să adauge recenzii și să partajeze destinațiile preferate.



 ✨ Funcționalități principale

- 🔎 Căutare orașe în timp real prin API Open Meteo
- 💾 Salvarea orașelor în lista de favorite
- 📍 Detectarea automată a locației utilizatorului (Geolocation API)
- 📝 Adăugare recenzii și evaluări pentru fiecare oraș
- 📤 Partajare destinații pe rețelele sociale (Facebook, Twitter, WhatsApp)
- 💡 Istoric al căutărilor
- 🔐 Autentificare cu NextAuth.js


  🛠️ Tehnologii folosite

- [Next.js](https://nextjs.org/) — Framework React pentru SSR/SSG
- [Chakra UI](https://chakra-ui.com/) — Component library pentru design responsiv
- [NextAuth.js](https://next-auth.js.org/) — Autentificare și sesiuni
- [Open Meteo API](https://open-meteo.com/) — Geolocalizare și căutare orașe
- [react-share](https://github.com/nygardk/react-share) — Butoane de partajare socială



## 🚀 Cum rulezi aplicația local

1. Clonează proiectul:


   git clone https://github.com/sanda10/favorite-cities.git
   cd favorite-cities

2. Instalează dependințele:

npm install

3.Creează un fișier .env.local și adaugă variabilele pentru NextAuth:

env
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

4.Rulează serverul de development:
npm run dev

Structura proiectului

favorite-cities/
├── src/
│   ├── components/        # Componente UI (CityCard, NavBar etc.)
│   ├── entity/            # Entități (ex: Review.js)
│   ├── pages/             # Pagini Next.js
│   │   ├── cities/        # Pagini dinamice pentru fiecare oraș
│   │   └── api/           # API routes (favorite, reviews)
├── data-source.js         # Configurație baza de date
├── README.md

 Licență
Acest proiect este distribuit sub licența MIT.

Proiect realizat în cadrul programului de formare Generația Tech.



   
