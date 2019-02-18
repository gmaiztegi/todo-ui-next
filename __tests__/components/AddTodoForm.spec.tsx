import { mount } from "enzyme";
import AddTodoForm from "../../components/AddTodoForm";

describe("AddTodoForm", () => {
  it("should call the callback and clear the text when submited", () => {
    const typedText = "test1";
    const callback: jest.Mock<void, [string]> = jest.fn();

    const wrap = mount(<AddTodoForm onCreate={callback} />);
    const input = wrap.find("input");
    input.simulate("change", { target: { value: typedText } });
    const stopPropagation: jest.Mock<void, []> = jest.fn();
    const preventDefault: jest.Mock<void, []> = jest.fn();
    wrap.find("form").simulate("submit", { stopPropagation, preventDefault });

    expect(callback).toBeCalledWith(typedText);
    expect(input.prop<string>("value")).toEqual("");
    expect(stopPropagation).toHaveBeenCalled();
    expect(preventDefault).toHaveBeenCalled();
  });

  it("should not call the callback when the text is empty", () => {
    const typedText = "";
    const callback: jest.Mock<void, [string]> = jest.fn();

    const wrap = mount(<AddTodoForm onCreate={callback} />);
    const input = wrap.find("input");
    input.simulate("change", { target: { value: typedText } });
    const stopPropagation: jest.Mock<void, []> = jest.fn();
    const preventDefault: jest.Mock<void, []> = jest.fn();
    wrap.find("form").simulate("submit", { stopPropagation, preventDefault });

    expect(callback).not.toBeCalled();
    expect(stopPropagation).toHaveBeenCalled();
    expect(preventDefault).toHaveBeenCalled();
  });
});
