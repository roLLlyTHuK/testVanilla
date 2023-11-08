import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  deleteUser,
} from 'firebase/auth';
import { getDatabase, ref, set, get, remove } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCSIOIvaBcm09OifpCpfKPAwnfy_t377rM',
  authDomain: 'testfirebase-422a2.firebaseapp.com',
  databaseURL:
    'https://testfirebase-422a2-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'testfirebase-422a2',
  storageBucket: 'testfirebase-422a2.appspot.com',
  messagingSenderId: '589688307018',
  appId: '1:589688307018:web:e010a81c7decb75d56d5b3',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signOutButton = document.getElementById('signOut');
let isAuth = false;

function loginUser() {
  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      alert('Вход успешен');
      signOutButton.style.display = 'block';
      isAuth = true;
    })
    .catch(error => {
      alert(`Ошибка входа: ${error.message}`);
    });
}

function createAccaunt() {
  const email = emailInput.value;
  const password = passwordInput.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      alert('Регистрация успешна');
      signOutButton.style.display = 'block';
      isAuth = true;
    })
    .catch(error => {
      alert(`Ошибка регистрации: ${error.message}`);
    });
}

function deleteAccount() {
  const user = auth.currentUser;

  if (user) {
    deleteUser(user)
      .then(() => {
        alert('Аккаунт удален');
        signOutButton.style.display = 'none';
        isAuth = false;
      })
      .catch(error => {
        alert(`Ошибка при удалении аккаунта: ${error.message}`);
      });
  } else {
    alert('Пользователь не вошел в систему');
  }
}

function logOutUser() {
  signOut(auth).then(() => {
    alert('Выход выполнен успешно');
    signOutButton.style.display = 'none';
    isAuth = false;
  });
}
let userID = '';
onAuthStateChanged(auth, user => {
  if (user) {
    userID = user.uid; // Получаем идентификатор пользователя
    console.log('Пользователь вошел в систему. ID пользователя:', userID);

    // Вы можете передать userId в другие функции для работы с базой данных
    // Например, для создания подкаталога с именем пользователя и хранения данных.
  } else {
    console.log('Пользователь вышел из системы.');
  }
});

async function readData() {
  const dataRef = ref(db, `shoppingList/${userID}`);
  try {
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null; // Нет данных в базе
    }
  } catch (error) {
    console.error('Ошибка при чтении данных:', error);
    throw error;
  }
}

// Функция для создания записи в базе данных
async function createItem(item) {
  const dataRef = ref(db, 'shoppingList');
  try {
    await set(dataRef, item);
    console.log('Запись успешно создана');
  } catch (error) {
    console.error('Ошибка при создании записи:', error);
    throw error;
  }
}
async function createItemForUser(item) {
  const userShoppingListRef = ref(db, `shoppingList/${userID}`);

  try {
    await set(userShoppingListRef, item);
    console.log('Запись успешно создана для пользователя:', userID);
  } catch (error) {
    console.error('Ошибка при создании записи:', error);
    throw error;
  }
}
// Функция для удаления записи из базы данных
async function deleteItem() {
  const dataRef = ref(db, 'shoppingList');
  try {
    await remove(dataRef);
    console.log('Запись успешно удалена');
  } catch (error) {
    console.error('Ошибка при удалении записи:', error);
    throw error;
  }
}

export {
  db,
  isAuth,
  loginUser,
  logOutUser,
  createAccaunt,
  deleteAccount,
  signOutButton,
  readData,
  createItem,
  createItemForUser,
  deleteItem,
};
