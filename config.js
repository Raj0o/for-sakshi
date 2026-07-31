/* ============================================================
   CONFIG — this is the ONLY file you should need to edit.
   Replace image filenames with your real photos in
   assets/images/ (keep the same filenames, or update the
   paths below), drop a song into assets/music/, and paste
   your Formspree endpoint URL where marked.
   ============================================================ */

const CONFIG = {
  herName: "Sakshi",
  yourName: "Vishwas",

  // Paste your Formspree form endpoint here, e.g.
  // "https://formspree.io/f/abcdwxyz"
  formspreeEndpoint: "https://formspree.io/f/mykrabgr",

  // Background music — drop an mp3 at this path
  musicSrc: "assets/music/song.mp3",

  // ---- Scene 2: Hero — two solo photos merging into one ----
  hero: {
    photoYou: "assets/images/hero-you.jpg",
    photoHer: "assets/images/hero-her.jpg",
    photoMerged: "assets/images/hero-merged.jpg",
    caption: "I liked you from the very first look."
  },

  // ---- Scene 3: Polaroids (3 candid photos of her) ----
  polaroids: [
    { src: "assets/images/polaroid-1.jpg", caption: "Class notes I never actually took" },
    { src: "assets/images/polaroid-2.jpg", caption: "KK Cafe, our unofficial second home" },
    { src: "assets/images/polaroid-3.jpg", caption: "That laugh I still think about" }
  ],

  // ---- Scene 5: Then vs Now ----
  thenNow: {
    then: { src: "assets/images/then.jpg", caption: "Then: still figuring out how to talk to you" },
    now: { src: "assets/images/now.jpg", caption: "Now: still don't shut up when I'm around you" }
  },

  // ---- Scene 7: Masonry collage (4 candid photos) ----
  collage: [
    { src: "assets/images/collage-1.jpg", caption: "" },
    { src: "assets/images/collage-2.jpg", caption: "" },
    { src: "assets/images/collage-3.jpg", caption: "" },
    { src: "assets/images/collage-4.jpg", caption: "" }
  ],

  // ---- Scene 9: The Letter ----
  letter: `Sakshi,

I still remember the first time I saw you — no thunder, no violins, just me, quietly deciding I was doomed. It took me embarrassingly little time to start liking you, and even less time to start finding excuses to walk the same way you did after class.

Somewhere between lectures we didn't pay attention in and way too many trips to KK Cafe, "us" just... happened. No grand declaration, no dramatic moment — just two people who kept ending up at the same table.

You talk. A lot. I mostly nod, laugh at the right places, and occasionally get away with pretending I was listening the whole time (I was, mostly). Somehow your non-stop stories are still my favorite background noise.

I, on the other hand, apparently exist to annoy you with terrible impressions and jokes only I find funny — and you exist to call me Kallua every time I do it, like that's supposed to stop me. It won't. Consider this an early warning.

So here's the truth, wrapped in all my usual nonsense: you make ordinary days feel worth remembering. Thank you for putting up with my mimicry, laughing anyway, and still choosing to stick around.

Happy Girlfriend's Day. Here's to more classes we don't remember, more cafe bills we split badly, and a lot more me being annoying.

Yours (embarrassingly, always),
Vishwas`,

  // ---- Easter eggs ----
  longPressMessage: "hehe ❤️",
  hiddenDoubleClickMessage: "P.S. — yes, I'm doing the voice again tonight. You've been warned. 😄❤️",

  // ---- Ending sequence lines ----
  endingLines: [
    "Thank you for being part of my life.",
    "Happy Sakshi's Day ❤️",
    "My favorite place will always be wherever you are."
  ]
};
