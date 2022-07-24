package com.hungnv127.hr.model;

public class BudgetStatusReport {
    private Long total;
    private Long spent;
    private Long remain;

    public BudgetStatusReport() {
    }

    public BudgetStatusReport(Long total, Long spent, Long remain) {
        this.total = total;
        this.spent = spent;
        this.remain = remain;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public Long getSpent() {
        return spent;
    }

    public void setSpent(Long spent) {
        this.spent = spent;
    }

    public Long getRemain() {
        return remain;
    }

    public void setRemain(Long remain) {
        this.remain = remain;
    }
}
