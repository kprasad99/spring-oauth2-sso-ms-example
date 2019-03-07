package io.github.kprasad99.auth.server.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Helloworld {

	@GetMapping("/hello")
	public String hello() {
		return "Hello from REST";
	}
}
