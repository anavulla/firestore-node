const express = require("express"),
  app = express(),
  documentRoutes = express.Router(),
  Firestore = require("@google-cloud/firestore"),
  config = require("./../_configuration/config");

const firestore = new Firestore(config.FIRESTORE_CONFIG);

documentRoutes.route("/getAllDocuments").post(function(req, res) {
  collectionName = req.body.collectionName;
  let documents = [];

  async function getAllDocuments() {
    console.log("retrieving documents for collection:" + collectionName);
    let documents = [];
    let query = firestore.collection(collectionName);
    await query.get().then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        documents.push(doc.data());
      });
      console.log(
        "total documents in " + collectionName + ":" + documents.length
      );
      res.json(documents);
    });
  }
  getAllDocuments();
});

/*
********request body structure**********
{ metadata:
   { collectionName: 'myCollection',
     doc_id: '123456789' } 
}
****************************************
*/
documentRoutes.route("/getDocument").post(function(req, res) {
  collectionName = req.body.metadata.collectionName;
  doc_id = req.body.metadata.doc_id;
  doc_path = collectionName + "/" + doc_id;

  console.log("retrieving document:" + doc_path);
  const document = firestore.doc(doc_path);

  async function getDocument() {
    let doc = await document.get();
    res.json(doc.data());
  }
  getDocument();
});

/*
********request body structure**********
{ metadata:
   { collectionName: 'myCollection',
     doc_id: '123456789' },
  data:
   { filed1: value1,
     filed2: value2 }
}
****************************************
*/
documentRoutes.route("/updateDocument").post(function(req, res) {
  doc_data = req.body.data;
  doc_path = req.body.metadata.collectionName + "/" + req.body.metadata.doc_id;

  console.log("updating document:" + doc_path);
  const document = firestore.doc(doc_path);

  async function updateDocument() {
    await document.update(doc_data).then(result => res.json(result));
  }
  updateDocument();
});

/*
********request body structure**********
{ metadata:
   { collectionName: 'myCollection',
     doc_id: '123456789' } 
}
****************************************
*/
documentRoutes.route("/deleteDocument").post(function(req, res) {
  collectionName = req.body.metadata.collectionName;
  doc_id = req.body.metadata.doc_id;
  doc_path = collectionName + "/" + doc_id;

  console.log("deleting document:" + doc_path);
  const document = firestore.doc(doc_path);

  async function deleteDocument() {
    let doc = await document.delete().then(result => res.json(result));
  }
  deleteDocument();
});

/*
********request body structure**********
{ metadata:
   { collectionName: 'myCollection',
     doc_id: '123456789' } 
}
****************************************
*/
documentRoutes.route("/addDocument").post(function(req, res) {
  collectionName = req.body.metadata.collectionName;
  doc_id = req.body.metadata.doc_id;
  doc_path = collectionName + "/" + doc_id;

  console.log("deleting document:" + doc_path);
  const document = firestore.doc(doc_path);

  async function addDocument() {
    let doc = await document.set(doc_data).then(result => res.json(result));
  }
  addDocument();
});

module.exports = documentRoutes;
