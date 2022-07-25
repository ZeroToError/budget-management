package com.hungnv127.hr.controller;

import com.hungnv127.hr.entity.BudgetHistory;
import com.hungnv127.hr.model.BudgetHistoryModel;
import com.hungnv127.hr.model.BudgetReport;
import com.hungnv127.hr.service.BudgetHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController("budget")
@RequestMapping("budget")
public class BudgetController {

    @Autowired
    private BudgetHistoryService budgetHistoryService;


    @PostMapping
    public ResponseEntity insertBudgetHistory(@RequestBody BudgetHistoryModel budgetHistoryModel) {

        String validateMessage = BudgetHistoryModel.validate(budgetHistoryModel);
        if (!validateMessage.isEmpty()) {
            HashMap<String, String> errorReturn = new HashMap<>();
            errorReturn.put("message", validateMessage);
            errorReturn.put("code", String.valueOf(HttpStatus.BAD_REQUEST.value()));

            return new ResponseEntity(errorReturn, HttpStatus.BAD_REQUEST);
        }

        budgetHistoryService.insertBudgetHistory(budgetHistoryModel);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping(value = "report")
    public ResponseEntity getBudgetHistoryReport() {
        BudgetReport budgetReport = budgetHistoryService.generateReport();

        return new ResponseEntity(budgetReport, HttpStatus.OK);
    }
}
