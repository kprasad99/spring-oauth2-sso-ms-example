package io.github.kprasad99.auth.server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.provider.error.OAuth2AccessDeniedHandler;

@Configuration
@EnableResourceServer
public class ResourceConfig extends ResourceServerConfigurerAdapter {

	@Override
	public void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers("/userinfo").authenticated().and()
				.authorizeRequests().antMatchers("/login", "/oauth/token", "/oauth/**").permitAll().and()
				.exceptionHandling().accessDeniedHandler(new OAuth2AccessDeniedHandler()).and().csrf().disable();
	}
}
