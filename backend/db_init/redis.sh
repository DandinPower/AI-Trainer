docker pull redis:latest
docker run -itd --restart always --name redis_ai_trainer -p 6380:6379 redis