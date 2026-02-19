'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';
import { axiosClient } from 'src/utils/axiosClient';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// import { useUserStore } from '../../states/auth-store';

// ----------------------------------------------------------------------

export default function ChangePassword() {
  const passwordShow = useBoolean();
  const searchParams = useSearchParams();

  const code = searchParams.get('code');

  const [loginError] = useState('');
  const [success, setSuccess] = useState(false);

  const RegisterSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password should be of minimum 6 characters length'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], "Password's not match"),
  });

  const defaultValues = {
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    // reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const { password, confirmPassword } = data;
    console.log(password, confirmPassword);
    try {
      // Request API.
      axiosClient
        .post('/api/auth/reset-password', {
          code, // code contained in the reset link of step 3.
          password,
          passwordConfirmation: confirmPassword,
        })
        .then((response) => {
          console.log("Your user's password has been reset.");
          toast.success('Password changed successfully', {
            position: 'bottom-right',
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          setSuccess(true);
        })
        .catch((error) => {
          console.log('An error occurred:', error.response);
          toast.error('somthing went wrong', {
            position: 'bottom-right',
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        });
    } catch (error) {
      console.error(error);
    }
  });

  const renderHead = (
    <div>
      <Typography variant="h3" paragraph>
        Reset Password
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {`Already have an account? `}
        <Link
          component={RouterLink}
          href={paths.loginBackground}
          variant="subtitle2"
          color="primary"
        >
          Login
        </Link>
      </Typography>
    </div>
  );

  const renderSocials = (
    <Stack direction="row" spacing={2}>
      <Button fullWidth size="large" color="inherit" variant="outlined">
        <Iconify icon="logos:google-icon" width={24} />
      </Button>

      <Button fullWidth size="large" color="inherit" variant="outlined">
        <Iconify icon="carbon:logo-facebook" width={24} sx={{ color: '#1877F2' }} />
      </Button>

      <Button color="inherit" fullWidth variant="outlined" size="large">
        <Iconify icon="carbon:logo-github" width={24} sx={{ color: 'text.primary' }} />
      </Button>
    </Stack>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        {/* <RHFTextField name="userName" label="User Name" />

        <RHFTextField name="email" label="Email address" /> */}

        <RHFTextField
          name="password"
          label="Password"
          type={passwordShow.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={passwordShow.onToggle} edge="end">
                  <Iconify icon={passwordShow.value ? 'carbon:view' : 'carbon:view-off'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmPassword"
          label="Confirm Password"
          type={passwordShow.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={passwordShow.onToggle} edge="end">
                  <Iconify icon={passwordShow.value ? 'carbon:view' : 'carbon:view-off'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Reset Password
        </LoadingButton>
        {loginError && <Alert severity="warning">{loginError}</Alert>}

        <Typography variant="caption" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
          {`I agree to `}
          <Link color="text.primary" href="#" underline="always">
            Terms of Service
          </Link>
          {` and `}
          <Link color="text.primary" href="#" underline="always">
            Privacy Policy.
          </Link>
        </Typography>
      </Stack>
    </FormProvider>
  );

  return (
    <>
      {success ? (
        <Alert severity="success">
          Password changed successfully
          <Link
            component={RouterLink}
            href={paths.loginBackground}
            variant="subtitle2"
            color="primary"
          >
            Login
          </Link>
        </Alert>
      ) : (
        <>
          {' '}
          {renderHead}
          {renderForm}
          <Divider>
            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              or continue with
            </Typography>
          </Divider>
          {renderSocials}
        </>
      )}
    </>
  );
}
