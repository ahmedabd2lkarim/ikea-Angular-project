module.exports = {
    validateEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
    validatePassword: function (password) {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    },
  
    validateMobileNumber: /^[0-9]{10,15}$/ 
  };
  