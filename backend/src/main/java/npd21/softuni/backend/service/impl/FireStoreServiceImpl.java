package npd21.softuni.backend.service.impl;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import npd21.softuni.backend.service.FireStoreService;
import org.springframework.beans.factory.annotation.Value;

import java.util.concurrent.ExecutionException;

public class FireStoreServiceImpl implements FireStoreService {

    @Value("${firestore.collection}")
    private String firebaseCollection;

    @Override
    public DocumentSnapshot getFireStoreDocument(String documentId) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = firestore.collection(firebaseCollection).document(documentId);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();

        if(document.exists()) {
            return document;
        }

        return null;
    }
}
