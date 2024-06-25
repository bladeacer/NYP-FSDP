import { Box, styled, Button} from '@mui/material';


export const CustBox = styled(Box)({
    backgroundImage: 'url("https://images.unsplash.com/photo-1525498128493-380d1990a112?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
    imageRendering: 'optimizeQuality',
    backgroundSize: 'cover',
    position: 'fixed',
    left: '48.4vw',
    width: '42vw',
    maxWidth: {xs: 0, sm: 0, md: 1200, lg: 1050, xl: 1050 },
    height: '93vh',
    maxHeight: {xs: 0, sm: 0, md: 450, lg: 662, xl: 850 },
    overflow: 'unset',
    overflow: 'unset',
    zIndex: 2,
    top: '5.5%'
})

export const LogBox = styled(Box)({
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    maxWidth: '23vw',
    position: 'fixed',
    left: '20%',
    top: '3.5%',
    zIndex: 2
})

export const LoginWrapper = styled(Box)({
    backgroundColor: 'white',
    height: '93%',
    width: '85%',
    position: 'fixed',
    textAlign: 'left',
    top: '40px',
    left: '6.5%'
})

export const CloseButton = styled(Button)({
    content: 'X'
})

