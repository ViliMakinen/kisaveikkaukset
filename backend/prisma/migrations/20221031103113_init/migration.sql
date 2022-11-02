-- CreateTable
CREATE TABLE "User"
(
    "id"        SERIAL NOT NULL,
    "email"     TEXT   NOT NULL,
    "firstName" TEXT   NOT NULL,
    "lastName"  TEXT   NOT NULL,
    "nickName"  TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGroupPredictions"
(
    "userId"      INTEGER NOT NULL,
    "groupId"     INTEGER NOT NULL,
    "predictions" JSONB   NOT NULL,

    CONSTRAINT "UserGroupPredictions_pkey" PRIMARY KEY ("userId", "groupId")
);

-- CreateTable
CREATE TABLE "Group"
(
    "id"           SERIAL  NOT NULL,
    "name"         TEXT    NOT NULL,
    "code"         TEXT    NOT NULL,
    "tournamentId" INTEGER NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tournament"
(
    "id"               SERIAL NOT NULL,
    "tournamentData"   JSONB  NOT NULL,
    "lastUpdated"      TIMESTAMPTZ(6),
    "extraPredictions" JSONB  NOT NULL,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User" ("email");

-- AddForeignKey
ALTER TABLE "UserGroupPredictions"
    ADD CONSTRAINT "UserGroupPredictions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroupPredictions"
    ADD CONSTRAINT "UserGroupPredictions_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group"
    ADD CONSTRAINT "Group_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
