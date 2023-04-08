import Button from '@mui/material/Button'
import { useAppDispatch } from '../../hooks/redux'
import { levelSlice } from '../../store/reducers/WordGroupSlice'

interface ILevelButtonProps {
  item: number
  index: number
  level: number | null
}

const LevelButton = ({ item, index, level }: ILevelButtonProps) => {
  const { setLevel } = levelSlice.actions
  const dispatch = useAppDispatch()

  const setParametrs = () => {
    if (level === index) {
      dispatch(setLevel(null))
    } else {
      dispatch(setLevel(index))
    }
  }

  return (
    <Button
      variant='contained'
      sx={
        level === index
          ? {
              width: 50,
              height: 50,
              minWidth: 50,
              backgroundColor: 'rgba(233, 214, 255, 0.8235294118)',
              fontSize: 20,
              '&:hover': { color: '#9b6ad6', background: 'rgba(233, 214, 255, 0.8235294118)' },
              '@media (max-width: 640px)': {
                width: 30,
                height: 30,
                minWidth: 30,
              },
            }
          : {
              width: 50,
              height: 50,
              minWidth: 50,
              backgroundColor: '#9b6ad6',
              fontSize: 20,
              '&:hover': { color: '#9b6ad6', background: 'rgba(233, 214, 255, 0.8235294118)' },
              '@media (max-width: 640px)': {
                width: 30,
                height: 30,
                minWidth: 30,
              },
            }
      }
      onClick={setParametrs}
    >
      {item}
    </Button>
  )
}

export default LevelButton
