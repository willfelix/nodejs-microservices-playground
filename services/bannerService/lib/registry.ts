import axios from "axios";

export default class ServiceRegistry {
  static register({ name, port }) {
    setInterval(() => {
      axios
        .post("http://localhost:3000/register", { name, port })
        .then()
        .catch((e) => {});
    }, 5000);
  }
}
