How to get local database running:

reminders:
-.env file, make sure domain doesnt have /



1. run `docker compose up -d`
2. run `npx prisma migrate deploy`
3. run `npx prisma generate`
4. run `npx prisma db seed`