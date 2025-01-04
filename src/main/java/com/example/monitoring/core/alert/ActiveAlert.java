package com.example.monitoring.core.alert;

import java.text.MessageFormat;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.monitoring.core.status.DeviceStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.example.monitoring.core.alert.AlertData;
@Getter
@Setter
@NoArgsConstructor
public class ActiveAlert {
    private SendAlert parent;
    private int key;
    private Long id;
    private String emailAdress; // TODO: if null then its default to company mail adress
    private Integer frequency; // as notification per X seconds
    private Integer duration; // how many times
    private Integer delay;  // in seconds; notify after standard time + delay > downtime
    private boolean active;
    private String deviceId;
    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();

    private static final AtomicInteger keyGenerator = new AtomicInteger();
    org.slf4j.Logger  logger =LoggerFactory.getLogger(ActiveAlert.class);
    
    public ActiveAlert( AlertData alertData, String deviceId,SendAlert parent)
    {
        emailAdress=alertData.getEmailAdress();
        frequency=alertData.getFrequency();
        duration=alertData.getDuration(); 
        delay=alertData.getDelay();
        id=alertData.getId();
        this.active=true;
        this.deviceId=deviceId;
        this.parent=parent;
        this.key=keyGenerator.getAndIncrement();
        init();
    }

    public final void init() {
        logger.info("startedTask");

        scheduler.scheduleAtFixedRate(this::sendMail, delay, frequency, TimeUnit.SECONDS);
    }
    
    // @PostConstruct
    // public void startTask() {
    //     logger.info("startedTask");

    //     scheduler.scheduleAtFixedRate(this::sendMail, delay, frequency, TimeUnit.SECONDS);
    // }

    
    public void sendMail(){
        if(this.duration<=0)
        {
            shutDown();
        }
      
        logger.info(MessageFormat.format("device {0} doesn't work",this.deviceId));
        logger.info(MessageFormat.format("duration left : {0}",this.duration));
        logger.info(MessageFormat.format("key : {0}",this.key));

        this.duration-=1;
    }
    public void shutDown(){
        scheduler.shutdown();
        this.active=false;
        this.parent.removeInactiveAlert(this.getKey(),this.getDeviceId());
        logger.info("I have been stopped externally");
    }

    public boolean compareId(ActiveAlert secondAlert)
    {
        if(this.getId()==secondAlert.getId())
        return true;
        else
        return false;
    }
}