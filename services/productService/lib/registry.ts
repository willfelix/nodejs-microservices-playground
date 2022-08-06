import axios from "axios";

export default class ServiceRegistry {
  static register({ name, ip, port }) {
    setInterval(() => {
      axios
        .post("http://localhost:3000/register", { name, ip, port })
        .then()
        .catch((e) => {});
    }, 5000);
  }
}
