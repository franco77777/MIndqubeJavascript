const $ = (selector) => document.querySelector(selector);
const $all = (selector) => document.querySelectorAll(selector);
const $listContacts = $("#list-contacts");
const $headerList = $("#header-list");
const $header = $("#header");
const $mindqube = $("#mindqube");
const $bodyMessages = $("#body-messages");
const $iconHeader = $("#icon-header");
const $divHeader = $("#header-div");

//////////////////////////////CONTACTS LOGIC///////////////////////////////////////
// var url = "https://mindqubewhatsapp.onrender.com/webhook/users";
//var data = { username: "example" };
// fetch(url, {
//   method: "GET", // or 'PUT'
//   //body: JSON.stringify(data), // data can be `string` or {object}!
//   // headers: {
//   //   "Content-Type": "application/json",
//   // },
// })
//   .then((res) => res.json())
//   .then((res) => {
//     console.log("im fetch res", res);
//     return res;
//   })
//   //   .then((res) =>
//   //     res ? sortmessages(res) : console.log("empty fetch useEffect")
//   //   )
//   .then((res) => (users = res))

//   .catch((error) => console.error("Error:", error));

//console.log("soy users", users);
//$contacts.innerHTML = `<li>${"hola"}</li>`;
let users = [
  {
    id: 1,
    name: "Franco Vedia",
    phone: "5493875610606",
    whatsapp: [
      {
        id: 1,
        message: "hola amigo",
        name: "Franco Vedia",
        status: "received",
        whatsapp_id:
          "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjBGOURBQjg2RDhGRDBBQ0UxNzEA",
        timestamp: "1700092452",
      },
      {
        id: 2,
        message: "que tal, todo bien ?",
        name: "Mindqube",
        status: "read",
        whatsapp_id:
          "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABEYEjM4OEIzQ0EwN0IwQzUzMEVEQwA=",
        timestamp: "1700092486",
      },
      {
        id: 4,
        message: "hola",
        name: "Franco Vedia",
        status: "delivered",
        whatsapp_id:
          "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjA3RUQ4NzA0MzA4QkYwNDQ3MDcA",
        timestamp: "1700092673",
      },
    ],
  },
  {
    id: 2,
    name: "Ana",
    phone: "5493875295146",
    whatsapp: [
      {
        id: 3,
        message: "Hola",
        name: "Ana",
        status: "received",
        whatsapp_id:
          "wamid.HBgNNTQ5Mzg3NTI5NTE0NhUCABIYIEZEOTM1MTkxOEZGRTNFNDhCODM5MjZCRDdGNDUyNzVCAA==",
        timestamp: "1700092603",
      },
      {
        id: 6,
        message: "123456789012345678901234567890123456789012345",
        name: "Mindqube",
        status: "sent",
        whatsapp_id:
          "wamid.HBgNNTQ5Mzg3NTI5NTE0NhUCABEYEkVDQ0IxREY5QjM5NjUwOTUzRgA=",
        timestamp: "1700092753",
      },
    ],
  },
];
const sortmessages = (array) => {
  for (let i = 0; i < array.length; i++) {
    array[i].whatsapp.sort((a, b) => a.timestamp - b.timestamp);
  }
  array.sort(
    (a, b) =>
      b.whatsapp[b.whatsapp.length - 1].timestamp -
      a.whatsapp[a.whatsapp.length - 1].timestamp
  );
  return array;
};
let test = true;
let checked = (e) => {
  let status = e.whatsapp[e.whatsapp.length - 1].status;
  switch (status) {
    case "delivered":
      return "<i data-lucide=check class=listContacts__image--checked-one ></i>";
    case "read":
      return "<i data-lucide=check-check class=listContacts__image--checked-two></i>";
    case "sent":
      return "<i data-lucide=check-check class=listContacts__image--checked-one></i>";
    default:
      return "";
  }
};

let imgProfile = null;
const previewMessage = (e) => {
  let message = e.whatsapp[e.whatsapp.length - 1].message;
  if (message.length > 30) {
    let cutMessage = message.slice(0, 25) + "...";
    return cutMessage;
  } else {
    return message;
  }
};

function bindingFunction() {
  document.getElementsByName("login").onclick = function () {
    alert("blah");
    //     Your code
  };
}

users = sortmessages([...users]);
const fragment = document.createDocumentFragment();
const template = document.querySelector("#template-icon").content;

const setMessages = (e) => {
  setHeader(e);
  setBody(e);
};
const setHeader = (e) => {
  $iconHeader.classList.remove("hidden");
  $divHeader.innerHTML = `
  <div class="flex flex-col justify-center text-white">
     <div class="text-lg font-normal">${e.name}</div>
    <span class="text-xs text-[#82929b]">${e.timestamp}</span>
    </div>`;
};
const setBody = (user) => {
  $bodyMessages.innerHTML = "";
  user.whatsapp.map((e, i) => {
    $bodyMessages.innerHTML += `
    <div class="relative w-full  ">
    <div class="w-max  ${e.name === "Mindqube" ? "ml-auto mr-0" : ""}">
      <div>${e.name}</div>
      <div>${e.message}</div>
      <div>${user.phone}</div>
      <div>${e.timestamp}</div>
      <div>${e.status}</div>
    </div>
  </div>`;
  });
};

let valueTest = null;
users.map((e) => {
  const li = document.createElement("li");
  li.innerHTML = `<li name=contact id=contact-id class="pl-2 text-white bg-[#121b21] h-[72px] flex gap-2 items-center hover:bg-[#2a3942] cursor-pointer">
     <i data-lucide=user-circle-2 class=imageprofile></i>
     <div class=listContacts__border--bottom>
      <div class= "text-lg font-normal">${e.name}</div>
      <div class="flex justify-start items-center gap-1">
       ${checked(e)}
       <span class="text-sm text-[#82929b]">
        ${previewMessage(e)}
       </span>
      </div>
     </div>
    </li>`;
  //$(`[name='contact${e.id}']`).test = "test";
  li.addEventListener("click", () => setMessages(e));
  $listContacts.appendChild(li);
});
// const $contact = $all("#contact-id");
// $contact.forEach((e) => e.addEventListener("click", setMessages));

////////////////////////////////////////////////HEADER LOGIC/////////////////////////////////

//const $contacts = $all("[name='contact']");
//$contacts.forEach((e) => e.addEventListener("click", setMessages));
