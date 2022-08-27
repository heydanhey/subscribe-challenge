import { run } from "./run.mjs";

(async () => {
  const filePath = process.argv[2] || "./data/input1.txt";
  const output = await run(filePath);
  console.log(output);
})();
