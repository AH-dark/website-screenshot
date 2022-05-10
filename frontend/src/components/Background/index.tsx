import React from "react";
import { Box } from "@mui/material";

const Background: React.FC = () => {
    return (
        <Box
            id={"background"}
            sx={{
                backgroundImage: "url(https://bing.ahdark.com/api/new)",
            }}
            zIndex={-1}
            position={"absolute"}
            top={0}
            bottom={0}
            left={0}
            right={0}
            height={"100%"}
            width={"100%"}
        />
    );
};

export default Background;
