package com.pms.backend.domain;

import jakarta.persistence.*;

@Entity
@Table(
    name = "channel_spec",
    uniqueConstraints = { @UniqueConstraint(name = "uk_channel_code", columnNames = "channel_code") }
)
public class ChannelSpec {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "channel_code", length = 20, nullable = false)
    private String channelCode;

    @Column(name = "location", length = 10)
    private String location;

    @Column(name = "rpm", nullable = false)
    private Integer rpm;

    @Column(name = "samples_per_frame", nullable = false)
    private Integer samplesPerFrame;

    @Column(name = "fs", nullable = false)
    private Integer fs;

    @Column(name = "N_ROLLERS_PER_ROW", nullable = false)
    private Integer nRollersPerRow;

    @Column(name = "ROLLER_DIAMETER", nullable = false)
    private Double rollerDiameter;

    @Column(name = "PITCH_DIAMETER", nullable = false)
    private Double pitchDiameter;

    @Column(name = "CONTACT_ANGLE_DEGREE", nullable = false)
    private Double contactAngleDegree;

    public ChannelSpec() {}

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getChannelCode() { return channelCode; }
    public void setChannelCode(String channelCode) { this.channelCode = channelCode; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Integer getRpm() { return rpm; }
    public void setRpm(Integer rpm) { this.rpm = rpm; }

    public Integer getSamplesPerFrame() { return samplesPerFrame; }
    public void setSamplesPerFrame(Integer samplesPerFrame) { this.samplesPerFrame = samplesPerFrame; }

    public Integer getFs() { return fs; }
    public void setFs(Integer fs) { this.fs = fs; }

    public Integer getNRollersPerRow() { return nRollersPerRow; }
    public void setNRollersPerRow(Integer nRollersPerRow) { this.nRollersPerRow = nRollersPerRow; }

    public Double getRollerDiameter() { return rollerDiameter; }
    public void setRollerDiameter(Double rollerDiameter) { this.rollerDiameter = rollerDiameter; }

    public Double getPitchDiameter() { return pitchDiameter; }
    public void setPitchDiameter(Double pitchDiameter) { this.pitchDiameter = pitchDiameter; }

    public Double getContactAngleDegree() { return contactAngleDegree; }
    public void setContactAngleDegree(Double contactAngleDegree) { this.contactAngleDegree = contactAngleDegree; }
}


// http://localhost:8080/api/channels
// http://localhost:8080/api/channels/1