package com.hungnv127.hr.model;

import java.util.List;

public class BudgetReport {
    private List<BudgetFundReport> fundReport;
    private List<BudgetSpendReport> spendReport;
    private BudgetStatusReport statusReport;

    public List<BudgetFundReport> getFundReport() {
        return fundReport;
    }

    public void setFundReport(List<BudgetFundReport> fundReport) {
        this.fundReport = fundReport;
    }

    public List<BudgetSpendReport> getSpendReport() {
        return spendReport;
    }

    public void setSpendReport(List<BudgetSpendReport> spendReport) {
        this.spendReport = spendReport;
    }

    public BudgetStatusReport getStatusReport() {
        return statusReport;
    }

    public void setStatusReport(BudgetStatusReport statusReport) {
        this.statusReport = statusReport;
    }
}
