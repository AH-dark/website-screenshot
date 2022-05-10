import React from "react";
import {
    AppBar,
    Box,
    IconButton,
    Link,
    Theme,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/HomeRounded";
import GitHubIcon from "@mui/icons-material/GitHub";

const NavBar: React.FC = () => {
    const theme = useTheme<Theme>();
    const isMobileSize = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box flexGrow={1}>
            <AppBar position={"fixed"}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="home"
                        sx={{ mr: 2 }}
                    >
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {"Website Screenshot"}
                    </Typography>
                    <Link
                        href={"https://github.com/AH-dark/website-screenshot"}
                        target={"_blank"}
                        rel={"noopener noreferrer"}
                        color={"inherit"}
                    >
                        <IconButton
                            edge={"end"}
                            size={"large"}
                            aria-label={"github"}
                            sx={{ mr: isMobileSize ? undefined : 1 }}
                            color={"inherit"}
                        >
                            <GitHubIcon />
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;
