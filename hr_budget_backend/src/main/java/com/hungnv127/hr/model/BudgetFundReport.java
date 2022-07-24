package com.hungnv127.hr.model;

public class BudgetFundReport {
    public String name;
    public Long value;
    public String note;

    public BudgetFundReport() {
    }

    public BudgetFundReport(String name, Long value, String note) {
        this.name = name;
        this.value = value;
        this.note = note;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getValue() {
        return value;
    }

    public void setValue(Long value) {
        this.value = value;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
