package com.hungnv127.hr.model;

public class BudgetStatus {
    private Integer status;
    private Long value;

    public BudgetStatus() {
    }

    public BudgetStatus(Integer status, Long value) {
        this.status = status;
        this.value = value;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Long getValue() {
        return value;
    }

    public void setValue(Long value) {
        this.value = value;
    }
}
