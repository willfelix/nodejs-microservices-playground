import axios from "axios";

export default class ServiceRegistry {
  private static timer: any = null;
  private static readonly INTERVAL_SECONDS = 10 * 1000;

  static register({ name, port }) {
    this.timer = setInterval(() => {
      axios
        .post("http://localhost:3000/register", { name, port })
        .then()
        .catch((e) => {});
    }, this.INTERVAL_SECONDS);
  }

  static async unregister({ port }) {
    clearInterval(this.timer);
    await axios.post("http://localhost:3000/unregister", { port });
  }
}
