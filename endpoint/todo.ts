import Axios from "axios";
import ITodo from "../model/todo";

export default class TodoEndpoint {
  constructor(private readonly endpointPrefix: string) {}

  async findAll() {
    const response = await Axios.get<ITodo[]>(`${this.endpointPrefix}/todo`);

    return response.data;
  }
}
