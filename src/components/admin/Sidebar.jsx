import { Box, Drawer, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { FiLogOut, FiX } from 'react-icons/fi'
import { adminNavGroups, adminTokens } from '../../constants/adminDashboard'
import logoMark from '../../assets/praksha-mark.png'

export const ADMIN_SIDEBAR_WIDTH = 280

const isActivePath = (pathname, path) =>
  pathname === path || pathname.startsWith(`${path}/`)

function SidebarContent({ onClose, showCloseButton = false }) {
  const { pathname } = useLocation()

  return (
    <Stack
      sx={{
        width: ADMIN_SIDEBAR_WIDTH,
        height: '100%',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark'
            ? adminTokens.colors.sidebarDark
            : adminTokens.colors.sidebarLight,

        borderRight: '1px solid',

        borderColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(148, 163, 184, 0.16)'
            : 'rgba(0, 0, 0, 0.12)',

        px: 2,
        py: 2.5,
      }}
    >
      {/* Logo / Brand */}
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Stack
          component={RouterLink}
          to="/admin/dashboard"
          direction="row"
          spacing={1.25}
          sx={{
            alignItems: 'center',
            textDecoration: 'none',
          }}
        >
          <Box
            component="img"
            src={logoMark}
            alt="Praksha Academy"
            sx={{
              width: 34,
              height: 34,
              objectFit: 'contain',
            }}
          />

          <Box>
            <Typography
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '#F8FAFC'
                    : '#000000',

                fontWeight: 900,
                lineHeight: 1.1,
              }}
            >
              Praksha Academy
            </Typography>

            <Typography
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '#B8C7D9'
                    : '#000000',

                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              Admin Console
            </Typography>
          </Box>
        </Stack>

        {showCloseButton && (
          <IconButton
            onClick={onClose}
            aria-label="Close admin menu"
            sx={{
              color: (theme) =>
                theme.palette.mode === 'dark'
                  ? '#FFFFFF'
                  : '#000000',
            }}
          >
            <FiX size={20} />
          </IconButton>
        )}
      </Stack>

      {/* Navigation */}
      <Stack
        component="nav"
        aria-label="Admin navigation"
        spacing={2}
        sx={{
          flex: 1,
          overflowY: 'auto',
          pr: 0.5,
          mr: -0.5,

          '&::-webkit-scrollbar': {
            width: 6,
          },

          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'divider',
            borderRadius: 999,
          },
        }}
      >
        {adminNavGroups.map((group) => (
          <Stack key={group.title} spacing={0.5}>
            {/* Section title */}
            <Typography
              sx={{
                px: 1.25,

                color: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '#B8C7D9'
                    : '#000000',

                fontSize: '0.68rem',
                fontWeight: 900,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {group.title}
            </Typography>

            {group.items.map((item) => {
              const Icon = item.icon
              const active = isActivePath(pathname, item.path)

              return (
                <Tooltip
                  key={item.path}
                  title={
                    item.disabled
                      ? 'Assigned to another module'
                      : ''
                  }
                  placement="right"
                >
                  <Box
                    component={
                      item.disabled ? 'div' : RouterLink
                    }
                    to={
                      item.disabled
                        ? undefined
                        : item.path
                    }
                    onClick={
                      item.disabled
                        ? undefined
                        : onClose
                    }
                    aria-current={
                      active ? 'page' : undefined
                    }
                    aria-disabled={
                      item.disabled
                        ? 'true'
                        : undefined
                    }
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.25,

                      px: 1.25,
                      py: 0.9,
                      minHeight: 38,

                      borderRadius: 1.25,

                      borderLeft: '3px solid',

                      borderLeftColor: active
                        ? 'primary.main'
                        : 'transparent',

                      /*
                       * TEXT COLOR
                       * Light mode = BLACK
                       */
                      color: active
                        ? 'primary.main'
                        : item.disabled
                          ? (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(184, 199, 217, 0.46)'
                                : 'rgba(0, 0, 0, 0.55)'
                          : (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#D8E4F2'
                                : '#000000',

                      bgcolor: active
                        ? (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(37, 99, 235, 0.22)'
                              : 'rgba(37, 99, 235, 0.16)'
                        : 'transparent',

                      fontWeight: active ? 800 : 700,

                      cursor: item.disabled
                        ? 'not-allowed'
                        : 'pointer',

                      opacity: item.disabled ? 0.65 : 1,

                      textDecoration: 'none',

                      '&:hover': {
                        bgcolor: item.disabled
                          ? 'transparent'
                          : 'rgba(0, 0, 0, 0.05)',

                        color: item.disabled
                          ? (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(184, 199, 217, 0.46)'
                                : 'rgba(0, 0, 0, 0.55)'
                          : (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#FFFFFF'
                                : '#000000',
                      },
                    }}
                  >
                    <Icon
                      size={16}
                      aria-hidden="true"
                    />

                    <Typography
                      component="span"
                      sx={{
                        flex: 1,
                        fontSize: '0.86rem',
                        fontWeight: 'inherit',

                        color: 'inherit',
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                </Tooltip>
              )
            })}
          </Stack>
        ))}
      </Stack>

      {/* Logout */}
      <Box
        component={RouterLink}
        to="/admin/login"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,

          px: 1.5,
          py: 1.15,

          borderRadius: 1.5,

          color: (theme) =>
            theme.palette.mode === 'dark'
              ? '#FF6B6B'
              : '#000000',

          fontWeight: 800,

          textDecoration: 'none',

          '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.05)',
          },
        }}
      >
        <FiLogOut size={18} />

        <Typography
          sx={{
            fontSize: '0.9rem',
            fontWeight: 'inherit',
            color: 'inherit',
          }}
        >
          Logout
        </Typography>
      </Box>
    </Stack>
  )
}

function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      {/* Desktop Sidebar */}
      <Box
        component="aside"
        sx={{
          display: {
            xs: 'none',
            lg: 'block',
          },

          width: ADMIN_SIDEBAR_WIDTH,
          flexShrink: 0,

          position: 'sticky',
          top: 0,

          height: '100vh',
        }}
      >
        <SidebarContent />
      </Box>

      {/* Mobile Sidebar */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: 'block',
            lg: 'none',
          },

          '& .MuiDrawer-paper': {
            border: 0,
          },
        }}
      >
        <SidebarContent
          showCloseButton
          onClose={onClose}
        />
      </Drawer>
    </>
  )
}

export default Sidebar