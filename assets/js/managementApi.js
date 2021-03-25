const usersListElm = document.querySelector(".users");
const users = {};

const createElement = (tagName, classes = []) => {
  const elm = document.createElement(tagName);
  classes.forEach((className) => elm.classList.add(className));
  return elm;
};

const createUser = (username, id) => {
  if (users[id]) return;

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
  users[id] = userElm;
};

usersListElm.addEventListener("click", async (event) => {
  const elm = event.target;
  if (elm.tagName === "BUTTON") {
    const userId = elm.previousElementSibling.textContent;
    const username =
      elm.previousElementSibling.previousElementSibling.textContent;
    if (elm.textContent === "Delete") {
      try {
        const res = await fetch(`/management/users/delete`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ username }),
        });

        if (res.status === 204) {
          const userElm = users[userId];
          userElm.remove();
          delete users[userId];
        } else {
          const data = await res.json();
          if (!res.ok) throw data;
          console.log(data);
        }
      } catch (error) {
        console.log("ERROR: " + error.message);
      }
    }
  }
});
