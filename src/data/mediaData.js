/**
 * Central media configuration.
 *
 * Every image/video slot the About and Contact pages use is listed here.
 *
 * Slots currently point at Lorem Picsum (picsum.photos) — a placeholder-
 * photo service. These are real photographs, but they are NOT photos of
 * Praksha Academy, its students, or its staff, and every <img> using them
 * has honest, generic alt text (never a claim like "Praksha Academy
 * students"). They exist so the page has real visual weight instead of
 * empty boxes while actual photography is gathered. Components that
 * consume this file render a clean placeholder (via <ImagePlaceholder />)
 * whenever a slot is set to null, so the page never breaks.
 *
 * To add a real asset: drop the file in your project's asset pipeline
 * (e.g. src/assets/ or public/) and point the relevant key below at it —
 * no component code needs to change. The `seed` in each Picsum URL keeps
 * the same placeholder image stable across reloads.
 */

const mediaData = {
  // Hero — large editorial image + small secondary image.
  aboutHero: {
    mainImage: "https://picsum.photos/seed/praksha-about-hero/900/1100",
    mainImageAlt: "Students in a classroom", // update to match the real photo
    secondaryImage: null, // e.g. "/assets/about/hero-secondary.jpg"
  },

  // "Who We Are" editorial section image.
  whoWeAre: {
    image: "https://picsum.photos/seed/praksha-whoweare/800/1000",
    imageAlt: "Students studying together",
  },

  // "Learning Environment" cards — one image per card, in the same order
  // as aboutData.learningEnvironment.
  learningEnvironment: [], // e.g. [{ key: "live-classes", image: "/assets/about/live-classes.jpg" }]

  // Faculty photos are attached per-person inside aboutData.faculty
  // (each entry's own `photo` field) rather than here.

  // About page "Watch the story" section.
  storyVideo: {
    videoUrl: null, // e.g. "https://www.youtube.com/embed/REAL_VIDEO_ID"
    posterImage: null, // thumbnail shown before play
  },

  // Contact hero illustration/photo.
  contactHero: {
    image: "https://picsum.photos/seed/praksha-contact-hero/800/700",
    imageAlt: "Student attending an online class from home",
  },

  // "Learn From Wherever You Are" illustration (OnlineSupport section).
  onlineLearning: {
    image: "https://picsum.photos/seed/praksha-online-learning/700/560",
    imageAlt: "Student learning on a laptop",
  },

  // Contact page closing CTA background.
  contactCTA: {
    image: "https://picsum.photos/seed/praksha-contact-cta/1600/700",
  },
};

export default mediaData;
