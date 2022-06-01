const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  accessToken: {
    type: 'String',
    trim: true,
    required: true,
  },
  refreshToken: {
    type: 'String',
    trim: true,
    required: true,
  },
  expiresInAccess: {
    type: 'Number',
    required: true,
  },
  expiresInRefresh: {
    type: 'Number',
    required: true,
  },
  fingerprint: {
    type: 'String',
    trim: true,
    required: true,
  },
});

const ModelToken = mongoose.model('Token', tokenSchema);

export default ModelToken;
