# spring-oauth2-sso-ms-example
An example of spring cloud Oauth2 with SSO for Microservices


#### How to run.

- Build auth server
|
[source, sh]
````
$ mvn clean package -DskipTests
````

- Start docker instance.
|
[source, sh]
````
$ docker-compose up
````
- Browse `http://localhost:8185/hello`, page will automatically will be redirected to login page, use admin/password to login, after login page will be redirected to back to `/hello` uri with response.
