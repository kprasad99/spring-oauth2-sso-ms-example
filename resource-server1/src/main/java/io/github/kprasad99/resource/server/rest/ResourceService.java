package io.github.kprasad99.resource.server.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ResourceService {

	@GetMapping("/resource1")
	public String hello() {
		return "Hello from Resource-1";
	}
}
