package npd21.softuni.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(schema = "softuni")
@Getter
@Setter
public class Address extends Base {

    private String address;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    private User user;
}
