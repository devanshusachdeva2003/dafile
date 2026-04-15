import React from 'react'

const FileSteps: React.FC = () => {
  return (
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">How to send and share large files with TransferNow?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-violet-200 text-violet-800 flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="text-lg font-semibold">Select your files to send</h3>
                <p className="mt-2 text-sm text-slate-600">Click on <strong>Start</strong> to select the files and documents to send or drag and drop them directly anywhere on our interface.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-violet-200 text-violet-800 flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="text-lg font-semibold">Fill-in our form</h3>
                <p className="mt-2 text-sm text-slate-600">Send files via email to your contacts or get a customizable shareable link. Our tool provides the adapted features in keeping with your needs.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-violet-200 text-violet-800 flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="text-lg font-semibold">Validate to transfer and start upload!</h3>
                <p className="mt-2 text-sm text-slate-600">When you have finished filling-in the file transfer form, click on <strong>Transfer</strong> to confirm your transfer information and start uploading your documents.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded shadow">Send files now</button>
          
        </div>
      </div>
    </section>
  )
}

export default FileSteps