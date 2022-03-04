import { useForm, useFieldArray, Controller } from "react-hook-form";
import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Paper from "@mui/material/Paper";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import moment, { Moment } from "moment";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import Stack from "@mui/material/Stack";
import {
  useUpdateInvoiceMutation,
  useFindInvoiceByIdQuery,
  useFindCustomerLazyQuery,
  useFindinvoiceHistoryQuery,
  FindinvoiceHistoryDocument,
  FindInvoiceByIdDocument,
} from "../../generated";
import Autocomplete from "@mui/material/Autocomplete";
import withAuth from "../../utils/withAuth";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import LinearProgress from "@mui/material/LinearProgress";

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

const FindinvoiceById = () => {
  const [open, setOpen] = useState(false);
  const [invoiceStatus, setInvoiceStatus] = useState({
    status: "",
  });

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const router = useRouter();

  const id = parseInt(router.query.id as string, 10);

  const playsound = () => {
    const audio = new Audio("http://localhost:3000/cash.mp3");
    audio.play();
  };

  const {
    data: invoiceData,
    loading,
    error,
  } = useFindInvoiceByIdQuery({
    errorPolicy: "all",
    variables: {
      id: id,
    },
  });

  const [
    mutate,
    { data: mutateData, loading: mutateLoading, error: mutateError },
  ] = useUpdateInvoiceMutation({
    refetchQueries: [
      {
        query: FindinvoiceHistoryDocument,
        variables: {
          invoiceId: id,
        },
      },
      {
        query: FindInvoiceByIdDocument,
        variables: {
          id: id,
        },
      },
    ],
  });
  const [
    findcustomer,
    { loading: loadingCustomer, data: CustomerData, error: CustomerErr },
  ] = useFindCustomerLazyQuery();

  const { loading: historyLoading, data: historyData } =
    useFindinvoiceHistoryQuery({
      errorPolicy: "all",
      variables: {
        invoiceId: id,
      },
    });

  const findcustomerButChill = debounce(findcustomer, 500);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty, isSubmitting, touchedFields, submitCount },
    watch,
  } = useForm({
    defaultValues: {
      customer: "",
      contactInfo: "",
      term: "",
      dueDate: "",
      status: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    //@ts-ignore
    name: "items",
  });

  const onSubmit = async (data: invoice) => {
    //@ts-ignore
    const watchItem = watch()?.items;
    const watchAmount = watchItem
      .map((item) => item.amount)
      .reduce((prev, curr) => prev + curr, 0);
    playsound();
    setOpen(true);

    const amount = {
      TotalAmount: watchAmount,
    };

    console.log(amount);

    const {
      //@ts-ignore
      createdAt,
      //@ts-ignore
      number,
      //@ts-ignore
      user,
      //@ts-ignore
      __typename,
      //@ts-ignore
      status,
      TotalAmount,
      ...myData
    } = data;
    console.log("before", invoiceStatus.status);

    const checkSubdata = () => {
      if (invoiceStatus.status === "SAVE") {
        return { ...myData, ...amount };
      } else {
        return { ...invoiceStatus, ...myData, ...amount };
      }
    };

    console.log("obj", checkSubdata());
    try {
      await mutate({
        //@ts-ignore
        variables: checkSubdata(),
      });
    } catch (e) {
      console.log(e);
    }
    console.log(mutateData);

    setInvoiceStatus({
      status: "null",
    });
  };
  //@ts-ignore
  useEffect(() => {
    if (loading || historyLoading) {
      return <LinearProgress />;
    }
    //@ts-ignore
    reset(invoiceData?.findInvoiceById);
    setValue("customer", invoiceData?.findInvoiceById?.customer.name);
    setValue(
      "contactInfo",
      invoiceData?.findInvoiceById?.customer?.contactInfo
    );
  }, [loading, historyLoading]);

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        {" "}
        <Paper sx={{ p: 3, borderRadius: 5 }} elevation={0}>
          <form
            onSubmit={handleSubmit(
              //@ts-ignore
              onSubmit
            )}
          >
            <Typography variant='h4' gutterBottom>
              Review your invoice Inv#{invoiceData?.findInvoiceById?.number}
            </Typography>
            Status :{" "}
            <Chip
              label={invoiceData?.findInvoiceById?.status}
              color={
                invoiceData?.findInvoiceById?.status === "DRAFT"
                  ? "primary"
                  : invoiceData?.findInvoiceById?.status === "BILLED"
                  ? "success"
                  : "warning"
              }
              sx={{ mb: 2 }}
            />
            <div>
              <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message='Success update'
              />
            </div>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={4}>
                <Controller
                  name='customer'
                  control={control}
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
                          sx={{ p: 0 }}
                          value={value}
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
                  //@ts-ignore
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
            <FormControl>
              <FormLabel id='demo-row-radio-buttons-group-label'>
                Payment Term
              </FormLabel>
              <Controller
                rules={{ required: true }}
                control={control}
                name='term'
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <RadioGroup
                      row
                      value={value}
                      onChange={(event, value) => {
                        onChange(value);
                        //@ts-ignore
                        setValue("term", parseInt(value));
                        setValue(
                          "dueDate",
                          moment()
                            .add(watch("term"), "days")
                            .format("YYYY-MM-DD")
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
              Due Date :{" "}
              {moment().add(watch("term"), "days").format("YYYY-MM-DD")}
            </Box>
            <h3>List of items </h3>
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
                          label='Item name'
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
                              <InputAdornment position='start'>
                                $
                              </InputAdornment>
                            ),
                          }}
                          label='price'
                          value={value}
                          onChange={(e) => {
                            const filledtPrice = e.target.value;
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
                          size='small'
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
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                $
                              </InputAdornment>
                            ),
                          }}
                          label='amount'
                          value={value}
                          size='small'
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
            <Typography variant='h6' gutterBottom component='div'>
              Total :
              {watch()
                //@ts-ignore
                .items?.map((item) => item.amount)
                .reduce((prev, curr) => prev + curr, 0)}
            </Typography>
            <Box sx={{ mt: 2, mb: 2 }} />
            Additional details
            <Controller
              //@ts-ignore
              name='description'
              control={control}
              defaultValue=''
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
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
            <Stack direction='row' spacing={2}>
              <Button
                type='submit'
                variant='outlined'
                color='success'
                disabled={isSubmitting}
                onClick={() =>
                  setInvoiceStatus({
                    status: "SAVE",
                  })
                }
              >
                Save
              </Button>
              <Button
                type='submit'
                variant='outlined'
                disabled={isSubmitting}
                onClick={() =>
                  setInvoiceStatus({
                    status: "BILLED",
                  })
                }
              >
                Billed
              </Button>
              <Button
                type='submit'
                variant='outlined'
                color='error'
                disabled={isSubmitting}
                onClick={() =>
                  setInvoiceStatus({
                    status: "CANCEL",
                  })
                }
              >
                Cancel
              </Button>
            </Stack>
          </form>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper
          sx={{
            borderRadius: 5,
            pt: 2,
            pb: 2,
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
          }}
          elevation={0}
        >
          <Box>
            <Typography variant='h4' sx={{ textAlign: "center" }}>
              Timeline
            </Typography>
            <Timeline>
              {historyData?.findinvoiceHistory?.map((inv, id) => (
                <TimelineItem>
                  <TimelineOppositeContent color='text.secondary'>
                    <Typography variant='caption'>
                      {moment(new Date(+inv?.createdAt)).format(
                        "D-MMM-YY:h:mm a"
                      )}
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color='primary' />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    {" "}
                    <Typography variant='caption'>
                      {inv?.description}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>

            <Typography variant='subtitle2' align='center'>
              Created at :
              {moment(
                new Date(+invoiceData?.findInvoiceById?.createdAt)
              ).format("D-MMM-YY")}
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default withAuth(FindinvoiceById);
