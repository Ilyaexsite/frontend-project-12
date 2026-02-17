# Чат Slack

[![Actions Status](https://github.com/bdcry/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/bdcry/frontend-project-12/actions) - 

[Чат Slack на Render](https://frontend-project-12-u71e.onrender.com) - Посетите развернутую версию проекта на Render.

## Описание проекта


### Технический стек

- **React**: для построения пользовательского интерфейса.  
- **Redux Toolkit + Thunk**: для управления состоянием приложения.  
- **React Router**: для реализации клиентского роутинга.  
- **Formik**: для работы с формами и валидацией данных.  
- **React-Bootstrap**: для создания адаптивного интерфейса.  
- **Axios**: для выполнения HTTP-запросов и взаимодействия с REST API.  
- **WebSockets**: для реализации обмена сообщениями в режиме реального времени.  
- **Vite**: для сборки и разработки приложения.  
- **Rollbar**: для мониторинга и обработки ошибок в продакшене.
- **i18next**: для реализации мультиязычности (доступны английский и русский языки).


## Установка

1. Склонируйте репозиторий:

```sh
git clone https://github.com/bdcry/frontend-project-12.git
```

2. Перейдите в директорию проекта:
```sh
cd frontend-project-12
```

3. Установите зависимости:
```sh
make install
```

4. Сборка проекта:
```sh
make build
```

6. Запуск проекта:
```sh
make start && make start-frontend
```

6. Откройте в браузере:
```sh
http://localhost:8080
```

## Запуск через Makefile

1. Установка зависимостей:
```sh
make install
```

2. Линтинг кода:
```sh
cd frontend 
make lint
```

3. Запуск в режиме разработки:
```sh
make develop
```

4. Сборка проекта:
```sh
make build
```