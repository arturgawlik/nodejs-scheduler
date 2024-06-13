import { parseArgs } from "node:util";
import { kill } from "node:process";

const options = {
  processPid: {
    type: "string",
    multiple: true,
    short: "p",
  },
};

const argsToParse = process.argv.slice(2);
const { values: parsedArgs } = parseArgs({ options, args: argsToParse });
const pids = parsedArgs.processPid;

cpulimit(pids);

/**
 * @param {string[]} pids
 */
function cpulimit(pids) {
  if (!pids || !pids.length) {
    return;
  }

  for (let pid of pids) {
    manageProcessCpuTime(pid);
  }
}

/**
 * @param {string} pid
 */
function manageProcessCpuTime(pid) {
  console.log(pid);
  let sleeping = false;
  setInterval(() => {
    const signalToSend = sleeping ? "SIGCONT " : "SIGSTOP";
    kill(pid, signalToSend);
  }, 5000);
}
