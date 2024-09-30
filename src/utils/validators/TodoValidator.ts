import * as yup from 'yup';
import { UserAttributes } from '../../Model/User';

export const todoCreateValidator = async (user: UserAttributes) => {

  if (user && user.todos.length >= 5) {
    throw new Error('User already has 5 todos');
  }

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    detail: yup.string(),
  });

  return schema;
};
