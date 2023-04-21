package com.example.insurancesystem.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
public class RuleForQuery {
    //必填
    private List<String> companyNames;
    private List<String> branchNames;
    private LocalDate from;
    private LocalDate to;
    private String name;
}
