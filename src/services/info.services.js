import { db } from "../firebase-config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const infoCollectionRef = collection(db, "personal");
class InfoDataService {
  addPersonal = (newInfo) => {
    return addDoc(infoCollectionRef, newInfo);
  };

  updateInfo = (id, updatedInfo) => {
    const infoDoc = doc(db, "personal", id);
    return updateDoc(infoDoc, updatedInfo);
  };

  deleteInfo = (id) => {
    const infoDoc = doc(db, "personal", id);
    return deleteDoc(infoDoc);
  };

  getAllPersonal = () => {
    return getDocs(infoCollectionRef);
  };

  getInfo = (id) => {
    const infoDoc = doc(db, "personal", id);
    return getDoc(infoDoc);
  };
}

export default new InfoDataService();
