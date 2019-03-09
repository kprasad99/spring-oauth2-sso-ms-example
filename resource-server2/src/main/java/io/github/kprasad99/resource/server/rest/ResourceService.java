package io.github.kprasad99.resource.server.rest;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ResourceService {

	@GetMapping(value="/resource2", produces=MediaType.TEXT_PLAIN_VALUE)
	public String hello() {
		return "Hello from Resource-2";
	}
}
