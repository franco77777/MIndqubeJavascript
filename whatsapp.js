const $ = (selector) => document.querySelector(selector);
const $all = (selector) => document.querySelectorAll(selector);
const $listContacts = $("#list-contacts");
const $headerList = $("#header-list");
const $header = $("#header");
const $mindqube = $("#mindqube");
const $bodyMessages = $("#body-messages");
const $iconHeader = $("#icon-header");
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

//console.log("soy users", users);
//$contacts.innerHTML = `<li>${"hola"}</li>`;

// let users = [
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
//         status: "delivered",
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
//     ],
//   },
// ];
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

const setMessages = (e) => {
  setHeader(e);
  setBodyChat(e);
};

const setContactsList = (usersList) => {
  const messagesSorted = sortmessages(usersList);
  $listContacts.innerHTML = "";
  messagesSorted.map((e) => {
    const li = document.createElement("li");
    li.innerHTML = `<li name=contact id=contact-id class="pl-2 text-white bg-[#121b21] h-[72px] flex gap-2 items-center hover:bg-[#2a3942] cursor-pointer">
       <i data-lucide=user-circle-2 class="imageprofile text-[#adbac1]"></i>
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
    scrollDown();
  });
};

setContactsList(users);
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

const setHeader = (e) => {
  $iconHeader.classList.remove("hidden");
  $divHeader.innerHTML = `
  <div class="flex flex-col justify-center text-white">
     <div class="text-lg font-normal">${e.name}</div>
    <span class="text-xs text-[#82929b]">${e.timestamp}</span>
    </div>`;
};
const setBodyChat = (user) => {
  chatMessages = user;
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
  scrollDown();
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
    const currentUser = users.find((e) => e.phone === chatMessages.phone);
    let messageAdded = [...users].map((e) => {
      if (e.phone === payloadData.phone) {
        e.whatsapp.push(payloadData.message);
      }
      return e;
    });
    users = messageAdded;
    setContactsList(users);
    setBodyChat(currentUser);
  }
  if (payloadData.type === "update message") {
    console.log("update message");
    const currentUser = users.find((e) => e.phone === chatMessages.phone);
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
    setContactsList(users);
    setBodyChat(currentUser);

    console.log("soy users", users);
    console.log("soy current user", currentUser);
    console.log("soy chatmessages", chatMessages);
    // setContactsList(users);
    //currentUser && setBodyChat(currentUser);
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

const scrollDown = () => {
  $bodyMessages.scrollTop = $bodyMessages.scrollHeight;
};
