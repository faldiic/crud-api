-- CreateTable
CREATE TABLE "Student" (
    "npm" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "kelas" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "no_hp" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("npm")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_npm_key" ON "Student"("npm");
