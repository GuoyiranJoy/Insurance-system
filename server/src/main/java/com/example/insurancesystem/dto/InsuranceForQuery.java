package com.example.insurancesystem.dto;

import lombok.Data;

import java.util.Date;

@Data
public class InsuranceForQuery {
    private Integer[] companyIds;
    //必填
    private String insurFullName;
    private String code;
    private String mainOrVice;
    private Integer paramDiffNameId;
    private Date startFrom;
    private Date startTo;
    private Date endFrom;
    private Date endTo;
}
