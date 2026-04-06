---
description: Starts the database and Next.js/Payload servers for local development.
---
# /start Command Workflow

This workflow will initialize the local development environment for Healing Technology.

// turbo-all
1. Start the PostgreSQL Docker container on port 12001. Ensure any old instance is removed first.
```powershell
docker stop healing-technology-postgres
docker rm healing-technology-postgres
docker start healing-technology-postgres || docker run -d --name healing-technology-postgres -p 12001:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=healing-technology postgres
```

2. Start the main Next.js + Payload CMS application in the background.
```powershell
npm run dev
```

The system will now be up and running on port 12000.
