package com.example.monitoring.core.sensor;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Collection;
import java.util.List;

public class SensorData  {

 
//    private Integer readingTime;
//    private String type;
    @Id
    private long Id;
    private String severity;
    private String logger;
    private String thread;
    private SensorMessage message;
    private SensorProperties properties;

    public SensorDataSimplified toSensorDataSimplified()
    {
        SensorDataSimplified sds= new SensorDataSimplified(this.message.getSensor() ,this.message.getCompany_id() ,this.message.getData_type(),this.message.getReading_time());
        return sds;
    }
    public String getSeverity() {
        return this.severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getLogger() {
        return this.logger;
    }

    public void setLogger(String logger) {
        this.logger = logger;
    }

    public String getThread() {
        return this.thread;
    }

    public void setThread(String thread) {
        this.thread = thread;
    }

    public SensorMessage getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        ObjectMapper objectMapper = new ObjectMapper();
        try{    
            StringBuilder fixedMessage=new StringBuilder(message);

            fixedMessage.append(";");
            int i=fixedMessage.length()-1;
            while(i>0)
            {
                if(fixedMessage.charAt(i)==':')
                    {
                        fixedMessage.insert(i,"\"");
                        while(fixedMessage.charAt(i)!=' ')
                        {
                            i=i-1;
                            if(i==-1)
                            break;
                        }
                        fixedMessage.insert(i+1,"\"");
                    }
                else if(fixedMessage.charAt(i)==';')
                {
                    fixedMessage.setCharAt(i,',');
                    fixedMessage.insert(i,"\"");
                    while(fixedMessage.charAt(i)!=' ')
                    {
                        i=i-1;
                        if(i==-1)
                        break;
                    }
                    fixedMessage.insert(i+1,"\"");
                }
                i=i-1;
            }
            fixedMessage.setCharAt(fixedMessage.length()-1,'}');
            fixedMessage.insert(0,'{');
            this.message= objectMapper.readValue(fixedMessage.toString(), SensorMessage.class);
        } catch (JsonMappingException e) {
        e.printStackTrace();
        } catch (JsonProcessingException e) {
        e.printStackTrace();
        }

    }

    public SensorProperties getProperties() {
        return this.properties;
    }

    public void setProperties(SensorProperties properties) {
        this.properties = properties;
    }



}
