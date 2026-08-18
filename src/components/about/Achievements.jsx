import { Box, Typography } from "@mui/material";
import { FaCheck } from "react-icons/fa";
import { premium } from "../../theme/premiumPalette";
import AnimatedReveal from "../common/AnimatedReveal";
import aboutData from "../../data/aboutData";

const Achievements = () => {
  const items = aboutData.recognition?.length
    ? aboutData.recognition.map((item) => ({
        title: item.title,
        description: `${item.issuer || "Recognition"}${
          item.year ? ` · ${item.year}` : ""
        }`,
      }))
    : aboutData.differentiators.slice(0, 4).map((item) => ({
        title: item.title,
        description: item.description,
      }));

  return (
    <Box
      className="pa-achievements"
      sx={{
        py: { xs: 2, md: 3 },
      }}
    >
      <div className="row align-items-start g-5">

        {/* LEFT */}
        <div className="col-lg-5">
          <AnimatedReveal direction="left">
            <Typography
              component="p"
              sx={{
                color: premium.orange,
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                mb: 1.5,
              }}
            >
              ACHIEVEMENTS & IMPACT
            </Typography>

            <Typography
              component="h2"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: {
                  xs: "2rem",
                  md: "2.65rem",
                },
                lineHeight: 1.08,
                letterSpacing: "-0.04em",
                color: premium.textPrimary,
                maxWidth: 430,
                mb: 2,
              }}
            >
              Progress is built,
              <br />
              not promised.
            </Typography>

            <Typography
              sx={{
                color: premium.textSecondary,
                fontSize: "0.95rem",
                lineHeight: 1.75,
                maxWidth: 430,
              }}
            >
              We focus on the habits, guidance and practice that help
              learners make meaningful progress over time.
            </Typography>
          </AnimatedReveal>
        </div>

        {/* RIGHT */}
        <div className="col-lg-7">
          <AnimatedReveal direction="right">
            <Box
              sx={{
                borderTop: `1px solid ${premium.border}`,
              }}
            >
              {items.map((item, index) => (
                <Box
                  key={item.title}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "34px 1fr",
                    gap: 2,
                    py: { xs: 2.2, md: 2.5 },
                    borderBottom: `1px solid ${premium.border}`,
                  }}
                >
                  {/* NUMBER / CHECK */}
                  <Box
                    sx={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      backgroundColor:
                        index === 0
                          ? premium.blue
                          : "rgba(37, 99, 235, 0.07)",
                      color:
                        index === 0 ? "#fff" : premium.blue,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mt: 0.2,
                    }}
                  >
                    <FaCheck size={10} />
                  </Box>

                  {/* CONTENT */}
                  <Box>
                    <Typography
                      sx={{
                        color: premium.textPrimary,
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        mb: 0.5,
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      sx={{
                        color: premium.textSecondary,
                        fontSize: "0.85rem",
                        lineHeight: 1.65,
                        maxWidth: 560,
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </AnimatedReveal>
        </div>

      </div>
    </Box>
  );
};

export default Achievements;