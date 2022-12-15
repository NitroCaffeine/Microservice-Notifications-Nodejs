-- CreateTable
CREATE TABLE "Notifications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recipientId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readAt" DATETIME,
    "category" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Notifications_recipientId_idx" ON "Notifications"("recipientId");
