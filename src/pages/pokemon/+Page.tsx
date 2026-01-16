import { RefreshCw, Volume2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Pokemon {
  sprites: PokemonSprites;
  types: PokemonType[];
  cries?: PokemonCries;
  height: number;
  weight: number;
  name: string;
  id: number;
}

interface PokemonSprites {
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
  front_default: string;
}

interface PokemonCries {
  latest?: string;
  legacy?: string;
}

interface PokemonType {
  type: {
    name: string;
  };
}

export default function PokemonPicker() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRandomPokemons = async (): Promise<void> => {
    setLoading(true);
    const ids: number[] = [];

    while (ids.length < 3) {
      const randomId = Math.floor(Math.random() * 898) + 1;
      if (!ids.includes(randomId)) {
        ids.push(randomId);
      }
    }

    try {
      const promises = ids.map((id) => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()));
      const results: Pokemon[] = await Promise.all(promises);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setPokemons(results);
    } catch (error) {
      console.error('Error loading pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomPokemons();
  }, []);

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

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-red-500 via-yellow-400 to-blue-500">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent" />
          <p className="text-2xl font-bold text-white">Searching for Pokémons...</p>
        </div>

        <div className="mt-12 text-center">
          <button
            className="mx-auto flex transform items-center gap-2 rounded-full bg-white px-6 py-3 text-lg font-bold text-red-500 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            disabled
          >
            <RefreshCw className="h-5 w-5" />
            New Draw
          </button>
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
        </div>
      </div>

      <div className="mt-12 text-center">
        <button
          className="mx-auto flex transform items-center gap-2 rounded-full bg-white px-6 py-3 text-lg font-bold text-red-500 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          onClick={fetchRandomPokemons}
        >
          <RefreshCw className="h-5 w-5" />
          New Draw
        </button>
      </div>
    </div>
  );
}
