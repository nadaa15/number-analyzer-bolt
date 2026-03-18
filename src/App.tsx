import { useState } from 'react';
import { Calculator } from 'lucide-react';

function App() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<{
    max: number;
    min: number;
    average: number;
    count: number;
    evenNumbers: number[];
    oddNumbers: number[];
  } | null>(null);
  const [error, setError] = useState('');

  const findMaximum = (numbers: number[]): number => {
    return Math.max(...numbers);
  };

  const findMinimum = (numbers: number[]): number => {
    return Math.min(...numbers);
  };

  const calculateAverage = (numbers: number[]): number => {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
  };

  const countNumbers = (numbers: number[]): number => {
    return numbers.length;
  };

  const findEvenNumbers = (numbers: number[]): number[] => {
    return numbers.filter(num => num % 2 === 0);
  };

  const findOddNumbers = (numbers: number[]): number[] => {
    return numbers.filter(num => num % 2 !== 0);
  };

  const handleAnalyze = () => {
    setError('');
    setResults(null);

    if (!input.trim()) {
      setError('Please enter some numbers');
      return;
    }

    const values = input.split(',').map(val => val.trim());

    const numbers: number[] = [];
    for (const val of values) {
      if (val === '') {
        setError('Empty values . Please enter valid numbers separated by commas.');
        return;
      }

      const num = Number(val);
      if (isNaN(num)) {
        setError(`Invalid input: "${val}" is not a valid number`);
        return;
      }
      numbers.push(num);
    }

    if (numbers.length === 0) {
      setError('No valid numbers found');
      return;
    }

    setResults({
      max: findMaximum(numbers),
      min: findMinimum(numbers),
      average: calculateAverage(numbers),
      count: countNumbers(numbers),
      evenNumbers: findEvenNumbers(numbers),
      oddNumbers: findOddNumbers(numbers),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Number Analyzer</h1>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="numbers" className="block text-sm font-medium text-gray-700 mb-2">
              Enter comma-separated numbers
            </label>
            <input
              id="numbers"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., 5, 12, 8, 23, 16, 3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <button
            onClick={handleAnalyze}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Analyze Numbers
          </button>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-lg">
              <p className="font-medium">Error:</p>
              <p>{error}</p>
            </div>
          )}

          {results && (
            <div className="mt-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Results</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                  <p className="text-sm text-gray-600 font-medium">Maximum</p>
                  <p className="text-2xl font-bold text-green-700">{results.max}</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                  <p className="text-sm text-gray-600 font-medium">Minimum</p>
                  <p className="text-2xl font-bold text-orange-700">{results.min}</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-600 font-medium">Average</p>
                  <p className="text-2xl font-bold text-blue-700">{results.average.toFixed(2)}</p>
                </div>

                <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-lg border border-slate-200">
                  <p className="text-sm text-gray-600 font-medium">Count</p>
                  <p className="text-2xl font-bold text-slate-700">{results.count}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-lg border border-teal-200">
                  <p className="text-sm text-gray-600 font-medium mb-2">Even Numbers</p>
                  <div className="flex flex-wrap gap-2">
                    {results.evenNumbers.length > 0 ? (
                      results.evenNumbers.map((num, idx) => (
                        <span key={idx} className="bg-teal-200 text-teal-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {num}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">None</span>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-4 rounded-lg border border-rose-200">
                  <p className="text-sm text-gray-600 font-medium mb-2">Odd Numbers</p>
                  <div className="flex flex-wrap gap-2">
                    {results.oddNumbers.length > 0 ? (
                      results.oddNumbers.map((num, idx) => (
                        <span key={idx} className="bg-rose-200 text-rose-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {num}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">None</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
