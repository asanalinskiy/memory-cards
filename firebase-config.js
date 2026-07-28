// Конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBsEnXcPsytpK1UaPwohofq3YvBCJKjME",
  authDomain: "memory-caards.firebaseapp.com",
  databaseURL: "https://memory-caards-default-rtdb.firebaseio.com",
  projectId: "memory-caards",
  storageBucket: "memory-caards.firebasestorage.app",
  messagingSenderId: "224652849827",
  appId: "1:224652849827:web:77a2fba1db55f13d89c516",
  measurementId: "G-K6PW1JDR4R"
};

// Инициализация
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Функция сохранения рекорда
function saveOnlineScore(nickname, difficulty, moves, timeSeconds) {
  if (!nickname) nickname = "Аноним";
  
  db.ref(`leaderboard/${difficulty}`).push({
    nickname: nickname,
    moves: moves,
    time: timeSeconds,
    timestamp: Date.now()
  });
}

// Функция подписки на онлайн-рейтинг в реальном времени
function subscribeToLeaderboard(difficulty, updateUICallback) {
  db.ref(`leaderboard/${difficulty}`)
    .orderByChild('moves')
    .limitToFirst(10)
    .on('value', (snapshot) => {
      const list = [];
      snapshot.forEach((child) => {
        list.push(child.val());
      });
      updateUICallback(list);
    });
}
