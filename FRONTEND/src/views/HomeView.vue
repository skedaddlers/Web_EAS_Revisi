<template>
    <div class="custom-container">
      <div class="row">
        <div class="col-lg-12">
          <div class="card custom-chat-app">
            <div class="custom-people-list">
              <div class="user-info">
                <span class="user">{{ currentUser ? currentUser.user.full_name : 'Loading...' }}</span>
                <button class="custom-btn btn btn-primary" @click="logout">Logout</button>
              </div>
            </div>
  
            <div class="custom-chat">
              <div class="custom-chat-history">
                <h2>Message History</h2>
                <ul class="message-list">
                  <li v-for="chat in reversedChatHistory" :key="chat.id">
                    <div class="message-body">
                      <div class="sender">
                        <div class="header-text">
                          <h5>{{ chat.AkunName }}</h5>
                        </div>
                        <div class="message-text">
                          <p>{{ chat.chat }}</p>
                        </div>
                        <div class="timestamp">
                          <span class="message-time">{{ formatChatTime(chat.createdAt) }}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
  
              <div class="custom-chat-message">
                <form @submit.prevent="sendMessage">
                  <div class="input-group mb-3">
                    <input type="text" v-model="message" class="form-control" placeholder="Type your message..." required>
                    <div class="input-group-append">
                      <button type="submit" class="btn btn-danger">Send</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
            <div class="custom-people-list">
                
              <ul class="list-unstyled chat-list mt-2 mb-0">
                <h2>
                    Friend List
                </h2>
                <li v-for="mutual in allMutuals" :key="mutual.id" @click="selectGroup(mutual.id)">
                  <div class="custom-btn btn btn-success mb-3">{{ mutual.idteman }}</div>
                </li>
              </ul>
            </div>
  
            <div class="custom-chat-message">
              <form @submit.prevent="addFriend">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-user-plus"></i></span>
                  </div>
                  <input v-model="friendID" type="text" class="form-control" placeholder="Enter User ID...">
                  <div class="input-group-append">
                    <button type="submit" class="btn btn-warning">Add Friend</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  /* Global Styles */
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f2f2f2;
  }
  
  /* Custom Container Styles */
  .custom-container {
    margin: 30px auto;
    max-width: 900px;
  }
  
  /* Custom Chat App Styles */
  .custom-chat-app {
    border: 2px solid #4caf50;
    border-radius: 10px;
    overflow: hidden;
    background-color: #ffffff;
  }
  
  /* Custom People List Styles */
  .custom-people-list {
    background-color: #f9f9f9;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .user-info {
    display: flex;
    align-items: center;
  }
  
  .user-info .user {
    font-weight: bold;
    margin-right: 10px;
  }
  
  .custom-btn {
    cursor: pointer;
  }
  
  /* Custom Chat Styles */
  .custom-chat {
    display: flex;
    flex-direction: column;
  }
  
  /* Custom Chat History Styles */
  .custom-chat-history {
    padding: 15px;
    border-bottom: 2px solid #4caf50;
  }
  
  .custom-chat-history h2 {
    margin-bottom: 15px;
  }
  
  .message-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  /* Sender Styles */
  .sender {
    border: 2px solid #2196f3;
    border-radius: 8px;
    padding: 15px;
  }
  
  .sender h5,
  .sender p {
    margin: 0;
  }
  
  .timestamp {
    text-align: right;
  }
  
  /* Custom Chat Message Styles */
  .custom-chat-message {
    padding: 15px;
    background-color: #f2f2f2;
  }
  
  .custom-chat-message form {
    display: flex;
    align-items: center;
  }
  
  .custom-chat-message .input-group {
    width: 100%;
  }
  
  .custom-chat-message input {
    border-radius: 5px;
  }
  
  .custom-chat-message button {
    border-radius: 5px;
  }
  
  /* Chat List Styles */
  .chat-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .chat-list li {
    cursor: pointer;
  }
  
  /* Add Friend Styles */
  .custom-chat-message form:last-child {
    margin-top: 20px;
  }
  </style>
  
  

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { computed } from "vue";

const router = useRouter();
const currentUser = ref();
const friendID = ref("");
const allGroups = ref([]);
const message = ref("");
const chatHistory = ref([]);
const currMutualID = ref("");
const allMutuals = ref([]);


onMounted(async () => {
  currentUser.value = await getUser();
  if (!currentUser.value) {
    router.replace("/");
  } else {
    await fetchAllMutual();
  }
});

const fetchAllMutual = async () => {
  try {
    const res = await fetch('http://localhost:3100/api/mutual', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorMsg = (await res.json())?.errors[0].message;
      throw new Error(errorMsg);
    }

    const mutuals = await res.json();

    allMutuals.value = mutuals.docs
      .filter(mutual => mutual.User1ID === currentUser.value.user.id || mutual.User2ID === currentUser.value.user.id)
      .map(mutual => {
        const isCurrentUser1 = mutual.User1ID === currentUser.value.user.id;
        const idteman = isCurrentUser1 ? mutual.User2ID : mutual.User1ID;
        return {
          ...mutual,
          idteman,
        };
      });

    console.log(allMutuals.value);
  } catch (error) {
    console.error("Error during fetchAllGroups:", error);
  }
};






const getUser = async () => {
  try {
    const res = await fetch('http://localhost:3100/api/akun/me', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      const errorMsg = (await res.json())?.errors[0].message;
      throw new Error(errorMsg);
    }
    const user = await res.json();
    return user;
  } catch (error) {
    alert("Login Error " + error.message);
  }
};

const addFriend = async () => {
  try {
    const req = await fetch('http://localhost:3100/api/mutual', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        User1ID: currentUser.value.user.id,
        User2ID: friendID.value,
      }),
    });
    const data = await req.json();
    console.log(data);

    // Handle response if needed
  } catch (error) {
    console.error("Error during createChannel:", error);
    alert("Error creating channel: " + error.message);
  }
};

const fetchChatHistory = async (mutualID) => {
  try {
    currMutualID.value = mutualID;

    const res = await fetch(
      "http://localhost:3100/api/MutualChat?where[MutualID][equals]=" + mutualID,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 401) {
      console.error("Unauthorized: Invalid credentials");
    } else {
      const json = await res.json();
      console.log(json);

      chatHistory.value = json.docs.map(chat => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
      }));
    }
  } catch (error) {
    console.error("Error:", error);
  }
};


const sendMessage = async () => {
      try {
        const res = await fetch("http://localhost:3100/api/MutualChat", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            AkunID: currentUser.value.user.id,
            MutualID: currMutualID.value,
            chat: message.value,
          }),
        });

        if (res.status === 401) {
          console.error("Unauthorized: Invalid credentials");
        } else {
          const json = await res.json();
          console.log(json);
          // Update chat history setelah mengirim pesan
          await fetchChatHistory();
        }
      } catch (error) {
        console.error("Error:", error);
      }
};

const selectGroup = (mutualID) => {
  // Panggil fungsi fetchChatHistory dengan ID grup yang dipilih
  fetchChatHistory(mutualID);
};

const reversedChatHistory = computed(() => {
  // Return a reversed copy of chatHistory
  return chatHistory.value.slice().reverse();
});


const formatChatTime = (createdAt) => {
  return createdAt.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  });
};

const logout = async () => {
  try {
    const res = await fetch('http://localhost:3100/api/akun/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      const errorMsg = (await res.json())?.errors[0].message;
      throw new Error(errorMsg);
    }
    const user = await res.json();
    console.log(user);
    router.push('/');
  } catch (error) {
    alert("Sign Up Error " + error.message);
  }
};

</script>