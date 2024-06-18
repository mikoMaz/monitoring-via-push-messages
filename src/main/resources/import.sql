INSERT INTO device_types (device_type) VALUES ('sensor');
INSERT INTO device_types (device_type) VALUES ('bridge');
INSERT INTO device_types (device_type) VALUES ('gateway');

INSERT INTO device_payload_fields (id, key_name, table_key_name, device_type) VALUES (1, 'serial_number', 'device_id', (SELECT id FROM device_types WHERE device_type = 'bridge'));
INSERT INTO device_payload_fields (id, key_name, table_key_name, device_type) VALUES (2, 'company_id', 'company_id', (SELECT id FROM device_types WHERE device_type = 'bridge'));
INSERT INTO device_payload_fields (id, key_name, table_key_name, device_type) VALUES (3, 'sensor', 'device_id', (SELECT id FROM device_types WHERE device_type = 'sensor'));
