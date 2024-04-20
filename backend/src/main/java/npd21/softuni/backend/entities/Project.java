package npd21.softuni.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(schema = "softuni")
public class Project extends Base {

    private String name;
    private String description;
    private String url;
    private String pictureUrl;
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;
}