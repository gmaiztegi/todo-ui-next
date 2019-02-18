import { mount, shallow } from "enzyme";
import { NextContext } from "next";
import getConfig, { RuntimeConfig } from "next/config";
import { AddTodoForm, TodoItemList } from "../../components";
import TodoEndpoint from "../../endpoint/todo";
import ITodo from "../../model/todo";
import IndexPage from "../../pages/index";

jest.mock("next/config");
jest.mock("../../endpoint/todo");
jest.mock("../../hocs/withTodoWebsocket", () => {
  return {
    withTodoWebsocket: Wrapped => {
      const wrap = ({ todos }) => (
        <Wrapped todos={todos} socket={{ on: jest.fn(), emit: jest.fn() }} />
      );

      wrap.WrappedComponent = Wrapped;

      return wrap;
    }
  };
});

type MockedSocket = jest.Mocked<Pick<SocketIOClient.Socket, "on" | "emit">>;

describe("Index", () => {
  beforeAll(() => {
    (getConfig as jest.Mock<
      ReturnType<typeof getConfig>,
      []
    >).mockImplementation(
      (): RuntimeConfig => {
        return { publicRuntimeConfig: {}, serverRuntimeConfig: {} };
      }
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without throwing an error", () => {
    const wrap = mount(<IndexPage todos={[]} />);
    expect(wrap.find("h1").text()).toBe("To-do list");
  });

  it("should initialize state with props", () => {
    const todos: ITodo[] = [{ _id: "id1", label: "random label" }];

    const wrap = shallow(<IndexPage todos={todos} />).dive();
    expect(wrap.state("todos")).toBe(todos);
  });

  it("should ask for initialization when connected", () => {
    const wrap = shallow(<IndexPage todos={[]} />);
    const socket = wrap.prop<MockedSocket>("socket");
    wrap.render();
    expect(socket.on).toHaveBeenCalledWith("connect", expect.any(Function));
    expect(socket.emit).not.toHaveBeenCalled();
    const connectCallback = socket.on.mock.calls.find(
      call => "connect" === call[0]
    )[1];
    connectCallback();
    expect(socket.emit).toHaveBeenCalledWith("initialize");
  });

  it("should update state when receiving todos", () => {
    const wrap = shallow(<IndexPage todos={[]} />);
    const indexWrap = wrap.dive();
    const socket = wrap.prop<MockedSocket>("socket");

    expect(socket.on).toHaveBeenCalledWith("todos", expect.any(Function));
    const todoCallback = socket.on.mock.calls.find(
      call => "todos" === call[0]
    )[1];

    const newTodos: ITodo[] = [{ _id: "id", label: "label " }];
    todoCallback(newTodos);
    expect(indexWrap.state("todos")).toBe(newTodos);
  });

  it("should emit an add event when todo is created", () => {
    const wrap = shallow(<IndexPage todos={[]} />);
    const socket = wrap.prop<MockedSocket>("socket");
    const onCreate = wrap
      .dive()
      .find(AddTodoForm)
      .prop("onCreate");

    const todo = "todo1";
    onCreate(todo);
    expect(socket.emit).toHaveBeenCalledWith("add", todo);
  });

  it("should emit a delete event with the id when a delete is intended", () => {
    const todo: ITodo = { _id: "id1", label: "label" };

    const wrap = shallow(<IndexPage todos={[todo]} />);
    const socket = wrap.prop<MockedSocket>("socket");

    const onDelete = wrap
      .dive()
      .find(TodoItemList)
      .prop("onDelete");
    onDelete(todo);
    expect(socket.emit).toHaveBeenCalledWith("delete", todo._id);
  });

  it("it should get the initial todos from API", async () => {
    expect(TodoEndpoint).not.toHaveBeenCalled();

    const todos: ITodo[] = [{ _id: "id1", label: "label1" }];
    (TodoEndpoint.prototype.findAll as jest.Mock).mockReturnValue(todos);

    const props = await IndexPage.WrappedComponent.getInitialProps(
      {} as NextContext
    );
    expect(props).toEqual({ todos });
  });
});
