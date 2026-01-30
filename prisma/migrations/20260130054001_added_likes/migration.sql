-- CreateTable
CREATE TABLE "like" (
    "sourceUserId" TEXT NOT NULL,
    "targetUserId" TEXT NOT NULL,

    CONSTRAINT "like_pkey" PRIMARY KEY ("sourceUserId","targetUserId")
);

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_sourceUserId_fkey" FOREIGN KEY ("sourceUserId") REFERENCES "member"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "member"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
