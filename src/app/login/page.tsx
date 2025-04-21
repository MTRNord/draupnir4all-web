'use client';

import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Grid,
    Paper,
} from "@mui/material";

export default function LoginPage() {
    const [homeserver, setHomeserver] = useState("");
    const [isValidServer, setIsValidServer] = useState(false);
    const [showSSO, setShowSSO] = useState(false);

    const handleCheckServer = () => {
        // Simulate client-side validation of the homeserver
        if (homeserver.startsWith("https://")) {
            // Example logic: If the domain contains "sso", show SSO login
            setShowSSO(homeserver.includes("sso"));
            setIsValidServer(true);
        } else {
            alert("Please enter a valid URL starting with https://");
        }
    };

    const handleSSOLogin = () => {
        alert("Redirecting to SSO login...");
    };

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        alert("Logging in with username and password...");
    };

    return (
        <Grid container sx={{ height: "100vh" }}>
            {/* Left side with image */}
            <Grid
                size={{ xs: 12, md: 9 }}
                sx={{
                    backgroundImage: "url('https://via.placeholder.com/800')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Right side with login form */}
            <Grid
                size={{ xs: 12, md: 3 }}
                component={Paper}
                elevation={6}
                sx={{
                    display: "grid",
                    placeItems: "center",
                    boxShadow: "-4px 0px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Box>
                    <Typography component="h1" variant="h5" align="center">
                        Login
                    </Typography>
                    {!isValidServer ? (
                        <Box sx={{ mt: 2, mx: 2 }}>
                            <TextField
                                label="Homeserver Address"
                                variant="outlined"
                                fullWidth
                                value={homeserver}
                                onChange={(e) => setHomeserver(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleCheckServer}
                            >
                                Next
                            </Button>
                        </Box>
                    ) : showSSO ? (
                        <Box sx={{ mt: 2, mx: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleSSOLogin}
                            >
                                Login with SSO
                            </Button>
                        </Box>
                    ) : (
                        <Box
                            component="form"
                            onSubmit={handleLogin}
                            sx={{ mt: 2, mx: 2 }}
                        >
                            <TextField
                                label="Username"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Login
                            </Button>
                        </Box>
                    )}
                </Box>
            </Grid>
        </Grid>
    );
}