// deno run --allow-net --allow-write tool/scrape.ts && deno fmt
import { initials } from "./constant.ts";
import jsdom from "https://dev.jspm.io/jsdom";

type Era = {
  name: string;
  ruby: string;
  rubyInitial: string;
  year: number;
  month: number;
  day: number;
};

const eraKeyList = ["name", "ruby", "rubyInitial", "year", "month", "day"];

// reiwa(令和) data
const reiwa: Era = {
  name: "令和",
  ruby: "れいわ",
  rubyInitial: "R",
  year: 2019,
  month: 5,
  day: 1,
};

function getRubyInitial(text: string): string {
  const initial = text.charAt(0);

  if (!initial || !initials[initial]) {
    const errorText = `Not found: ${text}`;
    throw new Error(errorText);
  }

  return initials[initial];
}

// TODO: Refactoring
function hasAllEraData(obj: Era | any): boolean {
  const keys = Object.keys(obj);

  if (keys.length === 6) {
    for (const key of keys) {
      if (!eraKeyList.includes(key)) return false;
    }

    return true;
  }

  return false;
}

function readEUC(blob: Blob): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsText(blob, "euc-jp");
  });
}

async function fetchEraData(): Promise<Array<Era>> {
  const url = "http://www.kumamotokokufu-h.ed.jp/kumamoto/bungaku/nengoui.html";
  const response = await fetch(url);
  const blob = await response.blob();
  const html = await readEUC(blob);

  // @ts-ignore
  const dom = new jsdom.JSDOM(html);
  const document = dom.window.document;
  const nodes = document.querySelectorAll("td");

  // TODO: Refactoring
  const result: Array<Era> = [];
  let eraObj: Era | any = {};
  for (const node of nodes) {
    if (node.noWrap && node.bgColor) {
      eraObj.name = node.textContent;
    } else if (node.noWrap && node.align) {
      eraObj.year = Number(node.textContent.split("～")[0]);
    } else if (node.noWrap) {
      eraObj.ruby = node.textContent;
      eraObj.rubyInitial = getRubyInitial(node.textContent);
    } else if (node.align && node.bgColor && !node.dl) {
      if (node.align === "left") continue;

      eraObj.month = Number(node.textContent.split("/")[0]);
      eraObj.day = Number(node.textContent.split("/")[1]);
    }

    if (hasAllEraData(eraObj)) {
      result.push(eraObj);
      eraObj = {};
    }
  }

  result.push(reiwa);

  return result;
}

async function writeJsonFile(eraList: Array<Era>): Promise<void> {
  const fileName = "./data.json";
  await Deno.writeTextFile(fileName, JSON.stringify(eraList));
  console.log("Data has been written to a file: ", fileName);
}

async function main() {
  const eraList = await fetchEraData();
  await writeJsonFile(eraList);
}

console.log("=== Start ===");
await main();
console.log("=== Finish ===");
