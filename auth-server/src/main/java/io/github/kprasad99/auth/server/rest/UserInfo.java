package io.github.kprasad99.auth.server.rest;

import java.security.Principal;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.provider.authentication.TokenExtractor;
import org.springframework.security.oauth2.provider.token.ConsumerTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserInfo {
	
	@Autowired
	private TokenExtractor tokenExtractor;
	
	@Autowired
	private AuthenticationManager authManager;

	@GetMapping(value="/userinfo")
	public Map<String, Object> user(@AuthenticationPrincipal Principal principal, HttpServletRequest request) {
		Authentication auth = tokenExtractor.extract(request);
		Authentication authentication = authManager.authenticate(auth);
		System.out.println(authentication.getName());
		System.out.println(authentication.getAuthorities());
		System.out.println(authentication.getCredentials());
		return Map.of("name", authentication.getName(), "authorities", authentication.getAuthorities());
	}
}
