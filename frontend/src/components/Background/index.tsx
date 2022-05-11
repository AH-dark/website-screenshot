import React from "react";
import { Box } from "@mui/material";

const Background: React.FC = () => {
    return (
        <Box
            id={"background"}
            sx={{
                opacity: 1,
                backgroundImage: "url(https://bing.ahdark.com/api/new)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            }}
            zIndex={-1}
            position={"fixed"}
            height={"100%"}
            width={"100%"}
            display={"block"}
        />
    );
};

export default Background;
