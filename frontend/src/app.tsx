import React, { ChangeEvent, useState } from "react";
import {
    Box,
    Button,
    Card,
    Container,
    CssBaseline,
    Divider,
    InputBase,
    Link,
    Typography,
} from "@mui/material";
import Background from "./components/Background";
import NavBar from "./components/NavBar";
import LinkIcon from "@mui/icons-material/LinkRounded";
import { grey } from "@mui/material/colors";
import { useSnackbar } from "notistack";

const App: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();

    const [inputData, setInputData] = useState("");
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputData(e.target.value);
    };

    const handleSubmit = () => {
        if (!RegExp("^(https?://)?([\\w-]+\\.)+[\\w-]+(/[\\w-./?%&=]*)?$").test(inputData)) {
            enqueueSnackbar("The input value is invalid or empty.", {
                variant: "error",
            });
            return;
        }

        let url = inputData;
        if (url.indexOf("://") !== -1) {
            url = url.slice(url.indexOf("://") + "://".length);
        }
        window.open("/" + url);
    };

    return (
        <>
            <NavBar />
            <CssBaseline />
            <Container
                maxWidth={"md"}
                sx={{
                    height: "calc(100vh - 48px)",
                    maxHeight: "100vh",
                }}
            >
                <Box
                    component={"main"}
                    display={"flex"}
                    flexDirection={"column"}
                    flexWrap={"nowrap"}
                    justifyContent={"center"}
                    height={"100%"}
                    width={"100%"}
                >
                    <Box>
                        <Card>
                            <Box
                                sx={{
                                    padding: 4,
                                    pb: 1,
                                }}
                            >
                                <Typography
                                    variant={"h4"}
                                    component={"h1"}
                                    textAlign={"center"}
                                    whiteSpace={"pre-wrap"}
                                >
                                    {"Website Screenshot"}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box
                                sx={{
                                    padding: 4,
                                    pt: 1,
                                }}
                            >
                                <Box component={"ul"} margin={0} paddingLeft={4}>
                                    <Typography variant={"body1"} component={"li"}>
                                        {"Use it to take screenshot for websites.\n"}
                                    </Typography>
                                    <Typography variant={"body1"} component={"li"}>
                                        {"You can go to "}
                                        <Link
                                            href={"https://github.com/AH-dark/website-screenshot"}
                                            target={"_blank"}
                                            rel={"noreferrer"}
                                            underline={"hover"}
                                        >
                                            {"https://github.com/AH-dark/website-screenshot"}
                                        </Link>
                                        {
                                            " to get the source code of this site, but you must follow the open source license."
                                        }
                                    </Typography>
                                    <Typography variant={"body1"} component={"li"}>
                                        {"This service is operated by "}
                                        <Link
                                            href={"https://ahdark.com/"}
                                            target={"_blank"}
                                            rel={"noopener author"}
                                            underline={"hover"}
                                        >
                                            {"AHdark"}
                                        </Link>
                                        {" and provides technical support and maintenance"}
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                        <Card
                            sx={{
                                mt: 2,
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "normal",
                            }}
                        >
                            <InputBase
                                placeholder={"Enter the URL and we will take a screenshot for you"}
                                value={inputData}
                                onChange={handleChange}
                                sx={{
                                    pl: 1,
                                    pr: 1,
                                }}
                                startAdornment={
                                    <LinkIcon
                                        fontSize={"medium"}
                                        sx={{ mr: 1, color: grey[500] }}
                                    />
                                }
                                autoFocus
                                fullWidth
                                required
                            />
                            <Button
                                sx={{
                                    height: 32,
                                    borderRadius: 0,
                                    borderBottomLeftRadius: 0,
                                }}
                                variant={"contained"}
                                onClick={handleSubmit}
                            >
                                {"提交"}
                            </Button>
                        </Card>
                    </Box>
                </Box>
            </Container>
            <Background />
        </>
    );
};

export default App;
