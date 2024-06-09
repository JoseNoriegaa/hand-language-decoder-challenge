import fs from 'fs';
import interpreter from "../src/interpreter";
import path from 'path';

describe('interpreter - execute command', () => {
  it('should decode "Hello" message', () => {
    const command = '👇🤜👇👇👇👇👇👇👇👉👆👈🤛👉👇👊👇🤜👇👉👆👆👆👆👆👈🤛👉👆👆👊👆👆👆👆👆👆👆👊👊👆👆👆👊';
    const message = interpreter.executeCommand(command);

    expect(message).toBe("Hello");
  });
  
  it('should decode "Hello World!" message', () => {
    const command = '👉👆👆👆👆👆👆👆👆🤜👇👈👆👆👆👆👆👆👆👆👆👉🤛👈👊👉👉👆👉👇🤜👆🤛👆👆👉👆👆👉👆👆👆🤜👉🤜👇👉👆👆👆👈👈👆👆👆👉🤛👈👈🤛👉👇👇👇👇👇👊👉👇👉👆👆👆👊👊👆👆👆👊👉👇👊👈👈👆🤜👉🤜👆👉👆🤛👉👉🤛👈👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👉👊👆👆👆👊👇👇👇👇👇👇👊👇👇👇👇👇👇👇👇👊👉👆👊👉👆👊';
    const message = interpreter.executeCommand(command);

    expect(message).toBe("Hello World!\n");
  });

  // test('given the challenge input it should return "Hello World!"', () => {
  //   const command = fs.readFileSync(path.join(__dirname, '../hand.input'), 'utf-8');
  //   const message = interpreter.executeCommand(command);
  //   expect(message).toBe("Hello World!");
  // });
});
