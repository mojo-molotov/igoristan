import { RefreshCw, Volume2, Plus, Key } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { safeParse } from 'valibot';

import type { Pokemon } from '@/schemas/Pokemon';

import { PokemonSchema } from '@/schemas/Pokemon';
import BackToHome from '@/components/BackToHome';
import { randint } from '@/lib/randint';

const CORSICADEX_API = 'https://tests-workers.vercel.app/api/corsicadex';

const BackToHomeComp = () => <BackToHome className="mx-auto mt-4 flex w-fit font-extrabold text-white" />;

export default function PokemonPicker() {
  const [apiKey, setApiKey] = useState<string>('');
  const [apiKeyInput, setApiKeyInput] = useState<string>('');
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [inputId, setInputId] = useState<string>('');
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [addingPokemon, setAddingPokemon] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<boolean>(false);

  const fetchRandomPokemons = useCallback(async (): Promise<void> => {
    setLoading(true);
    setIsComplete(false);
    setErrorMessage('');
    setFetchError(false);
    const ids: number[] = [];

    while (ids.length < 3) {
      const randomId = Math.floor(Math.random() * 8) + 1;
      if (!ids.includes(randomId)) {
        ids.push(randomId);
      }
    }

    try {
      if (randint(1, 5) === 1) {
        throw new Error('lol');
      }

      const promises = ids.map(async (id) => {
        const res = await fetch(`${CORSICADEX_API}?id=${id}`, {
          headers: {
            'x-api-key': apiKey
          }
        });
        if (!res.ok) throw new Error('Failed to fetch corsicamon');

        const data = await res.json();
        const parseResult = safeParse(PokemonSchema, data);

        if (!parseResult.success) {
          throw new Error('Invalid Corsicamon data format');
        }

        return parseResult.output;
      });

      const results: Pokemon[] = await Promise.all(promises);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setPokemons(results);
    } catch (error) {
      console.error('Error loading corsicamon:', error);
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  useEffect(() => {
    if (apiKey) {
      fetchRandomPokemons();
    }
  }, [apiKey, fetchRandomPokemons]);

  const handleAddPokemon = async (): Promise<void> => {
    const pokemonId = parseInt(inputId);

    if (isNaN(pokemonId) || pokemonId < 1 || pokemonId > 8) {
      setErrorMessage('Please enter a valid Corsicamon ID (1-8)');
      return;
    }

    const alreadyExists = pokemons.some((p) => p.id === pokemonId);

    if (alreadyExists) {
      setErrorMessage(`Corsicamon #${pokemonId} is already in your draw!`);
      return;
    }

    setAddingPokemon(true);
    setErrorMessage('');

    try {
      if (randint(1, 5) === 1) {
        throw new Error('lol');
      }

      const response = await fetch(`${CORSICADEX_API}?id=${pokemonId}`, {
        headers: {
          'x-api-key': apiKey
        }
      });
      if (!response.ok) {
        throw new Error('Corsicamon not found');
      }

      const data = await response.json();
      const parseResult = safeParse(PokemonSchema, data);

      if (!parseResult.success) {
        throw new Error('Invalid Corsicamon data format');
      }

      const newPokemon = parseResult.output;
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setPokemons([...pokemons, newPokemon]);
      setIsComplete(true);
      setInputId('');
    } catch {
      setErrorMessage('Failed to load Corsicamon. Please try again.');
    } finally {
      setAddingPokemon(false);
    }
  };

  const playSound = (url: string): void => {
    const audio = new Audio(url);
    audio.play();
  };

  const getTypeColor = (type: string): string => {
    const colors: Record<string, string> = {
      'siciliacchia di merda': 'bg-stone-800',
      electric: 'bg-yellow-400',
      charcuterie: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-600',
      flying: 'bg-indigo-400',
      dragon: 'bg-indigo-600',
      cheese: 'bg-yellow-300',
      fighting: 'bg-red-600',
      psychic: 'bg-pink-500',
      ghost: 'bg-purple-700',
      dessert: 'bg-pink-400',
      noble: 'bg-purple-600',
      normal: 'bg-gray-400',
      fire: 'bg-orange-500',
      grass: 'bg-green-500',
      rock: 'bg-yellow-700',
      drink: 'bg-amber-600',
      water: 'bg-blue-500',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300',
      dark: 'bg-gray-700',
      ice: 'bg-cyan-300',
      bug: 'bg-lime-500'
    };
    return colors[type] || 'bg-gray-400';
  };

  if (!apiKey) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-red-500 via-yellow-400 to-blue-500 px-4">
        <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
          <div className="mb-6">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <Key className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-gray-800">Enter API Key</h1>
            <p className="text-gray-600">Please enter your Corsicadex API key to continue</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="enter-api-key">
              API key
            </label>
            <input
              className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-center font-mono text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              onKeyDown={(e) => e.key === 'Enter' && apiKeyInput && setApiKey(apiKeyInput)}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="Enter your API key..."
              value={apiKeyInput}
              id="enter-api-key"
              type="text"
            />
          </div>

          <button
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-purple-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:from-blue-600 hover:to-purple-600 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => setApiKey(apiKeyInput)}
            data-testid="access-corsicadex-btn"
            disabled={!apiKeyInput}
          >
            <Key className="h-5 w-5" />
            Access Corsicadex
          </button>
        </div>
        <BackToHomeComp />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-red-500 via-yellow-400 to-blue-500 px-4"
        id="fetch-error"
      >
        <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl" data-testid="corsicadex-network-error">
          <div className="mb-6">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <span className="text-4xl">⚠️</span>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-800">Oops! Something went wrong</h2>
            <p className="text-gray-600">Failed to load Corsicamons. Please check your connection and try again.</p>
          </div>
          <button
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-red-500 to-blue-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:from-red-600 hover:to-blue-600"
            data-testid="corsicadex-network-error-retry-btn"
            onClick={fetchRandomPokemons}
          >
            <RefreshCw className="h-5 w-5" />
            Retry
          </button>
        </div>
        <BackToHomeComp />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-red-500 via-yellow-400 to-blue-500">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent" />
          <p className="text-2xl font-bold text-white">Searching for Corsicamons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-red-500 via-yellow-400 to-blue-500 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {pokemons.map((pokemon, index) => (
            <div
              className="transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-300 hover:scale-105"
              style={{
                animation: `fade-in 0.5s ease-out ${index * 0.2}s both`
              }}
              key={pokemon.id}
            >
              <div className="relative bg-linear-to-br from-gray-100 to-gray-200 p-8">
                <div className="absolute top-4 right-4 rounded-full bg-white/80 px-3 py-1">
                  <span data-testid={`pokemon-id-${index + 1}`} className="font-bold text-gray-600">
                    #{pokemon.id}
                  </span>
                </div>
                <img
                  src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                  className="h-64 w-full object-contain drop-shadow-2xl"
                  alt={pokemon.name}
                />
              </div>

              <div className="p-6">
                <h2 className="mb-4 text-center text-3xl font-bold text-gray-800 capitalize">{pokemon.name}</h2>

                <div className="mb-4 flex justify-center gap-2">
                  {pokemon.types.map((typeInfo) => (
                    <span
                      className={`${getTypeColor(typeInfo.type.name)} rounded-full px-4 py-1 text-sm font-semibold text-white uppercase`}
                      key={typeInfo.type.name}
                    >
                      {typeInfo.type.name}
                    </span>
                  ))}
                </div>

                <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-gray-100 p-3 text-center">
                    <p className="mb-1 text-xs text-gray-500 uppercase">Height</p>
                    <p className="font-bold text-gray-800">{pokemon.height / 10} m</p>
                  </div>
                  <div className="rounded-lg bg-gray-100 p-3 text-center">
                    <p className="mb-1 text-xs text-gray-500 uppercase">Weight</p>
                    <p className="font-bold text-gray-800">{pokemon.weight / 10} kg</p>
                  </div>
                </div>

                {pokemon.cries?.latest && (
                  <button
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-purple-500 py-3 font-semibold text-white shadow-lg transition-all hover:from-blue-600 hover:to-purple-600"
                    onClick={() => (pokemon && pokemon.cries && pokemon.cries.latest ? playSound(pokemon.cries.latest) : undefined)}
                  >
                    <Volume2 className="h-5 w-5" />
                    Play Cry
                  </button>
                )}
              </div>
            </div>
          ))}

          {pokemons.length === 3 && !isComplete && (
            <div className="flex transform items-center justify-center overflow-hidden rounded-3xl bg-white/20 shadow-2xl backdrop-blur-sm transition-all duration-300">
              <div className="p-8 text-center">
                <div className="mb-6">
                  <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-white/30 backdrop-blur">
                    <Plus className="h-16 w-16 text-white" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">Add 4th Corsicamon</h3>
                </div>

                <div className="mb-4">
                  <label className="text-sm text-white/90" htmlFor="enter-id-input">
                    Enter a Corsicamon ID (1-8)
                  </label>
                  <input
                    className="w-full rounded-xl border-2 border-white/50 bg-white/90 px-4 py-3 text-center text-xl font-bold text-gray-800 placeholder-gray-400 focus:border-white focus:outline-none disabled:opacity-50"
                    onKeyDown={(e) => e.key === 'Enter' && !addingPokemon && handleAddPokemon()}
                    onChange={(e) => setInputId(e.target.value)}
                    placeholder="Enter ID..."
                    disabled={addingPokemon}
                    id="enter-id-input"
                    value={inputId}
                    type="number"
                    max="8"
                    min="1"
                  />
                </div>

                {errorMessage && <div className="mb-4 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white">{errorMessage}</div>}

                <button
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-red-500 shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={addingPokemon || !inputId}
                  data-testid="add-corsicamon-btn"
                  onClick={handleAddPokemon}
                >
                  {addingPokemon ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      Add Corsicamon
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {isComplete && (
          <div className="mt-12 text-center">
            <div className="mx-auto mb-6 inline-block rounded-2xl bg-white px-8 py-4 shadow-2xl">
              <p className="text-2xl font-bold text-green-600">✓ Draw Complete!</p>
              <p className="text-gray-600">Your team is ready</p>
            </div>
          </div>
        )}

        {!isComplete && (
          <div className="mt-12 text-center">
            <button
              className="mx-auto flex transform items-center gap-2 rounded-full bg-white px-6 py-3 text-lg font-bold text-red-500 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              onClick={fetchRandomPokemons}
              data-testid="new-draw-btn"
            >
              <RefreshCw className="h-5 w-5" />
              New Draw
            </button>
          </div>
        )}
      </div>
      <BackToHomeComp />
    </div>
  );
}
