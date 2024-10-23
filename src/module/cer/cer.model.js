
const {model ,Schema} = require('mongoose');

const CertificationSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  NationnalCode:{
    type: Number,
    required: true,
    trim: true
  },  
  couresName: {
    type: String,
    trim: true
  },
  issuingOrganization: {
    type: String,
    required: true,
    trim: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  expiryDate: {
    type: Date
  },
  credentialId: {
    type: String,
    trim: true
  },
  verificationUrl: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'revoked'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

CertificationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const CerModel=model('Certification', CertificationSchema)
module.exports= {CerModel};
