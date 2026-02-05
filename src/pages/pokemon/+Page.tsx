import { RefreshCw, Volume2, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { safeParse } from 'valibot';

import type { Pokemon } from '@/schemas/Pokemon';

import { PokemonSchema } from '@/schemas/Pokemon';
import { randint } from '@/lib/randint';

export default function PokemonPicker() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [inputId, setInputId] = useState<string>('');
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [addingPokemon, setAddingPokemon] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<boolean>(false);

  const fetchRandomPokemons = async (): Promise<void> => {
    setLoading(true);
    setIsComplete(false);
    setErrorMessage('');
    setFetchError(false);
    const ids: number[] = [];

    while (ids.length < 3) {
      const randomId = Math.floor(Math.random() * 898) + 1;
      if (!ids.includes(randomId)) {
        ids.push(randomId);
      }
    }

    try {
      if (randint(1, 5) === 1) {
        throw new Error('lol');
      }

      const promises = ids.map(async (id) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) throw new Error('Failed to fetch pokemon');

        const data = await res.json();
        const parseResult = safeParse(PokemonSchema, data);

        if (!parseResult.success) {
          throw new Error('Invalid Pokemon data format');
        }

        return parseResult.output;
      });

      const results: Pokemon[] = await Promise.all(promises);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setPokemons(results);
    } catch (error) {
      console.error('Error loading pokemon:', error);
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomPokemons();
  }, []);

  const handleAddPokemon = async (): Promise<void> => {
    const pokemonId = parseInt(inputId);

    if (isNaN(pokemonId) || pokemonId < 1 || pokemonId > 898) {
      setErrorMessage('Please enter a valid Pokémon ID (1-898)');
      return;
    }

    const alreadyExists = pokemons.some((p) => p.id === pokemonId);

    if (alreadyExists) {
      setErrorMessage(`Pokémon #${pokemonId} is already in your draw!`);
      return;
    }

    setAddingPokemon(true);
    setErrorMessage('');

    try {
      if (randint(1, 5) === 1) {
        throw new Error('lol');
      }

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      if (!response.ok) {
        throw new Error('Pokémon not found');
      }

      const data = await response.json();
      const parseResult = safeParse(PokemonSchema, data);

      if (!parseResult.success) {
        throw new Error('Invalid Pokemon data format');
      }

      const newPokemon = parseResult.output;
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setPokemons([...pokemons, newPokemon]);
      setIsComplete(true);
      setInputId('');
    } catch {
      setErrorMessage('Failed to load Pokémon. Please try again.');
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
      electric: 'bg-yellow-400',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-600',
      flying: 'bg-indigo-400',
      dragon: 'bg-indigo-600',
      fighting: 'bg-red-600',
      psychic: 'bg-pink-500',
      ghost: 'bg-purple-700',
      normal: 'bg-gray-400',
      fire: 'bg-orange-500',
      grass: 'bg-green-500',
      rock: 'bg-yellow-700',
      water: 'bg-blue-500',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300',
      dark: 'bg-gray-700',
      ice: 'bg-cyan-300',
      bug: 'bg-lime-500'
    };
    return colors[type] || 'bg-gray-400';
  };

  if (fetchError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-red-500 via-yellow-400 to-blue-500 px-4">
        <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
          <div className="mb-6">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <span className="text-4xl">⚠️</span>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-800">Oops! Something went wrong</h2>
            <p className="text-gray-600">Failed to load Pokémon. Please check your connection and try again.</p>
          </div>
          <button
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-red-500 to-blue-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:from-red-600 hover:to-blue-600"
            onClick={fetchRandomPokemons}
          >
            <RefreshCw className="h-5 w-5" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-red-500 via-yellow-400 to-blue-500">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent" />
          <p className="text-2xl font-bold text-white">Searching for Pokémons...</p>
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
                  <span className="font-bold text-gray-600">#{pokemon.id}</span>
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
                  <h3 className="mb-2 text-2xl font-bold text-white">Add 4th Pokémon</h3>
                  <p className="text-sm text-white/90">Enter a Pokémon ID (1-898)</p>
                </div>

                <div className="mb-4">
                  <input
                    className="w-full rounded-xl border-2 border-white/50 bg-white/90 px-4 py-3 text-center text-xl font-bold text-gray-800 placeholder-gray-400 focus:border-white focus:outline-none disabled:opacity-50"
                    onKeyDown={(e) => e.key === 'Enter' && !addingPokemon && handleAddPokemon()}
                    onChange={(e) => setInputId(e.target.value)}
                    placeholder="Enter ID..."
                    disabled={addingPokemon}
                    value={inputId}
                    type="number"
                    max="898"
                    min="1"
                  />
                </div>

                {errorMessage && <div className="mb-4 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white">{errorMessage}</div>}

                <button
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-red-500 shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={addingPokemon || !inputId}
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
                      Add Pokémon
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
            >
              <RefreshCw className="h-5 w-5" />
              New Draw
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
