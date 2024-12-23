package com.example.monitoring.core.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class EmailCreatorImpl implements EmailCreator {

    private final EmailDataRepository emailDataRepository;

    @Autowired
    public EmailCreatorImpl(EmailDataRepository emailDataRepository) {
        this.emailDataRepository = emailDataRepository;
    }

    public String createEmail(EmailContext emailContext, Map<ContextFields.Fields, List<String>> fieldsMap) {

        contextValidation(emailContext, fieldsMap.keySet());
        String emailBody = this.getEmailBody(emailContext);

        for (ContextFields.Fields field : fieldsMap.keySet()) {
            emailBody = this.emailFieldCompiler(emailBody, field, fieldsMap.get(field));
        }
        return emailBody;
    }

    private String getEmailBody(EmailContext emailContext) {
        EmailData emailData = emailDataRepository.findByContext(emailContext);

        if (emailData == null) {
            throw new NullPointerException("No data found for the given context. Please add missing data to db.");
        }

        String emailBody = emailData.getMailBody();

        if (emailBody == null) {
            throw new NullPointerException("No email body found for the given context. Please add missing email body for this context.");
        }

        return emailBody;
    }

    private String emailFieldCompiler(String emailBody, ContextFields.Fields field, List<String> fieldsMap) {
        int numberOfOneValueFields = emailBody.split("/BEGIN/" + field + "/END/").length - 1;
        int numberOfMultiValueFields = emailBody.split("/BEGIN/" + field + "\\[]/END/").length - 1;

        if (numberOfOneValueFields != 0) {
            for (int i = 0; i < numberOfOneValueFields; i++) {
                emailBody = emailBody.replaceFirst("/BEGIN/" + field + "/END/", fieldsMap.getFirst());
            }
        }
        if (numberOfMultiValueFields != 0) {
            for (int i = 0; i < numberOfMultiValueFields; i++) {
                for (String fieldName : fieldsMap) {
                    emailBody = emailBody.replaceFirst("/BEGIN/" + field + "\\[]/END/", "<p style=\"line-height: 140%;\">" + fieldName + "</p>\n" + "/BEGIN/" + field + "[]/END/");
                }
                emailBody = emailBody.replaceFirst("/BEGIN/" + field + "\\[]/END/", "");
            }
        }
        return emailBody;
    }

    private void contextValidation(EmailContext emailContext, Set<ContextFields.Fields> fields) {
        ContextFields contextFields = new ContextFields();
        // check if fields are within the given context
        if (!new HashSet<>(contextFields.getContexts(emailContext)).containsAll(fields)) {
            throw new IllegalArgumentException("Context fields are not valid");
        }
    }
}
