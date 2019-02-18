import { mount } from "enzyme";
import TodoItem from "../../components/TodoItem";
import TodoItemList from "../../components/TodoItemList";
import ITodo from "../../model/todo";

describe("TodoItemList", () => {
  it("should render every item", () => {
    const items: ITodo[] = [
      { _id: "id1", label: "label1" },
      { _id: "id2", label: "label2" }
    ];

    const deleteCallback: jest.Mock<void, [ITodo]> = jest.fn();

    const wrap = mount(
      <TodoItemList todos={items} onDelete={deleteCallback} />
    );

    expect(wrap.children(TodoItem)).toHaveLength(2);
    expect(
      wrap
        .childAt(1)
        .find("p")
        .text()
    ).toEqual("label2");
  });

  it("should call the delete callback with the item as argument", () => {
    const item1: ITodo = { _id: "id1", label: "label1" };
    const item2: ITodo = { _id: "id2", label: "label2" };

    const items: ITodo[] = [item1, item2];

    const deleteCallback: jest.Mock<void, [ITodo]> = jest.fn();

    const wrap = mount(
      <TodoItemList todos={items} onDelete={deleteCallback} />
    );

    wrap
      .childAt(1)
      .find("button")
      .simulate("click");
    expect(deleteCallback).toHaveBeenCalledWith(item2);
  });
});
