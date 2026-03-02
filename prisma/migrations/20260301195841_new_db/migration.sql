-- AlterTable
ALTER TABLE "Startup" ADD COLUMN     "actionText" TEXT NOT NULL DEFAULT 'subscribed',
ADD COLUMN     "backgroundColor" TEXT NOT NULL DEFAULT '#ffffff',
ADD COLUMN     "showRealNames" BOOLEAN NOT NULL DEFAULT true;
