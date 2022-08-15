type Service = {
  [key: string]: {
    name: string;
    host: string;
    timestamp: number;
  };
};

class ServiceRegistry {
  private services: Service;
  private readonly CLEAN_UP_TIMEOUT: number = 10 * 1000;

  constructor() {
    this.services = {};
  }

  register(name: string, ip: string, port: string) {
    this.cleanup();

    const host = ip.includes("::") ? `[${ip}]` : ip;
    const service = `http://${host}:${port}`;

    if (this.services[service]) {
      this.services[service].timestamp = new Date().getTime();
      return;
    }

    console.log(`# Registered new ${name} service with address ${service}`);

    this.services[service] = {
      name,
      host: service,
      timestamp: new Date().getTime(),
    };
  }

  get(service: string): string {
    this.cleanup();

    const instances = Object.values(this.services).filter(
      (s) => s.name === service
    );

    if (instances.length === 0) {
      throw new Error("Service not found!");
    }

    return instances[Math.floor(Math.random() * instances.length)].host;
  }

  private cleanup() {
    const now = new Date().getTime();
    Object.values(this.services).forEach((service) => {
      if (service.timestamp + this.CLEAN_UP_TIMEOUT < now) {
        delete this.services[service.host];
        console.log(`# Unregistering service with address ${service.host}`);
      }
    });
  }
}

export default new ServiceRegistry();
