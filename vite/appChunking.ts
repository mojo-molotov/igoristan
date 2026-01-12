const SHARED_CHUNKS = {
  PAGES: 'pages'
} as const;

const CHUNK_MAPPINGS = [
  ['src/components/', 'components'],
  ['src/lib/', 'lib'],
  ['src/pages/', SHARED_CHUNKS.PAGES],
  ['src/content/pages/', SHARED_CHUNKS.PAGES]
] as const satisfies readonly [string, string][];

export function tryToMatchAnyUnknownChunkId(chunkId: string) {
  for (const [needle, name] of CHUNK_MAPPINGS) if (chunkId.includes(needle)) return name;
  return null;
}
