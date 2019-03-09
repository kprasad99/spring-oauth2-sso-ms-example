# spring-oauth2-sso-ms-example
An example of spring cloud Oauth2 with SSO for Microservices


#### How to run.


*   Build auth server

	$ mvn clean package -DskipTests

* Start docker instance.

	$ docker-compose up

* Open Postman and try to get for hello uri at `http://localhost:8185/hello`, you will get 401 unauthorized error.
* Do a post to url `http://localhost:8185/oauth/token` with basic authentication, where username and password is client applications username and password that is client_1 and secret respectively. and choose body type `x-www-form-urlencoded` with parameters username,passwrod and grant_type as admin, password and password respectively. which would return access token, reference images of postman are add below.

![Retrieval of Oauth token](https://github.com/kprasad99/myfirstrepo/blob/master/images/oauth2_authorization.png "Basic Auth section") 
![Retrieval of Oauth token](https://github.com/kprasad99/myfirstrepo/blob/master/images/oauth_body.png "Body section")

* Use the oauth token retrieved in the previous step to access resource1 uri of resource server1 by passing bearer token in authorization section as shown below. However for resource2 of server2 if you try to access using user you will get access denied error, only admin user can access resource2. 

 ![Retrieval of Oauth token](https://github.com/kprasad99/myfirstrepo/blob/master/images/oauth_get.png "Get request with Bearer token")
 
 * Alternatively you can directly use oauth2 authorization in postman and click on get new access token as shown below instead of two steps given above.
 
 
![Retrieval of Oauth token](https://github.com/kprasad99/myfirstrepo/blob/master/images/oauth2_single_step_1.png "Single step 1") 
![Retrieval of Oauth token](https://github.com/kprasad99/myfirstrepo/blob/master/images/oauth_2_single_step_2.png "Single step 2")
![Retrieval of Oauth token](https://github.com/kprasad99/myfirstrepo/blob/master/images/oauth2_single_step_3.png "Single step 3")

 