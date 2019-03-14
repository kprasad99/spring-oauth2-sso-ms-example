package io.github.kprasad99.auth.server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

	private static final String RESOURCE_ID = "auth_server";

	// @Override
	public void configure(ResourceServerSecurityConfigurer resources) {
		resources.resourceId(RESOURCE_ID).stateless(false);
	}

	/*
	 * @Override public void configure(HttpSecurity http) throws Exception {
	 * http.anonymous().disable().authorizeRequests().antMatchers("/oauth/token",
	 * "/oauth/authorize", "/login")
	 * .permitAll().and().authorizeRequests().antMatchers("/userinfo").authenticated
	 * (); }
	 */
}