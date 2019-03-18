


INSERT INTO oauth_client_details
    (client_id, client_secret, scope, authorized_grant_types,
    web_server_redirect_uri, authorities, access_token_validity,
    refresh_token_validity, additional_information, autoapprove)
VALUES
    ("uiClient", "$2a$10$6ivb8LZIGz5Vt3OiMWSCvu/QaYqrNXnUYMFXSS1hHEUkAkWbtMWRK", "read,write,trust","refresh_token,implicit", "http://localhost:4200/index.html", "ROLE_CLIENT,ROLE_TRUSTED_CLIENT,ADMIN", 36000, 36000, null, "read,write,trust");
