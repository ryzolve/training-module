'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useUserStore } from 'src/states/auth-store';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const CATEGORY_OPTIONS = [
  { label: 'General', value: 'general' },
  { label: 'Technical', value: 'technical' },
  { label: 'Billing', value: 'billing' },
  { label: 'Certificate', value: 'certificate' },
  { label: 'Other', value: 'other' },
];

export default function SupportHelpdeskForm() {
  const userData = useUserStore((state) => state.UserData);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const HelpdeskSchema = Yup.object().shape({
    fullname: Yup.string().required('Full name is required'),
    email: Yup.string().email('That is not an email').required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    category: Yup.string().required('Category is required'),
    message: Yup.string().required('Message is required'),
  });

  const defaultValues = useMemo(
    () => ({
      fullname: userData?.username || '',
      email: userData?.email || '',
      subject: '',
      category: 'general',
      message: '',
    }),
    [userData?.email, userData?.username]
  );

  const methods = useForm({
    resolver: yupResolver(HelpdeskSchema),
    defaultValues,
  });

  useEffect(() => {
    methods.reset(defaultValues);
  }, [defaultValues, methods]);

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError('');
    setSubmitSuccess('');

    const dataPayload = {
      ...values,
      source: 'training-module',
      status: 'open',
    };

    if (userData?.id) {
      dataPayload.user = userData.id;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/support-tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
        },
        body: JSON.stringify({ data: dataPayload }),
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}));
        const apiMessage = errorPayload?.error?.message || errorPayload?.message;
        throw new Error(apiMessage || 'Unable to submit ticket');
      }

      await response.json().catch(() => ({}));
      setSubmitSuccess('Your help desk ticket was submitted. TJ will follow up soon.');
      reset({
        ...defaultValues,
        subject: '',
        category: 'general',
        message: '',
      });
    } catch (error) {
      setSubmitError(error?.message || 'Unable to submit your ticket right now.');
    }
  });

  return (
    <Box sx={{ mt: { xs: 6, md: 10 } }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Help Desk
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        Submit a ticket for direct support from TJ. For real-time help, use the chat widget.
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={2.5}>
          <RHFTextField name="fullname" label="Full name" />
          <RHFTextField name="email" label="Email" />
          <RHFTextField name="subject" label="Subject" />

          <RHFTextField select name="category" label="Category">
            {CATEGORY_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </RHFTextField>

          <RHFTextField name="message" label="Message" multiline rows={5} />

          {submitSuccess && <Alert severity="success">{submitSuccess}</Alert>}
          {submitError && <Alert severity="error">{submitError}</Alert>}

          <LoadingButton loading={isSubmitting} type="submit" variant="contained" color="secondary">
            Submit Ticket
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
}
