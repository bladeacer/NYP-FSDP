import { Box, styled, Button } from '@mui/material';

export const CustBox = styled(Box)({
    backgroundImage: 'url("https://images.unsplash.com/photo-1525498128493-380d1990a112?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
    imageRendering: 'optimizeQuality',
    backgroundSize: 'cover',
    position: 'fixed',
    right: '8.3vw',
    width: '43vw',
    maxWidth: { xs: 0, sm: 0, md: 0, lg: 450, xl: 520 },
    height: '93vh',
    overflow: 'unset',
    zIndex: 2,
    bottom: '0%',
    marginBottom: '4.25vh',
    borderRadius: '10px',
    flex: '1 0 auto', // Flex grow, no shrink, auto basis
})

export const LogBox = styled(Box)({
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    maxWidth: '23vw',
    position: 'fixed',
    right: '60vw',
    marginTop: '20px',
    zIndex: 2,
    scale: 0.85
})

export const LoginWrapper = styled(Box)({
    backgroundColor: 'white',
    height: '93%',
    width: '85%',
    position: 'fixed',
    textAlign: 'left',
    top: '20px',
    left: '6.5%',
    borderRadius: '10px',
    flex: '1 0 auto', // Flex grow, no shrink, auto basis
})

export const CloseButton = styled(Button)({
    position: 'fixed',
    height: '52px',
    width: '52px',
    zIndex: 3,
    marginTop: '-2vh',
    right: '9vw',
    borderRadius: '50%',
    color: 'black',
    fontSize: '32px',
    backgroundColor: 'white'
})

export const DangerHeader = styled(Box) ({
    position: 'fixed',
    height: '175px',
    width: '84vw',
    right: '8.45vw',
    marginTop: '-20px',
    borderRadius: '30px',
    backgroundColor: 'rgba(19, 57, 16, 0.85)',
    textAlign: 'center',
    color: 'white'
})