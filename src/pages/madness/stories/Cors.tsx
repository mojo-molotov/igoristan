import corsicaStacksCreativeUrl from '../../../../assets/images/creatives/corsica-stacks.png';
import corsErrorCreativeUrl from '../../../../assets/images/creatives/cors-error.jpg';
import elbaErrorCreativeUrl from '../../../../assets/images/creatives/elba-error.png';
import corsicaFlagUrl from '../../../../assets/images/corsica/flag-of-corsica.svg';
import backgroundUrl from '../../../../assets/images/backgrounds/bastia.webp';

const Cors = () => (
  <div className="min-h-screen w-full bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
    <header
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundUrl})`
      }}
      className="overflow-hidden border-b-4 border-red-600 bg-cover bg-center bg-no-repeat"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <img className="mx-auto mb-8 h-48" src={corsicaFlagUrl} alt="" />
        <h1 className="mb-6 text-6xl leading-tight font-bold text-white md:text-7xl">
          CORS Errors:
          <br />
          <span className="text-red-500">Why did they name the worst thing in web development after us?</span>
        </h1>
        <p className="mx-auto max-w-4xl font-serif text-2xl text-amber-200 italic md:text-3xl">
          We're an island of beauty, not your f***ing HTTP headers
        </p>
      </div>
    </header>

    <main className="mx-auto max-w-5xl px-6 py-16 text-amber-50">
      <section className="mb-20">
        <h2 className="mb-8 border-l-8 border-red-600 pl-6 text-4xl font-bold text-amber-100">Our Island Deserves Better</h2>

        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            Of all the Mediterranean islands, they chose <strong className="text-red-400">CORS-ica</strong>.
          </p>

          <p>
            We have pristine beaches. Majestic mountains. UNESCO-protected polyphonic singing. The finest charcuterie. A rich history of resistance
            and independence.
          </p>

          <p className="text-xl font-semibold text-amber-200">
            And now? We're associated with <code className="rounded bg-red-900/40 px-2 py-1 text-red-300">Access-Control-Allow-Origin</code> failures.
          </p>

          <div className="my-8 rounded-lg border-2 border-amber-600/30 bg-slate-800/50 p-8">
            <img src={corsErrorCreativeUrl} alt="" />
          </div>

          <p>Every developer in the world knows CORS errors. They're frustrating. They're confusing. They make people want to flip their desk.</p>

          <p className="text-2xl font-bold text-red-400">And they all think of our beautiful island when it happens.</p>
        </div>
      </section>

      <section className="mb-20 rounded-xl border-4 border-amber-600 bg-linear-to-br from-amber-900/20 to-red-900/20 p-10">
        <h2 className="mb-4 text-center text-5xl font-bold text-amber-100">It should have been ELBA errors</h2>

        <p className="mb-12 text-center font-serif text-xl text-amber-300 italic">The most obvious choice in the history of web development</p>

        <div className="mb-10 rounded-lg border-2 border-amber-500 bg-slate-900/60 p-8">
          <img src={elbaErrorCreativeUrl} alt="" />
        </div>

        <div className="space-y-8 text-lg">
          <div className="rounded-r-lg border-l-4 border-amber-500 bg-black/40 p-6">
            <h3 className="mb-3 text-2xl font-bold text-amber-200">ELBA - Error Location: Blocked Access</h3>
            <p className="text-amber-100/90">The acronym writes itself. It's perfect. It's beautiful. It makes sense. Napoleon approves.</p>
          </div>

          <p className="text-xl">
            <strong className="text-amber-300">ELBA</strong> - where Napoleon was <span className="font-bold text-red-400">EXILED</span>. You know,
            like your requests getting <span className="font-bold text-red-400">BLOCKED</span>?
          </p>

          <p className="text-xl">
            It's <span className="font-bold text-amber-300 uppercase">literally</span> an island about being rejected and isolated.
          </p>

          <div className="my-8 rounded-lg border-2 border-amber-600/50 bg-slate-800/60 p-8">
            <p className="mb-4 text-center font-serif text-2xl text-amber-200 italic">"Napoleon couldn't leave Elba."</p>
            <p className="text-center font-serif text-2xl text-amber-200 italic">
              "Your <code className="rounded bg-red-900/40 px-2">fetch()</code> can't leave localhost."
            </p>
            <p className="mt-6 text-center text-xl font-bold tracking-wide text-amber-400 uppercase">See the parallel?</p>
          </div>

          <p className="text-lg text-amber-100/80">
            Elba is literally famous for one thing: keeping someone trapped and isolated. That's the ENTIRE point of the island's claim to fame. It's
            about <strong>exile</strong>. About <strong>restriction</strong>. About not being allowed to go where you want.
          </p>

          <p className="py-6 text-center text-2xl font-bold text-red-400">THAT'S EXACTLY WHAT CORS ERRORS DO TO YOUR REQUESTS.</p>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="mb-8 border-l-8 border-green-600 pl-6 text-4xl font-bold text-amber-100">Our Solution: The Static Revolution</h2>

        <div className="mb-8 rounded-lg border-2 border-green-600/30 bg-slate-800/50 p-8">
          <img src={corsicaStacksCreativeUrl} className="mx-auto" alt="" />
        </div>

        <div className="space-y-6 text-lg leading-relaxed">
          <p className="text-2xl font-bold text-green-400">Static Sites = No CORS = Respect for Corsica</p>

          <div className="space-y-4 rounded-r-lg border-l-4 border-green-500 bg-green-900/20 p-6">
            <p>
              <strong className="text-green-300">Article 1:</strong> Pre-rendered pages require no cross-origin requests
            </p>
            <p>
              <strong className="text-green-300">Article 2:</strong> Build-time data fetching eliminates runtime errors
            </p>
            <p>
              <strong className="text-green-300">Article 3:</strong> Static Site Generation restores honor to our island's name
            </p>
          </div>

          <p>
            When you embrace SSG, you embrace a CORS-free existence. Your pages are pre-rendered. Your data is fetched at build time. Your users get
            pure HTML, CSS, and JavaScript.
          </p>

          <p className="text-center font-serif text-xl text-amber-300 italic">
            No servers.
            <br />
            No origins.
            <br />
            No errors.
            <br />
            No insult to Corsica!
          </p>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="mb-8 text-center text-4xl font-bold text-amber-100">Technologies awarded corsican citizenship</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border-2 border-amber-600 bg-slate-800 p-6 text-center">
            <h3 className="mb-3 text-2xl font-bold text-white">Vike</h3>
            <p className="text-sm text-amber-100/80">Fast, flexible, and framework-agnostic.</p>
          </div>

          <div className="rounded-lg border-2 border-amber-600 bg-slate-800 p-6 text-center">
            <h3 className="mb-3 text-2xl font-bold text-white">Next.js</h3>
            <p className="text-sm text-amber-100/80">For App router, true ally of the Corsican people.</p>
          </div>

          <div className="rounded-lg border-2 border-amber-600 bg-slate-800 p-6 text-center">
            <h3 className="mb-3 text-2xl font-bold text-white">Astro</h3>
            <p className="text-sm text-amber-100/80">Static by default, fast as the Corsican wind.</p>
          </div>

          <div className="rounded-lg border-2 border-amber-600 bg-slate-800 p-6 text-center">
            <h3 className="mb-3 text-2xl font-bold text-white">Hugo</h3>
            <p className="text-sm text-amber-100/80">Not TypeScript, but we are tolerant.</p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="mb-8 text-center text-4xl font-bold text-amber-100">Voices from the Island</h2>

        <div className="space-y-6">
          <blockquote className="rounded-r-lg border-l-4 border-amber-500 bg-slate-800/60 p-6">
            <p className="mb-4 text-lg text-amber-100 italic">
              "Every time I see a CORS error in my console, I think of my beautiful island being insulted. I switched to Astro. Now my conscience is
              clear."
            </p>
            <footer className="text-amber-300"> Santu Acquaviva, Developer, Sartène</footer>
          </blockquote>

          <blockquote className="rounded-r-lg border-l-4 border-amber-500 bg-slate-800/60 p-6">
            <p className="mb-4 text-lg text-amber-100 italic">
              "Tourists ask me about CORS errors more than they ask about our beaches. This is unacceptable. Static sites are the answer."
            </p>
            <footer className="text-amber-300">— Petru Santoni, Full-stack Developer, Bastia</footer>
          </blockquote>

          <blockquote className="rounded-r-lg border-l-4 border-amber-500 bg-slate-800/60 p-6">
            <p className="mb-4 text-lg text-amber-100 italic">
              "My grandmother still doesn't understand why Chrome DevTools is angry at our island. I had to explain it wasn't our fault. She cried."
            </p>
            <footer className="text-amber-300">— Orsu Campana, Frontend Engineer, Povo</footer>
          </blockquote>
        </div>
      </section>

      <section className="rounded-xl border-4 border-red-600 bg-linear-to-br from-red-900/30 to-black/50 p-10 text-center">
        <div className="mx-auto max-w-3xl space-y-4 font-serif text-lg text-amber-200 italic">
          <p>I swear to pre-render my pages,</p>
          <p>To fetch my data at build time,</p>
          <p>To serve static HTML with pride,</p>
          <p>To never insult Corsica with runtime cross-origin requests,</p>
          <p>And to forever campaign for renaming these errors to ELBA,</p>
          <p>Where they truly belong.</p>
          <p className="mt-8 text-2xl font-bold text-amber-100">Amen.</p>
        </div>
      </section>
    </main>
  </div>
);

export const CorsFooter = () => (
  <footer className="border-t-4 border-amber-600 bg-slate-950 py-8">
    <p className="text-center text-amber-300/80 italic">
      This manifesto was written with love for Corsica, respect for static sites, and deep frustration with whoever named CORS errors.
    </p>
  </footer>
);

export default Cors;
