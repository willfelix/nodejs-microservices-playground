import axios from "axios";
import { getRegistry } from "../../src/middleware/registry";

jest.mock("axios");

describe("Middleware: getRegistry()", () => {
  it("should get registry correctly", async () => {
    const expected = "http://test.com:9090";
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValue({ data: expected });

    const request: any = { url: "/banners" };
    const response: any = { statusCode: 200, json: () => {} };
    const next: any = () => {};

    await getRegistry(request, response, next);
    expect(request.service).toBe(expected);
  });

  it("should throw an error for service not found", async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockRejectedValue(new Error("Service not found"));

    const request: any = { url: "/banners" };
    const response: any = { statusCode: 200, json: () => {} };
    const next: any = () => {};

    await getRegistry(request, response, next);
    expect(response.statusCode).toBe(404);
  });
});
