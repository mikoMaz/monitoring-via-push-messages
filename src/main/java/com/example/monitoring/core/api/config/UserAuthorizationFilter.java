package com.example.monitoring.core.api.config;

import com.example.monitoring.core.ApplicationProps;
import com.example.monitoring.core.request.RequestSender;
import com.example.monitoring.core.user.User;
import com.example.monitoring.core.user.UserRepository;
import com.google.gson.Gson;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class UserAuthorizationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    private final UserRepository userRepository;

    private final RequestSender requestSender;

    private final ApplicationProps applicationProps;

    org.slf4j.Logger logger = LoggerFactory.getLogger(UserAuthorizationFilter.class);

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            logger.error("Authorization header is missing or invalid");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authorization header is missing");
            return;
        }

        String token = authHeader.substring(7);

        String subject = jwtService.extractUnsecuredToken(token).getSubject();

        User user = userRepository.findByAuthTokenSubject(subject);

        // user not found in db. Might log in for the first time
        if (user == null) {
            try {
                // check if user with token is verified by Auth0
                String userInfo = requestSender.executeGetWithAuthorization(applicationProps.getIssuerUri() + "userinfo", token);
                Gson gson = new Gson();
                Auth0Token tokenInJson = gson.fromJson(userInfo, Auth0Token.class);

                String emailFromToken = tokenInJson.getEmail();

                // find user in the database. Might not have subject assigned
                Optional<User> userVerifiedByToken = userRepository.findByEmail(emailFromToken);

                // oops! someone is trying to reach our api without permission
                if (userVerifiedByToken.isEmpty()) {
                    logger.error("User with email {} is trying to login without verification! User is not saved in the database", emailFromToken);
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "User is not verified!");
                    return;
                }

                // user logged for the first time yey! saving his unique subject to repository
                userVerifiedByToken.ifPresent(usr -> usr.setAuthTokenSubject(subject));
                userVerifiedByToken.ifPresent(userRepository::save);
                logger.info("User with email {} is logged in for the first time", emailFromToken);
            } catch (IOException | InterruptedException e) {
                logger.error("Error while executing Auth0 request");
                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error while executing Auth0 request");
                return;
            }
        }
        filterChain.doFilter(request, response);
    }
}
