const bridgeContractABI = [
  {
    'inputs': [
      { 'internalType': 'address', 'name': '_to', 'type': 'address' },
      { 'internalType': 'uint32', 'name': '_minGasLimit', 'type': 'uint32' },
      { 'internalType': 'bytes', 'name': '_extraData', 'type': 'bytes' }
    ],
    'name': 'depositETHTo',
    'outputs': [],
    'stateMutability': 'payable',
    'type': 'function'
  }
  // Add other contract functions and events as needed
];

export default bridgeContractABI;
