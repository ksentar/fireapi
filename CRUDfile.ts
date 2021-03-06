import { getFirestore } from 'firebase/firestore';
import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';

import {
  collection,
  getDocs,
  addDoc,
  connectFirestoreEmulator,
  doc,
  deleteDoc,
  setDoc,
} from 'firebase/firestore';
import { Collection, getRepository } from 'fireorm';
import { initializeApp } from 'firebase-admin';

// const firebaseApp = initializeApp({
//   authDomain: 'fir-bab30.firebaseapp.com',
//   projectId: 'fir-bab30',
// });

// const db = getFirestore();

// connectFirestoreEmulator(db, 'localhost', 8090);

const serviceAccount = {
  type: 'service_account',
  project_id: 'fir-bab30',
  private_key_id: '9b6c8e1d62576ed6db7a12d07bb4a7bc10646099',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCvm+FqpOOVkmhe\nZIOcs+cJXhfmiM/o1RSeP/9Fq8iw++N2VSH3TyYzPLTwCLcXetVYp0vCQwR/4M2G\nMBASpJ/RcCy6/bKlo0GjOhpg/gE1ZWPQRhUOdxnZUtshJ99KhrE11GIOMtUyvhV2\nbivP0df6D4oMAzDO4BKQyuZAQOPWUwcWr0cEaoODRZLToxPWZtM+IWENODgnneJU\nmNQDmwwux3+GgPCj+OT0gJCx/6vxlE0QbtWQpm9bsepJnnoEjLQv3ViU/4T31z7s\newluOKn+wid1MbXUXgbklb/HOM+J5AfUeHWHYTUkMSC5fBzF1bEhe74cA3T1gYa3\nyumgOZ5zAgMBAAECggEAA1T+WHMrfE2MXGok0ybYteVKp82lwEG2w+/r7Ir/YlhN\nLxQbcmFWlLdMqZdIvhHPFYELH3L9FV4TGD42N9xWyfcKajvhFWJ9Htc94+Q96qDz\nXWLPCHi7DVQUo1Lp2jSnDSHsAF/3iqBvsNETVLyjD/QWhvbSiMJYp9Wpu8Nfb1QY\n6KQoh6Omx3NNHw/ohL+6a7Pazxsp7e+ypMGKuqzVarQzzU/nVlHU73S4XO7Zew/t\nOzzu1zZoxH23kX4zumOWWUtE2XHFJMYXRZoWnWEY9jbs4AB1haPID9Eco1wZ24wu\n6Edg1JT65lVinl4cNSg4z+NXS7UkZysLtgCHtXDsgQKBgQDiTfOuaAAppvqDyqyV\nxMhxsPfiliz6sqiI8oyQtb7aEAuLCK+Vk19aIWpJTX/2lgpbuQoqWh2SosTwLtkZ\nFhEPr2coPla8JMepYJurheo2uFjiJZ9jmK/CDPidOJ0ecM4GaA86xEnXFXN7Y2RD\nliASN3X48Bb6LOn746XPbJOb8wKBgQDGpvTK/O5vC1FtCwP12mUC3X9xTCAg7FZM\nN39Y+pKUAPYcvHaJPJ8MXF7isLrp+cT3liZgc7rKNuvvdYEWSOXs/h8TeQPdMlSk\n8mzBWX3VTuAKI1fzt9xyArU7KhgYhHBkWiH50XA0TeJnUTVFumC0nGC6JcKqRphk\nAyMAD+cTgQKBgDVm4a7xOcCad5kr9WfuJMK3WPduKrUJ/b07RzJKwPuiN6caaJyq\nRyD0q6kakay1oUIduyldVIcqw8BNvcsuqt4BrR0RANSq9Tah5nomQqug+tB6wk71\nU9w9xVkMZ/8r7WIToixi723C0Rp3zMwqG+1QixUwSqvEd36KLLFy1K5DAoGAYvqh\nEdsAuld7VMeeS4trtQfEDiGOCJl5TjSAwUbobdIkzqCgtzR7Ut9bb7v7BcWrfGlV\n6c0ADu1alU+I6B+eYH0l4r/zSu1e+2jHA3ehmPzZ6HM/yXGc5zmuLzKEGwMyNO4r\n65uNOqJr4mq2Dm4U7SjVkSprWggeugZOFCPYUQECgYBJgmO+vxfBgm3FtaDQxfM2\n7sb2FHD/9oDMTiWlNSzPu/bQ9934RTYNU5gg5Hf+iuJxvwH1jHzqXAhZ/hIWssna\ncafjPw63wnaVyhWVrfZlCyPKBHtoTT+Wd4JXTRmtrG6cBgGzxCrGysqd9Wes/+yr\n+sHqwJU42wAe6/ocIpOFdw==\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-2ju8p@fir-bab30.iam.gserviceaccount.com',
  client_id: '114833693870577868570',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2ju8p%40fir-bab30.iam.gserviceaccount.com',
  authDomain: 'fir-bab30.firebaseapp.com',
  projectId: 'fir-bab30',
};

admin.initializeApp({ projectId: 'fir-bab30' });

const firestore = admin.firestore();
fireorm.initialize(firestore);

@Collection()
class Todo {
  id: string;
  text: string;
  done: boolean;
}

const todoRepository = getRepository(Todo);

const todo = new Todo();
todo.text = "Check fireorm's Github Repository";
todo.done = false;

const main = async () => {
  const todoDocument = await todoRepository.create(todo); // Create todo
  console.log(todoDocument);
};

main();

// const mySuperTodoDocument = await todoRepository.findById(todoDocument.id); // Read todo
// await todoRepository.update(mySuperTodoDocument); // Update todo
// await todoRepository.delete(mySuperTodoDocument.id); // Delete todo

// const data = {
//   first: '??????????????????',
//   middle: '??????????????????',
//   last: '??????????????????',
//   born: 1986,
// };

// const addDocument = async ()=>{
// await setDoc(doc(db, "test", "id"), {
//   first: '??????????????????',
//   middle: '??????????????????',
//   last: '??????????????????',
//   born: 1986,
// })
// }

// const querySnapshot = await getDocs(collection(db, 'test'));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });

// addDocument()
