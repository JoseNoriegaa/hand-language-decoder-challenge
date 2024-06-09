import fs from 'fs';
import path from 'path';

function decrease(value: number): number {
  if (value === 0) {
    return 255;
  }

  return value - 1;
}

function increase(value: number): number {
  if (value == 255) {
    return 0;
  }

  return value + 1;
}

enum Command {
  NEXT_CELL = '👉',
  PREVIOUS_CELL = '👈',
  INCREASE_CELL = '👆',
  DECREASE_CELL = '👇',
  JUMP_NEXT = '🤜',
  JUMP_PREV = '🤛',
  RETURN = '👊',
}

const executeCommand = (input: string) => {
  let pointer = 0;
  let memory = [0];

  const commands = Array.from(input);

  // Find loops
  let loopIndexes: Record<number, number> = {};
  const stack: number[] = [];
  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];

    if (command === Command.JUMP_NEXT) {
      
      stack.push(i);
    } else if (command === Command.JUMP_PREV) {
      if (stack.length === 0) {
        throw new Error('Invalid syntax');
      }

      loopIndexes[i] = stack.pop()!;
      loopIndexes[loopIndexes[i]] = i;
    }
  }

  const output: string[] = [];

  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];

    switch (command) {
      case Command.NEXT_CELL:
        pointer++;
        if (pointer >= memory.length) {
          memory.push(0);
        }
        break;
      case Command.PREVIOUS_CELL:
        pointer--;
        if (pointer < 0) {
          throw new Error(`Unexpected token: ${command}`);
        }
        break;
      case Command.INCREASE_CELL:
        memory[pointer] = increase(memory[pointer]);
        break;
      case Command.DECREASE_CELL:
        memory[pointer] = decrease(memory[pointer]);
        break;
      case Command.JUMP_NEXT:
        if (memory[pointer] === 0) {
          i = loopIndexes[i];
        }
        break;
      case Command.JUMP_PREV:
        if (memory[pointer] !== 0) {
          i = loopIndexes[i];
        }
        break;
      case Command.RETURN:
        output.push(String.fromCharCode(memory[pointer]));
        break;
      default:
        break;
    }
  }

  return output.join('');
}

export default {
  increase,
  decrease,
  executeCommand,
}

// Prevent to run it with the unit tests
if (!process.env.JEST_WORKER_ID) {
  console.time('exec time');
  console.log(`********* Decoding hand.input *********`);
  console.log(`This will take a long time...`);
  
  const input = fs.readFileSync(path.join(__dirname, '../hand.input'), 'utf-8');
  const message = executeCommand(input);
  console.log(`Decoded message:`);
  console.log(message);
  console.timeEnd('exec time');
}
