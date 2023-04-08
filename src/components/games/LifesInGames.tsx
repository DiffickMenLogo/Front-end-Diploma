import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
})

export const LifesInGame = ({ lifes }: { lifes: number }) => {
  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <StyledRating
        name='customized-color'
        value={lifes}
        icon={<FavoriteIcon fontSize='inherit' />}
        emptyIcon={<FavoriteBorderIcon fontSize='inherit' />}
        readOnly={true}
        sx={{ fontSize: '3.5rem' }}
      />
    </Box>
  )
}
