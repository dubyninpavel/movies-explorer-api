# Проект Movies (backend)
Backend часть приложения по поиску Фильмов

## Что такое проект Movies:
Проект предназначен для поиска фильмов, а также для размещения новых в MongoDB. Разработана бэкенд-часть с использованием Node.js. Проект реализован на серверах Yandex-cloud.

## Используемые технологии
1. Node.js.
2. Express.
3. MongoDB.

## Директории
* `/config` — папка с кофигурационными файлами.
* `/constants` — папка с константами.
* `/controllers` — папка с файлами контроллеров пользователя и фильма.
* `/middlewares` — папка с middlewares.
* `/models` — папка с файлами описания схем пользователя и фильма.
* `/routes` — папка с файлами роутера.
* `/validator` — папка с правилами валидации данных.
* Остальные директории вспомогательные, создаются при необходимости разработчиком.

## Ссылка на Github:
* [Проект: Movies](https://github.com/dubyninpavel/movies-explorer-api)

## IP сервера:
Запрос к серверу:
* [Проект: Movies](https://api.project.movies.search.nomoredomains.icu)
* IP: 178.154.231.254

## Ссылка на pull requests
* [pull requests](https://github.com/dubyninpavel/movies-explorer-api/pulls)

## Запуск проекта
* Установить зависимости:
`npm i`
* Запустить сервер:
`npm run start`
* Запустить сервер с hot-reload
`npm run dev`
* Запустить сервер с hot-reload и базой MongoDB:
`npm run both`
* Запросы к серверу можно отправить через POSTMAN. По адресу:
https://api.project.movies.search.nomoredomains.icu
