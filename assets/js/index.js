(async function () {
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const [
    pushButton,
    addButton,
    loginButton,
    registerButton,
  ] = document.getElementsByTagName("button");
  const noop = () => {};

  registerButton.addEventListener("click", async () => {
    try {
      //user.id
      const { username } = await dw.register(usernameInput.value);
      alert(`${username} successfully registered!`);
    } catch (e) {
      console.log(e);
      alert(e.message);
    } finally {
      usernameInput.value = "";
    }
  });

  loginButton.addEventListener("click", async () => {
    try {
      const { username } = await dw.login(usernameInput.value);
      alert(`${username} successfully logged in!`);
    } catch (e) {
      console.log(e);
      alert(e.message);
    } finally {
      usernameInput.value = "";
    }
  });

  pushButton.addEventListener("click", async () => {
    try {
      await dw.pushAuthentication(usernameInput.value, noop, {
        transient_email: emailInput.value,
      });
      alert("Push auth successful!");
    } catch (e) {
      console.log(e);
      alert(e.message);
    } finally {
      usernameInput.value = "";
      emailInput.value = "";
    }
  });

  addButton.addEventListener("click", async () => {
    try {
      await dw.addAuthenticator(usernameInput.value, noop, {
        transient_email: emailInput.value,
      });
      alert("Add auth successful!");
    } catch (e) {
      console.log(e);
      alert(e.message);
    } finally {
      usernameInput.value = "";
      emailInput.value = "";
    }
  });
})();
