# User Api

### Sign Up

- POST
- hostname/api/v1/SignUp
- body

    ``` json
        {
            "account": "",
            "password": "",
            "nickName": ""
        }

    ```
- RES

    ``` json
        {
            "message": ""
        }
    ```

### Sign In

- POST
- hostname/api/v1/SignIn
- body

    ``` json
        {
            "account": "",
            "password": "",
        }

    ```
- RES

    ``` json
        {
            "token": "",
            "nickName": "",
            "message": ""
        }
    ```

### Authorization Test

- GET
- hostname/
- Header
    ``` json
        {
            "authorization": "token"
        }
    ```

### Bind OpenAi and Azure Key

- POST
- hostname/api/v1/BindKey
- Header
    ``` json
        {
            "authorization": "token"
        }
    ```
- body
    ``` json
        {
            "openId":"",
            "speechRegion":"",
            "speechKey":""
        }
    ```
- RES

    ``` json
        {
            "message": ""
        }
    ```

### Check User Bind Status

- GET
- hostname/api/v1/BindStatus
- Header
    ``` json
        {
            "authorization": "token"
        }
    ```
- RES

    ``` json
        {
            "bindStatus": true,
            "message": ""
        }
    ```
### UnBind OpenAi and Azure key

- GET
- hostname/api/v1/UnBindKey
- Header
    ``` json
        {
            "authorization": "token"
        }
    ```
- RES

    ``` json
        {
            "message": ""
        }
    ```

