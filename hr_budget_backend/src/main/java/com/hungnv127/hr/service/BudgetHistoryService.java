package com.hungnv127.hr.service;

import com.hungnv127.hr.model.BudgetHistoryModel;
import com.hungnv127.hr.model.BudgetReport;

public interface BudgetHistoryService {

    BudgetReport generateReport();

    void insertBudgetHistory(BudgetHistoryModel budgetHistoryModel);

}
