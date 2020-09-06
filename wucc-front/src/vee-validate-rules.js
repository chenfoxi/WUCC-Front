import {required, email, max, min, alpha_dash, confirmed, numeric, alpha} from 'vee-validate/dist/rules'
import { extend } from 'vee-validate'


extend('required', {
    ...required,
    message: '{_field_} can not be empty',
});

extend('email', {
    ...email,
    message: 'Email must be valid',
});

extend('max', {
    ...max,
    message: '{_field_} must be {length} characters or less',
});

extend('min', {
    ...min,
    message: '{_field_} must be {length} characters or more',
});

extend('alpha_dash', {
    ...alpha_dash,
    message: '{_field_} must only contain alphabetic characters, numbers, dashes or underscores',
});

extend('confirmed', {
    ...confirmed,
    message: '{_field_} confirmation does not match',
});

extend('numeric', {
    ...numeric,
    message: '{_field_} must only contain numbers',
});

extend('alpha', {
    ...alpha,
    message: '{_field_} must only contain alphabet'
});
