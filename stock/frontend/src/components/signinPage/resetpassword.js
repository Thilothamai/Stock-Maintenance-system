import React, { useState } from "react";
import axios from "axios";

const ResetPassword = ({ match }) => {
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { resetToken } = match.params;

    try {
      const response = await axios.post("http://localhost:8000/api/resetpassword", {
        resetToken,
        newPassword,
      });

      setSuccessMessage(response.data.message);
      setErrorMessage("");
    } catch (error) {
      console.error("Error resetting password:", error);
      setErrorMessage("Error resetting password");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password:</label>
          <input type="password" value={newPassword} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default ResetPassword;
