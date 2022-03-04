import type { NextPage } from "next";
import { useState, useEffect } from "react";
import InvoiceList from "./components/InvoiceList";
import Backdrop from "@mui/material/Backdrop";
import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import withAuth from "../utils/withAuth";
import CircularProgress from "@mui/material/CircularProgress";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useSuminvQuery, useSuminvLazyQuery } from "../generated";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Invoices: NextPage = () => {
  const [category, setCategory] = useState([]);
  const [data, setData] = useState([]);
  const [loadinvoice, { called, loading, data: invData }] =
    useSuminvLazyQuery();
  //@ts-ignore
  useEffect(() => {
    const date = [];
    const amount = [];
    loadinvoice();
    if (loading) {
      return (
        <Backdrop
          sx={{
            color: "#fff",
            bgcolor: "#000000",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={true}
        >
          <CircularProgress color='inherit' /> Loading
        </Backdrop>
      );
    }
    invData?.suminvoices.map((item) => {
      date.push(item.date);
      amount.push(item.amount);
    });
    setCategory(date.reverse());
    setData(amount.reverse());
  }, [invData, loading]);

  return (
    <Paper sx={{ p: 3, borderRadius: 5 }} elevation={0}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Chart
            options={{
              chart: {
                id: "apexchart-example",
                toolbar: {
                  show: false,
                },
              },
              xaxis: {
                categories: category,
              },

              fill: {
                type: "gradient",

                gradient: {
                  shadeIntensity: 1,
                  opacityFrom: 0.7,
                  opacityTo: 0.9,
                  stops: [0, 90, 100],
                },
              },
              dataLabels: {
                enabled: false,
              },
              title: {
                text: "Fundamental Analysis of Stocks",
                align: "left",
              },
              subtitle: {
                text: "Price Movements",
                align: "left",
              },

              colors: ["#0f1f75", "#E91E63", "#9C27B0"],
            }}
            series={[
              {
                name: "Invoice Amount",
                data: data,
              },
            ]}
            type='area'
            height={300}
          />
        </Grid>
        <Button
          onClick={() =>
            loadinvoice({
              variables: {
                Limit: 7,
              },
            })
          }
        >
          reset
        </Button>
        <Button
          onClick={() =>
            loadinvoice({
              variables: {
                Limit: 2,
              },
            })
          }
        >
          chnage to 2
        </Button>
        <Button
          onClick={() =>
            loadinvoice({
              variables: {
                Limit: 3,
              },
            })
          }
        >
          chnage to 3
        </Button>

        <InvoiceList />
      </Grid>
    </Paper>
  );
};

export default withAuth(Invoices);
