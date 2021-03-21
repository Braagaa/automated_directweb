(async function () {
  const usernameInput = document.querySelector("input");
  const authenticateButton = document.querySelector("button");

  authenticateButton.addEventListener("click", async () => {
    const sessionId = new URLSearchParams(location.search).get("session");
    try {
      await dw.login(usernameInput.value, {
        remote_session: {
          session_id: sessionId,
        },
      });
      alert("Successfully added authenticator!");
      window.location.replace("/");
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  });
})();
