package com.example.monitoring.core.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/user/email")
public class EmailController {

    private final EmailService emailService;
    private final EmailCreator emailCreator;

    @Autowired
    public EmailController(EmailService emailService, EmailCreator emailCreator) {
        this.emailService = emailService;
        this.emailCreator = emailCreator;
    }

    @PostMapping("/send-test-email")
    public String test(@RequestBody Email email) {
        Map<ContextFields.Fields, List<String>> map = new HashMap<>();
        map.put(ContextFields.Fields.NAME, List.of("Jan"));
        map.put(ContextFields.Fields.SURNAME, List.of("Kowalski"));
        map.put(ContextFields.Fields.USER_ID, List.of("id_1"));
        map.put(ContextFields.Fields.DEVICE_ID, List.of("id_6", "id_7", "id_8"));
        // IMPORTANT: you can't pass context field not associated with EmailContext
        // NOTE: if fields are not given then it will leave /BEGIN/<field>/END/ as a plain text in mail. DELETE FIELD FROM CONTEXT IF YOU CAN'T PROVIDE THE DATA!
        String body = emailCreator.createEmail(EmailContext.WELCOME_MESSAGE, map);

        Email emailObj = new Email();
        emailObj.setBody(body);
        emailObj.setSubject(email.getSubject());
        emailObj.setRecipient(email.getRecipient());
        return emailService.sendHtmlMail(emailObj);
    }
}
