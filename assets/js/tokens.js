const createAuthtoken = async (username, type) => {
  try {
    const res = await fetch("/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, type }),
    });
    const data = await res.json();
    if (res.ok) return data.token;
    throw data;
  } catch (error) {
    throw error;
  }
};
