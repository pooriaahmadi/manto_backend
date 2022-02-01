# backend


# 📃 Codeyar API Documentation
<div dir="auto">

## 🚲 **Routes** / **مسیر ها**

<details>
 <summary>user</summary>
<br>

## [POST] create / برای ساخت کاربر

``http://localhost:3000/user/``

### body [raw]

```
{
    "username": "test",
    "password": "asd",
    "email": "assd@asd.com"
}
```

## [DEL] delete / برای حذف کاربر

``http://localhost:3000/user/``

## [PUT] update / برای بروزرسانی اطلاعات کاربر

``http://localhost:3000/user/``

### body [raw]

```
{
    "username": "poorisa"
}
```

## [GET] get / دریافت اطلاعات کاربر

``http://localhost:3000/user/:username``

</details>

<details>
 <summary>auth</summary>
<br>

## [POST] login / ورود به حساب کاربری

``http://localhost:3000/auth/login``

### body [raw]

```
{
    "username": "pooria",
    "password": "asd"
}
```

</details>

<details>
 <summary>course</summary>
<br>

## [POST] create / ساخت دوره آموزشی

``http://localhost:3000/course/``

### body [raw]

```
{
    "slug": "asd",
    "title": "ASD",
    "price": 0
}
```

## [PUT] update / بروزرسانی دوره آموزشی

``http://localhost:3000/course/:slug``

#### PATH VARIABLES

``slug``

### body [raw]

```
{
    "title": "asd"
}
```

## [GET] read / دیدن اطلاعات دوره آموزشی

``http://localhost:3000/course/:slug``

#### PATH VARIABLES

``slug``

## [DEL] delete / حذف دوره 

``http://localhost:3000/course/:slug``

#### PATH VARIABLES

``slug``

</details>

<details>
 <summary>parent</summary>
<br>

<details>
 <summary>Sub</summary>
<br>

<details>
 <summary>sub</summary>
<br>

## [POST] create

``http://localhost:3000/parent/sub/sub``

### body [raw]

```
{
    "title": "asd",
    "order": 0,
    "parentSub": 2,
    "page": 1
}
```

## [PUT] update

``http://localhost:3000/parent/sub/sub/:id``

### body [raw]

```
{
    "order": 0
}
```

#### PATH VARIABLES

``id``

## [GET] read

``http://localhost:3000/parent/sub/sub/:id``

#### PATH VARIABLES

``id``

## [DEL] delete

``http://localhost:3000/parent/sub/sub/:id``

#### PATH VARIABLES

``id``

</details>

## [POST] create

``http://localhost:3000/parent/sub``

### body [raw]

```
{
    "title": "asd",
    "order": 0,
    "parent": 1
}
```

## [PUT] update

``http://localhost:3000/parent/sub/:id``

### body [raw]

```
{
    "order": 1
}
```

#### PATH VARIABLES

``id``

## [GET] read

``http://localhost:3000/parent/sub/:id``

#### PATH VARIABLES

``id``

## [DEL] delete

``http://localhost:3000/parent/sub/:id``

#### PATH VARIABLES

``id``

</details>

<details>
 <summary>page</summary>
<br>

## [POST] create

``http://localhost:3000/parent/page/``

## [PUT] update

``http://localhost:3000/parent/page/1``

## [GET] read

``http://localhost:3000/parent/page/1``

## [DEL] delete

``http://localhost:3000/parent/page/1``

</details>

## [POST] create

``http://localhost:3000/parent/``

### body [raw]

```
{
    "course": 3,
    "order": 0,
    "title": "A parent"
}
```

## [PUT] update

``http://localhost:3000/parent/:id``

#### PATH VARIABLES

``id``

### body [raw]

```
{
    "order": 10,
    "title": "123"
}
```

## [GET] read

``http://localhost:3000/parent/:id``

#### PATH VARIABLES

``id``

## [DEL] delete

``http://localhost:3000/parent/:id``

#### PATH VARIABLES

``id``

</details>

<details>
 <summary>page</summary>
<br>

## [POST] create / ساخت صفحه

``http://localhost:3000/page``

### body [raw]

```
{
    "content": [" asd", "asd"]
}
```

## [PUT] update / بروزرسانی صفحه

``http://localhost:3000/page/:id``

#### PATH VARIABLES

``id``

### body [raw]

```
{
    "content": ["asd"]
}
```

</details>
















</div>