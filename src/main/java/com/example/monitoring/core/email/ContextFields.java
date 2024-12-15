package com.example.monitoring.core.email;

import java.util.List;

public class ContextFields {

    public enum Fields {
        NAME,
        SURNAME,
        USER_ID,
        DEVICE_ID
    }

    public List<Fields> getContexts(EmailContext emailContext) {

        return switch (emailContext) {
            case WELCOME_MESSAGE -> List.of(Fields.NAME, Fields.SURNAME, Fields.USER_ID, Fields.DEVICE_ID);
            case DELETE_ACCOUNT, PASSWORD_RESET -> List.of(Fields.NAME, Fields.SURNAME, Fields.USER_ID);
            case ALERT -> List.of(Fields.DEVICE_ID);
        };
    }
}
