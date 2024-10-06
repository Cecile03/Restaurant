import { SnackbarBuilder } from "./utils/snackbar.js";

const divUser = document.querySelector(".user");
const divName = document.querySelector(".name");
const divEmail = document.querySelector(".email");

const trash = document.querySelector(".trash-btn");
const modify = document.querySelector(".pencil-btn");
const cancel = document.querySelector(".cancel-btn");
const check = document.querySelector(".check-btn");

const username = document.createElement("p");
const email = document.createElement("p");
const titlePassword = document.createElement("p");
const divPassword = document.createElement("div");

const userName = document.createElement("input");
const eMail = document.createElement("input");
const password = document.createElement("input");

trash.addEventListener("click", () => {
  deleteUSer(getCookie("userId"), getCookie("token"))
    .then((result) => {
      if (result.status !== 200)
        throw new Error("Erreur lors de la suppression de l'utilisateur");
      else {
        deleteCookie("token");
        deleteCookie("username");
        deleteCookie("userId");
        deleteCookie("email");
        window.location.href = "/html/accueil.html";
        new SnackbarBuilder("Modification de l'utilisateur réussie")
          .buildSuccess()
          .render(document.querySelector(".snackbar-container"));
      }
    })
    .catch(() => {
      new SnackbarBuilder("Erreur lors de la suppression de l'utilisateur")
        .buildError()
        .render(document.querySelector(".snackbar-container"));
    });
});

modify.addEventListener("click", () => {
  userName.value = username.textContent;
  eMail.value = email.textContent;

  username.remove();
  email.remove();

  eMail.type = "email";
  userName.type = "text";
  password.type = "password";
  titlePassword.textContent = "Mot de passe : ";

  titlePassword.classList.add("title");
  divPassword.classList.add("password");

  cancel.classList.remove("hidden");
  check.classList.remove("hidden");
  trash.classList.add("hidden");
  modify.classList.add("hidden");

  divUser.appendChild(divPassword);
  divPassword.appendChild(titlePassword);
  divPassword.appendChild(password);
  divName.appendChild(userName);
  divEmail.appendChild(eMail);
});

if (!isUserLoggedIn()) {
  document.location.href = "/html/login.html";
}

check.addEventListener("click", async () => {
  if (userName.value === "" || eMail.value === "" || password.value === "") {
    new SnackbarBuilder("Veuillez remplir tous les champs")
      .buildWarning()
      .render(document.querySelector(".snackbar-container"));
    return;
  } else {
    console.log(document.cookie);
    console.log(getCookie("userId"));
    console.log(getCookie("token"));
    modifUser(
      getCookie("userId"),
      getCookie("token"),
      userName.value,
      eMail.value,
      password.value
    )
      .then(async (result) => {
        console.log("result modification", result);
        if (result.status !== 200)
          throw new Error("Erreur lors de la modification de l'utilisateur");
        else {
          deleteCookie("username");
          deleteCookie("email");
          setCookie("username", userName.value, 1);
          setCookie("email", eMail.value, 1);
          location.reload();
          new SnackbarBuilder("Modification de l'utilisateur réussie")
            .buildSuccess()
            .render(document.querySelector(".snackbar-container"));
        }
      })
      .catch(() => {
        new SnackbarBuilder("Erreur lors de la modification de l'utilisateur")
          .buildError()
          .render(document.querySelector(".snackbar-container"));
      });
  }

  trash.classList.remove("hidden");
  modify.classList.remove("hidden");
  cancel.classList.add("hidden");
  check.classList.add("hidden");

  userName.remove();
  eMail.remove();
  password.remove();
  titlePassword.remove();

  await generateCompte();
});

cancel.addEventListener("click", () => {
  trash.classList.remove("hidden");
  modify.classList.remove("hidden");
  cancel.classList.add("hidden");
  check.classList.add("hidden");

  userName.remove();
  eMail.remove();
  password.remove();
  titlePassword.remove();

  generateCompte();
});

const generateCompte = async () => {
  try {
    username.textContent = getCookie("username");
    email.textContent = getCookie("email");

    divName.appendChild(username);
    divEmail.appendChild(email);
  } catch (err) {
    console.log(err);
  }
};

const modifUser = async (id, token, user, mail, pass) => {
  try {
    const result = await fetch("/api/user/" + id, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        idUser: id,
        username: user,
        email: mail,
        password: pass,
      }),
    });

    return result;
  } catch (err) {
    return {
      status: 500,
      message: "Erreur lors de la modification de l'utilisateur",
      error: err,
    };
  }
};

const deleteUSer = async (id, token) => {
  try {
    const result = await fetch("/api/user/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    return result;
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: "Erreur lors de la suppression de l'utilisateur",
      error: err,
    };
  }
};

function getCookie(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}

function deleteCookie(cookieName) {
  document.cookie =
    cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function setCookie(cookieName, cookieValue, expirationDays) {
  const date = new Date();
  date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);

  const expires = "expires=" + date.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

generateCompte();

function isUserLoggedIn() {
  return getCookie("token") !== null;
}
