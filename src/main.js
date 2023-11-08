import {
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
} from '/partials/js/firebase-auth';

const loginButton = document.getElementById('login');
const registerButton = document.getElementById('register');
const deleteAccountButton = document.getElementById('deleteAccount');

loginButton.addEventListener('click', loginUser);

registerButton.addEventListener('click', createAccaunt);

deleteAccountButton.addEventListener('click', deleteAccount);

signOutButton.addEventListener('click', logOutUser);

const readDataButton = document.getElementById('readData');
const createItemButton = document.getElementById('createItem');
const deleteItemButton = document.getElementById('deleteItem');
const outputDiv = document.getElementById('output');

// Слушаем события на кнопках
readDataButton.addEventListener('click', async () => {
  if (isAuth) {
    try {
      const data = await readData();
      if (data) {
        outputDiv.textContent = JSON.stringify(data, null, 2);
      } else {
        outputDiv.textContent = 'Нет данных в базе';
      }
    } catch (error) {
      outputDiv.textContent = 'Ошибка при чтении данных: ' + error.message;
    }
  } else {
    outputDiv.textContent = 'Пользователь не вошел в систему';
  }
});

createItemButton.addEventListener('click', async () => {
  if (isAuth) {
    const newItem = { name: 'Новый продукт', quantity: 1 };
    try {
      await createItemForUser(newItem);
      outputDiv.textContent = 'Запись успешно создана';
    } catch (error) {
      outputDiv.textContent = 'Ошибка при создании записи: ' + error.message;
    }
  } else {
    outputDiv.textContent = 'Пользователь не вошел в систему';
  }
});

deleteItemButton.addEventListener('click', async () => {
  if (isAuth) {
    try {
      await deleteItem();
      outputDiv.textContent = 'Запись успешно удалена';
    } catch (error) {
      outputDiv.textContent = 'Ошибка при удалении записи: ' + error.message;
    }
  } else {
    outputDiv.textContent = 'Пользователь не вошел в систему';
  }
});
