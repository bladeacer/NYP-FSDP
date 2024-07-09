import { CustomContainer } from "./reusables/components/wrapper_components"
import { Typography, Button } from "@mui/material"
import { logout, staffLogout } from "./reusables/logout";

export default function Unauthorized(is_in) {
    return (
        <>
            <CustomContainer>

                {is_in == false && (
                    <>
                        <Typography variant="h3" sx={{ mb: 3 }}>Access Denied :(</Typography>
                        <Typography sx={{ fontSize: '20px' }}>You need to login to view this page.</Typography>
                        <Button href="/login">Click here if you want to login.</Button>
                        <Button href="/home">Click here to homepage.</Button>
                    </>
                )}
                {is_in == true && (
                    <>
                        <Typography variant="h3" sx={{ mb: 3 }}>Session Expiry</Typography>
                        <Typography sx={{ fontSize: '20px' }}>You need to logout to view this page.</Typography>
                        <Button onClick={logout}>Click here if you want to logout.</Button>
                        <Button href="/home">Click here to homepage.</Button>
                    </>
                )}
                {is_in == -1 && (
                    <>
                        <Typography variant="h3" sx={{ mb: 3 }}>Access Denied :(</Typography>
                        <Typography sx={{ fontSize: '20px' }}>This page does not exist, or you do not have the required permissions to view it.</Typography>
                        <Button href="/home">Click here to homepage.</Button>
                    </>
                )}

                {/* Staff unauthorized interface */}
                {is_in == 2 && (
                    <>
                        <Typography variant="h3" sx={{ mb: 3 }}>Access Denied :(</Typography>
                        <Typography sx={{ fontSize: '20px' }}>You need to login to view this page.</Typography>
                        <Button href="/staffLogin">Click here if you want to login.</Button>
                    </>
                )}
                {is_in == 3 && (
                    <>
                        <Typography variant="h3" sx={{ mb: 3 }}>Session Expiry</Typography>
                        <Typography sx={{ fontSize: '20px' }}>You need to logout to view this page.</Typography>
                        <Button onClick={staffLogout}>Click here if you want to logout.</Button>
                    </>
                )}

                {is_in == -2 && (
                    <>
                        <Typography variant="h3" sx={{ mb: 3 }}>Access Denied :(</Typography>
                        <Typography sx={{ fontSize: '20px' }}>This page does not exist, or you do not have the required permissions to view it.</Typography>
                        <Button href="/staffLogin">Click here to login.</Button>
                    </>
                )}

            </CustomContainer>
        </>
    )
}