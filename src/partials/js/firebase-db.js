async function readData() {
  const dataRef = ref(db, 'shoppingList');
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
