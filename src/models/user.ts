const mongoose = require('mongoose');
const validator = require('validator');

const isRequiredError = (field: string): string => {
  return `${field} is required`;
};

const EMAIL_VALIDATE_ERROR = 'Please fill a valid email address';

export const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      sparse: true,
      required: isRequiredError('Email address'),
      validate: [validator?.isEmail, EMAIL_VALIDATE_ERROR],
    },
    login: {
      type: String,
      unique: true,
      required: isRequiredError('Login'),
      minlength: 5,
    },
    password: {
      type: String,
      required: isRequiredError('Password'),
      minlength: 5,
    },
    name: {
      type: String,
      required: isRequiredError('Name'),
    },
    surname: {
      type: String,
      required: isRequiredError('Surname'),
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: isRequiredError('Role'),
    },
    activationLink: {
      type: String,
      required: isRequiredError('Activation link'),
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const ModelUser = mongoose.model('User', userSchema);

export default ModelUser;
