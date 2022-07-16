import React, { useState } from "react";
import "./App.css";
import { auth, db } from "./firebase/init";
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  async function updatePost() {
    const hardCodeId = "ETDxu4NSRAXvCYfJOQ7J"
    const postRef = doc(db, 'posts', hardCodeId)
    const post = await getPostById(hardCodeId)
    const newPost = {
      ...post,
      title: 'Land a 400k job',
    }
    updateDoc(postRef, newPost)
  }

  function deletePost() {
    const hardCodeId = "ETDxu4NSRAXvCYfJOQ7J"
    const postRef = doc(db, 'posts', hardCodeId)
    deleteDoc(postRef)
  }

  function createPost() {
    const post = {
      title: "Finish Interview Section",
      description: "Finish Frontend Simplified",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post);
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map((elem) => ({ ...elem.data(), id: elem.id }));
    console.log(posts);
  }

  async function getPostById(id) {
    const hardCodeId = "ETDxu4NSRAXvCYfJOQ7J"
    const postRef = doc(db, 'posts', id)
    const postSnap = await getDoc(postRef)
    return postSnap.data();
  }

  async function getPostByUID() {
    const postCollectionRef = await query(
      collection(db, 'posts'),
      where("uid", '==', user.uid)
    );
    const { docs } = await getDocs(postCollectionRef);
     console.log(docs.map(doc => doc.data()))
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function register() {
    createUserWithEmailAndPassword(auth, "email@email.com", "test123").catch(
      (error) => {
        console.log(error);
      }
    );
  }

  function login() {
    setLoading(true);
    signInWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function logout() {
    signOut(auth);
    setUser({});
  }

  return (
    <div className="App">
      {loading ? (
        <>
          <button className="nav__button skeleton"></button>
          <button className="nav__button skeleton"></button>
          <button className="user__button skeleton"></button>
          <button className="nav__button skeleton"></button>
          <button className="nav__button skeleton"></button>
          <button className="nav__button skeleton"></button>
          <button className="nav__button skeleton"></button>
          <button className="nav__button skeleton"></button>
        </>
      ) : (
        <>
          <button onClick={register} className="nav__button">
            Register
          </button>
          <button onClick={login} className="nav__button">
            Login
          </button>
          <button onClick={logout} className="user__button">
            {user.email && user.email[0].toUpperCase()}
          </button>
          <button onClick={createPost} className="nav__button">
            Create Post
          </button>
          <button onClick={getAllPosts} className="nav__button">
            Get all Posts
          </button>
          <button onClick={getPostById} className="nav__button">
            Get Post By Id
          </button>
          <button onClick={getPostByUID} className="nav__button">
            Get Post By User Id
          </button>
          <button onClick={updatePost} className="nav__button">
            Update Post
          </button>
          <button onClick={deletePost} className="nav__button">
            Delete Post
          </button>
        </>
      )}
    </div>
  );
}

export default App;
