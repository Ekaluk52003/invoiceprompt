import type { NextPage } from "next";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ProTip from "../src/ProTip";
import Copyright from "../src/Copyright";
import Breadcrumb from "./components/Breadcrumb";
import Link from "next/link";

const About: NextPage = () => {
  return (
    <Box
      sx={{
        my: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Breadcrumb />
      <Box maxWidth='sm'></Box>
      <ProTip />
      <Copyright />
    </Box>
  );
};

export default About;
