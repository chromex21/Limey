import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp
} from "firebase/firestore";
import { db } from "./firebaseConfig";

// Collection names
export const COLLECTIONS = {
  TOPICS: "topics",
  ARTICLES: "articles",
  USERS: "users",
  COMMENTS: "comments",
  CATEGORIES: "categories"
};

// Example functions for Firestore operations

// Create a new topic
export async function createTopic(topicData: any) {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.TOPICS), {
      ...topicData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating topic:", error);
    throw error;
  }
}

// Get all topics
export async function getTopics() {
  try {
    const q = query(
      collection(db, COLLECTIONS.TOPICS),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching topics:", error);
    throw error;
  }
}

// Update a topic
export async function updateTopic(topicId: string, updates: any) {
  try {
    const topicRef = doc(db, COLLECTIONS.TOPICS, topicId);
    await updateDoc(topicRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error updating topic:", error);
    throw error;
  }
}

// Delete a topic
export async function deleteTopic(topicId: string) {
  try {
    await deleteDoc(doc(db, COLLECTIONS.TOPICS, topicId));
  } catch (error) {
    console.error("Error deleting topic:", error);
    throw error;
  }
}

// Similar functions can be created for articles, comments, etc.
