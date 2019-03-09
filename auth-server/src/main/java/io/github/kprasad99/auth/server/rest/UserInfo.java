package io.github.kprasad99.auth.server.rest;

import java.security.Principal;
import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserInfo {

	@GetMapping("/userinfo")
	public Map<String, String> user(@AuthenticationPrincipal Principal principal) {
		if (principal != null) {
	       return Map.of("name", principal.getName());
	    }
		return null;
	}
}
