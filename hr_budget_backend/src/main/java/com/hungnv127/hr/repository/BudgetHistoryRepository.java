package com.hungnv127.hr.repository;

import com.hungnv127.hr.entity.BudgetHistory;
import com.hungnv127.hr.model.BudgetFundReport;
import com.hungnv127.hr.model.BudgetSpendReport;
import com.hungnv127.hr.model.BudgetStatus;
import com.hungnv127.hr.model.BudgetStatusReport;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BudgetHistoryRepository extends CrudRepository<BudgetHistory, Long> {
    List<BudgetHistory> findAll();

    @Query(value = "SELECT new com.hungnv127.hr.model.BudgetSpendReport(bh.reason, sum(bh.amount), '') FROM BudgetHistory bh " +
            "WHERE bh.typeFlag = -1" +
            "GROUP BY bh.reason")
    List<BudgetSpendReport> getBudgetSpendReport();

    @Query(value = "SELECT new com.hungnv127.hr.model.BudgetFundReport(bh.reason, sum(bh.amount), '') FROM BudgetHistory bh " +
            "WHERE bh.typeFlag = 1" +
            "GROUP BY bh.reason")
    List<BudgetFundReport> getBudgetFundReport();

    @Query(value = "SELECT new com.hungnv127.hr.model.BudgetStatus(typeFlag, sum(bh.amount)) FROM BudgetHistory bh " +
            "GROUP BY bh.typeFlag")
    List<BudgetStatus> getBudgetStatus();
}