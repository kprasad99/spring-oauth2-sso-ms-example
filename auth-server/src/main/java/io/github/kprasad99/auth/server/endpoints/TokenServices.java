package io.github.kprasad99.auth.server.endpoints;

import java.io.IOException;
import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.AuthorizationServerTokenServices;
import org.springframework.security.oauth2.provider.token.ConsumerTokenServices;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
// @FrameworkEndpoint Does not work with frameworkendpoint
public class TokenServices {

	private static final Logger LOG = LoggerFactory.getLogger(TokenServices.class);

	@Autowired
	private AuthorizationServerTokenServices authorizationServerTokenServices;

	@Autowired
	private ConsumerTokenServices consumerTokenServices;

	@GetMapping(value = "/oauth/revoke_token")
	public void logout(@AuthenticationPrincipal Principal principal, HttpServletRequest request,
			HttpServletResponse response) throws IOException {

		OAuth2Authentication oAuth2Authentication = (OAuth2Authentication) principal;
		OAuth2AccessToken accessToken = authorizationServerTokenServices.getAccessToken(oAuth2Authentication);
		consumerTokenServices.revokeToken(accessToken.getValue());
		String redirectUri = request.getParameter("rd");
		redirectUri = redirectUri == null || redirectUri.isBlank() ? request.getParameter("rd")
				: request.getParameter("redirect_uri");
		if (redirectUri == null || redirectUri.isBlank()) {
			switch (oAuth2Authentication.getOAuth2Request().getGrantType()) {
			case "password":
			case "client_credentials":
				response.setStatus(200);
				response.setContentLength(0);
				return;
			case "implicit":
			case "authorization_code":
			default:
				redirectUri = "/login";
				break;
			}
		}

		LOG.debug("Redirect URL: {}", redirectUri);
		response.sendRedirect(redirectUri);
		return;
	}
}
