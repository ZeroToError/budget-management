package com.hungnv127.hr.model;

import com.hungnv127.hr.entity.BudgetHistory;

public class BudgetHistoryModel {
    private Long id;

    private String reason;

    private Long amount;

    private String source;

    private String detailReason;

    private Integer typeFlag;

    private String createdBy;

    private Long createdAt;

    private String updatedBy;

    private Long updatedAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getDetailReason() {
        return detailReason;
    }

    public void setDetailReason(String detailReason) {
        this.detailReason = detailReason;
    }

    public Integer getTypeFlag() {
        return typeFlag;
    }

    public void setTypeFlag(Integer typeFlag) {
        this.typeFlag = typeFlag;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Long getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Long createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Long getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Long updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public static String validate(BudgetHistoryModel budgetHistory) {
        String message = "";

        if (budgetHistory.getTypeFlag() == 1) {
            return validateFundBudget(budgetHistory);
        } else if (budgetHistory.getTypeFlag() == -1) {
            return validateSpendBudget(budgetHistory);
        }

        return message;
    }

    public static String validateFundBudget(BudgetHistoryModel budgetHistory) {
        String message = "";
        if(budgetHistory.getReason() == null || budgetHistory.getReason().isEmpty()) {
            message = "Lý do nạp tiền ";
        } else if (budgetHistory.getSource() == null || budgetHistory.getSource().isEmpty()) {
            message = "Nguồn tiền ";
        } else if (budgetHistory.getAmount() == null || budgetHistory.getAmount() == 0l) {
            message = "Số tiền ";
        } else if ("Nguồn khác".equals(budgetHistory.getSource()) && (budgetHistory.getDetailReason() == null || budgetHistory.getDetailReason().isEmpty())) {
            message = "Nội dung chi tiết cho nguồn khác ";
        }

        if (!message.isEmpty()) {
            message = message + "Là bắt buộc.";
        }

        return message;
    }

    public static String validateSpendBudget(BudgetHistoryModel budgetHistory) {
        String message = "";
        if(budgetHistory.getReason() == null || budgetHistory.getReason().isEmpty()) {
            message = "Lý do tiêu tiền ";
        } else if (budgetHistory.getSource() == null || budgetHistory.getSource().isEmpty()) {
            message = "Đích đến của tiền ";
        } else if (budgetHistory.getAmount() == null || budgetHistory.getAmount() == 0l) {
            message = "Số tiền ";
        }
        if (!message.isEmpty()) {
            message = message + "Là bắt buộc.";
        }

        return message;
    }
}
