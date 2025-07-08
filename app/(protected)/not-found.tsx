import CustomTypography from '@/components/CustomTypography'
import CommuteIcon from '@mui/icons-material/Commute';
import { Box } from '@mui/material'

export default function NotFound() {
  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2} mt={'30vh'}>
      <CommuteIcon fontSize='large' />
      <CustomTypography variant='h5' component={'h5'} fontWeight={700}> Not Found</CustomTypography>
      <p>Could not find vehicle/s list</p>
    </Box>
  )
}