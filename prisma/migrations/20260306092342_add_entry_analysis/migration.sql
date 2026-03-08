-- CreateTable
CREATE TABLE "EntryAnalysis" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "entryId" TEXT NOT NULL,
    "summary5" TEXT NOT NULL,
    "insights" TEXT NOT NULL,
    "risks" TEXT NOT NULL,
    "contentAngles" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "entities" TEXT NOT NULL,
    "rawJson" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "promptVersion" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EntryAnalysis_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "EntryAnalysis_entryId_key" ON "EntryAnalysis"("entryId");
