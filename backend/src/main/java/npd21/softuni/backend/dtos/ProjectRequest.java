package npd21.softuni.backend.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectRequest {

    private String name;
    private String description;
    private String url;
    private String pictureUrl;
}
