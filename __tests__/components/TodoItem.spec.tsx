import { mount } from "enzyme";
import { TodoItem } from "../../components";

describe("TodoItem", () => {
  it("should render the label", () => {
    const label = "label1";

    // tslint:disable-next-line:no-empty
    const wrap = mount(<TodoItem label={label} onDelete={() => {}} />);

    expect(wrap.find("p").text()).toEqual(label);
  });

  it("should call the delete callback when cross is clicked", () => {
    const callback = jest.fn();
    const props = { label: "label", onDelete: callback };

    const wrap = mount(<TodoItem {...props} />);
    const deleteButton = wrap.find("button");
    expect(deleteButton.text()).toEqual("×");

    deleteButton.simulate("click");
    expect(callback).toBeCalledTimes(1);
  });
});
