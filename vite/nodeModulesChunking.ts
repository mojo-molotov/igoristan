const SHARED_CHUNKS = {
  REACT: 'react'
} as const;

const CHUNK_MAPPINGS = [
  ['valibot', 'valibot'],

  ['tailwind-merge@', 'tailwind-merge'],

  ['react-router', 'react-router'],
  ['react-dom@', 'react-dom'],

  ['react@', SHARED_CHUNKS.REACT],
  ['scheduler@', SHARED_CHUNKS.REACT]
] as const satisfies readonly [string, string][];

export function inspectChunkIdFromNodeModules(chunkId: string) {
  for (const [needle, name] of CHUNK_MAPPINGS) if (chunkId.includes(`.pnpm/${needle}`)) return name;
  return null;
}
