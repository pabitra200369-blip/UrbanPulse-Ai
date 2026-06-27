package com.urbanpulse.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String departmentHead;

    private Integer pendingIssues;

    private Integer resolvedIssues;

    private String status;

    @Column(length = 1000)
    private String description;

    public Department() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartmentHead() {
        return departmentHead;
    }

    public void setDepartmentHead(String departmentHead) {
        this.departmentHead = departmentHead;
    }

    public Integer getPendingIssues() {
        return pendingIssues;
    }

    public void setPendingIssues(Integer pendingIssues) {
        this.pendingIssues = pendingIssues;
    }

    public Integer getResolvedIssues() {
        return resolvedIssues;
    }

    public void setResolvedIssues(Integer resolvedIssues) {
        this.resolvedIssues = resolvedIssues;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}