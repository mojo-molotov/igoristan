const Loader = () => {
  return (
    <>
      <span className="aesthetic-effect-text-glitch text-center font-mono text-5xl" data-glitch="PLEASE WAIT" aria-label="Loading">
        PLEASE WAIT
      </span>
      <div className="aesthetic-windows-95-loader">
        <div />
        <div />
        <div />
      </div>

      <footer className="fixed right-0 bottom-0 left-0 border-t-2 border-gray-700 bg-black py-4 text-center">
        <p className="font-mono text-sm tracking-widest text-gray-400">CORSICAN SYSTEMS™</p>
        <p className="mt-1 font-mono text-xs text-gray-600">Starting services...</p>
      </footer>
    </>
  );
};

export default Loader;
