import Axios, { AxiosResponse } from "axios";
import TodoEndpoint from "../../endpoint/todo";
import ITodo from "../../model/todo";

jest.mock("axios");

describe("TodoEndpoint", () => {
  describe("findAll", () => {
    it("will call the API and return the result", async () => {
      const getMock = jest.spyOn(Axios, "get");
      const todos: ITodo[] = [{ _id: "id", label: "label" }];
      const resp = { data: todos } as AxiosResponse<ITodo[]>;
      getMock.mockReturnValue(Promise.resolve(resp));

      const prefix = "http://anurl";
      const endpoint = new TodoEndpoint(prefix);
      const result = await endpoint.findAll();

      expect(getMock).toHaveBeenCalledWith(prefix + "/todo");
      expect(result).toBe(todos);
    });
  });
});
