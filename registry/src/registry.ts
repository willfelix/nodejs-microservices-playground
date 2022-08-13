class ServiceRegistry {
  services: { [key: string]: { host: string; name: string } };

  constructor() {
    this.services = {};
  }

  register(name: string, ip: string, port: string) {
    const host = ip.includes("::") ? `[${ip}]` : ip;
    const service = `http://${host}:${port}`;

    if (this.services[service]) return;

    console.log(`# Registered new ${name} service with address ${service}`);

    this.services[service] = {
      name,
      host: service,
    };
  }

  get(service: string): string {
    const instances = Object.values(this.services).filter(
      (s) => s.name === service
    );

    if (instances.length === 0) {
      throw new Error("Service not found!");
    }

    return instances[Math.floor(Math.random() * instances.length)].host;
  }
}

export default new ServiceRegistry();
