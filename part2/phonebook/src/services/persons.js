import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};
const create = (newObject) => {
  const response = axios.post(baseUrl, newObject);
  return response.then((res) => res.data);
};

const remove = (id) => {
  const response = axios.delete(`${baseUrl}/${id}`);
  return response.then((res) => res.data);
};

const update = (newObject) => {
  const response = axios.put(`${baseUrl}/${newObject.id}`, newObject);
  return response.then((res) => res.data);
};

export default { create, getAll, remove, update };
