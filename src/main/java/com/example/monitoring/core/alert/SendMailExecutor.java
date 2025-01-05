package com.example.monitoring.core.alert;

public class SendMailExecutor implements Runnable {

    private String message;
    org.slf4j.Logger  logger;
    public void MessagePrinterTask(String message) {
        this.message = message;
    }

    public void run() {
        logger.info(message);
    }
}

