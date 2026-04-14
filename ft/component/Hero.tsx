import React from 'react'

const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-center"
      style={{ backgroundImage: "url('/image.png')" }}
    >
      <div className="h-[520px] md:h-[640px] w-full" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-white">
            Transfer and have your files travel for free
          </h1>
          <p className="mt-3 text-white/90 text-sm md:text-base">
            TransferNow is a simple and free way to securely share your files and folders.
          </p>

          <div className="mt-8 flex flex-col items-center">
            <div className="relative w-40 h-40 md:w-52 md:h-52">
              <svg className="absolute inset-0 w-full h-full origin-center animate-spin" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="40" stroke="#ffe8d6" strokeWidth="10" fill="none" />
                <circle cx="50" cy="50" r="40" stroke="#ff7a18" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray="251.2" strokeDashoffset="80" />
              </svg>

              <div className="absolute inset-3 md:inset-4 rounded-full bg-white flex items-center justify-center text-red-500 font-semibold text-lg md:text-2xl border-4 border-orange-100 shadow-lg">
                Start
              </div>
            </div>

           
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 flex gap-4">
        <button className="bg-yellow-400 hover:brightness-95 text-slate-900 px-6 py-3 rounded-full font-medium shadow">Send</button>
        <button className="bg-white text-slate-800 px-5 py-3 rounded-full font-medium shadow">Receive</button>
      </div>
    </section>
  )
}

export default Hero