/**
 * Real photography used across About & Contact, replacing the earlier
 * SVG people-illustrations per the "use real images, not icons/illustration
 * graphics" direction.
 *
 * Source: Unsplash (unsplash.com), hotlinked via their CDN — permitted
 * for this kind of use under the Unsplash License (free to use, no
 * permission needed), which is why this is the practical choice for a
 * project without its own photo library yet.
 *
 * IMPORTANT — read before shipping to production:
 * I can't load a browser in this environment to confirm every URL below
 * renders correctly on your end, so <PhotoImage> (see
 * components/common/PhotoImage.jsx) has a built-in fallback: if a URL
 * ever fails to load, it swaps to a plain soft gradient panel instead of
 * a broken-image icon — the page never looks broken either way.
 *
 * For a final production launch, the most reliable option is to replace
 * these with Praksha Academy's own photography (real classrooms, real
 * students, with consent) — swap the URL string here and nothing else
 * needs to change.
 */

const photos = {
  aboutHero: {
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
    alt: "Student studying with a laptop and notebook",
  },
  contactHero: {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    alt: "Student on a laptop video call, getting support",
  },
  whoWeAre: {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    alt: "Students collaborating together over a laptop",
  },
  learningApproach: {
    src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=900&q=80",
    alt: "Small group of students studying together with a laptop",
  },
  onlineLearning: {
    src: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&w=900&q=80",
    alt: "Student attending an online class on a laptop",
  },
};

export default photos;
