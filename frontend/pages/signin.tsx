import { useLoginMutation } from "../generated";
import withoutAuth from "../utils/withoutAuth";
import { CURRENT_USER_QUERY } from "./components/User";
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

type FormInputs = {
  username: string;
  password: string;
  SeverError: string;
};

const Signin = () => {
  const [signin, { data, loading, error }] = useLoginMutation({
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    try {
      await signin({ variables: data });
    } catch (err) {
      // console.log(err.graphQLErrors[0].message);
      setError("SeverError", {
        type: "server",
        message: err.graphQLErrors[0].message,
      });
    }
  };

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      style={{ minHeight: "70vh" }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <Controller
          name='username'
          control={control}
          defaultValue=''
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label='User Name'
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              fullWidth
            />
          )}
          rules={{ required: "User name required" }}
        />
        <Box mt={2} />
        <Controller
          name='password'
          control={control}
          defaultValue=''
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label='password'
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              type='password'
              fullWidth
            />
          )}
          rules={{ required: "Password required" }}
        />
        {errors.SeverError && <p>{errors.SeverError.message}</p>}

        <Box mt={4} />
        <Button
          type='submit'
          color='primary'
          onClick={() => clearErrors()}
          fullWidth
        >
          login
        </Button>
      </form>
    </Box>
  );
};

export default withoutAuth(Signin);
