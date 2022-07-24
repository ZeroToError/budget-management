package com.hungnv127.hr.service;

import com.hungnv127.hr.entity.BudgetHistory;
import com.hungnv127.hr.model.*;
import com.hungnv127.hr.repository.BudgetHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;

@Service
public class BudgetHistoryServiceImpl implements BudgetHistoryService {

    @Autowired
    BudgetHistoryRepository budgetHistoryRepository;

    @Override
    public BudgetReport generateReport() {
        BudgetReport budgetReport = new BudgetReport();

        List<BudgetSpendReport> budgetSpendReports = budgetHistoryRepository.getBudgetSpendReport();

        budgetReport.setSpendReport(budgetSpendReports);

        List<BudgetFundReport> budgetFundReports = budgetHistoryRepository.getBudgetFundReport();

        budgetReport.setFundReport(budgetFundReports);

        List<BudgetStatus> budgetStatuses = budgetHistoryRepository.getBudgetStatus();

        BudgetStatusReport budgetStatusReport = new BudgetStatusReport();

        for (BudgetStatus budgetStatus: budgetStatuses)
        {
            if (budgetStatus.getStatus().equals(-1)) {
                budgetStatusReport.setSpent(budgetStatus.getValue());
            }
            if (budgetStatus.getStatus().equals(1)) {
                budgetStatusReport.setTotal(budgetStatus.getValue());
            }
        }
        if (!budgetStatuses.isEmpty()) {
            if (budgetStatusReport.getTotal() != null && budgetStatusReport.getSpent() != null) {
                budgetStatusReport.setRemain(budgetStatusReport.getTotal() - budgetStatusReport.getSpent());
            } else if (budgetStatusReport.getTotal() != null && budgetStatusReport.getSpent() == null) {
                budgetStatusReport.setRemain(budgetStatusReport.getTotal());
            } else if (budgetStatusReport.getTotal() == null && budgetStatusReport.getSpent() != null) {
                budgetStatusReport.setRemain(budgetStatusReport.getSpent());
            }
        }

        budgetReport.setStatusReport(budgetStatusReport);

        return budgetReport;
    }

    @Override
    public void insertBudgetHistory(BudgetHistoryModel budgetHistoryModel) {
        Long currentTimeStamp = Calendar.getInstance().toInstant().getEpochSecond();
        BudgetHistory budgetHistory = new BudgetHistory();

        budgetHistory.setReason(budgetHistoryModel.getReason());
        budgetHistory.setAmount(budgetHistoryModel.getAmount());
        budgetHistory.setDetailReason(budgetHistoryModel.getDetailReason());
        budgetHistory.setTypeFlag(budgetHistoryModel.getTypeFlag());

        budgetHistory.setSource(budgetHistoryModel.getSource());
        budgetHistory.setCreatedAt(currentTimeStamp);
        budgetHistory.setCreatedBy(budgetHistoryModel.getCreatedBy());
        budgetHistory.setUpdatedBy(budgetHistoryModel.getUpdatedBy());
        budgetHistory.setUpdatedAt(currentTimeStamp);

        this.budgetHistoryRepository.save(budgetHistory);
    }
}
