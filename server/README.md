[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14029429&assignment_repo_type=AssignmentRepo)

# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini

# Individual Project API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /allGames`
- `GET /carts`
- `put /carts/:id`
- `delete /carts/:id`
- `post /carts/:id`
- `GET /myGames`

&nbsp;

## 1. POST /register

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "msg": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "please insert username"
}
OR
{
  "message": "please insert email format"
}
OR
{
  "message": "email has been ussed, please change another email"
}
OR
{
  "message": "please insert password"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email must be exist"
}
OR
{
  "message": "password must be exist"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "email/password invalid"
}
```

&nbsp;

## 3. POST /add-carts/:id

Description:

- Post carts into database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "rent": "integer"
}
```

_Response (201 - Created)_

```json
[
  {
    "message": "string"
  }
]
```

&nbsp;

## 4. GET /carts

Description:

- GET all carts from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": "integer",
        "name": "string",
        "price": "integer",
        "released": "date",
        "imageUrl": "string",
        "rating": "float",
        "UserId": "integer",
        "GameId": "integer",
        "status": "boolean",
        "rent": "integer",
        "createdAt": "date",
        "updatedAt": "date"
    },
  ...,
]
```

&nbsp;

## 5. GET /allGames

Description:

- GET games from api

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "name": "string",
    "released": "date",
    "imageUrl": "string",
    "rating": "float",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

&nbsp;

## 6. PUT /update-cart/:id

Description:

- PUT carts by id into database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "rent": "integer"
}
```

_Response (200 - OK)_

```json
[
  {
    "message": "string"
  }
]
```

&nbsp;

## 7. delete /delete-game/:id

Description:

- delete carts by id into database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- cloudnary (3rd Party API):

```json
{
  "imgUrl": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "message": "string"
  }
]
```

&nbsp;

## 8. post /add-game

Description:

- Delete product by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
        "id": "integer",
        "name": "string",
        "price": "integer",
        "released": "date",
        "imageUrl": "string",
        "rating": "float",
        "UserId": "integer",
        "GameId": "integer",
        "status": "boolean",
        "rent": "date",
        "createdAt": "date",
        "updatedAt": "date"
    },
```

&nbsp;

## 9. GET /myGames

Description:

- GET all myGames from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": "integer",
        "name": "string",
        "price": "integer",
        "released": "date",
        "imageUrl": "string",
        "rating": "float",
        "UserId": "integer",
        "GameId": "integer",
        "status": "boolean",
        "rent": "integer",
        "createdAt": "date",
        "updatedAt": "date"
    },
    ...,
]
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthorized"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
