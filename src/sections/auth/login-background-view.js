'use client';

import axios from 'axios';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';
import { axiosClient } from 'src/utils/axiosClient';
import { useUserStore } from 'src/states/auth-store';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function LoginBackgroundView() {
  const passwordShow = useBoolean();

  const [loginError, setLoginError] = useState('');
  const [userCourses, setUserCourses] = useState([]);

  const userdata = useUserStore((store) => store?.UserData);

  const updateUserData = useUserStore((store) => store?.updateUserData);

  const router = useRouter();

  const getUserCourses = async () => {
    const data = await axiosClient.get('/api/user-courses', {
      headers: {
        Authorization: `Bearer ${userdata.authToken}`,
      },
    });
    console.log('userdata working');
    setUserCourses(data.data);
    if (data?.data.length > 0) {
      router.push('/account/my-learning');
    } else {
      router.push('/courses');
    }
  };

  console.log('userCourses', userCourses);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('That is not an email'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password should be of minimum 6 characters length'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!userdata?.isLoggedIn || !userdata?.authToken) {
      return;
    }

    getUserCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userdata?.isLoggedIn, userdata?.authToken]);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { email: identifier, password } = data;
      const response = await axios.post(process.env.NEXT_PUBLIC_LOGIN_URL, {
        identifier,
        password,
      });
      const resData = await response.data;

      console.log({ resData });

      const { jwt } = resData;
      localStorage.setItem('token', jwt);

      console.log({ jwt });

      if (resData.jwt) {
        const userData = {
          authToken: resData.jwt,
          isLoggedIn: resData.user.confirmed,
          ...resData.user,
        };
        updateUserData(userData);
      } else {
        setLoginError(resData.message[0].messages[0].message);
      }
    } catch (error) {
      setLoginError('Somthing went wrong');
    }
  });

  const renderHead = (
    <div>
      <Typography variant="h3" paragraph>
        Login
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {`Don’t have an account? `}
        <Link
          component={RouterLink}
          href={paths.registerBackground}
          variant="subtitle2"
          color="secondary"
        >
          Create account
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
      <Stack spacing={2.5} alignItems="flex-end">
        <RHFTextField name="email" label="Email address" />

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

        <Link
          component={RouterLink}
          href={paths.forgotPassword}
          variant="body2"
          underline="always"
          color="text.secondary"
        >
          Forgot password?
        </Link>

        <LoadingButton
          fullWidth
          color="secondary"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
        {loginError && <Alert severity="warning">{loginError}</Alert>}
      </Stack>
    </FormProvider>
  );

  return (
    <>
      {renderHead}

      {renderForm}

      {/* <Divider>
        <Typography variant="body2" sx={{ color: 'text.disabled' }}>
          or continue with
        </Typography>
      </Divider>

      {renderSocials} */}
    </>
  );
}
