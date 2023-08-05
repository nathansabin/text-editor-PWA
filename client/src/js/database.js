import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// opens db and adds content
export const putDb = async (content) => {
  const db = await openDB("jate", 1);

  const text = db.transaction("jate", "readwrite");
  const store = text.objectStore("jate");
  const request = store.add({text: content});
  const result = await request;
}

// grabs all data 
export const getDb = async () => {
  const db = await openDB("jate", 1);
  const text = db.transaction("jate", "readonly");
  const store = text.objectStore("jate");
  const request = store.getAll();
  const result = await request;
}

initdb();
