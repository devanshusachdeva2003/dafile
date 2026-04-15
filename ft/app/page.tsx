import Hero from  "@/component/components/Hero";
import FileSteps from "@/component/components/file";   
import FileUploader from "@/component/components/FileUploader";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <Hero />

      {/* Steps UI */}
      <div className="mt-10">
        <FileSteps />
      </div>

      {/* File Upload */}
      {/* File Upload (moved into Hero) */}

    </main>
  )
}