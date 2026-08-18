import { Box } from "@mui/material";
import { premium } from "../../theme/premiumPalette";

/**
 * Original, on-brand flat illustrations (not stock photography) used in
 * place of the Lorem Picsum placeholder photos. Every shape is drawn with
 * the mandatory company palette (blue/orange/green + neutrals), so these
 * never clash with the rest of the site and never need a licence.
 *
 * Swap any of these out for real photography later simply by passing a
 * `src` back into <ImagePlaceholder /> — nothing else needs to change.
 */

const frameSx = (aspectRatio, sx) => ({
  width: "100%",
  aspectRatio,
  borderRadius: "18px",
  border: `1px solid ${premium.glassBorder}`,
  background: `linear-gradient(160deg, ${premium.blue}0D 0%, ${premium.orange}0D 100%)`,
  overflow: "hidden",
  display: "block",
  ...sx,
});

/** Two students studying together at a desk with a laptop and books. */
export const WhoWeAreIllustration = ({ sx = {} }) => (
  <Box sx={frameSx("4/3.4", sx)}>
    <svg viewBox="0 0 400 340" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="wwaSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={premium.blue} stopOpacity="0.08" />
          <stop offset="100%" stopColor={premium.orange} stopOpacity="0.06" />
        </linearGradient>
      </defs>
      <rect width="400" height="340" fill="url(#wwaSky)" />
      <circle cx="335" cy="55" r="46" fill={premium.orange} opacity="0.12" />
      <circle cx="45" cy="280" r="60" fill={premium.blue} opacity="0.1" />

      {/* desk */}
      <rect x="40" y="240" width="320" height="16" rx="4" fill={premium.blue} opacity="0.16" />
      <rect x="60" y="256" width="14" height="60" fill={premium.blue} opacity="0.16" />
      <rect x="326" y="256" width="14" height="60" fill={premium.blue} opacity="0.16" />

      {/* laptop */}
      <rect x="150" y="190" width="100" height="66" rx="6" fill="#FFFFFF" stroke={premium.blue} strokeWidth="3" />
      <rect x="160" y="200" width="80" height="46" rx="2" fill={premium.blue} opacity="0.14" />
      <rect x="130" y="256" width="140" height="10" rx="4" fill={premium.blue} />

      {/* student 1 */}
      <circle cx="130" cy="150" r="26" fill="#FFE1B8" />
      <path d="M104 150a26 26 0 0 1 52 0" fill={premium.textPrimary} opacity="0.85" />
      <rect x="94" y="176" width="72" height="70" rx="20" fill={premium.orange} />

      {/* student 2 */}
      <circle cx="270" cy="150" r="26" fill="#F3C9A4" />
      <path d="M244 150a26 26 0 0 1 52 0" fill={premium.textPrimary} opacity="0.85" />
      <rect x="234" y="176" width="72" height="70" rx="20" fill={premium.blue} />

      {/* open book between them */}
      <path d="M180 214 L200 208 L220 214 L220 236 L200 230 L180 236 Z" fill="#FFFFFF" stroke={premium.orange} strokeWidth="2.5" />

      {/* floating accents */}
      <circle cx="60" cy="70" r="6" fill={premium.green} />
      <circle cx="90" cy="50" r="4" fill={premium.orange} />
      <circle cx="350" cy="160" r="5" fill={premium.blue} />
    </svg>
  </Box>
);

/** Student on a laptop in a video call, with connectivity accents. */
export const OnlineLearningIllustration = ({ sx = {} }) => (
  <Box sx={frameSx("4/3", sx)}>
    <svg viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="olBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={premium.blue} stopOpacity="0.08" />
          <stop offset="100%" stopColor={premium.green} stopOpacity="0.07" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#olBg)" />
      <circle cx="40" cy="40" r="50" fill={premium.blue} opacity="0.1" />
      <circle cx="360" cy="260" r="60" fill={premium.orange} opacity="0.1" />

      {/* laptop screen with video call */}
      <rect x="100" y="60" width="200" height="140" rx="10" fill="#FFFFFF" stroke={premium.blue} strokeWidth="3" />
      <rect x="112" y="72" width="176" height="98" rx="4" fill={premium.blue} opacity="0.08" />

      {/* mentor tile */}
      <circle cx="160" cy="118" r="26" fill="#FDE1C7" />
      <path d="M134 118a26 26 0 0 1 52 0" fill={premium.textPrimary} opacity="0.85" />

      {/* small call controls */}
      <circle cx="200" cy="182" r="9" fill={premium.green} />
      <circle cx="225" cy="182" r="9" fill={premium.orange} />
      <circle cx="175" cy="182" r="9" fill={premium.blue} />

      {/* laptop base */}
      <path d="M84 200 L316 200 L300 220 L100 220 Z" fill={premium.blue} opacity="0.16" />

      {/* wifi / connectivity accent */}
      <g opacity="0.55">
        <path d="M330 90a48 48 0 0 1 0 68" stroke={premium.green} strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M344 104a28 28 0 0 1 0 40" stroke={premium.green} strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>

      <circle cx="70" cy="240" r="6" fill={premium.orange} />
      <circle cx="60" cy="150" r="4" fill={premium.blue} />
      <circle cx="345" cy="60" r="5" fill={premium.green} />
    </svg>
  </Box>
);

/** Student learning at home with a laptop, notebook and a warm study lamp glow — used in the About hero. */
export const HeroIllustration = ({ sx = {} }) => (
  <Box sx={frameSx("4/4.4", sx)}>
    <svg viewBox="0 0 380 420" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="heroBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={premium.blue} stopOpacity="0.07" />
          <stop offset="100%" stopColor={premium.purple} stopOpacity="0.06" />
        </linearGradient>
      </defs>
      <rect width="380" height="420" fill="url(#heroBg)" />
      <circle cx="330" cy="60" r="52" fill={premium.orange} opacity="0.1" />
      <circle cx="40" cy="360" r="66" fill={premium.blue} opacity="0.09" />

      {/* desk */}
      <rect x="30" y="300" width="320" height="14" rx="4" fill={premium.blue} opacity="0.16" />
      <rect x="50" y="314" width="12" height="60" fill={premium.blue} opacity="0.16" />
      <rect x="318" y="314" width="12" height="60" fill={premium.blue} opacity="0.16" />

      {/* stacked books */}
      <rect x="60" y="262" width="80" height="16" rx="3" fill={premium.orange} opacity="0.85" />
      <rect x="66" y="246" width="68" height="16" rx="3" fill={premium.blue} opacity="0.85" />
      <rect x="72" y="230" width="56" height="16" rx="3" fill={premium.purple} opacity="0.8" />

      {/* laptop */}
      <rect x="170" y="228" width="130" height="82" rx="7" fill="#FFFFFF" stroke={premium.blue} strokeWidth="3" />
      <rect x="182" y="240" width="106" height="58" rx="3" fill={premium.blue} opacity="0.12" />
      <rect x="150" y="310" width="170" height="12" rx="5" fill={premium.blue} />

      {/* student */}
      <circle cx="235" cy="150" r="34" fill="#F3C9A4" />
      <path d="M199 150a36 36 0 0 1 72 0" fill={premium.textPrimary} opacity="0.85" />
      <rect x="188" y="184" width="94" height="90" rx="26" fill={premium.purple} />

      {/* floating study accents */}
      <circle cx="300" cy="120" r="6" fill={premium.green} />
      <circle cx="90" cy="100" r="5" fill={premium.orange} />
      <circle cx="70" cy="180" r="4" fill={premium.blue} />
      <path d="M270 90 l8 8 -8 8 -8 -8 Z" fill={premium.cyan} opacity="0.8" />
    </svg>
  </Box>
);

/** Support agent at a laptop with a headset — used in the Contact hero. */
export const SupportIllustration = ({ sx = {} }) => (
  <Box sx={frameSx("4/4.2", sx)}>
    <svg viewBox="0 0 380 400" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="supBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={premium.blue} stopOpacity="0.07" />
          <stop offset="100%" stopColor={premium.green} stopOpacity="0.06" />
        </linearGradient>
      </defs>
      <rect width="380" height="400" fill="url(#supBg)" />
      <circle cx="40" cy="60" r="48" fill={premium.blue} opacity="0.1" />
      <circle cx="340" cy="330" r="60" fill={premium.orange} opacity="0.09" />

      {/* desk */}
      <rect x="30" y="290" width="320" height="14" rx="4" fill={premium.blue} opacity="0.16" />

      {/* laptop with chat bubble */}
      <rect x="130" y="230" width="150" height="66" rx="8" fill="#FFFFFF" stroke={premium.blue} strokeWidth="3" />
      <rect x="142" y="240" width="126" height="42" rx="3" fill={premium.blue} opacity="0.1" />
      <rect x="106" y="296" width="198" height="12" rx="5" fill={premium.blue} />
      <path d="M215 244h50a8 8 0 0 1 8 8v14a8 8 0 0 1-8 8h-30l-10 10v-10h-10a8 8 0 0 1-8-8v-14a8 8 0 0 1 8-8Z" fill="#FFFFFF" stroke={premium.green} strokeWidth="2.5" />

      {/* person with headset */}
      <circle cx="190" cy="150" r="36" fill="#FDE1C7" />
      <path d="M154 150a36 36 0 0 1 72 0" fill={premium.textPrimary} opacity="0.85" />
      <path d="M150 140a40 40 0 0 1 80 0" stroke={premium.blue} strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="150" cy="150" r="8" fill={premium.blue} />
      <circle cx="230" cy="150" r="8" fill={premium.blue} />
      <rect x="222" y="150" width="16" height="8" rx="4" fill={premium.blue} />
      <rect x="150" y="184" width="80" height="86" rx="24" fill={premium.blue} />

      <circle cx="300" cy="110" r="5" fill={premium.green} />
      <circle cx="90" cy="200" r="4" fill={premium.orange} />
    </svg>
  </Box>
);

/** Small group of students studying together with a laptop — Learning Approach section. */
export const LearningApproachIllustration = ({ sx = {} }) => (
  <Box sx={frameSx("4/3.2", sx)}>
    <svg viewBox="0 0 420 340" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="laBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={premium.purple} stopOpacity="0.06" />
          <stop offset="100%" stopColor={premium.blue} stopOpacity="0.07" />
        </linearGradient>
      </defs>
      <rect width="420" height="340" fill="url(#laBg)" />
      <circle cx="370" cy="50" r="46" fill={premium.orange} opacity="0.1" />
      <circle cx="35" cy="290" r="56" fill={premium.green} opacity="0.09" />

      {/* table */}
      <rect x="40" y="250" width="340" height="16" rx="4" fill={premium.blue} opacity="0.16" />

      {/* three students */}
      <circle cx="120" cy="150" r="24" fill="#F3C9A4" />
      <path d="M96 150a24 24 0 0 1 48 0" fill={premium.textPrimary} opacity="0.85" />
      <rect x="86" y="174" width="68" height="76" rx="18" fill={premium.orange} />

      <circle cx="210" cy="132" r="26" fill="#FDE1C7" />
      <path d="M184 132a26 26 0 0 1 52 0" fill={premium.textPrimary} opacity="0.85" />
      <rect x="176" y="158" width="68" height="92" rx="18" fill={premium.blue} />

      <circle cx="300" cy="150" r="24" fill="#E8B98A" />
      <path d="M276 150a24 24 0 0 1 48 0" fill={premium.textPrimary} opacity="0.85" />
      <rect x="266" y="174" width="68" height="76" rx="18" fill={premium.purple} />

      {/* shared laptop on the table */}
      <rect x="175" y="220" width="70" height="34" rx="4" fill="#FFFFFF" stroke={premium.blue} strokeWidth="2.5" />
      <rect x="182" y="226" width="56" height="20" rx="2" fill={premium.blue} opacity="0.14" />

      <circle cx="60" cy="90" r="5" fill={premium.green} />
      <circle cx="350" cy="180" r="4" fill={premium.orange} />
      <circle cx="200" cy="70" r="5" fill={premium.cyan} />
    </svg>
  </Box>
);

export default {
  WhoWeAreIllustration,
  OnlineLearningIllustration,
  HeroIllustration,
  SupportIllustration,
  LearningApproachIllustration,
};
