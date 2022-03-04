import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import debounce from "lodash.debounce";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/router";
import DateAdapter from "@mui/lab/AdapterMoment";
import moment, { Moment } from "moment";
import Paper from "@mui/material/Paper";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useCreateInvoiceMutation,
  useFindCustomerLazyQuery,
} from "../generated";
import Autocomplete from "@mui/material/Autocomplete";

type InvoiceItem = {
  name: string;
  qty: number;
  amount: number;
};

type invoice = {
  title: string;
  TotalAmount: number;
  items: InvoiceItem[];
};

const Createinvoice = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, touchedFields, submitCount },
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      title: "",
      customer: "",
      contactInfo: "",
      TotalAmount: "",
      term: 0,
      dueDate: new Date(),
      description: "",
      items: [{ name: "default item", qty: 1, price: 1, amount: 1 }],
    },
  });
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up("md"));

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const router = useRouter();

  const [createInvoice, { data, loading, error }] = useCreateInvoiceMutation();
  const [
    findcustomer,
    { loading: loadingCustomer, data: CustomerData, error: CustomerErr },
  ] = useFindCustomerLazyQuery();

  const findcustomerButChill = debounce(findcustomer, 500);

  const watchItem = watch().items;
  const sumall = watchItem
    .map((item) => item.amount)
    .reduce((prev, curr) => prev + curr, 0);

  const onSubmit = async (data: any) => {
    console.log("data", data);

    try {
      const newInvoice = await createInvoice({
        variables: data,
      });

      router.push(`/invoices/${newInvoice.data?.createInvoice.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper sx={{ p: 3, borderRadius: 5 }} elevation={0}>
        <Typography variant='h4'>New invoice </Typography>
        <Typography
          variant='body1'
          sx={{ mb: 2, mt: 2, color: "text.secondary" }}
        >
          Please provide information about invoice details and items{" "}
        </Typography>
        <Box>
          <Grid container spacing={1} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <Controller
                name='customer'
                control={control}
                defaultValue=''
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Autocomplete
                    value={value}
                    disablePortal
                    onInputChange={async (event, newInputValue) => {
                      await findcustomerButChill({
                        variables: {
                          name: newInputValue,
                        },
                      });
                    }}
                    onChange={(event, value) => {
                      const newArray = CustomerData?.customers.filter(
                        (cust) => {
                          return cust.name === value;
                        }
                      );
                      setValue("customer", value);
                      {
                        CustomerData &&
                          setValue("contactInfo", newArray[0]?.contactInfo);
                      }
                    }}
                    id='free-solo-demo'
                    freeSolo={true}
                    options={
                      CustomerData?.customers?.map(
                        (customer) => customer?.name
                      ) || []
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Customer'
                        ref={params.InputProps.ref}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {loadingCustomer ? (
                                <CircularProgress color='inherit' size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                        onChange={onChange}
                      />
                    )}
                  />
                )}
              />
              <Controller
                name='title'
                control={control}
                defaultValue=''
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label='Title'
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    fullWidth
                    sx={{ mt: 2 }}
                  />
                )}
                rules={{ required: "Title is require" }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Controller
                name='contactInfo'
                control={control}
                defaultValue=''
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label='Contact Info'
                    value={value}
                    multiline
                    minRows={4}
                    onChange={onChange}
                    disabled={Boolean(
                      CustomerData?.customers?.filter((cust) => {
                        return cust.name === watch("customer");
                      }).length
                    )}
                    error={!!error}
                    helperText={error ? error.message : null}
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }} />
        </Box>
      </Paper>
      <Divider />
      <Paper sx={{ p: 3, borderRadius: 5, mb: 2, mt: 2 }} elevation={0}>
        <Typography variant='h4'>Payment Term</Typography>
        <Typography
          variant='body1'
          sx={{ mb: 2, mt: 2, color: "text.secondary" }}
        >
          Please pick term{" "}
        </Typography>
        <FormControl>
          <Controller
            rules={{ required: true }}
            control={control}
            name='term'
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <RadioGroup
                  row
                  value={value}
                  onChange={(event, value) => {
                    onChange(value);
                    setValue("term", parseInt(value));
                    setValue(
                      "dueDate",
                      //@ts-ignore
                      moment().add(watch("term"), "days").format("YYYY-MM-DD")
                    );
                  }}
                >
                  <FormControlLabel
                    value='0'
                    control={<Radio />}
                    label='No credit'
                  />
                  <FormControlLabel
                    value='7'
                    control={<Radio />}
                    label='7 Days'
                  />
                  <FormControlLabel
                    value='15'
                    control={<Radio />}
                    label='15 Days'
                  />
                  <FormControlLabel
                    value='30'
                    control={<Radio />}
                    label='30 Days'
                  />
                  <FormControlLabel
                    value='45'
                    control={<Radio />}
                    label='45 Days'
                  />
                  <FormControlLabel
                    value='60'
                    control={<Radio />}
                    label='60 Days'
                  />
                </RadioGroup>
              );
            }}
          />
        </FormControl>
        <Box>
          Due Date : {moment().add(watch("term"), "days").format("YYYY-MM-DD")}
        </Box>
      </Paper>
      <Paper sx={{ p: 3, borderRadius: 5, mb: 2, mt: 2 }} elevation={0}>
        <Typography variant='h4'>Add item to invoice</Typography>
        <Typography
          variant='body1'
          sx={{ mb: 2, mt: 2, color: "text.secondary" }}
        >
          List of items{" "}
        </Typography>
        {fields.map((item, index) => {
          return (
            <Grid container spacing={2} key={item.id} marginBottom={2}>
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: { xs: "1rem" },
                }}
              >
                <Typography
                  sx={{ display: { xs: "block", md: "none" }, mr: "20px" }}
                >
                  Name:
                </Typography>
                <Controller
                  //@ts-ignore
                  name={`items[${index}].name`}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label='item'
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      fullWidth
                      size='small'
                    />
                  )}
                  rules={{ required: "Item is require" }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: { xs: "1rem" },
                }}
              >
                <Typography
                  sx={{ display: { xs: "block", md: "none" }, mr: "30px" }}
                >
                  QTY:
                </Typography>
                <Controller
                  //@ts-ignore
                  name={`items[${index}].qty`}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      size='small'
                      label='QTY'
                      type='text'
                      value={value}
                      onChange={(e) => {
                        const quantity = e.target.value;
                        parseInt(quantity, 10);
                        setValue(
                          //@ts-ignore
                          `items[${index}].amount`,
                          //@ts-ignore
                          quantity * watch().items[index].price
                        );

                        if (isNaN(parseFloat(e.target.value))) {
                          console.log(isNaN(parseFloat(e.target.value)));
                          return onChange(e.target.value);
                        }
                        onChange(parseFloat(e.target.value));
                      }}
                      error={!!error}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                  rules={{ required: "Item is require" }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={2}
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  mb: { xs: "1rem" },
                }}
              >
                <Typography
                  sx={{ display: { xs: "block", md: "none" }, mr: "20px" }}
                >
                  Price:
                </Typography>
                <Controller
                  //@ts-ignore
                  name={`items[${index}].price`}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>$</InputAdornment>
                        ),
                      }}
                      size='small'
                      label='price'
                      value={value}
                      onChange={(e) => {
                        const filledtPrice = e.target.value;
                        //@ts-ignore
                        setValue(
                          //@ts-ignore
                          `items[${index}].amount`,
                          //@ts-ignore
                          filledtPrice * watch().items[index].qty
                        );

                        if (Number.isNaN(parseFloat(e.target.value))) {
                          return onChange(e.target.value);
                        }
                        onChange(parseFloat(e.target.value));
                      }}
                      error={!!error}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                  rules={{ required: "Item is require" }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={3}
                sx={{ display: "flex", alignItems: "baseline" }}
              >
                <Typography sx={{ display: { xs: "block", md: "none" } }}>
                  Amount:
                </Typography>
                <Controller
                  //@ts-ignore
                  name={`items[${index}].amount`}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      size='small'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>$</InputAdornment>
                        ),
                      }}
                      label='amount'
                      value={value}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={1}
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  mb: { xs: "1rem" },
                }}
              >
                <Stack
                  direction='row'
                  justifyContent='end'
                  alignItems='flex-end'
                >
                  <IconButton
                    aria-label='delete'
                    onClick={() => remove(index)}
                    disabled={fields.length < 2}
                  >
                    <DeleteIcon
                      //@ts-ignore
                      color={fields.length > 1 ? "error" : ""}
                      sx={{ fontSize: { xs: 40, md: 20 } }}
                    />
                  </IconButton>
                  <IconButton
                    aria-label='delete'
                    onClick={() => {
                      append({ name: "Item", qty: 1, price: 1, amount: 1 });
                    }}
                  >
                    <AddCircleIcon
                      color='secondary'
                      sx={{ fontSize: { xs: 40, md: 20 } }}
                    />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
          );
        })}
      </Paper>
      <Paper
        sx={{
          p: 3,
          borderRadius: 5,
          display: "flex",
          justifyContent: "space-between",
        }}
        elevation={0}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              mr: 1,
              width: 10,
              height: 10,
              backgroundColor: "error.light",
              borderRadius: "50%",
            }}
          />
          <Typography variant='h4'>Total Amount</Typography>
        </Box>
        <Typography variant='h4'> ${sumall}</Typography>
      </Paper>
      <Paper sx={{ p: 3, borderRadius: 5, mb: 2, mt: 2 }} elevation={0}>
        <Typography variant='h4'>Additional Details</Typography>
        <Controller
          name='description'
          control={control}
          defaultValue=''
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label='description'
              multiline
              minRows={4}
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              fullWidth
              sx={{ mt: 2 }}
            />
          )}
        />
        <Box sx={{ mt: 2, mb: 2 }} />
        <Button
          type='submit'
          onClick={() => {
            //@ts-ignore
            setValue("TotalAmount", sumall);
          }}
          variant='contained'
          color='primary'
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </Paper>
    </form>
  );
};

export default Createinvoice;
