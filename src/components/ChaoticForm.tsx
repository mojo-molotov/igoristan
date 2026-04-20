import { useEffect, useState } from 'react';

import { randint } from '@/lib/randint';

const randomErrors = [
  'ERROR: The spirit of Corsica rejects your input',
  'BIBLICAL WARNING: This field contains forbidden knowledge',
  'ALERT: Napoleon disapproves',
  'ERROR 777: Divine intervention detected',
  'CORSICAN FIREWALL: Access denied to mainlanders',
  'SCRIPTURE VIOLATION: Thou shalt not input this',
  'APOSTOLIC EXCEPTION: Peter would never type this',
  'ISLAND PROTOCOL: Only Corsican IPs allowed',
  'REVELATION ERROR: The seven seals remain closed'
] as const;

const submitErrors = [
  'SUBMISSION FAILED: The Pope has not approved this form',
  'ERROR 666: Corsican server exploded, try again',
  'DIVINE REJECTION: Your faith level is insufficient',
  'SUBMIT BLOCKED: Napoleon is still reviewing your application',
  'APOSTOLIC VETO: This submission lacks holy spirit'
] as const;

const blurErrors = [
  'Field blessing failed - consult the Book of Ajaccio',
  'Validation error: Not enough Corsican nationalism',
  'Biblical reference missing - add more psalms',
  'ERROR: This input displeases the Mediterranean',
  'Apostle authentication failed',
  'Mountain elevation out of sanctified range',
  'CRITICAL: Lacks sufficient scriptural gravitas'
] as const;

const ChaoticForm = () => {
  const [formData, setFormData] = useState({
    mountainHeight: '',
    corsicaCity: '',
    apostleName: '',
    bibleVerse: '',
    revelation: ''
  });

  const [randomError, setRandomError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.15) return;

      const error = randomErrors[randint(0, randomErrors.length - 1)];
      setRandomError(error);

      const timeout = setTimeout(() => {
        setRandomError('');
      }, 5e3);

      return () => clearTimeout(timeout);
    }, 5e3);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = (e: any) => {
    const { name } = e.target;

    if (Math.random() < 0.17) {
      const error = blurErrors[randint(0, blurErrors.length - 1)];
      setFieldErrors((prev) => ({
        ...prev,
        [name]: error
      }));
    } else {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setSuccessMessage('');
    setRandomError('');
  };

  useEffect(() => {
    if (!isSubmitting) return;

    const timeout = setTimeout(() => {
      setIsSubmitting(false);

      if (Math.random() < 0.15) {
        const error = submitErrors[randint(0, submitErrors.length - 1)];
        setRandomError(error);

        const errorTimeout = setTimeout(() => {
          setRandomError('');
        }, 10e3);

        return () => clearTimeout(errorTimeout);
      } else {
        setSuccessMessage('Form submission blessed by the Emperor.');

        const successTimeout = setTimeout(() => {
          setSuccessMessage('');
        }, 10e3);

        return () => clearTimeout(successTimeout);
      }
    }, 3e3);

    return () => clearTimeout(timeout);
  }, [isSubmitting]);

  return (
    <>
      {randomError && (
        <div className="catch-me-if-you-can mb-6 animate-pulse rounded-lg border-2 border-red-500 bg-red-100 p-4 shadow-lg">
          <p className="font-bold text-red-700">⚠️ {randomError}</p>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 rounded-lg border-2 border-green-500 bg-green-100 p-4 shadow-lg" data-testid="success-message">
          <p className="font-bold text-green-700">✅ {successMessage}</p>
        </div>
      )}

      <div className="space-y-6 rounded-lg bg-white p-8 shadow-xl">
        <div>
          <label className="mb-2 block font-semibold text-gray-700" htmlFor="bible-verse">
            Favorite Bible Verse
          </label>
          <input
            className="w-full rounded-md border-2 border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            placeholder="e.g., John 3:16"
            value={formData.bibleVerse}
            onChange={handleChange}
            onBlur={handleBlur}
            name="bibleVerse"
            id="bible-verse"
            type="text"
          />
          {fieldErrors.bibleVerse && <p className="catch-me-if-you-can mt-1 text-sm text-red-600">❌ {fieldErrors.bibleVerse}</p>}
        </div>

        <div>
          <label className="mb-2 block font-semibold text-gray-700" htmlFor="corsican-city">
            Favorite Corsican City
          </label>
          <input
            className="w-full rounded-md border-2 border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            placeholder="e.g., Ajaccio, Bastia, Corte"
            value={formData.corsicaCity}
            onChange={handleChange}
            onBlur={handleBlur}
            name="corsicaCity"
            id="corsican-city"
            type="text"
          />
          {fieldErrors.corsicaCity && <p className="catch-me-if-you-can mt-1 text-sm text-red-600">❌ {fieldErrors.corsicaCity}</p>}
        </div>

        <div>
          <label className="mb-2 block font-semibold text-gray-700" htmlFor="inspiring-apostle">
            Most Inspiring Apostle
          </label>
          <select
            className="w-full rounded-md border-2 border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            value={formData.apostleName}
            onChange={handleChange}
            id="inspiring-apostle"
            onBlur={handleBlur}
            name="apostleName"
          >
            <option value="">Select an Apostle...</option>
            <option value="peter">Peter</option>
            <option value="paul">Paul</option>
            <option value="john">John</option>
            <option value="james">James</option>
            <option value="matthew">Matthew</option>
          </select>
          {fieldErrors.apostleName && <p className="catch-me-if-you-can mt-1 text-sm text-red-600">❌ {fieldErrors.apostleName}</p>}
        </div>

        <div>
          <label className="mb-2 block font-semibold text-gray-700" htmlFor="cinto-height">
            Mount Cinto Height (meters)
          </label>
          <input
            className="w-full rounded-md border-2 border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            value={formData.mountainHeight}
            onChange={handleChange}
            name="mountainHeight"
            onBlur={handleBlur}
            placeholder="2706"
            id="cinto-height"
            type="number"
          />
          {fieldErrors.mountainHeight && <p className="catch-me-if-you-can mt-1 text-sm text-red-600">❌ {fieldErrors.mountainHeight}</p>}
        </div>

        <div>
          <label className="mb-2 block font-semibold text-gray-700" htmlFor="personal-revelation">
            Personal Revelation
          </label>
          <textarea
            className="w-full rounded-md border-2 border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            placeholder="Share your divine insight about the island..."
            value={formData.revelation}
            id="personal-revelation"
            onChange={handleChange}
            onBlur={handleBlur}
            name="revelation"
            rows={4}
          />
          {fieldErrors.revelation && <p className="catch-me-if-you-can mt-1 text-sm text-red-600">❌ {fieldErrors.revelation}</p>}
        </div>

        <button
          className="w-full rounded-md bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          data-testid="chaotic-form-submit-btn"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-white border-r-transparent" />
              Submitting to the Holy Island...
            </span>
          ) : (
            'Submit Sacred Form 📿⛰️'
          )}
        </button>
      </div>
    </>
  );
};

export default ChaoticForm;
