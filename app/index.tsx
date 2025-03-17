import { useState } from 'react';
import './index.css';

export default function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const operators = ['/','*','-','+', '='];

  const handleInput = (value: string) => {
    if(operators.includes(value))
      value = ' ' + value + ' ';
    setInput((prev) => prev + value);
  };

  const clearInput = () => {
    setInput('');
    setResult(null);
  };

  const calculateResult = () => {
    const stripped = input.replace(' ', '');
    try {
      setResult(eval(stripped).toFixed(3));
    } catch {
      setResult('Error');
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
  ];

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <input
        type="text"
        value={input}
        readOnly
        onFocus={(e) => e.target.blur()}
        className="p-2 rounded-lg w-64 text-right mb-4 text-xl"
      />
      <div className="grid grid-cols-4 gap-2">
        {
          buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => (btn === '=' ? calculateResult() : handleInput(btn))}
              className={'p-4 bg-gray-200 rounded-lg text-xl' + (operators.includes(btn)? ' pink': '') }
            >
              {btn}
            </button>
          ))
        }
        <button onClick={clearInput} className="clear-btn col-span-4 p-4 bg-indigo-500 text-white rounded-lg text-xl">Clear</button>
      </div>
      {result !== null && (
        <div className="mt-4 text-xl font-bold">Result: {result}</div>
      )}
    </div>
  );
}
