
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var winston = require('winston');
const User = require('./auth.model.js');
const { validationResult } = require('express-validator');
const logger = require('../../utills/log/winston.config.js');


class AuthController {
  constructor(){
  }
  async register(req, res,next) {
    try {
      
        const errorValidator = validationResult(req);
        if (!errorValidator) {
            logger.log('error', "error for faild in validateAuthRegisterschema \'"+error+"\'");
            return res.status(HttpStatusCode.NotImplemented).json({
                statusCodes: HttpStatusCode.NotImplemented,
                message: errorValidator
            });   
        }
        
      const { username, email, password } = req.body;
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const salt =  bcrypt.genSaltSync(10);
      const hashedPassword =  bcrypt.hashSync(password, salt);

      // Create new user
      const newUser = new User.create({
        username,
        email,
        password: hashedPassword
      });
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async login(req, res) {
    try {
        const errorValidator = validationResult(req);
        if (!errorValidator) {
            winston.log('error', "error for faild in validateAuthRegisterschema \'"+error+"\'");
            return res.status(HttpStatusCode.NotImplemented).json({
                statusCodes: HttpStatusCode.NotImplemented,
                message: errorValidator
            });   
        }
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).render('notexist');
      }

      // Check password
      const isMatch =  bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, { expiresIn: '1h' });
      const userSeasion=token+` userId:${id}`.user._id
      req.session.user=userSeasion
      res.json({ token, userId: user._id });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async getCurrentUser(req, res) {
    try {
      const user = await User.findById(req.userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;

      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check current password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update password
      user.password = hashedPassword;
      await user.save();

      res.json({ message: 'Password changed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async forgotPassword(req, res) {
    // Implement forgot password functionality
    // This could involve sending a reset password link to the user's email
    res.status(501).json({ message: 'Forgot password functionality not implemented yet' });
  }

  async resetPassword(req, res) {
    // Implement reset password functionality
    // This would be used after a user clicks on a reset password link
    res.status(501).json({ message: 'Reset password functionality not implemented yet' });
  }
  async logOut(req, res) {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error('Error during logout:', err);
          res.status(500).send('Logout failed');
        } else {
          res.redirect('/'); // Redirect to home after logout
        }
      });
    } else {
      res.redirect('/'); // No session, just redirect to home
    }

}

    // For session-based authentication
    
}

module.exports = new AuthController();
