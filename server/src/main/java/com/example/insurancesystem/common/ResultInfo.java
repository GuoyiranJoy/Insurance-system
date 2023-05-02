package com.example.insurancesystem.common;

import lombok.*;

/*
* 用于后端数据封装，前后端数据传输*/
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResultInfo {
    private String code;
    private String msg;
    private Object data;

    public static ResultInfo success(String message) {
        return new ResultInfo(Constants.CODE_200, message, null);
    }

    public static ResultInfo success(Object data) {
        return new ResultInfo(Constants.CODE_200, "", data);
    }

    public static ResultInfo error(String code, String msg) {
        return new ResultInfo(code, msg, null);
    }

    public static ResultInfo error(String msg) {
        return new ResultInfo(Constants.CODE_500,msg , null);
    }

}
