-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('DISTRIBUTION', 'COMMAND', 'PACKAGE_MANAGER', 'GUIDE');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateTable
CREATE TABLE "Distribution" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "basedOn" TEXT,
    "packageManager" TEXT NOT NULL,
    "initSystem" TEXT NOT NULL,
    "releaseModel" TEXT NOT NULL,
    "architectures" TEXT[],
    "desktopEnvironments" TEXT[],
    "difficulty" "Difficulty" NOT NULL,
    "website" TEXT,
    "documentationUrl" TEXT,
    "logo" TEXT,
    "sourceUrl" TEXT,
    "sourceName" TEXT,
    "lastVerifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Distribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DistributionSection" (
    "id" TEXT NOT NULL,
    "distributionId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DistributionSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Command" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "syntax" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "sourceUrl" TEXT,
    "sourceName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Command_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommandExample" (
    "id" TEXT NOT NULL,
    "commandId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "distributionId" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CommandExample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommandOption" (
    "id" TEXT NOT NULL,
    "commandId" TEXT NOT NULL,
    "flag" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CommandOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageManager" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "command" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "distributionFamily" TEXT NOT NULL,
    "installCmd" TEXT NOT NULL,
    "updateCmd" TEXT NOT NULL,
    "searchCmd" TEXT NOT NULL,
    "removeCmd" TEXT NOT NULL,
    "sourceUrl" TEXT,
    "sourceName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PackageManager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guide" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "readMinutes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelatedContent" (
    "id" TEXT NOT NULL,
    "sourceType" "ContentType" NOT NULL,
    "sourceSlug" TEXT NOT NULL,
    "targetType" "ContentType" NOT NULL,
    "targetSlug" TEXT NOT NULL,
    "label" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "distributionAsSourceId" TEXT,
    "distributionAsTargetId" TEXT,
    "commandAsSourceId" TEXT,
    "commandAsTargetId" TEXT,
    "packageManagerAsSourceId" TEXT,
    "packageManagerAsTargetId" TEXT,
    "guideAsSourceId" TEXT,
    "guideAsTargetId" TEXT,

    CONSTRAINT "RelatedContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Distribution_slug_key" ON "Distribution"("slug");

-- CreateIndex
CREATE INDEX "Distribution_family_idx" ON "Distribution"("family");

-- CreateIndex
CREATE INDEX "Distribution_packageManager_idx" ON "Distribution"("packageManager");

-- CreateIndex
CREATE INDEX "Distribution_releaseModel_idx" ON "Distribution"("releaseModel");

-- CreateIndex
CREATE INDEX "Distribution_difficulty_idx" ON "Distribution"("difficulty");

-- CreateIndex
CREATE INDEX "DistributionSection_distributionId_order_idx" ON "DistributionSection"("distributionId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "DistributionSection_distributionId_slug_key" ON "DistributionSection"("distributionId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Command_slug_key" ON "Command"("slug");

-- CreateIndex
CREATE INDEX "Command_category_idx" ON "Command"("category");

-- CreateIndex
CREATE INDEX "CommandExample_commandId_order_idx" ON "CommandExample"("commandId", "order");

-- CreateIndex
CREATE INDEX "CommandOption_commandId_order_idx" ON "CommandOption"("commandId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "PackageManager_slug_key" ON "PackageManager"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Guide_slug_key" ON "Guide"("slug");

-- CreateIndex
CREATE INDEX "Guide_category_idx" ON "Guide"("category");

-- CreateIndex
CREATE INDEX "Guide_difficulty_idx" ON "Guide"("difficulty");

-- CreateIndex
CREATE INDEX "RelatedContent_sourceType_sourceSlug_idx" ON "RelatedContent"("sourceType", "sourceSlug");

-- CreateIndex
CREATE UNIQUE INDEX "RelatedContent_sourceType_sourceSlug_targetType_targetSlug_key" ON "RelatedContent"("sourceType", "sourceSlug", "targetType", "targetSlug");

-- AddForeignKey
ALTER TABLE "DistributionSection" ADD CONSTRAINT "DistributionSection_distributionId_fkey" FOREIGN KEY ("distributionId") REFERENCES "Distribution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandExample" ADD CONSTRAINT "CommandExample_commandId_fkey" FOREIGN KEY ("commandId") REFERENCES "Command"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandExample" ADD CONSTRAINT "CommandExample_distributionId_fkey" FOREIGN KEY ("distributionId") REFERENCES "Distribution"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandOption" ADD CONSTRAINT "CommandOption_commandId_fkey" FOREIGN KEY ("commandId") REFERENCES "Command"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedContent" ADD CONSTRAINT "RelatedContent_distributionAsSourceId_fkey" FOREIGN KEY ("distributionAsSourceId") REFERENCES "Distribution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedContent" ADD CONSTRAINT "RelatedContent_distributionAsTargetId_fkey" FOREIGN KEY ("distributionAsTargetId") REFERENCES "Distribution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedContent" ADD CONSTRAINT "RelatedContent_commandAsSourceId_fkey" FOREIGN KEY ("commandAsSourceId") REFERENCES "Command"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedContent" ADD CONSTRAINT "RelatedContent_commandAsTargetId_fkey" FOREIGN KEY ("commandAsTargetId") REFERENCES "Command"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedContent" ADD CONSTRAINT "RelatedContent_packageManagerAsSourceId_fkey" FOREIGN KEY ("packageManagerAsSourceId") REFERENCES "PackageManager"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedContent" ADD CONSTRAINT "RelatedContent_packageManagerAsTargetId_fkey" FOREIGN KEY ("packageManagerAsTargetId") REFERENCES "PackageManager"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedContent" ADD CONSTRAINT "RelatedContent_guideAsSourceId_fkey" FOREIGN KEY ("guideAsSourceId") REFERENCES "Guide"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedContent" ADD CONSTRAINT "RelatedContent_guideAsTargetId_fkey" FOREIGN KEY ("guideAsTargetId") REFERENCES "Guide"("id") ON DELETE CASCADE ON UPDATE CASCADE;
