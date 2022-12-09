# Backend for Nanogiant Hackathon in 2022

This application is a backend for Nanogiant Hackathon in 2022.

## How to run

### Run using docker

```bash
docker-compose up
```

in a second terminal run

```bash
npm run build
// or for development
npm run dev
```

YOu also will need to migrate your database manually on first start

```bash
docker exec <container-name-of-app> "php artisan migrate"
// if above does not work try the following
docker exec -it <container-name-of-app> bash
php artisan migrate
```

API behaivour:

1. api gets an event
2. look at the keys of data
3. check if table {event_name} exsits => 3.1 if not create it
4. {event_name} => following keys (x,y) => add column to table {event_name} with name x and y

The user defines how the event keys are named and how the data is structured.
