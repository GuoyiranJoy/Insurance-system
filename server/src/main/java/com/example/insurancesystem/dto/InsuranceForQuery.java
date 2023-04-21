package com.example.insurancesystem.dto;

import lombok.Data;

import java.util.Date;

@Data
public class InsuranceForQuery {
    private String[] companies;
    //必填
    private String insurFullName;
    private String code;
    private String mainOrVice;
    private String paramDiffName;
    private Date startFrom;
    private Date startTo;
    private Date endFrom;
    private Date endTo;
}
