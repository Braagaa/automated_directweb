(async function () {
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const usersListElm = document.querySelector(".users");
  const users = new Set();
  const [
    pushButton,
    addButton,
    loginButton,
    registerButton,
  ] = document.getElementsByTagName("button");
  const noop = () => {};

  const createElement = (tagName, classes = []) => {
    const elm = document.createElement(tagName);
    classes.forEach((className) => elm.classList.add(className));
    return elm;
  };

  const createUser = (username, id) => {
    if (users.has(id)) return;

    const userElm = createElement("div", ["user"]);
    const userNameElm = createElement("span", ["user__name"]);
    const userIdElm = createElement("span", ["user__id"]);
    const deleteButtonElm = createElement("button");

    userNameElm.textContent = username;
    userIdElm.textContent = id;
    deleteButtonElm.textContent = "Delete";

    userElm.appendChild(userNameElm);
    userElm.appendChild(userIdElm);
    userElm.appendChild(deleteButtonElm);
    usersListElm.appendChild(userElm);
    users.add(id);
  };

  registerButton.addEventListener("click", async () => {
    try {
      //user.id
      const { username, user } = await dw.register(usernameInput.value);
      alert(`${username} successfully registered!`);
      createUser(username, user.id);
    } catch (e) {
      console.log(e);
      alert(e.message);
    } finally {
      usernameInput.value = "";
    }
  });

  loginButton.addEventListener("click", async () => {
    try {
      const { username, user } = await dw.login(usernameInput.value);
      alert(`${username} successfully logged in!`);
      createUser(username, user.id);
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

  usersListElm.addEventListener("click", async (event) => {
    const elm = event.target;
    if (elm.tagName === "BUTTON") {
      const userId = elm.previousElementSibling.textContent;
      if (elm.textContent === "Delete") {
        try {
          const res = await fetch(`/management/delete/${userId}`);
          const data = await res.json();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
    }
  });
})();
