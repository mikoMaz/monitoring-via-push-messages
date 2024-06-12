package com.example.monitoring.core.external;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ExternalDataService {

    private final JdbcTemplate jdbcTemplate;

    @Transactional
    public void createTable(String tableName, String primaryKeyName, String secondColumn) {
        String sql = String.format("CREATE TABLE IF NOT EXISTS %s (%s VARCHAR(255), %s VARCHAR(255), PRIMARY KEY (%s))", tableName, primaryKeyName, secondColumn, primaryKeyName);
        jdbcTemplate.execute(sql);
    }

    @Transactional
    public void dropTable(String tableName) {
        String sql = String.format("DROP TABLE %s", tableName);
        jdbcTemplate.execute(sql);
    }

    @Transactional
    public void addData(String tableName, String primaryKeyName, String secondColumn, String primaryValue, String secondValue) {
        String sql = String.format("INSERT INTO %s (%s, %s) VALUES (?, ?)", tableName, primaryKeyName, secondColumn);
        jdbcTemplate.update(sql, primaryValue, secondValue);
    }

    Map<String, String> dataFetch(String tableName, String primaryKeyName, String secondColumn) {
        String sql = String.format("SELECT * FROM %s", tableName);
        List<Map<String, Object>> listOfMapRows = jdbcTemplate.queryForList(sql);
        Map<String, String> result = new HashMap<>();

        for (Map<String, Object> row : listOfMapRows) {
            String key = (String) row.get(primaryKeyName);
            String value = (String) row.get(secondColumn);
            result.put(key, value);
        }
        return result;
    }
}
