#!/bin/bash
docker run -p 6379:6379 --name redis-stack -d redis/redis-stack:latest

