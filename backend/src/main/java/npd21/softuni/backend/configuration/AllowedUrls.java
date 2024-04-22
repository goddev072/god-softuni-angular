package npd21.softuni.backend.configuration;

import lombok.Getter;

public class AllowedUrls {

    private static final String[] allowedUrls = {
        "/api/v1/rest/auth/**",
        "/api/v1/rest/test",
        "/test/**",
        "test",
        "/users/**",
        "/api/v1/rest/users/**",
        "/v2/api-docs",
        "/v3/api-docs",
        "/v3/api-docs/**",
        "/swagger-resources",
        "/swagger-resources/**",
        "/configuration/ui",
        "/configuration/security",
        "/swagger-ui/**",
        "/webjars/**",
        "/swagger-ui.html"
    };

    @Getter
    private static final String logOutUrl = "/api/v1/rest/auth/logout";

    public static String[] getAllowedUrls() {
        return allowedUrls;
    }
}
