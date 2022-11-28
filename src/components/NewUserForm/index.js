import React from 'react';
import { Form } from 'react-final-form';
import * as yup from 'yup';
import { TextField, Checkboxes, Radios, Select, DatePicker, TimePicker } from 'mui-rff';
import { MenuItem, Typography, Link, Grid, Button, CssBaseline } from '@mui/material';
import { Paper, Container } from './styles';

import DateFnsUtils from '@date-io/date-fns';
import { validateFormValues } from '../../helpers/yupWithFinalForm';

const onSubmit = async (values) => {
  alert(JSON.stringify(values, 0, 2));
};

const validationSchema = yup.object({
  firstName: yup.string().required('Required'),
});

const validate = validateFormValues(validationSchema);

const formFields = [
  {
    size: 6,
    field: <TextField label="First Name" name="firstName" margin="none" required={true} />,
  },
  {
    size: 6,
    field: <TextField label="Last Name" name="lastName" margin="none" required={true} />,
  },
  {
    size: 12,
    field: <TextField type="email" label="Email" name="email" margin="none" required={true} />,
  },
  {
    size: 12,
    field: (
      <Checkboxes
        name="employed"
        formControlProps={{ margin: 'none' }}
        data={{ label: 'Employed', value: true }}
      />
    ),
  },
  {
    size: 12,
    field: (
      <Radios
        label="Best Stooge"
        name="stooge"
        formControlProps={{ margin: 'none' }}
        radioGroupProps={{ row: true }}
        data={[
          { label: 'Larry', value: 'larry' },
          { label: 'Moe', value: 'moe' },
          { label: 'Curly', value: 'curly' },
        ]}
      />
    ),
  },
  {
    size: 12,
    field: (
      <Checkboxes
        label="Sauces"
        name="sauces"
        formControlProps={{ margin: 'none' }}
        formGroupProps={{ row: true }}
        data={[
          { label: 'Ketchup', value: 'ketchup' },
          { label: 'Mustard', value: 'mustard' },
          { label: 'Salsa', value: 'salsa' },
          { label: 'Guacamole 🥑', value: 'guacamole' },
        ]}
      />
    ),
  },
  {
    size: 12,
    field: <TextField name="notes" multiline label="Notes" margin="none" />,
  },
  {
    size: 12,
    field: (
      <Select name="city" label="Select a City" formControlProps={{ margin: 'none' }}>
        <MenuItem value="London">London</MenuItem>
        <MenuItem value="Paris">Paris</MenuItem>
        <MenuItem value="Budapest">A city with a very long Name</MenuItem>
      </Select>
    ),
  },
  {
    size: 6,
    field: (
      <DatePicker
        name="rendez-vous"
        margin="normal"
        label="Rendez-vous"
        dateFunsUtils={DateFnsUtils}
      />
    ),
  },
  {
    size: 6,
    field: <TimePicker name="alarm" margin="normal" label="Alarm" dateFunsUtils={DateFnsUtils} />,
  },
];

export function NewUserForm() {
  return (
    <Container>
      <CssBaseline />
      <Form
        onSubmit={onSubmit}
        // initialValues={{ firstName: '', lastName: '', email: '' }}
        validate={validate}
        render={({ handleSubmit, submitting, pristine, values, form }) => (
          <form
            noValidate
            onSubmit={(event) => {
              const isValid = form.getState().valid;
              isValid
                ? handleSubmit(event).then(() => {
                    form.restart();
                  })
                : handleSubmit(event);
            }}
          >
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                {formFields.map((item, idx) => (
                  <Grid item xs={item.size} key={idx}>
                    {item.field}
                  </Grid>
                ))}
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={() => form.restart()}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button variant="contained" color="primary" type="submit" disabled={submitting}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </Container>
  );
}
