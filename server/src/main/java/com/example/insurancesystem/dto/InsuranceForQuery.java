package com.example.insurancesystem.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Data
public class InsuranceForQuery {
    private String[] companies;
    private String insurFullName;
    private String code;
    private String mainOrVice;
    private String paramType;
    private Date startFrom;
    private Date startTo;
    private Date endFrom;
    private Date endTo;
}
