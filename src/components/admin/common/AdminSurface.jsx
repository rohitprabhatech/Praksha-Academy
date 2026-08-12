import { Paper } from '@mui/material'
import { adminTokens } from '../../../constants/adminDashboard'

function AdminSurface({ children, sx = {}, ...props }) {
 return (
  <Paper
   elevation={0}
   sx={{
   border: '1px solid',
   borderColor: 'divider',
   borderRadius: adminTokens.radius.card,
   boxShadow: (theme) =>
    theme.palette.mode === 'dark' ? adminTokens.shadow.dark : adminTokens.shadow.light,
    bgcolor: 'background.paper',
    ...sx,
   }}
   {...props}
  >
   {children}
  </Paper>
 )
}

export default AdminSurface
