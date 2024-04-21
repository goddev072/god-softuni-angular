package npd21.softuni.backend.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;

public class LogoutHandlerImpl implements org.springframework.security.web.authentication.logout.LogoutHandler {
    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        //TODO do whatever you do ???
    }
}
