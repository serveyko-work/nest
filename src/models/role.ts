const mongoose = require('mongoose');

const isRequiredError = (field: string): string => {
  return `${field} is required`;
};

export const roleSchema = mongoose.Schema(
  {
    role: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      sparse: true,
      required: isRequiredError('Email address'),
    },
  },
  { timestamps: true },
);

const ModelRole = mongoose.model('Role', roleSchema);

export default ModelRole;
