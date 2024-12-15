package com.example.monitoring.core.email;

import java.util.List;
import java.util.Map;

public interface EmailCreator {
    String createEmail(EmailContext emailContext, Map<ContextFields.Fields, List<String>> fieldsMap);
}
