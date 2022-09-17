# cpu-simple-simulator
A simple cpu, which can run your assembly code with limited set of instructions and registers.

Registers
	10 total registers for data to hold in
	register names start with "r" followed by number 0-9
	registry to hold labels for jump instructions
	registry to hold the flag for conditional jumps
	
Instructions
	Arithmetic operations with 2 numbers
		add - Add
		sub - Subtract
		mul - Multiply
		div - Divide
		cmp - Compare the numbers and put the value as -1, 0 or 1 into flag registry
	Logical operations with 2 numbers
		or
		and
		xor
	Jumps (be careful not to cause an infinite loop)
		jmp - unconditional jmp
		jl - jump if the flag is -1
		jle - jump if the flag is 0 or -1
		jg - jump if the flag is 1
		jge - jump if the flag us 1 or 0
	Movement
		mov - value of second argument/registry into first registry
		
Labels have to start with a letter no matter the case, followed by letters, digits and underscore, ending with a colon ":".

Instructions work with numbers only.
