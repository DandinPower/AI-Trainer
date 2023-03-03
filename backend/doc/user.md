# User Api

### Sign Up

- POST
- hostname/api/v1/SignUp
- REQ

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
- REQ

    ``` json
        {
            "account": "",
            "password": "",
        }

    ```
- RES

    ``` json
        {
            "token": ""
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

