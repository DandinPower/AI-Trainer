docker build -t mysql_ai_trainer -f DockerFile .
docker run -itd --restart always --name mysql_ai_trainer -p 3307:3306 mysql_ai_trainer