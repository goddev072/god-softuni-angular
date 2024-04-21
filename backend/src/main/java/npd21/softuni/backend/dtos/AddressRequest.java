package npd21.softuni.backend.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressRequest {

    private String street;
    private String city;
    private String postalCode;
    private String country;
}
