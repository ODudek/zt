import axios from "axios";

const API = {
  POST: (url, valueToPost, callback) => {
    axios
      .post(url, valueToPost)
      .then(callback)
      .catch(e => console.error(e));
  },
  PUT: (url, valueToPut, callback) => {
    axios
      .put(url, valueToPut)
      .then(callback)
      .catch(e => console.error(e));
  },
  GET: (url, callback) => {
    axios
      .get(url)
      .then(callback)
      .catch(e => {
        console.error(e);
      });
  },
  DELETE: (url, callback) => {
    axios
      .delete(url)
      .then(callback)
      .catch(e => {
        console.error(e);
      });
  }
};

export default API;
