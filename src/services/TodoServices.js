export const useSync = async (obj) => {
  try {
    const res = await fetch("http://localhost:5000/api/v1/todos/sync-todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return "Failed to sync todos";
  }
};
