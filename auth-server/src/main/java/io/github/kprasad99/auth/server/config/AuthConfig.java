package io.github.kprasad99.auth.server.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.security.oauth2.resource.PrincipalExtractor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.provider.authentication.BearerTokenExtractor;
import org.springframework.security.oauth2.provider.authentication.TokenExtractor;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.InMemoryTokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;

@Configuration
@EnableAuthorizationServer
public class AuthConfig extends AuthorizationServerConfigurerAdapter {

	@Autowired
	@Qualifier("authenticationManagerBean")
	private AuthenticationManager authenticationManager;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private DataSource dataSource;
	

	@Override
	public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
		clients.jdbc(dataSource).passwordEncoder(passwordEncoder).jdbc();

		/**
		 * clients.inMemory () .withClient ("client") .authorizedGrantTypes ("password",
		 * "authorization_code", "refresh_token", "implicit") .authorities
		 * ("ROLE_CLIENT", "ROLE_TRUSTED_CLIENT", "USER") .scopes ("read", "write")
		 * .autoApprove (true) .secret (passwordEncoder.encode ("password"));
		 **/
	}

	@Override
	public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
		endpoints.authenticationManager(authenticationManager)
				.tokenStore(tokenStore())/* .accessTokenConverter(tokenConverter()) */;
	}

	@Bean
	public TokenStore tokenStore() {
	//	return new JwtTokenStore(tokenConverter());
		return new InMemoryTokenStore();
	}
	
	@Bean 
	public JwtAccessTokenConverter tokenConverter() {
		JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
		converter.setSigningKey("12345");
		return converter;
	}

	@Bean
	public PrincipalExtractor principalExtractor() {
		return (e) -> {
			System.out.println("KP"+ e);
			return e;
		};
	}
	
	@Bean
	public TokenExtractor tokenExtractor() {
		return new BearerTokenExtractor();
	}
}
