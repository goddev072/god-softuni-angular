package npd21.softuni.backend.service;

public interface AuthenticationService {

    public boolean authenticate(String email, String password);
}
