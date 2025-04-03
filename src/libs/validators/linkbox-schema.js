import * as yup from 'yup'

export const linkboxSchema = yup.object().shape({
  linkName: yup
    .string()
    .required('Link name is required')
    .trim()
    .matches(/^[a-zA-ZÑñ0-9 ]+$/, 'Only letters and positive numbers are allowed')
    .test('no-only-spaces', 'Link name cannot be only spaces', (value) => !!value.trim()),
  originalUrl: yup
    .string()
    .required('Page or site link is required')
    .matches(/^https:\/\/\S+$/, 'Only https:// and cannot contain spaces')
})
