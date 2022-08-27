import { run, getFile } from "../src/run.mjs";

describe("Subscribe Challenge Test Runner", () => {
  test("input1.txt results to match output1.txt", async () => {
    const result = await run("./data/input1.txt");
    const output = await getFile("./data/output1.txt");
    expect(result).toMatch(output);
  });

  test("input2.txt results to match output2.txt", async () => {
    const result = await run("./data/input2.txt");
    const output = await getFile("./data/output2.txt");
    expect(result).toMatch(output);
  });

  test("input3.txt results to match output3.txt", async () => {
    const result = await run("./data/input3.txt");
    const output = await getFile("./data/output3.txt");
    expect(result).toMatch(output);
  });
});
