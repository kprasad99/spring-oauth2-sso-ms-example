

create table oauth_client_details (
    client_id VARCHAR(256) PRIMARY KEY,
    resource_ids VARCHAR(256),
    client_secret VARCHAR(256),
    scope VARCHAR(256),
    authorized_grant_types VARCHAR(256),
    web_server_redirect_uri VARCHAR(256),
    authorities VARCHAR(256),
    access_token_validity INTEGER,
    refresh_token_validity INTEGER,
    additional_information VARCHAR(4096),
    autoapprove VARCHAR(256)
);


INSERT INTO oauth_client_details
    (client_id, client_secret, scope, authorized_grant_types,
    web_server_redirect_uri, authorities, access_token_validity,
    refresh_token_validity, additional_information, autoapprove)
VALUES
    ("client_1", "$2a$10$6ivb8LZIGz5Vt3OiMWSCvu/QaYqrNXnUYMFXSS1hHEUkAkWbtMWRK", "read,write,trust","password,authorization_code,refresh_token,implicit", null, "ROLE_CLIENT,ROLE_TRUSTED_CLIENT,USER", 36000, 36000, null, "read");
