package com.example.monitoring.core.external;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

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
}
