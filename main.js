const instructions = `mov r1,44
add r1,91
mov r9,r1
jmp HERE
sub r7,r9
LABEL:
mov r4,2
mov r0,7
cmp r1,r4
mul r1,r4
mov r2,r0
jl LABEL
HERE:
mul r1,r9`;

class SimulatedCPU {
  constructor() {
    this.registers = {
      r0: 0,
      r1: 0,
      r2: 0,
      r3: 0,
      r4: 0,
      r5: 0,
      r6: 0,
      r7: 0,
      r8: 0,
      r9: 0,

      i: 0,
      lastLine: 0,
      labels: {},
      flag: 0,
    };
  }

  parseInstructions(str) {
    const lines = str.split("\n");

    for (let i = 0; i < lines.length; i++) {
      if (/[a-zA-Z]\w+:$/.test(lines[i])) {
        this.registers.labels[
          lines[i].match(/\w+/)[0]
        ] = i;
      }
    }

    this.registers.i = 0;
    this.registers.lastLine = lines.length;

    while (this.registers.i < this.registers.lastLine) {
      console.log('1');
      
      if (/[a-zA-Z]\w+:$/.test(lines[this.registers.i])) {
        this.registers.labels[
          lines[this.registers.i].match(/\w+/)[0]
        ] = this.registers.i;
        ++this.registers.i;
        continue;
      }

      const lineArg = lines[this.registers.i].split(/[ ,]/);
      const [action, arg1, arg2] = lineArg;
      switch (action) {
        case "jl":
          if (this.registers.flag === -1) {
            const label = lines[this.registers.i].split(' ')[1];
            this.jmp(label);            
          }
          continue;
        case "jle":
          if (this.registers.flag <= 0) {
            const label = lines[this.registers.i].split(' ')[1];
            this.jmp(label);            
          }
          continue;
        case "jg":
          if (this.registers.flag === 1) {
            const label = lines[this.registers.i].split(' ')[1];
            this.jmp(label);            
          }
          continue;
        case "jge":
          if (this.registers.flag >= 0) {
            const label = lines[this.registers.i].split(' ')[1];
            this.jmp(label);            
          }
          continue;
        case "jmp":
          const label = lines[this.registers.i].split(' ')[1];
          this.jmp(label);
          continue;
        default:
          break;
      }

      if (!this[action]) {
        throw new Error("No such Instruction!");
      }
      if (this.registers[arg1] === undefined) {
        throw new Error("No such Register!");
      }

      if (this.registers[arg2] || this.registers[arg2] === 0) {
        this[action](arg1, this.registers[arg2]);
        ++this.registers.i;
        continue;
      }
      if (!Number(arg2)) {
        throw new Error("Second Argument is not a valid value!");
      }
      this[action](arg1, arg2);
      ++this.registers.i;
    }    
  }

  add(arg1, arg2) {
    this.registers[arg1] = this.registers[arg1] + +arg2;
  }

  sub(arg1, arg2) {
    this.registers[arg1] = this.registers[arg1] - arg2;
  }

  mul(arg1, arg2) {
    this.registers[arg1] = this.registers[arg1] * arg2;
  }

  div(arg1, arg2) {
    this.registers[arg1] = this.registers[arg1] / arg2;
  }

  mov(src, dest) {
    this.registers[src] = this.registers[dest] || +dest;
  }

  bor(src, dest) {
    this.registers[src] = this.registers[dest] | +dest;
  }

  bnd(src, dest) {
    this.registers[src] = this.registers[dest] & +dest;
  }

  jmp(pointer) {
    this.registers.i = this.registers.labels[pointer];
  }

  cmp(arg1, arg2) {
    if (this.registers[arg1] > arg2) {
      this.registers.flag = 1;
    } else if (this.registers[arg1] < arg2) {
      this.registers.flag = -1;
    } else {
      this.registers.flag = 0;
    }
  }
}

const cpu = new SimulatedCPU();

cpu.parseInstructions(instructions);
