import { error } from './notifications';

export const handleAjaxError = (err) => {
  error('Something went wrong');
  console.warn(err);
};

export const isEmptyObject = obj => Object.keys(obj).length === 0;

export const validatePost = (post) => {
  const errors = {};

  if (post.title === '') {
    errors.title = 'You must enter a Title';
  }

  if (post.description === '') {
    errors.description = 'You must enter a Description';
  }

  if (post.image === '') {
    errors.image = 'You must provide a valid image URL';
  }

  return errors;
}
