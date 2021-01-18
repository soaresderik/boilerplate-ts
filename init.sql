SELECT 'CREATE DATABASE todolist'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'todolist')\gexec
