import axios from "axios";

export default class ServiceRegistry {
  private static readonly INTERVAL_SECONDS = 5 * 1000;

  static register({ name, port }) {
    setInterval(() => {
      axios
        .post("http://localhost:3000/register", { name, port })
        .then()
        .catch((e) => {});
    }, this.INTERVAL_SECONDS);
  }
}
