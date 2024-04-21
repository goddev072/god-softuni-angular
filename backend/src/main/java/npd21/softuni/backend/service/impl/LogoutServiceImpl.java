package npd21.softuni.backend.service.impl;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@Service
public class LogoutServiceImpl implements LogoutHandler {

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
//        final String authHeader = request.getHeader("Authorization");
//        final String jwt;
//        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
//            return;
//        }
//        jwt = authHeader.substring(7);
//        var storedToken = apiTokenRepository.findByToken(jwt)
//                .orElse(null);
//        if (storedToken != null) {
//            storedToken.setExpired(true);
//            storedToken.setRevoked(true);
//            apiTokenRepository.save(storedToken);
//            SecurityContextHolder.clearContext();
//        }
    }
}
