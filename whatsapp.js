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
$contacts.innerHTML = `<li>${"hola"}</li>`;
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
        status: "received",
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
        message: "hola1",
        name: "Mindqube",
        status: "read",
        whatsapp_id:
          "wamid.HBgNNTQ5Mzg3NTI5NTE0NhUCABEYEkVDQ0IxREY5QjM5NjUwOTUzRgA=",
        timestamp: "1700092753",
      },
    ],
  },
];
users.map((e) => {
  $contacts.innerHTML = `<li>${e.name}</li>`;
});
