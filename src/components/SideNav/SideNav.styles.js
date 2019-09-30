export default theme => ({
  navItem: {
    '&.active': {
      position: 'relative'
    },
    '&.active *': {
      color: theme.palette.default.contrastText,
      fontWeight: 'bold'
    },
    '&.active::before': {
      content: `''`,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      display: 'block',
      width: 5,
      background: theme.palette.primary.main
    }
  },
  logoTitle: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 24,
    height: 64,
    margin: '0 24px',
    fontSize: 16,
    textTransform: 'uppercase',
    overflow: 'hidden',
    cursor: 'pointer',
    userSelect: 'none'
  },
  logoTitleFirstLetter: {
    position: 'relative',
    minWidth: 24,
    height: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2,
    background: theme.palette.primary.main,
    fontSize: 22,
    textAlign: 'center',
    color: theme.palette.default.main,
    '&:first-letter': {
      zIndex: 1
    },
    '&:before, &:after': {
      content: `''`,
      position: 'absolute',
      left: 0,
      width: 0,
      borderLeft: '12px solid transparent',
      borderRight: '12px solid transparent',
      zIndex: 0
    },
    '&:before': {
      bottom: '100%',
      borderBottom: `9px solid ${theme.palette.primary.main}`
    },
    '&:after': {
      top: '100%',
      borderTop: `9px solid ${theme.palette.primary.main}`
    }
  }
})
