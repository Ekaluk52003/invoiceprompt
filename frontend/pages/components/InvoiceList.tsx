import {
  Avatar,
  Divider,
  Paper,
  Grid,
  Menu,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import Link from "next/link";

import ListItemButton from "@mui/material/ListItemButton";
import CircularProgress from "@mui/material/CircularProgress";
import DateAdapter from "@mui/lab/AdapterMoment";
import moment, { Moment } from "moment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import { useFindInvoiceLazyQuery } from "../../generated";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

export const InvoiceList = () => {
  const [fromDate, setfromDate] = useState<string | null>(
    moment(new Date()).format("YYYY-MMM-DD")
  );
  const [toDate, settoDate] = useState<string | null>(
    moment().format("YYYY-MMM-DD")
  );

  const [InvoiceStatus, setInvoiceStatus] = useState<any>("DRAFT");
  const [InvoiceOverdue, setInvoiceOverdue] = useState(false);

  const [loadinvoice, { called, loading: loadlist, data }] =
    useFindInvoiceLazyQuery({
      variables: {
        where: "",
        overdue: InvoiceOverdue,
        status: InvoiceStatus,
        fromDate,
        toDate,
      },
    });
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect((): any => {
    if (loadlist) {
      return (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      );
    }
    loadinvoice();
  }, [loadlist]);

  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker
          inputFormat='DD-MMM-YY'
          label='From'
          value={fromDate}
          onChange={(newValue) => {
            setfromDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker
          inputFormat='DD-MMM-YY'
          label='From'
          value={toDate}
          onChange={(newValue) => {
            settoDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <Grid item xs={12}>
        <Grid container alignContent='center' justifyContent='space-between'>
          <Grid item></Grid>
          <Grid item>
            <MoreHorizOutlinedIcon
              fontSize='small'
              sx={{
                cursor: "pointer",
              }}
              aria-controls='menu-popular-card'
              aria-haspopup='true'
              onClick={handleClick}
            />
            <Menu
              id='menu-popular-card'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              variant='selectedMenu'
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem
                onClick={(event) => {
                  setInvoiceOverdue(false);
                  setInvoiceStatus("CANCEL");
                  setAnchorEl(null);
                }}
              >
                Invoice Cancel
              </MenuItem>
              <MenuItem
                onClick={(event) => {
                  setInvoiceOverdue(false);
                  setInvoiceStatus("DRAFT");
                  setAnchorEl(null);
                }}
              >
                DRAFT
              </MenuItem>
              <MenuItem
                onClick={(event) => {
                  setInvoiceStatus("BILLED");
                  setAnchorEl(null);
                }}
              >
                BILL
              </MenuItem>
              <MenuItem
                onClick={(event) => {
                  setInvoiceStatus("BILLED");
                  setInvoiceOverdue(true);
                  setAnchorEl(null);
                }}
              >
                Overdue
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Grid>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell align='left'>Customer</TableCell>
              <TableCell align='left'>Title</TableCell>
              <TableCell align='left'>Status</TableCell>
              <TableCell align='left'>Amount</TableCell>
              <TableCell align='left'>Created Date</TableCell>
              <TableCell align='left'>Due Date</TableCell>
              <TableCell align='left'>Aging</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>


        

            {data!.findinvoice.map((row) => (
              <Link href={`/invoices/${row?.id}`} passHref>
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                >
                  <TableCell component='th' scope='row'>
                    {row?.number}
                  </TableCell>

                  <TableCell align='left'>{row?.name}</TableCell>
                  <TableCell align='left'>{row?.title}</TableCell>
                  <TableCell align='left'>
                    <Chip
                      label={row?.status}
                      color={
                        row?.status === "DRAFT"
                          ? "primary"
                          : row?.status === "CANCEL"
                          ? "warning"
                          : moment
                              .duration(
                                moment()
                                  .startOf("day")
                                  .diff(moment(row?.dueDate, "YYYY-MM-DD"))
                              )
                              .asDays() >= 0
                          ? "warning"
                          : "success"
                      }
                    />
                  </TableCell>
                  <TableCell align='left'>{row?.TotalAmount}</TableCell>
                  <TableCell align='left'>
                    {moment(row?.createdAt).format("D-MMM-YY")}
                  </TableCell>
                  <TableCell align='left'>
                    {moment(row?.dueDate).format("D-MMM-YY")}
                  </TableCell>
                  <TableCell align='left'>
                    {moment
                      .duration(
                        moment()
                          .startOf("day")
                          .diff(moment(row?.dueDate, "YYYY-MM-DD"))
                      )
                      .asDays() > 0
                      ? moment
                          .duration(
                            moment()
                              .startOf("day")
                              .diff(moment(row?.dueDate, "YYYY-MM-DD"))
                          )
                          .asDays()
                      : ""}
                  </TableCell>
                </TableRow>
              </Link>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default InvoiceList;
