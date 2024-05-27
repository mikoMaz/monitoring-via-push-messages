package com.example.monitoring.core.sensor;

public class SensorMessage {
    private String sensor;
    private String sensor_type;
    private String smartbox_identifier;
    private String company_id;
    private String value;
    private String data_type;
    private String reading_time;
    private String sensor_version;
    
    public String getSensor() {
        return this.sensor;
    }

    public void setSensor(String sensor) {
        this.sensor = sensor;
    }

    public String getSensor_type() {
        return this.sensor_type;
    }

    public void setSensor_type(String sensor_type) {
        this.sensor_type = sensor_type;
    }

    public String getSmartbox_identifier() {
        return this.smartbox_identifier;
    }

    public void setSmartbox_identifier(String smartbox_identifier) {
        this.smartbox_identifier = smartbox_identifier;
    }

    public String getCompany_id() {
        return this.company_id;
    }

    public void setCompany_id(String company_id) {
        this.company_id = company_id;
    }

    public String getValue() {
        return this.value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getData_type() {
        return this.data_type;
    }

    public void setData_type(String data_type) {
        this.data_type = data_type;
    }

    public String getReading_time() {
        return this.reading_time;
    }

    public void setReading_time(String reading_time) {
        this.reading_time = reading_time;
    }

    public String getSensor_version() {
        return this.sensor_version;
    }

    public void setSensor_version(String sensor_version) {
        this.sensor_version = sensor_version;
    }


}
