// Importing necessary modules
const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

// Defining the User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 30,
      minLength: 2,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    encrypted_password: {
      type: String,
      required: true,
    },
    salt: String,
    resetPasswordToken: String, // Field to store reset password token
    resetPasswordExpire: Date, // Field to store reset password token expiration time
  },
  { timestamps: true }
);

// Virtual field to handle password encryption
userSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = uuidv4();
    this.encrypted_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  });

// Methods associated with user schema
userSchema.methods = {
  authenticate: function(plainpassword) {
    return this.securePassword(plainpassword) === this.encrypted_password;
  },
  securePassword: function(plainpassword) {
    if (!plainpassword) return '';
    try {
      return crypto
        .createHmac('sha256', this.salt)
        .update(plainpassword)
        .digest('hex');
    } catch (error) {
      console.error('Error hashing password:', error);
      return '';
    }
  },
  generateResetToken: function() {
    // Generate a unique reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    // Set/reset token and expiration time in the user document
    this.resetPasswordToken = resetToken;
    this.resetPasswordExpire = Date.now() + 3600000; // 1 hour
    return resetToken;
  }
};

// Export the user schema as User model
module.exports = mongoose.model('User', userSchema);
