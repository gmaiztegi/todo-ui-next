import { mount } from "enzyme";
import getConfig, { RuntimeConfig } from "next/config";
import IndexPage from "../../pages/index";

jest.mock("next/config");

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

  it("should render without throwing an error", () => {
    const wrap = mount(<IndexPage todos={[]} />);
    expect(wrap.find("h1").text()).toBe("To-do list");
  });
});
