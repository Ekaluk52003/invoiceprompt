import type { NextPage } from "next";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useQuery, gql } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
import withAuth from "../utils/withAuth";
import { Paper } from "@mui/material";

const Home: NextPage = () => {
  return (
    <Paper
      sx={{
        my: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant='h5' component='h5' gutterBottom>
        This is mill caprover
      </Typography>
    </Paper>
  );
};

export default withAuth(Home);
