const $ = (selector) => document.querySelector(selector);
const $contacts = $("#contacts");

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

users = sortmessages([...users]);
console.log("im sorte users", users);
users.map((e) => {
  $contacts.innerHTML += `<li class="pl-2 text-white bg-[#121b21] h-[72px] flex gap-2 items-center hover:bg-[#2a3942] cursor-pointer ">
                           <i data-lucide=user-circle-2 class=imageprofile></i>
                           <div class=listContacts__border--bottom>
                            <div class= "text-xl font-light">${e.name}</div>
                            <div class="flex justify-start items-center gap-1">
                             ${checked(e)}
                             <span class="text-sm text-[#82929b]">
                              ${previewMessage(e)}
                             </span>
                            </div>
                           </div>
                          </li>`;
});
