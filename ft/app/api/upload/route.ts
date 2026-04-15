import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const files = formData.getAll("files") as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No files uploaded" },
        { status: 400 }
      )
    }

    // 📁 Folder where files will be stored
    const uploadDir = path.join(process.cwd(), "public/uploads")

    // Create folder if not exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const uploadedFiles: string[] = []

    for (const file of files) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Unique file name
      const fileName = `${Date.now()}-${file.name}`
      const filePath = path.join(uploadDir, fileName)

      // Save file
      fs.writeFileSync(filePath, buffer)

      // Public URL
      uploadedFiles.push(`/uploads/${fileName}`)
    }

    return NextResponse.json({
      success: true,
      url: uploadedFiles[0],     // first file link
      files: uploadedFiles,     // all files
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    )
  }
}