package io.github.kprasad99.resource.server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

@Configuration
@EnableResourceServer
@EnableOAuth2Client
public class ResourceConfig extends ResourceServerConfigurerAdapter {
	
	@Override
	public void configure(HttpSecurity http) throws Exception {
		http.anonymous().disable().authorizeRequests().antMatchers("/resource2").hasRole("ADMIN").and()
				.authorizeRequests().and().csrf().disable();
	}
}
