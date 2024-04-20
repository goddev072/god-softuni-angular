package npd21.softuni.backend;

import lombok.extern.slf4j.Slf4j;
import org.mapstruct.ap.shaded.freemarker.template.utility.UndeclaredThrowableException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import java.io.IOException;
import java.net.URISyntaxException;

@SpringBootApplication
@Slf4j
public class BackendApplication {

	public static void main(String[] args) throws URISyntaxException, IOException {

//	    ClassLoader classLoader = BackendApplication.class.getClassLoader();
//
//	    File file = new File(classLoader.getResource("serviceAccountKey.json").toURI());
//
//		FileInputStream serviceAccount = new FileInputStream(file.getAbsolutePath());
//
//		FirebaseOptions options = new FirebaseOptions.Builder()
//				.setCredentials(GoogleCredentials.fromStream(serviceAccount))
//				.build();
//
//		FirebaseApp.initializeApp(options);

	    SpringApplication.run(BackendApplication.class, args);
	}

	@EventListener(ApplicationReadyEvent.class)
	public void doAfterStartup() {
		log.info("I have just started up! Application starting successfully....");
	}

}
