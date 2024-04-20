package npd21.softuni.backend.service;

import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;

import java.util.concurrent.ExecutionException;

public interface FireStoreService {

    public DocumentSnapshot getFireStoreDocument(String documentId) throws ExecutionException, InterruptedException;
}
