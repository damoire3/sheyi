/* ==========================================================================
   CONFIGURATION — « LE DÉCRET ROYAL DE SHEYI »
   Princesse et agent secret. Tout ce que tu veux modifier est ici.
   ========================================================================== */
export const BIRTHDAY_CONFIG = {

  // Prénom de la fête
  name: "Sheyi",

  // Âge fêté
  age: "1",

  // Date et heure cibles du compte à rebours.
  // Format : "AAAA-MM-JJTHH:MM:SS+01:00"  (+01:00 = heure du Bénin)
  targetDate: "2026-12-31T15:00:00+01:00",

  // Écran d'introduction : le décret royal scellé
  intro: {
    question: "Décret royal : une mission secrète vous attend. 👑",
    cta: "Brisez le sceau pour lire le décret"
  },

  // Hero
  hero: {
    title: "SHEYI",
    subtitle: "Princesse et agent secrète, elle a 1 an !",
    text: "Sa Majesté fête sa première année et a besoin de vous. Mission : la fêter comme il se doit."
  },

  // Bandeau défilant sous le hero
  marquee: [
    "Décret n°1",
    "Altesse : 1 an",
    "Mission royale",
    "Couronnement imminent",
    "Sujets requis : tous",
    "Gâteau royal"
  ],

  // Informations de la mission
  event: {
    date: "Date à définir",
    time: "15h00",
    location: "Lieu à définir",
    address: "Adresse à définir",
    mapUrl: "" // ex. "https://maps.google.com/?q=..." — vide = bouton masqué
  },

  // Fiche de la princesse agent
  agent: {
    name: "Sheyi",
    codename: "Étoile de la cour",
    age: "1 an",
    specialty: "Faire fondre les cœurs d'un seul sourire",
    power: "Transformer n'importe quelle pièce en palais",
    photo: "/assets/photos/photo1.jpg" // photo de Sheyi (public/assets/photos/)
  },

  // Évaluation de la princesse (barres animées, de 0 à 100)
  agentStats: [
    { label: "Charme royal", value: 100 },
    { label: "Gentillesse", value: 100 },
    { label: "Amour du gâteau", value: 100 },
    { label: "Malice douce", value: 85 },
    { label: "Excitation", value: 100 }
  ],

  // Une année en mots (nuage de mots)
  words: [
    "Sourire", "Rires", "Câlins", "Amour", "Premiers pas",
    "Gourmandise", "Couronne", "Bisous", "Lumière", "Joie"
  ],

  // Briefing du couronnement
  about: {
    title: "Briefing du couronnement",
    lead: "Une première année, c'est un règne qui commence. On le fête entourés de la cour la plus fidèle du royaume.",
    text: "Chaque sujet doit pouvoir rire, manger, danser et repartir avec un souvenir royal.",
    bullets: [
      "Un protocole royal, mais sans raideur",
      "Un palais lavande, blanc et doré",
      "Un banquet digne d'une princesse"
    ]
  },

  // Vidéo (section dédiée)
  // - Fichier local : public/assets/video/mon-film.mp4 puis src: "/assets/video/mon-film.mp4"
  // - OU un lien YouTube/Vimeo : embedUrl: "https://www.youtube.com/embed/XXXXXXX"
  video: {
    title: "🎬 Les archives du royaume",
    caption: "Quelques séquences à revoir après le couronnement.",
    src: "/assets/video/video-sheyi.mp4",
    embedUrl: "",
    poster: ""
  },

  // Section « Une journée spéciale »
  story: {
    title: "Une année de règne... la toute première fois.",
    text: "Ce premier anniversaire ne se répète qu'une fois. Viens y prendre part : une fête pleine de douceur, de rires et de souvenirs.",
    image: "/assets/photos/photo2.jpg" // photo principale (public/assets/photos/)
  },

  // Protocole de la journée (programme)
  programme: {
    title: "🕐 Protocole de la journée",
    intro: "Chaque étape est un acte du couronnement. Suivez le protocole, sujets.",
    items: [
      { time: "15:00", title: "ACTE I · Arrivée des sujets", text: "Accueil de la cour, on se salue autour d'un petit verre." },
      { time: "15:30", title: "ACTE II · La parade photo", text: "Un décor lavande et doré pour les premiers portraits royaux." },
      { time: "16:00", title: "ACTE III · Jeux de cour", text: "Des jeux pour les petits comme pour les grands, à la gloire de Sheyi." },
      { time: "16:45", title: "ACTE IV · Le gâteau royal", text: "Le moment le plus attendu : le chant et la première bougie." },
      { time: "17:15", title: "ACTE V · Le banquet", text: "Un buffet sucré et salé digne d'un palais, pour toute la cour." },
      { time: "18:00", title: "ACTE VI · Les archives", text: "On revoit ensemble les plus beaux moments de la première année." },
      { time: "18:30", title: "ACTE FINAL · La révérence", text: "Chaque sujet repart avec un petit présent du royaume." }
    ]
  },

  // Énigme royale (saisie libre)
  riddle: {
    title: "🧩 L'énigme royale",
    intro: "Pour lever le sceau du royaume, résolvez cette énigme.",
    question: "Je suis le plus doux des décrets : on me coupe en parts, on souffle une bougie sur moi, et tout le monde en veut une. Qui suis-je ?",
    answers: ["gateau", "gâteau"],   // réponses acceptées (accents et majuscules ignorés)
    hint: "Indice : on me sert à la fin du banquet, et je porte souvent un chiffre en bougie.",
    wrong: "Ce n'est pas la bonne réponse, Altesse. Réessayez !",
    success: "Énigme résolue 👑 Le sceau est brisé",
    reward: "Secret du royaume : le gâteau est déjà commandé 🎂"
  },

  // Proclamations de la cour (citations)
  quotes: {
    title: "📜 Proclamations de la cour",
    items: [
      "« Sa Majesté exige beaucoup de gâteau. »",
      "« Hmmm... cette fête mérite un tapis doré. »",
      "« Qu'on prépare le palais. Et le gâteau. »",
      "« Beaucoup, beaucoup de gâteau. »"
    ]
  },

  // Le banquet (cartes avec illustration)
  menu: {
    title: "🍰 Banquet royal",
    intro: "Des douceurs dignes d'un palais, pour toute la cour.",
    items: [
      { image: "/assets/photos/photo4.jpg", title: "Gâteau du couronnement", text: "Le grand gâteau de la première année, paré de dorures." },
      { image: "/assets/photos/photo5.jpg", title: "Bouchées de la cour", text: "Cacahuètes et petites bouchées salées pour tenir la mission." },
      { image: "/assets/photos/photo6.jpg", title: "Douceurs du palais", text: "Biscuits, cupcakes et petites surprises sucrées." },
      { image: "/assets/photos/photo7.jpg", title: "Breuvages dorés", text: "Jus, eau et boissons sans alcool pour trinquer à la princesse." }
    ]
  },

  // Divertissements de cour (cartes avec illustration)
  activities: {
    title: "🧸 Divertissements de cour",
    intro: "De quoi s'amuser à tout âge.",
    items: [
      { image: "/assets/photos/photo8.jpg", title: "Coin des petits princes", text: "Un espace calme avec jouets doux et coussins pour les plus jeunes." },
      { image: "/assets/photos/photo9.jpg", title: "Chasse aux trésors", text: "Des indices cachés dans la maison : qui trouvera le trésor en premier ?" },
      { image: "/assets/photos/photo10.jpg", title: "Jeux de société", text: "Des jeux simples que chacun peut rejoindre, sans règles compliquées." },
      { image: "/assets/photos/photo11.jpg", title: "Photo royale", text: "Couronnes, accessoires et décor doré pour des portraits dignes du royaume." }
    ]
  },

  // Tenue de cour
  dresscode: {
    title: "👗 Tenue de cour",
    text: "Venez en lavande, en blanc ou en or : tout le royaume doit briller, sans obligation.",
    colors: [
      { name: "Lavande", hex: "#B49BE3" },
      { name: "Blanc", hex: "#FFFFFF" },
      { name: "Or", hex: "#C9A227" },
      { name: "Violet royal", hex: "#5B3F94" },
      { name: "Champagne", hex: "#F7EDCB" }
    ]
  },

  // Points forts (3 cartes)
  features: [
    { icon: "palette", title: "Décor de palais", text: "Des couleurs et des détails dignes d'une princesse." },
    { icon: "compass", title: "Protocole clair", text: "Un programme simple, avec les horaires à portée de main." },
    { icon: "smile", title: "Cour chaleureuse", text: "Une fête où chacun se sent accueilli, petits et grands." }
  ],

  // Archives (galerie)
  photos: [
    { src: "/assets/photos/photo13.jpg", caption: "Souvenir n°13" },
    { src: "/assets/photos/photo14.jpg", caption: "Souvenir n°14" },
    { src: "/assets/photos/photo15.jpg", caption: "Souvenir n°15" },
    { src: "/assets/photos/photo16.jpg", caption: "Souvenir n°16" },
    { src: "/assets/photos/photo17.jpg", caption: "Souvenir n°17" },
    { src: "/assets/photos/photo18.jpg", caption: "Souvenir n°18" }
  ],

  // Moments (bande de trois photos, entre l'histoire et le compte à rebours)
  moments: {
    title: "🌟 Trois moments à garder",
    items: [
      { src: "/assets/photos/photo19.jpg", caption: "Moment n°1" },
      { src: "/assets/photos/photo20.jpg", caption: "Moment n°2" },
      { src: "/assets/photos/photo21.jpg", caption: "Moment n°3" }
    ]
  },

  // Récompenses : à chaque énigme ou jeu gagné, une de ces phrases est tirée au hasard
  // (une part de gâteau, des mots doux, des compliments, des souhaits de la princesse)
  rewards: [
    "Vous avez gagné une part de gâteau 🎂",
    "Un mot doux : vous êtes le plus beau sourire de la cour 💜",
    "Compliment royal : votre élégance illumine tout le palais ✨",
    "Un souhait de la princesse : que votre année soit pleine de câlins 🤍",
    "Vous avez gagné un bisou du royaume 😘",
    "Un secret chuchoté : vous êtes l'invité préféré de Sheyi 💛",
    "Une couronne virtuelle pour vous, sujet fidèle 👑",
    "Mot doux : votre présence rend cette fête magique 🌙",
    "Vous méritez deux parts de gâteau, pas une ! 🎂🎂",
    "Compliment : quel talent pour résoudre les mystères !",
    "Souhait de la princesse : que la vie vous offre autant de joie que son sourire 🤍",
    "Vous êtes officiellement de la cour : bienvenue, cher sujet ✨",
    "Une pensée douce pour vous : merci d'être là 💜",
    "Vous avez gagné un câlin de la princesse 🤗"
  ],

  // Verrou : le décret ne s'ouvre qu'après avoir résolu ce mystère (âge de la princesse)
  gate: {
    question: "Pour lire le décret, résolvez ce mystère : quel âge a la princesse ?",
    hint: "Indice : elle vient de fêter sa toute première bougie.",
    answers: ["1", "un", "1an"],   // réponses acceptées (accents et majuscules ignorés)
    wrong: "Ce n'est pas le bon âge, Altesse. Réessayez !",
    success: "Verrou ouvert 👑"
  },

  // Puzzle royal : une photo découpée en 9 morceaux, à remettre dans l'ordre
  puzzle: {
    title: "🧩 Le puzzle royal",
    intro: "Remettez la photo dans l'ordre. Un seul morceau bouge à la fois, en le faisant glisser vers la case vide.",
    image: "/assets/photos/photo22.jpg",
    win: "Puzzle terminé ! La princesse vous remercie. 👑"
  },

  // Jeux de la cour
  games: {
    catch: {
      target: 10,       // couronnes à attraper pour gagner
      duration: 20,     // secondes
      win: "👑 Le royaume est conquis ! Bravo, Altesse.",
      lose: "Temps écoulé : {score} couronne(s). Encore un essai, sujet !"
    },
    memory: {
      win: "🧠 Mémoire royale parfaite ! Le trésor est à vous."
    },
    safe: {
      code: "111",       // code à 3 chiffres (0 à 9 pour chaque molette)
      clue: "Indice : le nombre d'années de la princesse, répété trois fois.",
      win: "Le coffre s'ouvre... Dedans : un bon de gâteau royal 🎂",
      fail: "Le coffre reste verrouillé. Essayez encore, sujet."
    },
    gifts: {
      intro: "Choisissez un coffret. Chacun cache un présent royal.",
      prizes: [
        "Un câlin de la princesse 🤍",
        "Une pensée pour ta fête ✨",
        "Un bisou du royaume 💜",
        "Une part de gâteau réservée 🎂",
        "Un souvenir photo en or 📸",
        "Le droit de crier « Vive la princesse ! » 👑"
      ]
    }
  },

  // Présents royaux
  gifts: {
    title: "🎁 Présents royaux",
    text: "Votre présence est le plus beau des présents. Si vous souhaitez honorer la princesse, un petit mot suffit."
  },

  // La cour (bandeau)
  partners: ["Famille", "Amis", "Voisins", "Cour de Sheyi"],

  // Musique d'ambiance : mélodie originale créée pour ce site (libre de droits).
  music: {
    src: "/assets/music/ambiance.wav",
    volume: 0.5
  },

  // Formulaire de réponse au décret
  form: {
    title: "👑 Répondre au décret royal",
    text: "Cher sujet, confirmez-vous votre présence au couronnement ?",
    // Pour recevoir les réponses : crée un formulaire gratuit sur https://formspree.io
    // et colle ici son URL (ex. "https://formspree.io/f/xxxxxxxx").
    endpoint: ""
  },

  // Titres des sections
  sectionTitles: {
    words: "💜 Le royaume en mots",
    features: "✨ Pourquoi ce couronnement compte",
    photos: "📸 Archives du royaume",
    partners: "🤝 La cour"
  },

  footer: "Le couronnement est accompli. Merci, sujet fidèle."
};
