export const useRegister = async (user) => {
  try {
    const res = await fetch("http://localhost:5000/api/v1/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return "Registration Failed";
  }
};

export const useLogin = async (user) => {
  try {
    const res = await fetch("http://localhost:5000/api/v1/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return "Login Failed";
  }
};
