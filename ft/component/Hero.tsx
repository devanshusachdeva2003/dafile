"use client"

import React, { useRef, useState, useEffect } from 'react'

const Hero = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [previews, setPreviews] = useState<{ file: File; url: string }[]>([])
  const prevUrlsRef = useRef<string[]>([])

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    // Revoke old URLs
    prevUrlsRef.current.forEach((u) => URL.revokeObjectURL(u))

    const newPreviews = files.map((f) => ({ file: f, url: URL.createObjectURL(f) }))
    prevUrlsRef.current = newPreviews.map((p) => p.url)
    setPreviews(newPreviews)
  }

  useEffect(() => {
    return () => {
      prevUrlsRef.current.forEach((u) => URL.revokeObjectURL(u))
    }
  }, [])

  return (
    <section
      className="relative bg-cover bg-center"
      style={{ backgroundImage: "url('/image.png')" }}
    >
      <div className="h-[520px] md:h-[640px] w-full" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          {previews[0] && (
            <div className="mb-6">
              <img
                src={previews[0].url}
                alt={previews[0].file.name}
                className="mx-auto w-full max-w-sm rounded-lg shadow-lg object-contain"
              />
            </div>
          )}
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

              <div
                className="group absolute inset-3 md:inset-4 rounded-full bg-white flex items-center justify-center border-4 border-orange-100 shadow-lg overflow-hidden"
                onClick={openFileDialog}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') openFileDialog()
                }}
              >
                {/* Start Text */}
                <span className="absolute text-red-500 font-semibold text-lg md:text-2xl
                  transition-all duration-300
                  group-hover:opacity-0 group-hover:scale-75">
                  Start
                </span>

                {/* Upload Icon */}
                <div className="absolute opacity-0 scale-75 transition-all duration-300
                  group-hover:opacity-100 group-hover:scale-100 text-orange-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-10 md:w-14 md:h-14"
                  >
                    <path d="M19 18a4 4 0 0 0-.97-7.88A6 6 0 0 0 6.24 9.2 4.5 4.5 0 0 0 6.5 18H10v-3.59L8.7 15.7a1 1 0 1 1-1.4-1.4l3-3a1 1 0 0 1 1.4 0l3 3a1 1 0 1 1-1.4 1.4L12 14.41V18h7Z" />
                  </svg>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                multiple
                onChange={handleFiles}
              />
              {previews.length > 0 && (
                <div className="mt-4 flex flex-col items-center gap-3">
                  {previews.map((p, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {p.file.type.startsWith('image/') && (
                        <img src={p.url} alt={p.file.name} className="w-16 h-16 object-cover rounded" />
                      )}
                      <div className="text-white text-sm">
                        <div className="font-semibold">{p.file.name}</div>
                        <div className="text-white/80">{Math.round(p.file.size / 1024)} KB</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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