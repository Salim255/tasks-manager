# Nginx

- debug cookies setup:
  - curl -X OPTIONS https://..../api/v1/auth/login -i

## PostgreSQL Volume Migration — Safe Step‑by‑Step Guide

### 1. Stop the Docker Compose project (host-level)

- docker compose down
  - Why:
    - PostgreSQL writes constantly to pg_wal, pg_xact, and base/.
    - Copying while running = guaranteed corruption.

### 2. Identify the volumes

- OLD volume (March 25)
- NEW volume (April 13–14)

### 3. Copy OLD → NEW volume

- Use rsync (safe, preserves permissions, avoids corruption)
  - sudo rsync -avh /var/lib/docker/volumes/old-data/\_data/ \
     /var/lib/docker/volumes/new-data/\_data/

### 4. Fix PostgreSQL permissions

- PostgreSQL inside Docker runs as user 999.
- sudo chown -R 999:999 /var/lib/docker/volumes/new-data/\_data
- Why:
  - If permissions are wrong, PostgreSQL will refuse to start.

### 5. Restart the Docker Compose project

- docker compose up -d

### 6. Verify PostgreSQL is healthy

- docker logs container_name
  - You should see:
    - database system is ready to accept connections
