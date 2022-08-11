const Trace = require('./trace');

const indexBy = (array, prop) => array.reduce((output, item) => {
  output[item[prop]] = item;
  return output;
}, {});

const not = a => ~a & 1;
const and = (a, b) => a && b;
const nand = (a, b) => not(a && b);
const or = (a, b) => a || b;
const nor = (a, b) => not(a || b);
const xor = (a, b) => a ^ b;
const xnor = (a, b) => not(a ^ b);

const createNot=(name, a) => {
	return [
		{
			id: `${name}.out`,
      			type: 'nor',
      			inputs: [a, a],
      			state: 0
		}
	];
}

const createOr = (name, a, b) => {
	return [
		{
			id: `${name}.norOut`,
			type: 'nor',
			inputs: [a, b],
			state: 0
		},
		...createNot(`${name}`, `${name}.norOut`)
	       ]
};

const createDFF = (name, clk, dIn) => {
  return [
	...createNot(`${name}.not_d_in`, dIn),
    
    {
      id: `${name}.d_nand_a`,
      type: 'nand',
      inputs: [dIn, clk],
      state: 0
    },
    {
      id: `${name}.q`,
      type: 'nand',
      inputs: [`${name}.d_nand_a`, `${name}.q_`],
      state: 0
    },
    {
      id: `${name}.d_nand_c`,
      type: 'nand',
      inputs: [`${name}.not_d_in.out`, clk],
      state: 0
    },
    {
      id: `${name}.q_`,
      type: 'nand',
      inputs: [`${name}.d_nand_c`, `${name}.q`],
      state: 0
    },
  ];
}

const createDFFE = (name, clk, dIn, dEnable) => {
  const gatedClock = {
    id: `${name}.clk`,
    type: 'and',
    inputs: [clk, dEnable],
    state: 0
  };

  return [
    gatedClock,
    ...createDFF(name, gatedClock.id, dIn)
  ];
}

const createJKFF = (name, clk, j, k) => {
	return [
		{
     			id: `${name}.j_and_q_`,
      			type: 'and',
      			inputs: [`${name}.q_`, j],
     			 state: 0
   		},
		{
			id: `${name}.k_`,
      			type: 'not',
      			inputs: [k],
     			 state: 0
		},
		{
			id: `${name}.k__and_q`,
      			type: 'and',
      			inputs: [`${name}.k_`,`${name}.q`],
     			 state: 0
		},
		{
			id: `${name}.k__and_q_or`,
      			type: 'or',
      			inputs: [`${name}.k__and_q`,`${name}.j_and_q_`],
     			 state: 0
		},
		...createDFF(name, clk, `${name}.k__and_q_or`),
	]
}

const components = [
  {
    id: 'clock',
    type: 'controlled',
    inputs: [],
    state: 0,
  },
  {
    id: 'A',
    type: 'controlled',
    inputs: [],
    state: 0,
  },
  {
    id: 'E',
    type: 'controlled',
    inputs: [],
    state: 0,
  },
 {
    id: 'E1',
    type: 'controlled',
    inputs: [],
    state: 1,
  },
  {
    id: 'J',
    type: 'controlled',
    inputs: [],
    state: 1,
  },
  {
    id: 'K',
    type: 'controlled',
    inputs: [],
    state: 1,
  },
  ...createDFFE('DFF', 'clock', 'A', 'E'),
  ...createDFFE('DFF1', 'clock', 'A', 'E'),
  ...createJKFF('JKFF', 'clock', 'J', 'K'),
  ...createJKFF('JKFF1', 'JKFF.q', 'J', 'K'),
  ...createJKFF('JKFF2', 'JKFF1.q', 'J', 'K'),
  ...createJKFF('JKFF3', 'JKFF2.q', 'J', 'K'),
  ...createOr('Or', 'A', 'E')
];

const componentLookup = indexBy(components, 'id');

const evaluate = (components, componentLookup) => {
  const binaryOp = (logicFn, component) => {
    const aOut = componentLookup[component.inputs[0]];
    const bOut = componentLookup[component.inputs[1]];

    component.state = (aOut === 'x' || bOut === 'x')
      ? 'x'
      : logicFn(aOut.state, bOut.state);
    return;
  }

  components.forEach(component => {
    if (component.type === 'controlled') return;
    if (component.type === 'and') return binaryOp(and, component);
    if (component.type === 'nand') return binaryOp(nand, component);
    if (component.type === 'or') return binaryOp(or, component);
    if (component.type === 'nor') return binaryOp(nor, component);
    if (component.type === 'xor') return binaryOp(xor, component);
    if (component.type === 'xnor') return binaryOp(xnor, component);
    if (component.type === 'not') {
      const aOut = componentLookup[component.inputs[0]];
      component.state = (aOut === 'x') ? 'x' : not(aOut.state);
      return;
    }
  });
};

const EVALS_PER_STEP = 5;

const runFor = 40;
const trace = new Trace();

for (let iteration = 0; iteration < runFor; iteration++) {
  componentLookup.clock.state = not(componentLookup.clock.state);

  if (iteration === 0) {
    componentLookup.E.state = 1;
  }
  if (iteration === 1) {
    componentLookup.E.state = 0;
    componentLookup.A.state = 1;
  }
  if (iteration === 7) {
    componentLookup.E.state = 1;
  }
  if (iteration === 9) {
    componentLookup.E.state = 0;
    componentLookup.A.state = 0;
  }

  for (let i = 0; i < EVALS_PER_STEP; i++) {
    evaluate(components, componentLookup);
  }

 var binary = ""+ componentLookup['JKFF2.q_'].state+
		componentLookup['JKFF1.q_'].state+
		componentLookup['JKFF.q_'].state+componentLookup['clock'].state+componentLookup['Or.norOut'].state;
 var digit = parseInt(binary, 2);

 console.log(iteration, "-->",digit, binary);

  trace.sample(components);
}

trace.getTraces([	


'JKFF2.q',
'JKFF1.q',
'JKFF.q', 'clock', 'A', 'E', 'Or.out'
]).forEach(trace => console.log(trace));
