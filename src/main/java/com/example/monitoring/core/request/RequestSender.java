package com.example.monitoring.core.request;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class RequestSender {

    private final HttpClient client;

    org.slf4j.Logger logger = LoggerFactory.getLogger(RequestSender.class);

    public RequestSender() {
        this.client = HttpClient.newHttpClient();
    }

    public String executeGetWithAuthorization(String url, String token) throws IOException, InterruptedException {

        var request = HttpRequest.newBuilder(URI.create(url))
                .header("Authorization", "Bearer " + token)
                .GET()
                .build();

        try {
            var response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                throw new IOException("Unexpected HTTP response: " + response.statusCode());
            }

            return response.body();
        } catch (IOException | InterruptedException e) {
            logger.error("Exception while executing request");
            throw e;
        }
    }
}
