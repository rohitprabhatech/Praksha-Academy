import { Box, Button, Typography } from "@mui/material";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import DirectionsOutlinedIcon from "@mui/icons-material/DirectionsOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { premium } from "../../theme/premiumPalette";
import AnimatedReveal from "../common/AnimatedReveal";
import contactData from "../../data/contactData";

const LocationSection = () => {
  const {
    hasPhysicalAddress,
    address,
    mapUrl,
    mapEmbedUrl,
    workingHours,
    academyName,
    email,
  } = contactData;

  /*
   * We intentionally check address instead of only
   * hasPhysicalAddress.
   *
   * This allows the temporary/default map to appear.
   */
  const hasLocation = Boolean(address);

  const hasMap = Boolean(mapEmbedUrl);

  return (
    <AnimatedReveal delay={100}>
      <Box
        sx={{
          width: "100%",
          backgroundColor: premium.cardBg,
          border: `1px solid ${premium.border}`,
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 6px 20px rgba(30, 41, 59, 0.05)",
        }}
      >
        {/* ========================================================
            HEADER
        ======================================================== */}

        <Box
          sx={{
            px: {
              xs: 2.5,
              md: 3.5,
            },

            pt: {
              xs: 2.5,
              md: 3.5,
            },

            pb: 2,
          }}
        >
          <Typography
            sx={{
              color: premium.textPrimary,
              fontSize: {
                xs: "1.1rem",
                md: "1.25rem",
              },
              fontWeight: 700,
              lineHeight: 1.3,
              mb: 0.75,
            }}
          >
            Campus Details & Working Hours
          </Typography>

          <Typography
            sx={{
              color: premium.textSecondary,
              fontSize: {
                xs: "0.82rem",
                md: "0.88rem",
              },
              lineHeight: 1.7,
              maxWidth: 650,
            }}
          >
            Find our campus location and view the hours during which
            our team is available to assist you.
          </Typography>
        </Box>

        {/* ========================================================
            CONTENT
        ======================================================== */}

        <Box
          sx={{
            px: {
              xs: 2.5,
              md: 3.5,
            },

            pb: {
              xs: 2.5,
              md: 3.5,
            },
          }}
        >
          <div className="row g-4 align-items-stretch">

            {/* ==================================================
                GOOGLE MAP
            ================================================== */}

            <div className="col-lg-7">
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  minHeight: {
                    xs: 280,
                    sm: 320,
                    md: 370,
                  },

                  height: {
                    lg: 370,
                  },

                  overflow: "hidden",

                  borderRadius: "10px",

                  border: `1px solid ${premium.border}`,

                  backgroundColor: "#F1F5F9",

                  boxShadow:
                    "0 4px 14px rgba(30, 41, 59, 0.04)",
                }}
              >
                {hasMap ? (
                  <>
                    {/* Google Map */}

                    <Box
                      component="iframe"
                      src={mapEmbedUrl}
                      title="Praksha Academy location map"
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      sx={{
                        position: "absolute",
                        inset: 0,

                        width: "100%",
                        height: "100%",

                        minHeight: {
                          xs: 280,
                          sm: 320,
                          md: 370,
                        },

                        border: 0,

                        display: "block",
                      }}
                    />

                    {/* Small map label */}

                    <Box
                      sx={{
                        position: "absolute",

                        left: {
                          xs: 12,
                          md: 16,
                        },

                        top: {
                          xs: 12,
                          md: 16,
                        },

                        px: 1.5,
                        py: 0.75,

                        borderRadius: "8px",

                        backgroundColor:
                          "rgba(255,255,255,0.94)",

                        border:
                          `1px solid ${premium.border}`,

                        boxShadow:
                          "0 4px 12px rgba(30,41,59,0.10)",

                        pointerEvents: "none",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.75,
                        }}
                      >
                        <LocationOnOutlinedIcon
                          sx={{
                            color: premium.blue,
                            fontSize: 18,
                          }}
                        />

                        <Typography
                          sx={{
                            color: premium.textPrimary,
                            fontSize: "0.75rem",
                            fontWeight: 600,
                          }}
                        >
                          Praksha Academy
                        </Typography>
                      </Box>
                    </Box>
                  </>
                ) : (
                  /* =================================================
                     FALLBACK
                     ================================================= */

                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",

                      minHeight: {
                        xs: 280,
                        md: 370,
                      },

                      display: "flex",

                      alignItems: "center",

                      justifyContent: "center",

                      backgroundColor: premium.sectionBg,
                    }}
                  >
                    <Box
                      sx={{
                        textAlign: "center",
                        px: 3,
                      }}
                    >
                      <LocationOnOutlinedIcon
                        sx={{
                          color: premium.blue,
                          fontSize: 42,
                          mb: 1,
                        }}
                      />

                      <Typography
                        sx={{
                          color: premium.textPrimary,
                          fontWeight: 700,
                          fontSize: "0.95rem",
                          mb: 0.5,
                        }}
                      >
                        Academy Location
                      </Typography>

                      <Typography
                        sx={{
                          color: premium.textSecondary,
                          fontSize: "0.8rem",
                        }}
                      >
                        Location map will be available soon.
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </div>

            {/* ==================================================
                RIGHT SIDE INFORMATION
            ================================================== */}

            <div className="col-lg-5">
              <Box
                sx={{
                  height: "100%",

                  display: "flex",

                  flexDirection: "column",

                  justifyContent: "space-between",

                  gap: 3,
                }}
              >

                {/* ==================================================
                    CAMPUS DETAILS
                ================================================== */}

                <Box>
                  <Box
                    sx={{
                      display: "flex",

                      alignItems: "center",

                      gap: 1,

                      mb: 1.25,
                    }}
                  >
                    <Box
                      sx={{
                        width: 38,
                        height: 38,

                        borderRadius: "9px",

                        display: "flex",

                        alignItems: "center",

                        justifyContent: "center",

                        backgroundColor:
                          "rgba(37, 99, 235, 0.08)",

                        color: premium.blue,
                      }}
                    >
                      <LocationOnOutlinedIcon
                        sx={{
                          fontSize: 20,
                        }}
                      />
                    </Box>

                    <Typography
                      sx={{
                        color: premium.textPrimary,

                        fontWeight: 700,

                        fontSize: "0.95rem",
                      }}
                    >
                      Campus Details
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      pl: {
                        xs: 0,
                        sm: 0,
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        color: premium.textPrimary,

                        fontSize: "0.9rem",

                        fontWeight: 600,

                        mb: 0.5,
                      }}
                    >
                      {academyName}
                    </Typography>

                    <Typography
                      sx={{
                        color: premium.textSecondary,

                        fontSize: "0.85rem",

                        lineHeight: 1.7,
                      }}
                    >
                      {hasLocation
                        ? address
                        : "Campus location details will be updated soon."}
                    </Typography>

                    {email && (
                      <Typography
                        sx={{
                          color: premium.blue,

                          fontSize: "0.84rem",

                          fontWeight: 600,

                          mt: 1,
                        }}
                      >
                        {email}
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* ==================================================
                    DIVIDER
                ================================================== */}

                <Box
                  sx={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: premium.border,
                  }}
                />

                {/* ==================================================
                    WORKING HOURS
                ================================================== */}

                <Box>
                  <Box
                    sx={{
                      display: "flex",

                      alignItems: "center",

                      gap: 1,

                      mb: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 38,
                        height: 38,

                        borderRadius: "9px",

                        display: "flex",

                        alignItems: "center",

                        justifyContent: "center",

                        backgroundColor:
                          "rgba(245, 158, 11, 0.10)",

                        color: premium.orange,
                      }}
                    >
                      <AccessTimeOutlinedIcon
                        sx={{
                          fontSize: 20,
                        }}
                      />
                    </Box>

                    <Typography
                      sx={{
                        color: premium.textPrimary,

                        fontWeight: 700,

                        fontSize: "0.95rem",
                      }}
                    >
                      Working Hours
                    </Typography>
                  </Box>

                  <Box>
                    {workingHours?.length > 0 ? (
                      workingHours.map((item, index) => (
                        <Box
                          key={`${item.day}-${index}`}
                          sx={{
                            display: "flex",

                            justifyContent:
                              "space-between",

                            alignItems: "center",

                            gap: 2,

                            py: 0.75,

                            borderBottom:
                              index !==
                              workingHours.length - 1
                                ? `1px solid ${premium.border}`
                                : "none",
                          }}
                        >
                          <Typography
                            sx={{
                              color:
                                premium.textSecondary,

                              fontSize: "0.8rem",
                            }}
                          >
                            {item.day}
                          </Typography>

                          <Typography
                            sx={{
                              color:
                                premium.textPrimary,

                              fontSize: "0.8rem",

                              fontWeight: 600,

                              textAlign: "right",

                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.time}
                          </Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography
                        sx={{
                          color:
                            premium.textSecondary,

                          fontSize: "0.85rem",

                          lineHeight: 1.7,
                        }}
                      >
                        Working hours will be updated soon.
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* ==================================================
                    GET DIRECTIONS
                ================================================== */}

                {mapUrl && (
                  <Button
                    component="a"
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    startIcon={
                      <DirectionsOutlinedIcon />
                    }
                    endIcon={
                      <OpenInNewIcon
                        sx={{
                          fontSize: "16px !important",
                        }}
                      />
                    }
                    sx={{
                      width: "100%",

                      minHeight: 46,

                      borderColor: premium.blue,

                      color: premium.blue,

                      borderRadius: "10px",

                      textTransform: "none",

                      fontFamily: "Poppins, sans-serif",

                      fontSize: "0.86rem",

                      fontWeight: 600,

                      transition: "all 0.3s ease",

                      "&:hover": {
                        borderColor:
                          premium.blueHover,

                        color: premium.blueHover,

                        backgroundColor:
                          "rgba(37,99,235,0.05)",

                        transform:
                          "translateY(-2px)",
                      },
                    }}
                  >
                    Get Directions
                  </Button>
                )}
              </Box>
            </div>
          </div>
        </Box>
      </Box>
    </AnimatedReveal>
  );
};

export default LocationSection;