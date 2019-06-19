import React, {useEffect ,useState} from 'react';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBi1o8r_iZbXGdiFl5bjNWqWs1pGgAPGYk",
  authDomain: "jumjim-pos.firebaseapp.com",
  databaseURL: "https://jumjim-pos.firebaseio.com",
  projectId: "jumjim-pos",
  storageBucket: "jumjim-pos.appspot.com",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Index = () => {
  const [ products, setProducts ] = useState([]);

  useEffect(() => {


    const db = firebase.firestore();
    const products = db.collection("products").get()
      .then(function(querySnapshot) {
        const ps = []
        querySnapshot.forEach(doc => ps.push(doc.data()))
        setProducts(ps)
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });


  }, [])
  console.log(products);
  return (
      <div>
        <p>{`${JSON.stringify(products)}`}</p>
      </div>
  )
};

export default Index;