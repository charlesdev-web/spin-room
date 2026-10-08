// SPIN ROOM — catalogue des disques (artistes, albums et prix fictifs)
// Source unique utilisée par l'accueil (index.html) et le catalogue (catalogue.html).
//
// Champs : id (= nom de l'image dans pochettes/), artiste, titre, genre, annee,
// etat ("neuf" ou "occasion"), note (état d'un disque d'occasion : NM, VG+, VG, G+),
// prix (en euros), couleur (facultatif : vinyle coloré), selection (facultatif :
// position dans « La sélection du moment »), ajout (plus grand = arrivé plus récemment).
//
// Pour ajouter un disque : une ligne ici + l'image pochettes/<id>.jpg

const DISQUES = [
  {"id": "kid-lazarus-eastside-psalms", "artiste": "Kid Lazarus", "titre": "Eastside Psalms", "genre": "Rap", "annee": 2019, "etat": "neuf", "prix": 27.9, "selection": 3, "ajout": 30},
  {"id": "riviera-tapes-coastline-disco", "artiste": "Riviera Tapes", "titre": "Coastline Disco", "genre": "French Touch", "annee": 2021, "etat": "neuf", "prix": 29.9, "couleur": "#f2a2b6", "selection": 2, "ajout": 29},
  {"id": "kasia-wren-frequencies", "artiste": "Kasia Wren", "titre": "Frequencies", "genre": "Électro", "annee": 2016, "etat": "occasion", "note": "NM", "prix": 22.9, "ajout": 28},
  {"id": "the-lighthouse-kids-static-weather", "artiste": "The Lighthouse Kids", "titre": "Static Weather", "genre": "Rock", "annee": 2018, "etat": "neuf", "prix": 26.9, "couleur": "#f0d23a", "ajout": 27},
  {"id": "ezra-cole-quintet-blue-hour-sessions", "artiste": "Ezra Cole Quintet", "titre": "Blue Hour Sessions", "genre": "Jazz", "annee": 1961, "etat": "occasion", "note": "VG+", "prix": 32.9, "couleur": "#2c5aa0", "selection": 1, "ajout": 26},
  {"id": "grace-holloway-sugar-and-static", "artiste": "Grace Holloway", "titre": "Sugar & Static", "genre": "Soul", "annee": 2023, "etat": "neuf", "prix": 34.9, "couleur": "#e9662b", "selection": 5, "ajout": 25},
  {"id": "lion-harbour-salt-water-roots", "artiste": "Lion Harbour", "titre": "Salt Water Roots", "genre": "Reggae", "annee": 1979, "etat": "occasion", "note": "VG", "prix": 18.9, "ajout": 24},
  {"id": "lena-moss-paper-moons", "artiste": "Lena Moss", "titre": "Paper Moons", "genre": "Folk", "annee": 2022, "etat": "neuf", "prix": 24.9, "ajout": 23},
  {"id": "marlowe-grant-gold-teeth-sunday", "artiste": "Marlowe Grant", "titre": "Gold Teeth Sunday", "genre": "Rap", "annee": 2020, "etat": "neuf", "prix": 31.9, "couleur": "#c9a227", "ajout": 22},
  {"id": "paloma-disco-club-neon-boulevard", "artiste": "Paloma Disco Club", "titre": "Neon Boulevard", "genre": "French Touch", "annee": 2007, "etat": "occasion", "note": "VG+", "prix": 21.9, "ajout": 21},
  {"id": "atlas-kid-satellite-love", "artiste": "Atlas Kid", "titre": "Satellite Love", "genre": "Électro", "annee": 2012, "etat": "occasion", "note": "VG", "prix": 19.9, "selection": 6, "ajout": 20},
  {"id": "harlow-street-granite-hearts", "artiste": "Harlow Street", "titre": "Granite Hearts", "genre": "Rock", "annee": 2004, "etat": "occasion", "note": "NM", "prix": 24.9, "selection": 4, "ajout": 19},
  {"id": "odette-vance-late-tide", "artiste": "Odette Vance", "titre": "Late Tide", "genre": "Jazz", "annee": 1958, "etat": "occasion", "note": "VG+", "prix": 28.9, "ajout": 18},
  {"id": "the-sunday-gospel-machine-brighter-days", "artiste": "The Sunday Gospel Machine", "titre": "Brighter Days", "genre": "Soul", "annee": 1974, "etat": "occasion", "note": "VG", "prix": 23.9, "ajout": 17},
  {"id": "velvet-stairwell-concrete-lullabies", "artiste": "Velvet Stairwell", "titre": "Concrete Lullabies", "genre": "Rap", "annee": 2017, "etat": "neuf", "prix": 26.9, "ajout": 16},
  {"id": "tomo-arden-synthetic-light", "artiste": "Tomo Arden", "titre": "Synthetic Light", "genre": "Électro", "annee": 2024, "etat": "neuf", "prix": 28.9, "ajout": 95},
  {"id": "the-honey-engines-velvet-fuzz", "artiste": "The Honey Engines", "titre": "Velvet Fuzz", "genre": "Rock", "annee": 1998, "etat": "occasion", "note": "G+", "prix": 14.9, "ajout": 14},
  {"id": "hollis-brandt-trio-smoke-and-brass", "artiste": "Hollis Brandt Trio", "titre": "Smoke & Brass", "genre": "Jazz", "annee": 1963, "etat": "occasion", "note": "NM", "prix": 35.9, "ajout": 13},
  {"id": "billie-hart-last-dance-in-july", "artiste": "Billie Hart", "titre": "Last Dance in July", "genre": "Soul", "annee": 2025, "etat": "neuf", "prix": 33.9, "couleur": "#7a2e5a", "ajout": 97},
  {"id": "duke-morrow-overtime", "artiste": "Duke Morrow", "titre": "Overtime", "genre": "Rap", "annee": 2009, "etat": "occasion", "note": "VG+", "prix": 20.9, "ajout": 11},
  {"id": "silas-grey-monochrome-summer", "artiste": "Silas Grey", "titre": "Monochrome Summer", "genre": "Électro", "annee": 2023, "etat": "neuf", "prix": 27.9, "ajout": 10},
  {"id": "northern-cassettes-wires-and-weather", "artiste": "Northern Cassettes", "titre": "Wires & Weather", "genre": "Rock", "annee": 2006, "etat": "occasion", "note": "VG", "prix": 17.9, "ajout": 9},
  {"id": "dexter-bloom-quartet-after-hours-club", "artiste": "Dexter Bloom Quartet", "titre": "After Hours Club", "genre": "Jazz", "annee": 2024, "etat": "neuf", "prix": 36.9, "ajout": 96},
  {"id": "ruby-okafor-golden-frequency", "artiste": "Ruby Okafor", "titre": "Golden Frequency", "genre": "Soul", "annee": 2022, "etat": "neuf", "prix": 29.9, "ajout": 7},
  {"id": "moreno-kane-fog-and-concrete", "artiste": "Moreno Kane", "titre": "Fog & Concrete", "genre": "Rap", "annee": 2015, "etat": "occasion", "note": "NM", "prix": 25.9, "ajout": 6},
  {"id": "koji-amano-tokyo-rain-loops", "artiste": "Koji Amano", "titre": "Tokyo Rain Loops", "genre": "Électro", "annee": 2025, "etat": "neuf", "prix": 24.9, "ajout": 98},
  {"id": "the-midnight-couriers-long-way-home", "artiste": "The Midnight Couriers", "titre": "Long Way Home", "genre": "Rock", "annee": 2021, "etat": "neuf", "prix": 27.9, "ajout": 4},
  {"id": "jaylen-oakes-late-checkout", "artiste": "Jaylen Oakes", "titre": "Late Checkout", "genre": "Rap", "annee": 2026, "etat": "neuf", "prix": 28.9, "ajout": 99},
  {"id": "the-wilder-hotel-room-404", "artiste": "The Wilder Hotel", "titre": "Room 404", "genre": "Rock", "annee": 2011, "etat": "occasion", "note": "VG+", "prix": 22.9, "ajout": 2},
  {"id": "cash-monroe-southside-gospel", "artiste": "Cash Monroe", "titre": "Southside Gospel", "genre": "Rap", "annee": 2026, "etat": "neuf", "prix": 30.9, "couleur": "#2f6b4f", "ajout": 100}
];

// Petites aides partagées
const prixTexte = p => p.toFixed(2).replace(".", ",") + " €";
const pochette = d => "pochettes/" + d.id + ".jpg";
