const $ = (selector) => document.querySelector(selector);
const $all = (selector) => document.querySelectorAll(selector);
const $listContacts = $("#list-contacts");
const $headerList = $("#header-list");
const $header = $("#header");
const $mindqube = $("#mindqube");
const $bodyMessages = $("#body-messages");

const $divHeader = $("#header-div");
const $inputChat = $("#chat-floating");
const $sendMessage = $("#sendMessage");

//////////////////////////////CONTACTS LOGIC///////////////////////////////////////
let chatMessages = null;
let users = [];
var stompClient = null;
var url = "https://mindqubewhatsapp.onrender.com/webhook/users";
fetch(url, {
  method: "GET",
})
  .then((res) => res.json())
  .then((res) => {
    console.log("im fetch res", res);
    return res;
  })
  .then((res) =>
    res ? sortmessages(res) : console.log("empty fetch useEffect")
  )
  .then((res) => (users = res))
  .then((res) => setContactsList(res))

  .catch((error) => console.error("Error:", error));

console.log("soy users", users);

// let users2 = [
//   {
//     id: 1,
//     name: "Franco Vedia",
//     phone: "5493875610606",
//     whatsapp: [
//       {
//         id: 1,
//         message: "hola amigo",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjBGOURBQjg2RDhGRDBBQ0UxNzEA",
//         timestamp: "1700092452",
//       },
//       {
//         id: 2,
//         message: "que tal, todo bien ?",
//         name: "Mindqube",
//         status: "read",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABEYEjM4OEIzQ0EwN0IwQzUzMEVEQwA=",
//         timestamp: "1700092486",
//       },
//       {
//         id: 4,
//         message: "hola",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjA3RUQ4NzA0MzA4QkYwNDQ3MDcA",
//         timestamp: "1700092673",
//       },
//       {
//         id: 1,
//         message: "hola amigo",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjBGOURBQjg2RDhGRDBBQ0UxNzEA",
//         timestamp: "1700092452",
//       },
//       {
//         id: 2,
//         message: "que tal, todo bien ?",
//         name: "Mindqube",
//         status: "read",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABEYEjM4OEIzQ0EwN0IwQzUzMEVEQwA=",
//         timestamp: "1700092486",
//       },
//       {
//         id: 4,
//         message: "hola",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjA3RUQ4NzA0MzA4QkYwNDQ3MDcA",
//         timestamp: "1700092673",
//       },

//       {
//         id: 1,
//         message: "hola amigo",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjBGOURBQjg2RDhGRDBBQ0UxNzEA",
//         timestamp: "1700092452",
//       },
//       {
//         id: 2,
//         message: "que tal, todo bien ?",
//         name: "Mindqube",
//         status: "read",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABEYEjM4OEIzQ0EwN0IwQzUzMEVEQwA=",
//         timestamp: "1700092486",
//       },
//       {
//         id: 4,
//         message: "hola",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjA3RUQ4NzA0MzA4QkYwNDQ3MDcA",
//         timestamp: "1700092673",
//       },
//       {
//         id: 1,
//         message: "hola amigo",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjBGOURBQjg2RDhGRDBBQ0UxNzEA",
//         timestamp: "1700092452",
//       },
//       {
//         id: 2,
//         message: "que tal, todo bien ?",
//         name: "Mindqube",
//         status: "read",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABEYEjM4OEIzQ0EwN0IwQzUzMEVEQwA=",
//         timestamp: "1700092486",
//       },
//       {
//         id: 4,
//         message: "hola",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjA3RUQ4NzA0MzA4QkYwNDQ3MDcA",
//         timestamp: "1700092673",
//       },
//       {
//         id: 1,
//         message: "hola amigo",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjBGOURBQjg2RDhGRDBBQ0UxNzEA",
//         timestamp: "1700092452",
//       },
//       {
//         id: 2,
//         message: "que tal, todo bien ?",
//         name: "Mindqube",
//         status: "read",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABEYEjM4OEIzQ0EwN0IwQzUzMEVEQwA=",
//         timestamp: "1700092486",
//       },
//       {
//         id: 4,
//         message: "hola",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjA3RUQ4NzA0MzA4QkYwNDQ3MDcA",
//         timestamp: "1700092673",
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "Ana",
//     phone: "5493875295146",
//     whatsapp: [
//       {
//         id: 3,
//         message: "Hola",
//         name: "Ana",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTI5NTE0NhUCABIYIEZEOTM1MTkxOEZGRTNFNDhCODM5MjZCRDdGNDUyNzVCAA==",
//         timestamp: "1700092603",
//       },
//       {
//         id: 6,
//         message: "123456789012345678901234567890123456789012345",
//         name: "Mindqube",
//         status: "sent",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTI5NTE0NhUCABEYEkVDQ0IxREY5QjM5NjUwOTUzRgA=",
//         timestamp: "1700092753",
//       },
//       {
//         id: 1,
//         message: "hola amigo",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjBGOURBQjg2RDhGRDBBQ0UxNzEA",
//         timestamp: "1700092452",
//       },
//       {
//         id: 2,
//         message: "que tal, todo bien ?",
//         name: "Mindqube",
//         status: "read",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABEYEjM4OEIzQ0EwN0IwQzUzMEVEQwA=",
//         timestamp: "1700092486",
//       },
//       {
//         id: 4,
//         message: "hola",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjA3RUQ4NzA0MzA4QkYwNDQ3MDcA",
//         timestamp: "1700092673",
//       },
//       {
//         id: 1,
//         message: "hola amigo",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjBGOURBQjg2RDhGRDBBQ0UxNzEA",
//         timestamp: "1700092452",
//       },
//       {
//         id: 2,
//         message: "que tal, todo bien ?",
//         name: "Mindqube",
//         status: "read",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABEYEjM4OEIzQ0EwN0IwQzUzMEVEQwA=",
//         timestamp: "1700092486",
//       },
//       {
//         id: 4,
//         message: "hola",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjA3RUQ4NzA0MzA4QkYwNDQ3MDcA",
//         timestamp: "1700092673",
//       },
//       {
//         id: 1,
//         message: "hola amigo",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjBGOURBQjg2RDhGRDBBQ0UxNzEA",
//         timestamp: "1700092452",
//       },
//       {
//         id: 2,
//         message: "que tal, todo bien ?",
//         name: "Mindqube",
//         status: "read",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABEYEjM4OEIzQ0EwN0IwQzUzMEVEQwA=",
//         timestamp: "1700092486",
//       },
//       {
//         id: 4,
//         message: "hola",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjA3RUQ4NzA0MzA4QkYwNDQ3MDcA",
//         timestamp: "1700092673",
//       },
//       {
//         id: 1,
//         message: "hola amigo",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjBGOURBQjg2RDhGRDBBQ0UxNzEA",
//         timestamp: "1700092452",
//       },
//       {
//         id: 2,
//         message: "que tal, todo bien ?",
//         name: "Mindqube",
//         status: "read",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABEYEjM4OEIzQ0EwN0IwQzUzMEVEQwA=",
//         timestamp: "1700092486",
//       },
//       {
//         id: 4,
//         message: "hola",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjA3RUQ4NzA0MzA4QkYwNDQ3MDcA",
//         timestamp: "1700092673",
//       },
//       {
//         id: 1,
//         message: "hola amigo",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjBGOURBQjg2RDhGRDBBQ0UxNzEA",
//         timestamp: "1700092452",
//       },
//       {
//         id: 2,
//         message: "que tal, todo bien ?",
//         name: "Mindqube",
//         status: "read",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABEYEjM4OEIzQ0EwN0IwQzUzMEVEQwA=",
//         timestamp: "1700092486",
//       },
//       {
//         id: 4,
//         message: "hola",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjA3RUQ4NzA0MzA4QkYwNDQ3MDcA",
//         timestamp: "1700092673",
//       },
//       {
//         id: 1,
//         message: "hola amigo",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjBGOURBQjg2RDhGRDBBQ0UxNzEA",
//         timestamp: "1700092452",
//       },
//       {
//         id: 2,
//         message: "que tal, todo bien ?",
//         name: "Mindqube",
//         status: "read",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABEYEjM4OEIzQ0EwN0IwQzUzMEVEQwA=",
//         timestamp: "1700092486",
//       },
//       {
//         id: 4,
//         message: "hola",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjA3RUQ4NzA0MzA4QkYwNDQ3MDcA",
//         timestamp: "1700092673",
//       },
//       {
//         id: 1,
//         message: "hola amigo",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjBGOURBQjg2RDhGRDBBQ0UxNzEA",
//         timestamp: "1700092452",
//       },
//       {
//         id: 2,
//         message: "que tal, todo bien ?",
//         name: "Mindqube",
//         status: "read",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABEYEjM4OEIzQ0EwN0IwQzUzMEVEQwA=",
//         timestamp: "1700092486",
//       },
//       {
//         id: 4,
//         message: "hola",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjA3RUQ4NzA0MzA4QkYwNDQ3MDcA",
//         timestamp: "1700092673",
//       },
//       {
//         id: 1,
//         message: "hola amigo",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjBGOURBQjg2RDhGRDBBQ0UxNzEA",
//         timestamp: "1700092452",
//       },
//       {
//         id: 2,
//         message: "que tal, todo bien ?",
//         name: "Mindqube",
//         status: "read",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABEYEjM4OEIzQ0EwN0IwQzUzMEVEQwA=",
//         timestamp: "1700092486",
//       },
//       {
//         id: 4,
//         message: "hola",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjA3RUQ4NzA0MzA4QkYwNDQ3MDcA",
//         timestamp: "1700092673",
//       },
//       {
//         id: 1,
//         message: "hola amigo",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjBGOURBQjg2RDhGRDBBQ0UxNzEA",
//         timestamp: "1700092452",
//       },
//       {
//         id: 2,
//         message:
//           "que tal, todo hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola?",
//         name: "Mindqube",
//         status: "read",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABEYEjM4OEIzQ0EwN0IwQzUzMEVEQwA=",
//         timestamp: "1700092486",
//       },
//       {
//         id: 4,
//         message:
//           "hola hola hola hola hola holav hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjA3RUQ4NzA0MzA4QkYwNDQ3MDcA",
//         timestamp: "1700092673",
//         image_type: true,
//       },
//     ],
//   },
// ];
let hoy = "1700312659";
let ayer17 = "1700193859";
let ayer16 = "1700118259";
let ayer15 = "1700064259";
let ayer14 = "1699956259";
let october = "1697321059";
let september = "1694739859";
let lunes = "1699859059";
// let users2 = [
//   {
//     id: 1,
//     name: "Franco Vedia",
//     phone: "5493875610606",
//     whatsapp: [
//       {
//         id: 1,
//         message: "lunes",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjBDQjBDMzU3OTg3NTkyRDBFNzIA",
//         timestamp: lunes,
//       },
//       {
//         id: 1,
//         message: "september",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjBDQjBDMzU3OTg3NTkyRDBFNzIA",
//         timestamp: september,
//       },
//       {
//         id: 1,
//         message: "hola testing time",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjBDQjBDMzU3OTg3NTkyRDBFNzIA",
//         timestamp: ayer14,
//       },
//       {
//         id: 2,
//         message: "october",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjA2RDMyODZCNkVENjE4RUEyOEYA",
//         timestamp: october,
//       },
//       {
//         id: 3,
//         message: "hola amigo, aqui todo bien",
//         name: "Mindqube",
//         status: "read",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABEYEkRBRjZFNjMyQUFBM0ZERDc1QgA=",
//         timestamp: ayer15,
//       },
//       {
//         id: 4,
//         message: "que tal",
//         name: "Mindqube",
//         status: "read",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABEYEkQ5QTE0NkQ5N0RCMzNFREFDOQA=",
//         timestamp: ayer16,
//       },
//       {
//         id: 5,
//         message: "aqui todo bien, vos",
//         name: "Franco Vedia",
//         status: "received",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABIYFjNFQjA5RDE3OTkwRjNBRkMwQTlDMDkA",
//         timestamp: ayer17,
//       },
//       {
//         id: 6,
//         message: "aqui genial, que bien por vos",
//         name: "Mindqube",
//         status: "read",
//         whatsapp_id:
//           "wamid.HBgNNTQ5Mzg3NTYxMDYwNhUCABEYEkRBRkFCNDFEQ0YxMDI0NzZEQgA=",
//         timestamp: hoy,
//       },
//     ],
//   },
// ];

// const test = () => {
//   var date1 = new Date(parseInt(ayer16 * 1000));
//   var date2 = new Date(parseInt(ayer17 * 1000));
//   const diffInDays = moment(date2).diff(moment(date1), "days");
//   console.log("figgdays", diffInDays);

//   To calculate the time difference of two dates

//   const currentDate2 = new Date(parseInt(ayer16) * 1000);

//   const day = currentDate2.toLocaleDateString("en-US", {
//     weekday: "long",
//   });

//   console.log("soy timestamps", day);
// };

// test();

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

let checked = (e) => {
  switch (e) {
    case "sent":
      return `<svg class="text-[#82929b]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>`;
    case "delivered":
      return `<svg class="text-[#82929b]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-check"><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>`;
    case "read":
      return `<svg class="text-[#53bdeb]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-check"><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>`;
    default:
      return "";
  }
};

const previewMessage = (e) => {
  let message = e.whatsapp[e.whatsapp.length - 1].message;
  if (!message) return "Image";
  if (message.length > 30) {
    let cutMessage = message.slice(0, 32) + "...";
    return cutMessage;
  } else {
    return message;
  }
};

const setMessages = (e) => {
  isUp = null;
  setHeader(e);
  setBodyChat(e);
};

const getHours = (e) => {
  const timestamp = parseInt(e);
  const date = new Date(timestamp * 1000);
  const dateHours = date.getHours();
  const dateMinutes = date.getMinutes();
  let hours = dateHours;
  let minutes = dateMinutes;
  dateHours < 10 ? (hours = "0" + dateHours) : "";
  dateMinutes < 10 ? (minutes = "0" + dateMinutes) : "";
  return `${hours}:${minutes}`;
};

const getTime = (e) => {
  const today = new Date();

  const timestamp = parseInt(e);
  const date = new Date(timestamp * 1000);
  const dateYear = date.getFullYear();
  const dateMonth = date.getMonth() + 1;
  const dateDate = date.getDate();
  const dateHours = date.getHours();
  const dateMinutes = date.getMinutes();

  const diffTime = Math.abs(today - date);
  const diffTotalHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTotalHours / 24);
  //const diffHoursWithoutDays = diffTotalHours % 24;
  const day = date.toLocaleDateString("en-US", {
    weekday: "long",
  });
  if (diffDays === 0) {
    let hours = dateHours;
    let minutes = dateMinutes;
    dateHours < 10 ? (hours = "0" + dateHours) : "";
    dateMinutes < 10 ? (minutes = "0" + dateMinutes) : "";
    return `${hours}:${minutes}`;
  }
  if (diffDays === 1) {
    return "yesterday";
  }
  if (diffDays < 7) {
    return day;
  }
  return `${dateDate}/${dateMonth}/${dateYear}`;
};

const followedAt = new Date(1700263004 * 1000);
const currentDate = new Date();

const setContactsList = (usersList) => {
  const messagesSorted = sortmessages(usersList);
  $listContacts.innerHTML = "";
  messagesSorted.map((e) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <li name=contact id=contact-id class="pl-2 text-white bg-[#121b21] h-[72px] flex gap-2 items-center hover:bg-[#2a3942] cursor-pointer">
       <svg class="text-[#adbac1]" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-circle-2"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>
       <div class="listContacts__border--bottom px-2" >
        <div class="flex items-center justify-between  w-full">
          <div class= "text-lg font-normal">${e.name}</div>
          <span class="text-[12px] text-[#82929b] ">${getTime(
            e.whatsapp[e.whatsapp.length - 1].timestamp
          )}</span>
        </div>
        <div class="flex justify-start items-center gap-1">
         ${checked(e.whatsapp[e.whatsapp.length - 1].status)}
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
};

// const $contact = $all("#contact-id");
// $contact.forEach((e) => e.addEventListener("click", setMessages));

////////////////////////////////////////////////CHAT LOGIC/////////////////////////////////

//const $contacts = $all("[name='contact']");
//$contacts.forEach((e) => e.addEventListener("click", setMessages));

$inputChat.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
    // code for enter
  }
});
//setContactsList(users2);
const setHeader = (e) => {
  $divHeader.innerHTML = `
        <div class="flex items-center gap-3 ml-3">
        <svg class="text-[#adbac1]" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-circle-2"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>
          <div class="flex flex-col justify-center text-white ">
           <div class="text-lg font-normal">${e.name}</div>
           <span class="text-xs text-[#82929b]">${e.phone}</span>
          </div>
        </div>`;
};

// var positionInfo = $bodyMessages.getBoundingClientRect();
// var height = positionInfo.height;
// var width = positionInfo.width;
// console.log("soy width ", width);
let isUp = null;
let bodyDate = null;
const setMargin = (e) => {
  if (!isUp) return "mt-1";
  if (isUp === e.name) return "mt-1";
  if (isUp !== e.name) return "mt-4";
};

const setSvgChat = (e) => {
  //if (!isUp) return "";
  if (e.name !== isUp) {
    if (e.name === "Mindqube") {
      return `<svg class="absolute right-[-8px] text-[#005c4b] top-0" viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path><path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path></svg>`;
    } else {
      return `<svg class="absolute left-[-8px] text-[#202c33] top-0" viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><path opacity="0.13" fill="#0000000" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path><path fill="currentColor" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path></svg>`;
    }
  }
  return "";
};

const setBorder = (e) => {
  if (e.name != isUp) {
    if (e.name === "Mindqube") {
      return "rounded-tr-none";
    } else {
      return "rounded-tl-none";
    }
  }
  return "";
};

const setBodyDate = (e) => {
  const today = new Date();

  const timestamp = parseInt(e);
  const date = new Date(timestamp * 1000);
  const dateYear = date.getFullYear();
  const dateMonth = date.getMonth() + 1;
  const dateDate = date.getDate();
  const dateHours = date.getHours();
  const dateMinutes = date.getMinutes();

  const diffTime = Math.abs(today - date);
  const diffTotalHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTotalHours / 24);

  const day = date.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const timeofBodyDate = bodyDate && parseInt(bodyDate[0]);
  const timestampBodyDate = new Date(timeofBodyDate * 1000);
  const diffTimeBodyDate = Math.abs(date - timestampBodyDate);

  const diffTotalHoursBodyDate = Math.floor(
    diffTimeBodyDate / (1000 * 60 * 60)
  );

  const diffDaysBodyDate = Math.floor(diffTotalHoursBodyDate / 24);
  const diffInDays = moment(today).diff(moment(date), "days");
  const diffInDaysTimestampsAndBodydate = moment(date).diff(
    moment(timestampBodyDate),
    "days"
  );

  let dayClass =
    "bg-[#192229] mx-auto w-max text-[#82929b] text-[12px] rounded-md p-2 my-2 ";
  if (!bodyDate) {
    if (diffInDays === 0) {
      bodyDate = [e, day];

      return `<div class="${dayClass}test">TODAY</div>`;
    }
    if (diffInDays === 1) {
      bodyDate = [e, day];
      return `<div class="${dayClass} test">YESTERDAY</div>`;
    }
    if (diffInDays < 7) {
      bodyDate = [e, day];

      return `<div class="${dayClass}">${day.toUpperCase()} "test"</div>`;
    }
    bodyDate = [e, day];
    return `<div class="${dayClass}">${dateDate}/${dateMonth}/${dateYear} "test"</div>`;
  }

  if (diffInDaysTimestampsAndBodydate > 7 && diffInDays < 7) {
    if (diffInDays === 0) {
      bodyDate = [e, day];
      return `<div class="${dayClass}test">TODAY2</div>`;
    }
    if (diffInDays === 1) {
      bodyDate = [e, day];
      return `<div class="${dayClass}">YESTERDAY</div>`;
    }
    if (diffInDays < 7) {
      bodyDate = [e, day];
      return `<div class="${dayClass}">${day.toUpperCase()}</div>`;
    }
    bodyDate = [e, day];
    return `<div class="${dayClass}">${dateDate}/${dateMonth}/${dateYear} "test"</div>`;
  }

  // if (diffInDaysTimestampsAndBodydate < 7 && bodyDate[1] !== day) {
  //   if (diffInDays === 0) {
  //     bodyDate = [e, day];
  //     return `<div class="${dayClass}test">TODAY3</div>`;
  //   }
  //   if (diffInDays === 1) {
  //     bodyDate = [e, day];
  //     return `<div class="${dayClass}">YESTERDAY</div>`;
  //   }
  //   if (diffInDays < 7) {
  //     bodyDate = [e, day];
  //     return `<div class="${dayClass}">${day.toUpperCase()}</div>`;
  //   }
  //   bodyDate = [e, day];
  //   return `<div class="${dayClass}">${dateDate}/${dateMonth}/${dateYear} "test"</div>`;
  // }

  if (diffInDaysTimestampsAndBodydate >= 7) {
    bodyDate = [e, day];
    return `<div class="${dayClass}">${dateDate}/${dateMonth}/${dateYear} "test2"</div>`;
  }
  bodyDate = [e, day];

  return "";
};

const setMessageBodyChat = (e) => {
  if (e.image_type) {
    return `
        <div class="max-w-[20rem]">
        <img src="https://mindqubewhatsapp.onrender.com/chat/image?id=${
          e.whatsapp_id
        }" class="max-w-[20rem] max-h-[20rem] w-[20rem]" alt="">
         <span class="py-1">${e.message ? e.message : ""}</span>
        
        <div class="flex justify-end items-center gap-1   float-right  mt-[7px] ml-[5px] mb-[-8px]">
            <div class="text-[11px] text-[#d1d3cf] p-0 m-0">${getHours(
              e.timestamp
            )}
            </div>
            <div>${checked(e.status)}</div>
          </div>    
        </div>
      `;
  } else {
    return `${e.message}
    <div class="flex justify-end items-center gap-1   float-right  mt-[7px] ml-[5px] mb-[-8px]">
            <div class="text-[11px] text-[#d1d3cf] p-0 m-0">${getHours(
              e.timestamp
            )}
            </div>
            <div>${checked(e.status)}</div>
          </div>    `;
  }
};
const setBodyChat = (user) => {
  bodyDate = null;
  chatMessages = user;
  $bodyMessages.innerHTML = "";
  user.whatsapp.map((e, i) => {
    $bodyMessages.innerHTML += `
    
    <div class="relative break-words   rounded-lg ${setMargin(e)} ">
      ${setBodyDate(e.timestamp)}
      
      <div class=" rounded-md ${setBorder(
        e
      )} p-[6px] break-words pl-2 flex gap-2 relative max-w-[45vw] w-fit ${
      e.name === "Mindqube"
        ? "ml-auto mr-[5vw] bg-[#005c4b]"
        : "bg-[#202c33]  ml-[5vw]"
    }">
    ${setSvgChat(e)}
        <div class="text-[14px] break-words width-webkit">${setMessageBodyChat(
          e
        )}
          
        </div>
      </div>
    </div>`;
    isUp = e.name;
  });
  setTimeout(() => {
    scrollDown();
  }, 0);
};

const sendMessage = () => {
  if (!$inputChat.value || !chatMessages.phone) return;
  var url = "https://mindqubewhatsapp.onrender.com/chat/reenviar";
  var data = { message: $inputChat.value, phoneNumber: chatMessages.phone };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("im fetch res", res);
      return res;
    })
    .then((res) => res.json())
    .then((res) =>
      res
        ? saveMindqubeMessage(res)
        : console.log("empty fetch to chat/reenviar")
    )
    .catch((error) => console.error("Error:", error));
  $inputChat.value = "";
  event.preventDefault();
};
//$inputChat.addEventListener("keypress", sendMessage);
$sendMessage.addEventListener("click", sendMessage);

const saveMindqubeMessage = (payload) => {
  //need configure for the templates
  users = users.map((e) => {
    if (e.phone === payload.phone) {
      e.whatsapp.push(payload.message);
    }
    return e;
  });
  setContactsList(users);
};

//////////////////////WEBSOCKET///////////////////////////////
const onConnected = () => {
  stompClient.subscribe("/topic/public", onMessageReceived);
};

const onMessageReceived = (payload) => {
  var payloadData = JSON.parse(payload.body);
  console.log("im payloadData", payloadData);

  if (payloadData.type === "new user") {
    console.log("new user");
    if (!users.length) {
      users = [payloadData.user];
    } else {
      // let updateUserList = [...users.value,payloadData.user]
      // users.value = sortmessages(updateUserList);
      // console.log("im new user result", users.value);
      users = [payloadData.user, ...users];
    }
    setContactsList(users);
  }
  if (payloadData.type === "new message") {
    console.log("new message");

    let messageAdded = [...users].map((e) => {
      if (e.phone === payloadData.phone) {
        e.whatsapp.push(payloadData.message);
      }
      return e;
    });
    isUp = null;
    users = messageAdded;
    setContactsList(users);
    if (chatMessages) {
      const currentUser = users.find((e) => e.phone === chatMessages.phone);
      setBodyChat(currentUser);
    }
  }
  if (payloadData.type === "update message") {
    console.log("update message");

    users = users.map((e) => {
      if (e.phone === payloadData.phone) {
        e.whatsapp.map((a) => {
          if (a.whatsapp_id === payloadData.message_id) {
            if (!a.timestamp) {
              a.timestamp = payloadData.timestamps;
            }
            a.status = payloadData.status;
          }
          return a;
        });
      }
      return e;
    });
    isUp = null;
    setContactsList(users);
    if (chatMessages) {
      const currentUser = users.find((e) => e.phone === chatMessages.phone);
      setBodyChat(currentUser);
    }
  }
};

const onError = (err) => {
  console.log(err);
};

const connect = () => {
  let Sock = new SockJS("https://mindqubewhatsapp.onrender.com/ws");
  console.log("im sock", Sock);
  stompClient = Stomp.over(Sock);
  stompClient.connect({}, onConnected, onError);
  //event.preventDefault();
};
connect();
//setContactsList(users2);
const scrollDown = () => {
  $bodyMessages.scrollTop = $bodyMessages.scrollHeight;
  console.log("scrolling");
};
