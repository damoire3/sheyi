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
  targetDate: "2026-10-31T16:00:00+01:00",

  // Écran d'introduction : le décret royal scellé
  intro: {
    question: "Décret royal : une mission secrète vous attend. 👑",
    cta: "Brisez le sceau pour lire le décret"
  },

  // Hero
  hero: {
    title: "LAMAS SHEYI",
    subtitle: "a 1 an !",
    text: `La princesse fête sa première année et a besoin de vous. 
Chaque sujet est convoqué pour le couronnement.
Venez avec votre sourire, votre bonne humeur et votre appétit pour le gâteau royal.`
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
  date: "06/11/2026",
  time: "16h00",
  location: "Abomey-Calavi, Bénin",
  address: "Djadjo Von, près du poulailler, non loin du bar Chez Arès",
  mapUrl: "https://maps.app.goo.gl/U16m1VsmZBRx2yqD6?g_st=aw",
},

  // Fiche de la princesse agent
  agent: {
    name: "LAMAS Sheyi Svetlana Anadelia",
    codename: "Princesse de la cour",
    age: "1 an",
    specialty: "Faire fondre les cœurs d'un seul sourire",
    power: `Transformer n'importe quelle pièce en palais (Casse tout "🤭")`,
    photo: "/assets/photos/princesse1.jpeg" // photo de Sheyi (public/assets/photos/)
  },

  // Évaluation de la princesse (barres animées, de 0 à 100)
  agentStats: [
    { label: "Charme royal", value: 100 },
    { label: "Gentillesse", value: 100 },
    { label: "Amour du gâteau", value: 90 },
    { label: "Douce", value: 75 },
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
      "Un palais lavande, blanc et rosé",
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
    image: "/assets/photos/princesse5.jpeg" // photo principale (public/assets/photos/)
  },

  // Programme de la journée (programme)
  programme: {
    title: "🕐 Prohgramme de la journée",
    intro: "Chaque étape est un acte du couronnement. Suivez le protocole, sujets.",
    items: [
      { title: "ACTE I · Arrivée des sujets", text: "Accueil de la cour, on se salue autour d'un petit verre." },
      { title: "ACTE II · La parade photo", text: "Un décor lavande et doré pour les premiers portraits royaux." },
      { title: "ACTE III · Le banquet", text: "Un buffet sucré et salé digne d'un palais, pour toute la cour." },
      { title: "ACTE IV · Jeux de cour", text: "Des jeux pour les petits comme pour les grands, à la gloire de Sheyi." },
      { title: "ACTE V · Le gâteau royal", text: "Le moment le plus attendu : le chant et la première bougie." },
      { title: "ACTE VI · L'ambiance Royal", text: "On revoit ensemble les plus beaux moments de la première année." },
      { title: "ACTE FINAL · La révérence", text: "Chaque sujet repart avec un petit présent du royaume." }
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


  // Tenue de cour
  dresscode: {
    title: "Dress Code",
    text: "Venez en tenue de couleur blanche ou beige ou lavande ou rose : tout le royaume doit briller, sans obligation.",
    colors: [
      { name: "Lavande", hex: "#B49BE3" },
      { name: "Blanc", hex: "#FFFFFF" },
      { name: "Or", hex: "#C9A227" },
      { name: "Violet royal", hex: "#5B3F94" },
      { name: "Beige", hex: "#f9eab8" }
    ]
  },


  // Archives (galerie)
  photos: [
    { src: "/assets/photos/princesse1.jpeg", caption: "Souvenir n°13" },
    { src: "/assets/photos/princesse2.jpeg", caption: "Souvenir n°14" },
    { src: "/assets/photos/princesse3.jpeg", caption: "Souvenir n°15" },
    { src: "/assets/photos/princesse4.jpeg", caption: "Souvenir n°16" },
    { src: "/assets/photos/princesse5.jpeg", caption: "Souvenir n°17" },
    { src: "/assets/photos/princesse6.jpeg", caption: "Souvenir n°18" }
  ],

  // Moments (bande de trois photos, entre l'histoire et le compte à rebours)
  moments: {
    title: "🌟 Trois moments à garder",
    items: [
      { src: "/assets/photos/princesse1.jpeg", caption: "Moment n°1" },
      { src: "/assets/photos/princesse3.jpeg", caption: "Moment n°2" },
      { src: "/assets/photos/princesse5.jpeg", caption: "Moment n°3" }
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
    image: "/assets/photos/princesse5.jpeg",
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
    endpoint: "https://formspree.io/f/mljgbqdz"
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
