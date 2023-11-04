## Microservices Assyncronous Comunication
<hr/>

#### Requirements
- node version: 21.1.0
- rabbitmq
- docker
- nvm (optional)

#### Setting up RabbitMQ on macosx
<br/>

- Installing colima and docker:
```
brew install colima
brew install docker
```
<br/>

- Running RabbitMQ container
```
colima start
docker run -p 5672:5672 rabbitmq
```
