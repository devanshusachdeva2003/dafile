"use client"

import React, { useRef, useState, useEffect } from "react"

type Props = {
  onFiles?: (files: File[]) => void
}

const FileUploader: React.FC<Props> = ({ onFiles }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const folderInputRef = useRef<HTMLInputElement | null>(null)

  const [previews, setPreviews] = useState<
    { id: string; file: File; url: string }[]
  >([])
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [stagedFiles, setStagedFiles] = useState<File[]>([])

  const openFileDialog = () => {
    console.debug('openFileDialog', !!fileInputRef.current)
    if (fileInputRef.current) {
      // clear value so re-selecting same file triggers onChange
      fileInputRef.current.value = ''
      fileInputRef.current.click()
    }
  }
  const openFolderDialog = () => {
    console.debug('openFolderDialog', !!folderInputRef.current)
    if (folderInputRef.current) {
      folderInputRef.current.value = ''
      folderInputRef.current.click()
    }
  }
  const [panelOpen, setPanelOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showFiles, setShowFiles] = useState(false)

  const handleFiles = (filesList: FileList | null) => {
    const files = Array.from(filesList || [])
    console.debug('handleFiles received', files.length, files.map((f) => ((f as any).webkitRelativePath || f.name)))
    if (!files.length) return

    const next = files.map((f) => ({
      id: crypto.randomUUID(),
      file: f,
      url: URL.createObjectURL(f),
      // preserve folder path when available
      name: (f as any).webkitRelativePath || f.name,
    }))

    setPreviews((prev) => [...prev, ...next])
    setStagedFiles((prev) => [...prev, ...files])
  }

  // Ensure non-standard attributes are present on the folder input
  useEffect(() => {
    if (folderInputRef.current) {
      try {
        folderInputRef.current.setAttribute('webkitdirectory', '')
        folderInputRef.current.setAttribute('directory', '')
      } catch (e) {
        console.debug('failed to set webkitdirectory attribute', e)
      }
    }
  }, [])

  const readFileAsDataURL = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const fr = new FileReader()
      fr.onload = () => resolve(fr.result as string)
      fr.onerror = reject
      fr.readAsDataURL(file)
    })

  const createShareLink = async (files: File[]) => {
    setCreating(true)
    try {
      const entries = await Promise.all(
        files.map(async (f) => ({ name: (f as any).webkitRelativePath || f.name, dataUrl: await readFileAsDataURL(f) }))
      )

      const parts: string[] = []
      parts.push('<!doctype html><html><head><meta charset="utf-8"><title>Shared files</title></head><body>')
      parts.push('<h2>Shared files</h2>')
      parts.push('<ul>')
      for (const e of entries) {
        parts.push(`<li><a href="${e.dataUrl}" download="${encodeURIComponent(e.name)}">${e.name}</a></li>`)
      }
      parts.push('</ul>')
      parts.push('</body></html>')

      const blob = new Blob(parts, { type: 'text/html' })
      if (shareUrl) URL.revokeObjectURL(shareUrl)
      const u = URL.createObjectURL(blob)
      setShareUrl(u)
    } catch (err) {
      console.error(err)
    } finally {
      setCreating(false)
    }
  }

  const copyLink = async () => {
    if (!shareUrl) return
    await navigator.clipboard.writeText(window.location.origin + shareUrl)
  }

  const removeFile = (id: string) => {
    setPreviews((prev) => {
      const item = prev.find((p) => p.id === id)
      if (item) {
        // remove matching file from staged files by name/path
        setStagedFiles((sf) => sf.filter((f) => ((f as any).webkitRelativePath || f.name) !== (item as any).name && f.name !== item.file.name))
        try {
          URL.revokeObjectURL(item.url)
        } catch (e) {}
      }
      return prev.filter((p) => p.id !== id)
    })
  }

  const confirmUpload = async () => {
    if (!stagedFiles.length) return
    onFiles?.(stagedFiles)
    // show spinner and hide files while processing
    setLoading(true)
    setShowFiles(false)
    await createShareLink(stagedFiles)
    setStagedFiles([])
    // processing finished: hide spinner, show files
    setLoading(false)
    setShowFiles(true)
  }

  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url))
    }
  }, [previews])

  return (
    <div className="p-6">
      <div className="relative flex items-center justify-center w-full h-full">
        {/* Center control: shown inside Hero spinner */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setPanelOpen((s) => !s)}
          className="relative group flex items-center justify-center w-full h-full"
        >
          <span className="absolute inset-0 flex items-center justify-center text-orange-500 font-semibold transition-opacity duration-150 group-hover:opacity-0">Start</span>
          <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-orange-400"><path d="M19 18a4 4 0 0 0-.97-7.88A6 6 0 0 0 6.24 9.2 4.5 4.5 0 0 0 6.5 18H10v-3.59L8.7 15.7a1 1 0 1 1-1.4-1.4l3-3a1 1 0 0 1 1.4 0l3 3a1 1 0 1 1-1.4 1.4L12 14.41V18h7Z" /></svg>
          </span>
        </div>

        {/* Panel: absolute so it doesn't replace spinner */}
        {panelOpen && (
          <div
            className="absolute top-20 left-1/2 -translate-x-1/2 mt-2 bg-white border rounded shadow z-10 w-full max-w-[640px] h-[70vh] overflow-y-scroll"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer?.files) }}
          >
            {/* Sticky header: buttons remain fixed while content scrolls */}
            <div className="sticky top-0 bg-white z-20 border-b">
              <div className="flex gap-3 p-3 items-center">
                <button onClick={() => openFileDialog()} className="px-3 py-2 bg-slate-100 rounded">Add files</button>
                <button onClick={() => openFolderDialog()} className="px-3 py-2 bg-slate-100 rounded">Add folder</button>
                <button onClick={() => { setPreviews([]); setStagedFiles([]); if (shareUrl) { URL.revokeObjectURL(shareUrl); setShareUrl(null) } }} className="px-3 py-2 bg-red-50 text-red-600 rounded">Clear</button>
                <button onClick={confirmUpload} className="px-3 py-2 bg-emerald-100 text-emerald-800 rounded">Start</button>
              </div>
            </div>

            {/* Content (outer panel handles scrolling) */}
            <div className="p-3">
              {/* Debug status (visible to help diagnose input issues) */}
              <div className="mb-3 text-xs text-gray-600">
                <div>File input: {fileInputRef.current ? 'present' : 'missing'}</div>
                <div>Folder input: {folderInputRef.current ? 'present' : 'missing'}</div>
                <div>webkitdirectory set: {folderInputRef.current && folderInputRef.current.hasAttribute('webkitdirectory') ? 'yes' : 'no'}</div>
              </div>

              {/* Spinner: centered and visible while loading */}
              {loading && (
                <div className="flex items-center justify-center p-6">
                  <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
                </div>
              )}

              {/* File list and share link: hidden until processing completes */}
              {showFiles && (
                <>
                  {/* File List Container: fixed height, scrollable */}
                  <div className="h-[300px] overflow-y-auto p-3 border rounded-lg shadow bg-gray-50 space-y-2">
                    {previews.map((p) => (
                      <div key={p.id} className="flex items-center justify-between bg-white p-2 rounded">
                        <div className="flex items-center gap-3">
                          {p.file.type.startsWith("image/") && (
                            <img src={p.url} className="w-10 h-10 object-cover rounded" />
                          )}
                          <span className="truncate max-w-[420px]">{(p as any).name ?? p.file.name}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <a href={p.url} target="_blank" rel="noreferrer" className="text-sm text-blue-600">Preview</a>
                          <a href={p.url} download={(p as any).name ?? p.file.name} className="text-sm text-slate-700">Download</a>
                          <button onClick={() => removeFile(p.id)} className="text-red-500">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Share Link */}
                  {shareUrl && (
                    <div className="mt-4 p-3 bg-white border rounded">
                      <p className="text-sm mb-2">Public Link:</p>

                      <div className="flex gap-2">
                        <input value={window.location.origin + shareUrl} readOnly className="flex-1 border p-1 text-sm" />

                        <button onClick={copyLink} className="bg-black text-white px-3 py-1 text-sm">Copy</button>

                        <a href={shareUrl} target="_blank" className="border px-3 py-1 text-sm">Open</a>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Hidden Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <input
        ref={folderInputRef}
        type="file"
        multiple
        className="sr-only"
        //@ts-ignore
        webkitdirectory="true"
        //@ts-ignore
        directory="true"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* Panel rendered absolutely above; duplicate static panel removed. */}
    </div>
  )
}

export default FileUploader