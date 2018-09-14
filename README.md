1) Build the stack
docker-compose build --no-cache

2) Launch it
docker-compose up

# Utils

#### Down the stack
docker-compose down

#### Delete databases
sudo rm -rf mongo_data
sudo rm -rf elastic_data

